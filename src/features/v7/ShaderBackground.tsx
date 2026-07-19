import { useEffect, useRef } from "react";
import { useReducedMotion } from "./hooks";

const VERT = /* glsl */ `#version 300 es
in vec2 a_pos;
void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); }`;

// Ray-marched liquid chrome — cheap SDF blob field with fresnel/chromatic tint.
const FRAG = /* glsl */ `#version 300 es
precision highp float;
out vec4 outColor;
uniform vec2 u_res;
uniform float u_time;
uniform float u_scroll;
uniform vec2 u_mouse;

float hash(vec3 p){ p = fract(p*0.3183099+.1); p*=17.0; return fract(p.x*p.y*p.z*(p.x+p.y+p.z)); }
float noise(vec3 x){
  vec3 p=floor(x); vec3 f=fract(x); f=f*f*(3.0-2.0*f);
  return mix(mix(mix(hash(p+vec3(0,0,0)),hash(p+vec3(1,0,0)),f.x),
                 mix(hash(p+vec3(0,1,0)),hash(p+vec3(1,1,0)),f.x),f.y),
             mix(mix(hash(p+vec3(0,0,1)),hash(p+vec3(1,0,1)),f.x),
                 mix(hash(p+vec3(0,1,1)),hash(p+vec3(1,1,1)),f.x),f.y),f.z);
}
float smin(float a,float b,float k){ float h=clamp(.5+.5*(b-a)/k,0.,1.); return mix(b,a,h)-k*h*(1.-h); }

float map(vec3 p){
  float t = u_time*0.25;
  p.xy = mat2(cos(t*0.2),-sin(t*0.2),sin(t*0.2),cos(t*0.2))*p.xy;
  float d = length(p) - 1.2;
  for(int i=0;i<3;i++){
    float fi=float(i);
    vec3 c = vec3(sin(t+fi*2.1)*1.4, cos(t*0.8+fi)*1.1, sin(t*0.6+fi*1.7)*1.3);
    d = smin(d, length(p-c)-0.55, 0.9);
  }
  d += (noise(p*1.6 + t)-0.5)*0.25;
  return d;
}

vec3 nrm(vec3 p){
  vec2 e=vec2(0.002,0);
  return normalize(vec3(map(p+e.xyy)-map(p-e.xyy), map(p+e.yxy)-map(p-e.yxy), map(p+e.yyx)-map(p-e.yyx)));
}

void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5*u_res)/min(u_res.x,u_res.y);
  vec2 m = (u_mouse - 0.5*u_res)/min(u_res.x,u_res.y);

  vec3 ro = vec3(m.x*0.6, m.y*0.4, -4.2 + u_scroll*1.2);
  vec3 rd = normalize(vec3(uv, 1.4));

  float t=0.0; float d=0.0;
  for(int i=0;i<64;i++){
    vec3 p = ro + rd*t;
    d = map(p);
    if(d<0.002 || t>8.0) break;
    t += d*0.9;
  }

  // background: warm violet + cool cyan wash
  vec3 sky = mix(vec3(0.02,0.01,0.05), vec3(0.06,0.02,0.12), uv.y*0.5+0.5);
  sky += 0.12*vec3(0.25,0.7,1.0) * smoothstep(0.6,0.0,length(uv - vec2(0.5,-0.3)));
  sky += 0.10*vec3(0.9,0.4,1.0) * smoothstep(0.7,0.0,length(uv - vec2(-0.5,0.4)));

  vec3 col = sky;
  if(t<8.0){
    vec3 p = ro + rd*t;
    vec3 n = nrm(p);
    float fres = pow(1.0 - max(0.0, dot(-rd,n)), 3.0);
    vec3 refl = reflect(rd,n);

    // fake env: hue by direction
    vec3 env = mix(vec3(0.35,0.15,0.55), vec3(0.15,0.55,0.85), refl.y*0.5+0.5);
    env += 0.35*vec3(1.0,0.45,0.85)*pow(max(0.0,refl.x),4.0);

    // chromatic split
    float ca = 0.03;
    vec3 chrom;
    chrom.r = mix(env, vec3(1.0,0.4,0.7), 0.2).r;
    chrom.g = env.g;
    chrom.b = mix(env, vec3(0.5,0.9,1.0), 0.2).b;
    chrom = mix(env, chrom, ca*8.0);

    col = mix(sky, chrom, 0.55 + fres*0.45);
    col += fres*vec3(0.6,0.7,1.0)*0.6;
  }

  // vignette + grain
  float v = smoothstep(1.2, 0.4, length(uv));
  col *= 0.6 + 0.4*v;
  float grain = (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898,78.233)))*43758.5453) - 0.5) * 0.04;
  col += grain;

  outColor = vec4(col, 1.0);
}`;

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export default function ShaderBackground({ progress }: { progress: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(progress);
  progressRef.current = progress;
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl2", { antialias: false, alpha: false, powerPreference: "high-performance" });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(prog));
      return;
    }

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uScroll = gl.getUniformLocation(prog, "u_scroll");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");

    const mouse = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - r.left) * (canvas.width / r.width);
      mouse.y = (r.height - (e.clientY - r.top)) * (canvas.height / r.height);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const resize = () => {
      const dpr = Math.min(1.5, window.devicePixelRatio || 1);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    gl.useProgram(prog);
    let raf = 0;
    const start = performance.now();
    let last = start;
    const render = (now: number) => {
      const dt = now - last;
      last = now;
      if (document.hidden) {
        raf = requestAnimationFrame(render);
        return;
      }
      const t = reduced ? 0 : (now - start) / 1000;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, t);
      gl.uniform1f(uScroll, progressRef.current);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      // silence unused
      void dt;
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, [reduced]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="v7-shader"
    />
  );
}
