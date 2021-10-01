(()=>{"use strict";var t={227:(t,e,n)=>{t.exports=n.p+"flywheel.svg"}},e={};function n(o){var i=e[o];if(void 0!==i)return i.exports;var r=e[o]={exports:{}};return t[o](r,r.exports,n),r.exports}n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),(()=>{var t;n.g.importScripts&&(t=n.g.location+"");var e=n.g.document;if(!t&&e&&(e.currentScript&&(t=e.currentScript.src),!t)){var o=e.getElementsByTagName("script");o.length&&(t=o[o.length-1].src)}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),n.p=t})(),(()=>{function t(){}const e=t=>t;function o(t){return t()}function i(){return Object.create(null)}function r(t){t.forEach(o)}function s(t){return"function"==typeof t}function c(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}let l;function u(t){return 0===Object.keys(t).length}function a(t,e,n,o){if(t){const i=d(t,e,n,o);return t[0](i)}}function d(t,e,n,o){return t[1]&&o?function(t,e){for(const n in e)t[n]=e[n];return t}(n.ctx.slice(),t[1](o(e))):n.ctx}function f(t,e,n,o){if(t[2]&&o){const i=t[2](o(n));if(void 0===e.dirty)return i;if("object"==typeof i){const t=[],n=Math.max(e.dirty.length,i.length);for(let o=0;o<n;o+=1)t[o]=e.dirty[o]|i[o];return t}return e.dirty|i}return e.dirty}function p(t,e,n,o,i,r){if(i){const s=d(e,n,o,r);t.p(s,i)}}function m(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let t=0;t<n;t++)e[t]=-1;return e}return-1}const $="undefined"!=typeof window;let h=$?()=>window.performance.now():()=>Date.now(),g=$?t=>requestAnimationFrame(t):t;const v=new Set;function y(t){v.forEach((e=>{e.c(t)||(v.delete(e),e.f())})),0!==v.size&&g(y)}let b=!1;function x(t,e){t.appendChild(e)}function w(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e.host?e:document}function _(t,e,n){t.insertBefore(e,n||null)}function k(t){t.parentNode.removeChild(t)}function C(t){return document.createElement(t)}function E(t){return document.createTextNode(t)}function F(){return E(" ")}function S(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function R(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function T(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function I(t,e){t.value=null==e?"":e}function A(t,e,n,o){t.style.setProperty(e,n,o?"important":"")}const P=new Set;let q,M=0;function j(t,e,n,o,i,r,s,c=0){const l=16.666/o;let u="{\n";for(let t=0;t<=1;t+=l){const o=e+(n-e)*r(t);u+=100*t+`%{${s(o,1-o)}}\n`}const a=u+`100% {${s(n,1-n)}}\n}`,d=`__svelte_${function(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}(a)}_${c}`,f=w(t);P.add(f);const p=f.__svelte_stylesheet||(f.__svelte_stylesheet=function(t){const e=C("style");return function(t,e){x(t.head||t,e)}(w(t),e),e}(t).sheet),m=f.__svelte_rules||(f.__svelte_rules={});m[d]||(m[d]=!0,p.insertRule(`@keyframes ${d} ${a}`,p.cssRules.length));const $=t.style.animation||"";return t.style.animation=`${$?`${$}, `:""}${d} ${o}ms linear ${i}ms 1 both`,M+=1,d}function N(t){q=t}function O(t,e){const n=t.$$.callbacks[e.type];n&&n.slice().forEach((t=>t.call(this,e)))}const H=[],L=[],B=[],G=[],z=Promise.resolve();let V=!1;function W(t){B.push(t)}function D(t){G.push(t)}let J=!1;const K=new Set;function Q(){if(!J){J=!0;do{for(let t=0;t<H.length;t+=1){const e=H[t];N(e),U(e.$$)}for(N(null),H.length=0;L.length;)L.pop()();for(let t=0;t<B.length;t+=1){const e=B[t];K.has(e)||(K.add(e),e())}B.length=0}while(H.length);for(;G.length;)G.pop()();V=!1,J=!1,K.clear()}}function U(t){if(null!==t.fragment){t.update(),r(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(W)}}let X;function Y(t,e,n){t.dispatchEvent(function(t,e,n=!1){const o=document.createEvent("CustomEvent");return o.initCustomEvent(t,n,!1,e),o}(`${e?"intro":"outro"}${n}`))}const Z=new Set;let tt;function et(){tt={r:0,c:[],p:tt}}function nt(){tt.r||r(tt.c),tt=tt.p}function ot(t,e){t&&t.i&&(Z.delete(t),t.i(e))}function it(t,e,n,o){if(t&&t.o){if(Z.has(t))return;Z.add(t),tt.c.push((()=>{Z.delete(t),o&&(n&&t.d(1),o())})),t.o(e)}}const rt={duration:0};function st(n,o,i,c){let l=o(n,i),u=c?0:1,a=null,d=null,f=null;function p(){f&&function(t,e){const n=(t.style.animation||"").split(", "),o=n.filter(e?t=>t.indexOf(e)<0:t=>-1===t.indexOf("__svelte")),i=n.length-o.length;i&&(t.style.animation=o.join(", "),M-=i,M||g((()=>{M||(P.forEach((t=>{const e=t.__svelte_stylesheet;let n=e.cssRules.length;for(;n--;)e.deleteRule(n);t.__svelte_rules={}})),P.clear())})))}(n,f)}function m(t,e){const n=t.b-u;return e*=Math.abs(n),{a:u,b:t.b,d:n,duration:e,start:t.start,end:t.start+e,group:t.group}}function $(o){const{delay:i=0,duration:s=300,easing:c=e,tick:$=t,css:b}=l||rt,x={start:h()+i,b:o};o||(x.group=tt,tt.r+=1),a||d?d=x:(b&&(p(),f=j(n,u,o,s,i,c,b)),o&&$(0,1),a=m(x,s),W((()=>Y(n,o,"start"))),function(t){let e;0===v.size&&g(y),new Promise((n=>{v.add(e={c:t,f:n})}))}((t=>{if(d&&t>d.start&&(a=m(d,s),d=null,Y(n,a.b,"start"),b&&(p(),f=j(n,u,a.b,a.duration,0,c,l.css))),a)if(t>=a.end)$(u=a.b,1-u),Y(n,a.b,"end"),d||(a.b?p():--a.group.r||r(a.group.c)),a=null;else if(t>=a.start){const e=t-a.start;u=a.a+a.d*c(e/a.duration),$(u,1-u)}return!(!a&&!d)})))}return{run(t){s(l)?(X||(X=Promise.resolve(),X.then((()=>{X=null}))),X).then((()=>{l=l(),$(t)})):$(t)},end(){p(),a=d=null}}}let ct;function lt(t,e,n){const o=t.$$.props[e];void 0!==o&&(t.$$.bound[o]=n,n(t.$$.ctx[o]))}function ut(t){t&&t.c()}function at(t,e,n,i){const{fragment:c,on_mount:l,on_destroy:u,after_update:a}=t.$$;c&&c.m(e,n),i||W((()=>{const e=l.map(o).filter(s);u?u.push(...e):r(e),t.$$.on_mount=[]})),a.forEach(W)}function dt(t,e){const n=t.$$;null!==n.fragment&&(r(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function ft(e,n,o,s,c,l,u,a=[-1]){const d=q;N(e);const f=e.$$={fragment:null,ctx:null,props:l,update:t,not_equal:c,bound:i(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(d?d.$$.context:n.context||[]),callbacks:i(),dirty:a,skip_bound:!1,root:n.target||d.$$.root};u&&u(f.root);let p=!1;if(f.ctx=o?o(e,n.props||{},((t,n,...o)=>{const i=o.length?o[0]:n;return f.ctx&&c(f.ctx[t],f.ctx[t]=i)&&(!f.skip_bound&&f.bound[t]&&f.bound[t](i),p&&function(t,e){-1===t.$$.dirty[0]&&(H.push(t),V||(V=!0,z.then(Q)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}(e,t)),n})):[],f.update(),p=!0,r(f.before_update),f.fragment=!!s&&s(f.ctx),n.target){if(n.hydrate){b=!0;const t=(m=n.target,Array.from(m.childNodes));f.fragment&&f.fragment.l(t),t.forEach(k)}else f.fragment&&f.fragment.c();n.intro&&ot(e.$$.fragment),at(e,n.target,n.anchor,n.customElement),b=!1,Q()}var m;N(d)}"undefined"!=typeof window?window:"undefined"!=typeof globalThis?globalThis:global,new Set(["allowfullscreen","allowpaymentrequest","async","autofocus","autoplay","checked","controls","default","defer","disabled","formnovalidate","hidden","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","selected"]),"function"==typeof HTMLElement&&(ct=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){const{on_mount:t}=this.$$;this.$$.on_disconnect=t.map(o).filter(s);for(const t in this.$$.slotted)this.appendChild(this.$$.slotted[t])}attributeChangedCallback(t,e,n){this[t]=n}disconnectedCallback(){r(this.$$.on_disconnect)}$destroy(){dt(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){this.$$set&&!u(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}});class pt{$destroy(){dt(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){this.$$set&&!u(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const mt=t=>({}),$t=t=>({}),ht=t=>({}),gt=t=>({}),vt=t=>({}),yt=t=>({}),bt=t=>({}),xt=t=>({}),wt=t=>({}),_t=t=>({});function kt(t){let e,n,o,i,r,s,c,l,u,d,$,h;const g=t[1].header,v=a(g,t,t[0],_t),y=v||function(t){let e;return{c(){e=E("Learning physics visually")},m(t,n){_(t,e,n)},d(t){t&&k(e)}}}(),b=t[1].info,w=a(b,t,t[0],xt),S=t[1].view,T=a(S,t,t[0],yt),I=t[1].controls,A=a(I,t,t[0],gt),P=t[1].footer,q=a(P,t,t[0],$t),M=q||function(t){let e,n;return{c(){e=E("source code is avilable at "),n=C("a"),n.textContent="GitHub.com",R(n,"href","https://GitHub.com/vigneshpa/simulations"),R(n,"target","_blank")},m(t,o){_(t,e,o),_(t,n,o)},d(t){t&&k(e),t&&k(n)}}}();return{c(){e=C("header"),y&&y.c(),n=F(),o=C("div"),w&&w.c(),i=F(),r=C("div"),s=C("div"),c=C("div"),T&&T.c(),l=F(),u=C("div"),A&&A.c(),d=F(),$=C("footer"),M&&M.c(),R(e,"class","svelte-g5e0wb"),R(c,"id","view"),R(s,"class","sim svelte-g5e0wb"),R(u,"class","controls svelte-g5e0wb"),R(r,"class","responsiveGrid svelte-g5e0wb"),R(o,"class","content svelte-g5e0wb"),R($,"class","svelte-g5e0wb")},m(t,a){_(t,e,a),y&&y.m(e,null),_(t,n,a),_(t,o,a),w&&w.m(o,null),x(o,i),x(o,r),x(r,s),x(s,c),T&&T.m(c,null),x(r,l),x(r,u),A&&A.m(u,null),_(t,d,a),_(t,$,a),M&&M.m($,null),h=!0},p(t,[e]){v&&v.p&&(!h||1&e)&&p(v,g,t,t[0],h?f(g,t[0],e,wt):m(t[0]),_t),w&&w.p&&(!h||1&e)&&p(w,b,t,t[0],h?f(b,t[0],e,bt):m(t[0]),xt),T&&T.p&&(!h||1&e)&&p(T,S,t,t[0],h?f(S,t[0],e,vt):m(t[0]),yt),A&&A.p&&(!h||1&e)&&p(A,I,t,t[0],h?f(I,t[0],e,ht):m(t[0]),gt),q&&q.p&&(!h||1&e)&&p(q,P,t,t[0],h?f(P,t[0],e,mt):m(t[0]),$t)},i(t){h||(ot(y,t),ot(w,t),ot(T,t),ot(A,t),ot(M,t),h=!0)},o(t){it(y,t),it(w,t),it(T,t),it(A,t),it(M,t),h=!1},d(t){t&&k(e),y&&y.d(t),t&&k(n),t&&k(o),w&&w.d(t),T&&T.d(t),A&&A.d(t),t&&k(d),t&&k($),M&&M.d(t)}}}function Ct(t,e,n){let{$$slots:o={},$$scope:i}=e;return t.$$set=t=>{"$$scope"in t&&n(0,i=t.$$scope)},[i,o]}const Et=class extends pt{constructor(t){super(),ft(this,t,Ct,kt,c,{})}};function Ft(t){const e=t-1;return e*e*e+1}function St(t,{delay:e=0,duration:n=400,easing:o=Ft}={}){const i=getComputedStyle(t),r=+i.opacity,s=parseFloat(i.height),c=parseFloat(i.paddingTop),l=parseFloat(i.paddingBottom),u=parseFloat(i.marginTop),a=parseFloat(i.marginBottom),d=parseFloat(i.borderTopWidth),f=parseFloat(i.borderBottomWidth);return{delay:e,duration:n,easing:o,css:t=>`overflow: hidden;opacity: ${Math.min(20*t,1)*r};height: ${t*s}px;padding-top: ${t*c}px;padding-bottom: ${t*l}px;margin-top: ${t*u}px;margin-bottom: ${t*a}px;border-top-width: ${t*d}px;border-bottom-width: ${t*f}px;`}}function Rt(t){let e,n,o,i,s,c,l,u,a,d,f,p,m,$,h,g=(t[0]*t[9]).toFixed(t[6])+"",v=t[7]?"m":"",y=t[8]?"k":"";return{c(){e=C("div"),n=C("label"),o=E(t[3]),i=E(" : "),s=E(g),c=E(v),l=E(y),u=E(t[4]),a=C("br"),d=F(),f=C("input"),R(n,"for",t[3]),R(f,"id",t[3]),R(f,"type","range"),R(f,"min",t[1]),R(f,"max",t[2]),R(f,"step",t[5]),R(f,"class","svelte-yih982")},m(r,p){_(r,e,p),x(e,n),x(n,o),x(n,i),x(n,s),x(n,c),x(n,l),x(n,u),x(e,a),x(e,d),x(e,f),I(f,t[0]),m=!0,$||(h=[S(f,"change",t[10]),S(f,"input",t[10])],$=!0)},p(t,[e]){(!m||8&e)&&T(o,t[3]),(!m||65&e)&&g!==(g=(t[0]*t[9]).toFixed(t[6])+"")&&T(s,g),(!m||128&e)&&v!==(v=t[7]?"m":"")&&T(c,v),(!m||256&e)&&y!==(y=t[8]?"k":"")&&T(l,y),(!m||16&e)&&T(u,t[4]),(!m||8&e)&&R(n,"for",t[3]),(!m||8&e)&&R(f,"id",t[3]),(!m||2&e)&&R(f,"min",t[1]),(!m||4&e)&&R(f,"max",t[2]),(!m||32&e)&&R(f,"step",t[5]),1&e&&I(f,t[0])},i(t){m||(W((()=>{p||(p=st(e,St,{},!0)),p.run(1)})),m=!0)},o(t){p||(p=st(e,St,{},!1)),p.run(0),m=!1},d(t){t&&k(e),t&&p&&p.end(),$=!1,r(h)}}}function Tt(t,e,n){let{value:o}=e,{min:i=0}=e,{max:r}=e,{name:s}=e,{unit:c}=e,{step:l=.01*r}=e,{precision:u=2}=e,{milli:a=!1}=e,{kilo:d=!1}=e,f=(a?1e3:1)*(d?.001:1);return t.$$set=t=>{"value"in t&&n(0,o=t.value),"min"in t&&n(1,i=t.min),"max"in t&&n(2,r=t.max),"name"in t&&n(3,s=t.name),"unit"in t&&n(4,c=t.unit),"step"in t&&n(5,l=t.step),"precision"in t&&n(6,u=t.precision),"milli"in t&&n(7,a=t.milli),"kilo"in t&&n(8,d=t.kilo)},[o,i,r,s,c,l,u,a,d,f,function(){o=function(t){return""===t?null:+t}(this.value),n(0,o)}]}const It=class extends pt{constructor(t){super(),ft(this,t,Tt,Rt,c,{value:0,min:1,max:2,name:3,unit:4,step:5,precision:6,milli:7,kilo:8})}};function At(e){let n,o,i,r,s,c,l,u,a,d,f,p=e[0].toFixed(e[5])+"";return{c(){n=C("div"),o=C("label"),i=E(e[3]),r=E(" : "),s=E(p),c=E(e[4]),l=C("br"),u=F(),a=C("progress"),R(o,"for",e[3]),R(a,"id",e[3]),R(a,"type","range"),R(a,"max",d=e[2]-e[1]),a.value=f=e[0]-e[1],R(a,"class","svelte-1eoyi7p")},m(t,e){_(t,n,e),x(n,o),x(o,i),x(o,r),x(o,s),x(o,c),x(n,l),x(n,u),x(n,a)},p(t,[e]){8&e&&T(i,t[3]),33&e&&p!==(p=t[0].toFixed(t[5])+"")&&T(s,p),16&e&&T(c,t[4]),8&e&&R(o,"for",t[3]),8&e&&R(a,"id",t[3]),6&e&&d!==(d=t[2]-t[1])&&R(a,"max",d),3&e&&f!==(f=t[0]-t[1])&&(a.value=f)},i:t,o:t,d(t){t&&k(n)}}}function Pt(t,e,n){let{value:o}=e,{min:i=0}=e,{max:r}=e,{name:s}=e,{unit:c}=e,{precision:l=2}=e;return t.$$set=t=>{"value"in t&&n(0,o=t.value),"min"in t&&n(1,i=t.min),"max"in t&&n(2,r=t.max),"name"in t&&n(3,s=t.name),"unit"in t&&n(4,c=t.unit),"precision"in t&&n(5,l=t.precision)},[o,i,r,s,c,l]}const qt=class extends pt{constructor(t){super(),ft(this,t,Pt,At,c,{value:0,min:1,max:2,name:3,unit:4,precision:5})}};function Mt(t){let e,n,o,i,r,s,c,l,u;return{c(){e=C("div"),n=C("div"),o=E(t[0]),i=F(),r=C("button"),r.textContent="Close",R(n,"class","content svelte-np6ysl"),R(r,"class","close svelte-np6ysl"),R(e,"class","holder svelte-np6ysl")},m(s,a){_(s,e,a),x(e,n),x(n,o),x(e,i),x(e,r),c=!0,l||(u=S(r,"click",t[1]),l=!0)},p(t,e){(!c||1&e)&&T(o,t[0])},i(t){c||(W((()=>{s||(s=st(e,St,{},!0)),s.run(1)})),c=!0)},o(t){s||(s=st(e,St,{},!1)),s.run(0),c=!1},d(t){t&&k(e),t&&s&&s.end(),l=!1,u()}}}function jt(t){let e,n,o=t[0]&&Mt(t);return{c(){o&&o.c(),e=E("")},m(t,i){o&&o.m(t,i),_(t,e,i),n=!0},p(t,[n]){t[0]?o?(o.p(t,n),1&n&&ot(o,1)):(o=Mt(t),o.c(),ot(o,1),o.m(e.parentNode,e)):o&&(et(),it(o,1,1,(()=>{o=null})),nt())},i(t){n||(ot(o),n=!0)},o(t){it(o),n=!1},d(t){o&&o.d(t),t&&k(e)}}}function Nt(t,e,n){let{info:o}=e;return t.$$set=t=>{"info"in t&&n(0,o=t.info)},[o,()=>n(0,o="")]}const Ot=class extends pt{constructor(t){super(),ft(this,t,Nt,jt,c,{info:0})}};var Ht=n(227);function Lt(t,e,n){const o=t.slice();return o[34]=e[n].text,o[36]=n,o}function Bt(t){let e,n,o;function i(e){t[20](e)}let r={slot:"info"};return void 0!==t[9]&&(r.info=t[9]),e=new Ot({props:r}),L.push((()=>lt(e,"info",i))),{c(){ut(e.$$.fragment)},m(t,n){at(e,t,n),o=!0},p(t,o){const i={};!n&&512&o[0]&&(n=!0,i.info=t[9],D((()=>n=!1))),e.$set(i)},i(t){o||(ot(e.$$.fragment,t),o=!0)},o(t){it(e.$$.fragment,t),o=!1},d(t){dt(e,t)}}}function Gt(t){let e;return{c(){e=C("span"),e.textContent="Visualising Current as angular velocity",R(e,"slot","header")},m(t,n){_(t,e,n)},d(t){t&&k(e)}}}function zt(t){let e,n;return{c(){var o,i;e=C("img"),R(e,"slot","view"),o=e.src,i=n=Ht,l||(l=document.createElement("a")),l.href=i,o!==l.href&&R(e,"src",n),A(e,"transform","rotate("+t[8]+"turn)"),R(e,"alt",""),R(e,"class","svelte-1xdvqgy")},m(t,n){_(t,e,n)},p(t,n){256&n[0]&&A(e,"transform","rotate("+t[8]+"turn)")},d(t){t&&k(e)}}}function Vt(t){let e,n,o;function i(e){t[14](e)}let r={name:"Frequency",unit:"Hz",min:1,max:Yt};return void 0!==t[0]&&(r.value=t[0]),e=new It({props:r}),L.push((()=>lt(e,"value",i))),{c(){ut(e.$$.fragment)},m(t,n){at(e,t,n),o=!0},p(t,o){const i={};!n&&1&o[0]&&(n=!0,i.value=t[0],D((()=>n=!1))),e.$set(i)},i(t){o||(ot(e.$$.fragment,t),o=!0)},o(t){it(e.$$.fragment,t),o=!1},d(t){dt(e,t)}}}function Wt(t){let e,n,o,i,r,s,c,l,u,a,d=t[34]+"";return{c(){e=C("input"),i=C("label"),r=E(d),c=F(),l=C("br"),R(e,"type","radio"),R(e,"name","circuitType"),R(e,"id",n=t[36]+"ltype"),e.__value=o=t[36],e.value=e.__value,t[16][0].push(e),R(i,"for",s=t[36]+"ltype")},m(n,o){_(n,e,o),e.checked=e.__value===t[1],_(n,i,o),x(i,r),_(n,c,o),_(n,l,o),u||(a=S(e,"change",t[15]),u=!0)},p(t,n){2&n[0]&&(e.checked=e.__value===t[1])},d(n){n&&k(e),t[16][0].splice(t[16][0].indexOf(e),1),n&&k(i),n&&k(c),n&&k(l),u=!1,a()}}}function Dt(t){let e,n,o,i,s,c,l,u,a,d,f,p,m,$,h,g,v,y,b,w,E,T,I,A,P,q,M,j;function N(e){t[12](e)}n=new qt({props:{name:"Current",unit:"A",value:t[7],max:Qt,min:-Qt}});let O={name:"Voltage",unit:"V",min:-Kt,max:Kt};void 0!==t[3]&&(O.value=t[3]),i=new It({props:O}),L.push((()=>lt(i,"value",N)));let H=t[2]&&Vt(t),B=t[10],G=[];for(let e=0;e<B.length;e+=1)G[e]=Wt(Lt(t,B,e));function z(e){t[17](e)}let V={name:"Inductance",unit:"H",min:.01*Xt,max:Xt,milli:!0,precision:1};function W(e){t[18](e)}void 0!==t[5]&&(V.value=t[5]),y=new It({props:V}),L.push((()=>lt(y,"value",z)));let J={name:"Resistance",unit:"Ω",min:.01*Ut,max:Ut,precision:1};function K(e){t[19](e)}void 0!==t[4]&&(J.value=t[4]),E=new It({props:J}),L.push((()=>lt(E,"value",W)));let Q={name:"Speed",unit:"x",max:Zt,precision:4};return void 0!==t[6]&&(Q.value=t[6]),A=new It({props:Q}),L.push((()=>lt(A,"value",K))),{c(){e=C("span"),ut(n.$$.fragment),o=F(),ut(i.$$.fragment),c=F(),l=C("div"),u=C("input"),a=C("label"),a.textContent="Generate Sine Wave",d=F(),H&&H.c(),f=F(),p=C("h4"),p.textContent="Select Circuit Type",m=F(),$=C("div");for(let t=0;t<G.length;t+=1)G[t].c();h=F(),g=C("h3"),g.textContent="Controlables",v=F(),ut(y.$$.fragment),w=F(),ut(E.$$.fragment),I=F(),ut(A.$$.fragment),R(u,"type","checkbox"),R(u,"id","generateSine"),R(a,"for","generateSine"),R(e,"slot","controls")},m(r,s){_(r,e,s),at(n,e,null),x(e,o),at(i,e,null),x(e,c),x(e,l),x(l,u),u.checked=t[2],x(l,a),x(l,d),H&&H.m(l,null),x(e,f),x(e,p),x(e,m),x(e,$);for(let t=0;t<G.length;t+=1)G[t].m($,null);x(e,h),x(e,g),x(e,v),at(y,e,null),x(e,w),at(E,e,null),x(e,I),at(A,e,null),q=!0,M||(j=[S(u,"change",t[13]),S(u,"change",t[11])],M=!0)},p(t,e){const o={};128&e[0]&&(o.value=t[7]),n.$set(o);const r={};if(!s&&8&e[0]&&(s=!0,r.value=t[3],D((()=>s=!1))),i.$set(r),4&e[0]&&(u.checked=t[2]),t[2]?H?(H.p(t,e),4&e[0]&&ot(H,1)):(H=Vt(t),H.c(),ot(H,1),H.m(l,null)):H&&(et(),it(H,1,1,(()=>{H=null})),nt()),1026&e[0]){let n;for(B=t[10],n=0;n<B.length;n+=1){const o=Lt(t,B,n);G[n]?G[n].p(o,e):(G[n]=Wt(o),G[n].c(),G[n].m($,null))}for(;n<G.length;n+=1)G[n].d(1);G.length=B.length}const c={};!b&&32&e[0]&&(b=!0,c.value=t[5],D((()=>b=!1))),y.$set(c);const a={};!T&&16&e[0]&&(T=!0,a.value=t[4],D((()=>T=!1))),E.$set(a);const d={};!P&&64&e[0]&&(P=!0,d.value=t[6],D((()=>P=!1))),A.$set(d)},i(t){q||(ot(n.$$.fragment,t),ot(i.$$.fragment,t),ot(H),ot(y.$$.fragment,t),ot(E.$$.fragment,t),ot(A.$$.fragment,t),q=!0)},o(t){it(n.$$.fragment,t),it(i.$$.fragment,t),it(H),it(y.$$.fragment,t),it(E.$$.fragment,t),it(A.$$.fragment,t),q=!1},d(t){t&&k(e),dt(n),dt(i),H&&H.d(),function(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}(G,t),dt(y),dt(E),dt(A),M=!1,r(j)}}}function Jt(t){let e,n;return e=new Et({props:{$$slots:{controls:[Dt],view:[zt],header:[Gt],info:[Bt]},$$scope:{ctx:t}}}),{c(){ut(e.$$.fragment)},m(t,o){at(e,t,o),n=!0},p(t,n){const o={};1023&n[0]|64&n[1]&&(o.$$scope={dirty:n,ctx:t}),e.$set(o)},i(t){n||(ot(e.$$.fragment,t),n=!0)},o(t){it(e.$$.fragment,t),n=!1},d(t){dt(e,t)}}}const Kt=10,Qt=2,Ut=10,Xt=.05,Yt=100,Zt=.05;function te(t,e,n){let o=0,i=5,r=.02,s=50,c=0,l=0,u=.01;const a=t=>o/i,d=t=>m+t*o/r;var f;!function(t){t[t.Resistive=0]="Resistive",t[t.Inductive=1]="Inductive",t[t.InductiveCorrected=2]="InductiveCorrected",t[t.ResInd=3]="ResInd"}(f||(f={}));const p=[{text:"Pure Resistor",integrator:a},{text:"Pure Inductor",integrator:d},{text:"Pure Inductor (initial current corrected)",integrator:d},{text:"RL Series Circuit",integrator:t=>m+t*(o-m*i)/r}];let m=0,$=0,h=f.Resistive,g=!1,v=null,y=performance.now(),b="",x=a;const w=t=>{v=null,n(7,m=0),n(2,g=!!t),g&&(l=0,h===f.InductiveCorrected&&n(7,m=-Kt/(r*c)))},_=t=>{const e=(t-y)*u/1e3;t-y>500&&n(9,b="It looks like you have left this tab or your browser's preformance is slow and this simulation may be inaccurate!"),v||(v=t),g&&n(3,o=Kt*Math.sin(l+=c*e)),n(7,m=x(e)),n(8,$=($+50*m*e)%1),y=t,window.requestAnimationFrame(_)};return window.requestAnimationFrame(_),t.$$.update=()=>{var e;1&t.$$.dirty[0]&&(c=2*Math.PI*s),4&t.$$.dirty[0]&&w(g),2&t.$$.dirty[0]&&(e=h,g&&w(!0),x=p[e].integrator)},[s,h,g,o,i,r,u,m,$,b,p,function(e){O.call(this,t,e)},function(t){o=t,n(3,o)},function(){g=this.checked,n(2,g)},function(t){s=t,n(0,s)},function(){h=this.__value,n(1,h)},[[]],function(t){r=t,n(5,r)},function(t){i=t,n(4,i)},function(t){u=t,n(6,u)},function(t){b=t,n(9,b)}]}const ee=new class extends pt{constructor(t){super(),ft(this,t,te,Jt,c,{},null,[-1,-1])}}({target:window.document.body});window.app=ee})()})();
//# sourceMappingURL=main.js.map