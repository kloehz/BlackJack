const modulo=(()=>{"use strict";let e=[];const t=["C","D","H","S"],n=["A","J","Q","K"];let a=[];const o=document.querySelector("#btnPedir"),r=document.getElementById("btnDetener"),l=document.getElementById("btnNuevo"),s=document.querySelectorAll("small"),d=document.querySelectorAll(".divCartas"),c=(t=2)=>{e=i(),a=[];for(let e=0;e<t;e++)a.push(0);s.forEach(e=>e.innerText=0),d.forEach(e=>e.innerHTML=""),o.disabled=!1,r.disabled=!1},i=()=>{e=[];for(let n=2;n<=10;n++)for(let a of t)e.push(n+a);for(let a of t)for(let t of n)e.push(t+a);return _.shuffle(e)},u=()=>{if(0==e.length)throw"No hay cartas en el deck";return e.pop()},g=(e,t)=>(a[t]=a[t]+(e=>{const t=e.substring(0,e.length-1);return isNaN(t)?"A"===t?11:10:1*t})(e),s[t].innerHTML=a[t],a[t]),h=(e,t)=>{const n=document.createElement("img");n.src=`assets/cartas/${e}.png`,n.classList.add("carta"),d[t].append(n)},m=e=>{let t=0;do{const e=u();t=g(e,a.length-1),h(e,a.length-1)}while(t<e&&e<=21);f()};o.addEventListener("click",()=>{const e=u(),t=g(e,0);h(e,0),t>21?(console.warn("Perdiste wacho"),o.disabled=!0,r.disabled=!0,m(t)):21===t&&(console.warn("Ganaste papax"),o.disabled=!0,r.disabled=!0,m(t))});const f=()=>{const[e,t]=a;setTimeout(()=>{t===e?alert("Nadie gano xD"):e>21?alert("Te ganaron kpo"):t>21?alert("Ganaste amigo =D"):alert("Te ganaron Kpo")},100)};return r.addEventListener("click",()=>{o.disabled=!0,r.disabled=!0,m(a[0])}),l.addEventListener("click",()=>{c()}),{nuevoJuego:c}})();