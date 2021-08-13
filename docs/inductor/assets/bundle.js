(()=>{"use strict";const e=2*Math.PI*.2,t=-10/(10*e),n=e=>o/5,c=e=>s+=e*o/10,r=e=>s+=e*(o-5*s)/10;let a=n,o=0,i=0,d=0,s=0,u="Resistive",l=!1,m=null,p=0;const v=document.getElementById("flywheel"),E=e=>{m=null,s=0,i=0,l=!!e,l&&"InductiveCorrected"===u&&(s=t)},h=e=>{switch(s=0,u=e,l&&E(!0),e){case"Resistive":a=n;break;case"Inductive":a=c;break;case"ResInd":a=r;break;case"InductiveCorrected":a=c;break;default:a=n}},x=t=>{const n=(t-p)/1e3,c=a(n);i=1*c,d+=i*n*360,d>-5e3&&d<5e3&&(d%=360),v.style.transform=`rotate(${d}deg)`,y.innerText=c.toFixed(1),T.value=c+2,m||(m=t),l&&(b.innerText=(C.value=o=10*Math.sin((t-m)*e/1e3)).toFixed(1)),p=t,window.requestAnimationFrame(x)};window.requestAnimationFrame(x);const I=()=>document.createElement("br"),g=document.getElementById("controls"),y=document.createElement("span");y.innerText="0.0",g.append("Current : ",y,"A",I());const T=document.createElement("progress");T.max=4,T.value=2,g.append(T,I());const b=document.createElement("span");b.innerText="0.0";const R=document.createElement("label");R.append("Voltage : ",b,"V"),R.htmlFor="voltage",g.append(R,I());const C=document.createElement("input");C.id="voltage",C.type="range",C.max=10,C.min=-10,C.step="0.1",C.value="0",C.oninput=e=>b.innerText=(o=+C.value).toFixed(1),g.append(C,I());const F=document.createElement("input");F.type="checkbox",F.id="generateSine",F.onchange=e=>E(F.checked);const k=document.createElement("label");k.htmlFor="generateSine",k.innerText="Generate Sine Wave (0.2Hz)",g.append(F,k,I());const w=document.createElement("div"),P=document.createElement("h4");P.innerText="Select Circuit Type:",w.append(P);const f={"Pure Resistor":()=>h("Resistive"),"Pure Inductor":()=>h("Inductive"),"Pure Inductor (initial current corrected)":()=>h("InductiveCorrected"),"RL Series Circuit":()=>h("ResInd")};for(const e in f)if(Object.prototype.hasOwnProperty.call(f,e)){const t=document.createElement("input");t.type="radio",t.name="circuitType","Pure Resistor"===e&&(t.checked=!0),t.id=e,t.onchange=f[e],w.append(t);const n=document.createElement("label");n.innerText=e,n.htmlFor=e,w.append(n,I())}g.append(w);const S=document.createElement("div"),A=document.createElement("h4");A.innerText="Circuit Constants",S.append(A),S.append("Inductance : 10H",I()),S.append("Resistance : 5Ω",I()),g.append(S)})();
//# sourceMappingURL=bundle.js.map