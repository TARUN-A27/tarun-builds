import{r as e}from"./rolldown-runtime-S-ySWqyJ.js";import{i as t,r as n}from"./framework-CXnKph_e.js";var r=e(t(),1),i={sheet:[1,0,0],cube:[0,1,0],sphere:[0,0,1]},a=(e,t=0,n=1)=>Math.min(n,Math.max(t,e)),o=(e,t,n)=>e+(t-e)*n,s=e=>e*e*(3-2*e);function c(e,t,n){let r=n*Math.PI/180,i=t*Math.cos(r),o=t*Math.sin(r),s=(e+.3963377774*i+.2158037573*o)**3,c=(e-.1055613458*i-.0638541728*o)**3,l=(e-.0894841775*i-1.291485548*o)**3;return[4.0767416621*s-3.3077115913*c+.2309699292*l,-1.2684380046*s+2.6097574011*c-.3413193965*l,-.0041960863*s-.7034186147*c+1.707614701*l].map(e=>a(e<=.0031308?12.92*e:1.055*Math.max(e,0)**(1/2.4)-.055))}function l(e){let[t=`cube`,...n]=e.trim().split(/\s+/),r={};for(let e of n){let[t,n]=e.split(`=`);r[t]=parseFloat(n)}let a=r.h??-1;return{w:i[t]??i.cube,ry:r.ry??0,rx:r.rx??0,d:r.d??6,x:r.x??0,yo:r.y??0,a:r.a??.8,n:r.n??.02,tint:a<0?[.6,.6,.6]:c(.8,.15,a),spec:+(a<0)}}var u={y:0,...l(`cube ry=.5 rx=.2 d=6.4 x=.3 y=0 a=.4 n=.02`)},d=`
precision highp float;
attribute vec3 aIdx;
uniform float uN, uTime, uNoise, uWave, uAsm, uPoint, uSpec, uDpr, uD;
uniform vec3 uW, uTint;
uniform mat4 uMVP;
varying vec3 vCol;
varying float vI;
float hsh(vec3 p){ return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453); }
vec3 pal(float t){ return 0.5 + 0.5 * cos(6.28318 * (t + vec3(0.0, 0.33, 0.67))); }
void main(){
  vec3 g = aIdx / (uN - 1.0) - 0.5;
  vec3 sheet = vec3(g.x * 2.3, g.y * 3.0, g.z * 0.30);
  vec3 cube = g * 2.3;
  vec3 c = g * 2.0; vec3 c2 = c * c;
  vec3 ball = c * sqrt(max(1.0 - 0.5 * (c2.yzx + c2.zxy) + (c2.yzx * c2.zxy) / 3.0, 0.0)) * 1.28;
  vec3 p = sheet * uW.x + cube * uW.y + ball * uW.z;
  float t = uTime;
  vec3 wob = vec3(sin(t * 0.9 + g.y * 7.0 + g.z * 3.0), sin(t * 0.8 + g.z * 7.0 + g.x * 3.0), sin(t * 1.1 + g.x * 7.0 + g.y * 3.0));
  vec3 jit = vec3(hsh(aIdx), hsh(aIdx + 3.0), hsh(aIdx + 7.0)) - 0.5;
  p += wob * uNoise + jit * uNoise * 1.6;
  float a = clamp(uAsm * 1.7 - hsh(aIdx + 11.0) * 0.7, 0.0, 1.0);
  a = a * a * (3.0 - 2.0 * a);
  vec3 sc = (vec3(hsh(aIdx + 1.0), hsh(aIdx + 5.0), hsh(aIdx + 9.0)) - 0.5) * 10.0;
  p = mix(sc, p, a);
  float wv = exp(-pow((g.y * 2.0 - uWave) * 3.0, 2.0));
  p.z += wv * 0.10;
  gl_Position = uMVP * vec4(p, 1.0);
  float w = gl_Position.w;
  float fog = clamp(1.25 - (w - uD + 1.6) * 0.20, 0.10, 1.0);
  float hue = g.x * 0.45 + g.y * 0.35 + g.z * 0.25 + uTime * 0.04;
  vec3 base = mix(uTint, pal(hue), uSpec);
  vCol = mix(vec3(0.62), base, clamp(wv * 1.25 + 0.14, 0.0, 1.0));
  vI = fog * (0.5 + wv * 0.95) * a;
  gl_PointSize = uPoint * uDpr * (2.6 + wv * 5.0) * (5.5 / w);
}`,f=`
precision mediump float;
uniform float uIsPt, uAlpha;
varying vec3 vCol;
varying float vI;
void main(){
  float k = 1.0;
  if (uIsPt > 0.5) { float r = length(gl_PointCoord - 0.5); k = smoothstep(0.5, 0.0, r); k *= k; }
  float i = vI * uAlpha * k * mix(0.34, 1.0, uIsPt);
  gl_FragColor = vec4(vCol * i, i);
}`,p=(e,t,n,r)=>{let i=1/Math.tan(e/2),a=.1,o=new Float32Array(16);return o[0]=i/t,o[5]=i,o[10]=(40+a)/(a-40),o[11]=-1,o[14]=80*a/(a-40),o[8]=-n,o[9]=-r,o},m=(e,t,n,r,i)=>{let a=Math.cos(t),o=Math.sin(t),s=Math.cos(n),c=Math.sin(n),l=[s*i,o*c*i,-a*c*i,0,0,a*i,o*i,0,c*i,-o*s*i,a*s*i,0,0,0,-r,1],u=new Float32Array(16);for(let t=0;t<4;t++)for(let n=0;n<4;n++)u[t*4+n]=e[n]*l[t*4]+e[4+n]*l[t*4+1]+e[8+n]*l[t*4+2]+e[12+n]*l[t*4+3];return u};function h(e){let t=document.documentElement,n=matchMedia(`(prefers-reduced-motion: reduce)`).matches,r=innerWidth<760,i=r?7:10,c=[],h=!1;c.push(()=>{h=!0});let g=null;try{g=e.getContext(`webgl`,{alpha:!0,antialias:!0,premultipliedAlpha:!0})}catch{}if(!g)return t.classList.add(`no-gl`),()=>{};let _=g,v=(e,t)=>{let n=_.createShader(e);if(_.shaderSource(n,t),_.compileShader(n),!_.getShaderParameter(n,_.COMPILE_STATUS))throw Error(_.getShaderInfoLog(n)||`shader`);return n},y;try{if(y=_.createProgram(),_.attachShader(y,v(_.VERTEX_SHADER,d)),_.attachShader(y,v(_.FRAGMENT_SHADER,f)),_.linkProgram(y),!_.getProgramParameter(y,_.LINK_STATUS))throw Error(_.getProgramInfoLog(y)||`link`)}catch(e){return console.warn(`[structure] WebGL disabled:`,e),t.classList.add(`no-gl`),()=>{}}_.useProgram(y);let b=[],x=[],S=(e,t,n)=>e+i*(t+i*n);for(let e=0;e<i;e++)for(let t=0;t<i;t++)for(let n=0;n<i;n++)b.push(n,t,e),n<i-1&&x.push(S(n,t,e),S(n+1,t,e)),t<i-1&&x.push(S(n,t,e),S(n,t+1,e)),e<i-1&&x.push(S(n,t,e),S(n,t,e+1));let C=_.createBuffer();_.bindBuffer(_.ARRAY_BUFFER,C),_.bufferData(_.ARRAY_BUFFER,new Float32Array(b),_.STATIC_DRAW);let w=_.createBuffer();_.bindBuffer(_.ELEMENT_ARRAY_BUFFER,w),_.bufferData(_.ELEMENT_ARRAY_BUFFER,new Uint16Array(x),_.STATIC_DRAW);let T=_.getAttribLocation(y,`aIdx`);_.enableVertexAttribArray(T),_.vertexAttribPointer(T,3,_.FLOAT,!1,0,0);let E={};for(let e of[`uN`,`uTime`,`uNoise`,`uWave`,`uAsm`,`uPoint`,`uIsPt`,`uSpec`,`uDpr`,`uD`,`uW`,`uTint`,`uMVP`,`uAlpha`])E[e]=_.getUniformLocation(y,e);c.push(()=>{_.deleteBuffer(C),_.deleteBuffer(w),_.deleteProgram(y)}),_.uniform1f(E.uN,i);let D=[],O=()=>{D=[...document.querySelectorAll(`[data-s3d]`)].map(e=>{let t=e.getBoundingClientRect();return{y:t.top+scrollY+t.height/2,...l(e.dataset.s3d||``)}}).sort((e,t)=>e.y-t.y)},k=(e,t)=>{if(!D.length)return u;if(e<=D[0].y)return D[0];let n=D[D.length-1];if(e>=n.y)return n;let r=0;for(;r<D.length-2&&e>=D[r+1].y;)r++;let i=D[r],c=D[r+1],l=Math.max(1,Math.min(c.y-i.y,t*1.1)),d=s(a((e-(c.y-l))/l)),f=(e,t)=>e.map((e,n)=>o(e,t[n],d));return{y:e,w:f(i.w,c.w),ry:o(i.ry,c.ry,d),rx:o(i.rx,c.rx,d),d:o(i.d,c.d,d),x:o(i.x,c.x,d),yo:o(i.yo,c.yo,d),a:o(i.a,c.a,d),n:o(i.n,c.n,d),tint:f(i.tint,c.tint),spec:o(i.spec,c.spec,d)}},A=1,j=1,M=1,N=()=>{M=Math.min(devicePixelRatio||1,r?1.5:2),A=Math.max(1,Math.floor(innerWidth*M)),j=Math.max(1,Math.floor(innerHeight*M)),e.width=A,e.height=j};O(),N();let P={...D[0]??u,w:[...(D[0]??u).w],tint:[...(D[0]??u).tint]},F=2.2,I=0,L=0,R=0,z=0,B=0,V=scrollY,H=performance.now(),U=t.classList.contains(`skip-intro`),W=U?1500:3200,G=performance.now()+(U?0:150),K=0,q=e=>{let t=A/j,n=t<1?Math.min(1.5,1/Math.max(t,.5)):1,r=P.x,i=P.yo,o=P.a;t<.9&&(r=0,i-=.38,o*=.8);let s=P.d*n,c=P.ry+F*.07+scrollY*6e-4+L*.35,l=P.rx+R*.2,u=a(.0012+Math.abs(I)*5e-4,0,.032);_.viewport(0,0,A,j),_.colorMask(!0,!0,!0,!0),_.clearColor(0,0,0,0),_.clear(_.COLOR_BUFFER_BIT),_.enable(_.BLEND),_.blendFunc(_.ONE,_.ONE),_.uniform1f(E.uTime,F),_.uniform1f(E.uNoise,P.n),_.uniform1f(E.uWave,Math.sin(F*.55)*1.15-R*.4),_.uniform1f(E.uAsm,e),_.uniform1f(E.uSpec,P.spec),_.uniform1f(E.uDpr,M),_.uniform1f(E.uD,s),_.uniform1f(E.uAlpha,o),_.uniform3f(E.uW,P.w[0],P.w[1],P.w[2]),_.uniform3f(E.uTint,P.tint[0],P.tint[1],P.tint[2]);for(let e=0;e<3;e++){_.colorMask(e===0,e===1,e===2,e===1);let n=(e-1)*u;_.uniformMatrix4fv(E.uMVP,!1,m(p(.66,t,r+n,i+n*.35),l,c,s,1+n*.25)),_.uniform1f(E.uPoint,0),_.uniform1f(E.uIsPt,0),_.drawElements(_.LINES,x.length,_.UNSIGNED_SHORT,0),_.uniform1f(E.uPoint,1),_.uniform1f(E.uIsPt,1),_.drawArrays(_.POINTS,0,b.length/3)}_.colorMask(!0,!0,!0,!0)};if(n){q(1);let e=()=>{O(),N(),q(1)};return addEventListener(`resize`,e),c.push(()=>removeEventListener(`resize`,e)),()=>c.forEach(e=>e())}let J=e=>{if(K=0,h)return;let t=Math.min(.05,(e-H)/1e3||.016);H=e,F+=t;let n=scrollY;I+=(a(n-V,-80,80)-I)*.12,V=n;let r=k(n+innerHeight*.45,innerHeight),i=1-Math.exp(-t*3.2);for(let e=0;e<3;e++)P.w[e]+=(r.w[e]-P.w[e])*i,P.tint[e]+=(r.tint[e]-P.tint[e])*i;P.ry+=(r.ry-P.ry)*i,P.rx+=(r.rx-P.rx)*i,P.d+=(r.d-P.d)*i,P.x+=(r.x-P.x)*i,P.yo+=(r.yo-P.yo)*i,P.a+=(r.a-P.a)*i,P.n+=(r.n-P.n)*i,P.spec+=(r.spec-P.spec)*i;let o=1-Math.exp(-t*3);L+=(z-L)*o,R+=(B-R)*o,q(a((e-G)/W)),K=requestAnimationFrame(J)},Y=()=>{!K&&!document.hidden&&!h&&(H=performance.now(),K=requestAnimationFrame(J))};Y();let X=e=>{z=(e.clientX/innerWidth-.5)*2,B=(e.clientY/innerHeight-.5)*2},Z=()=>{N(),O()},Q=()=>document.hidden?(cancelAnimationFrame(K),K=0):Y();matchMedia(`(hover:hover) and (pointer:fine)`).matches&&addEventListener(`pointermove`,X,{passive:!0}),addEventListener(`resize`,Z),document.addEventListener(`visibilitychange`,Q);let $=setInterval(O,2e3);return Promise.resolve(document.fonts?.ready).then(O),c.push(()=>{cancelAnimationFrame(K),clearInterval($),removeEventListener(`pointermove`,X),removeEventListener(`resize`,Z),document.removeEventListener(`visibilitychange`,Q)}),()=>c.forEach(e=>e())}var g=n();function _(){let e=(0,r.useRef)(null);return(0,r.useEffect)(()=>e.current?h(e.current):void 0,[]),(0,g.jsx)(`canvas`,{ref:e,className:`gl`,"aria-hidden":`true`})}export{_ as default};