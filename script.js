const $=id=>document.getElementById(id),sleep=ms=>new Promise(r=>setTimeout(r,ms));
const R=(a,b)=>a+Math.random()*(b-a);

// ---------- trees ----------
const tree=(c1,c2)=>`<svg viewBox="0 0 200 300"><path d="M92 300L96 170Q98 150 100 140Q102 150 104 170L108 300Z" fill="#7a4a35"/><path d="M99 200L70 165M101 185L132 150" stroke="#7a4a35" stroke-width="6" stroke-linecap="round"/><g class="leafs"><circle cx="100" cy="95" r="62" fill="${c1}"/><circle cx="55" cy="130" r="42" fill="${c2}"/><circle cx="148" cy="125" r="45" fill="${c2}"/><circle cx="100" cy="60" r="40" fill="${c1}"/><circle cx="80" cy="100" r="9" fill="#ff9ec7"/><circle cx="125" cy="80" r="8" fill="#ff9ec7"/><circle cx="105" cy="125" r="8" fill="#ffd1e6"/></g></svg>`;
[{l:'-4%',w:230,a:'#4caf60',b:'#3b9a52'},{l:'70%',w:200,a:'#58bb69',b:'#45a65a'},{l:'86%',w:170,a:'#ff9ec7',b:'#f77fb2'},{l:'16%',w:140,a:'#6fcb7c',b:'#52b366'}]
.forEach((t,i)=>{const d=document.createElement('div');d.className='tree';d.style.cssText=`left:${t.l};width:${t.w}px;animation-delay:${-i*1.1}s`;d.innerHTML=tree(t.a,t.b);$('trees').appendChild(d)});

// ---------- flowers ----------
const cols=['#ff7eb3','#ffd166','#fff','#c77dff','#ff9a76','#ff4d8d'];
for(let i=0;i<34;i++){
  const c=cols[i%cols.length],h=R(48,110),f=document.createElement('div');
  f.className='fw';f.style.cssText=`left:${R(0,96)}%;width:${h*.5}px;--t:${R(2.4,4.4)}s;animation-delay:${-R(0,4)}s`;
  f.innerHTML=`<svg viewBox="0 0 50 100"><path d="M25 100Q22 65 25 38" stroke="#3f9c52" stroke-width="3" fill="none"/><path d="M24 80Q8 74 6 62Q20 64 24 80Z" fill="#4fb363"/><g transform="translate(25 30)"><g fill="${c}"><circle cy="-10" r="8"/><circle cy="10" r="8"/><circle cx="-10" r="8"/><circle cx="10" r="8"/><circle cx="-7" cy="-7" r="7"/><circle cx="7" cy="7" r="7"/></g><circle r="5.5" fill="#ffd23f"/></g></svg>`;
  $('flowers').appendChild(f);
}
// ---------- grass ----------
for(let i=0;i<120;i++){const b=document.createElement('div');b.className='bl';b.style.cssText=`left:${i/120*100+R(-.5,.5)}%;width:${R(7,14)}px;height:${R(30,80)}px;--t:${R(1.8,3.6)}s;animation-delay:${-R(0,3)}s`;$('grass').appendChild(b)}
// ---------- butterflies ----------
for(let i=0;i<4;i++){const b=document.createElement('span');b.className='bf';b.textContent=['🦋','🦋','🐝','🦋'][i];b.style.cssText=`left:${R(-5,20)}%;top:${R(30,60)}vh;--t:${R(9,15)}s;animation-delay:${-R(0,8)}s`;$('bfly').appendChild(b)}

// ---------- petals + pollen canvas ----------
const cv=$('fx'),cx=cv.getContext('2d');let W,H,wind=1;
const rs=()=>{W=cv.width=innerWidth;H=cv.height=innerHeight};rs();addEventListener('resize',rs);
const pk=['#ffb3d1','#ff8fb8','#ffd1e6','#fff'];
const mk=()=>({x:R(-50,W),y:R(-H,0),s:R(4,9),vy:R(.5,1.4),vx:R(.3,1),r:R(0,6),vr:R(-.04,.04),c:pk[Math.random()*4|0]});
const ps=[...Array(46)].map(()=>{const p=mk();p.y=R(0,H);return p});
const pol=[...Array(30)].map(()=>({x:R(0,W),y:R(H*.3,H),r:R(1,2.5),p:R(0,6)}));
(function loop(t){
  cx.clearRect(0,0,W,H);
  ps.forEach(p=>{
    p.x+=(p.vx+Math.sin(t/900+p.r))*wind;p.y+=p.vy*(.6+wind*.4);p.r+=p.vr*wind;
    if(p.y>H+20||p.x>W+40){Object.assign(p,mk());p.y=-20;p.x=R(-100,W*.6)}
    cx.save();cx.translate(p.x,p.y);cx.rotate(p.r);cx.fillStyle=p.c;cx.globalAlpha=.9;
    cx.beginPath();cx.ellipse(0,0,p.s,p.s*.55,0,0,7);cx.fill();cx.restore();
  });
  pol.forEach(o=>{o.x+=.3*wind;o.y+=Math.sin(t/700+o.p)*.3;if(o.x>W)o.x=0;cx.globalAlpha=.5+.4*Math.sin(t/500+o.p);cx.fillStyle='#fff6b0';cx.beginPath();cx.arc(o.x,o.y,o.r,0,7);cx.fill()});
  cx.globalAlpha=1;requestAnimationFrame(loop)
})(0);

// ---------- tap bursts ----------
const em=['🌸','💖','✨','🌷','🦋','💕'];
function burst(x,y,n=4){for(let i=0;i<n;i++){const s=document.createElement('span');s.className='pop';s.textContent=em[Math.random()*em.length|0];s.style.cssText=`left:${x}px;top:${y}px;--x:${R(-120,120)}px;--y:${R(-190,-60)}px`;document.body.appendChild(s);setTimeout(()=>s.remove(),1300)}}
addEventListener('pointerdown',e=>burst(e.clientX,e.clientY,3));
const gust=()=>{wind=4;document.body.classList.add('windy');setTimeout(()=>{wind=1.6;document.body.classList.remove('windy')},3500)};

// ---------- story ----------
let taps=0,busy=false;
const MSG="Disha ji 🌸 Avengers ne poore universe bachaye, par mera universe toh bas aap hain. Marvel ki sabse deep love story jaisi... forever U 💖";
async function type(el,t){el.textContent='';for(const ch of t){el.textContent+=ch;await sleep(38)}}

$('intro').addEventListener('pointerdown',async e=>{
  if(busy)return;taps++;burst(e.clientX,e.clientY,8);
  if(taps===1){
    $('d1').classList.add('on');gust();document.body.classList.add('bloomed');
    $('introTxt').innerHTML='Hawa chal padi, phool khil gaye 🌷<br><b>Bas ek baar aur tap kijiye, Disha ji</b>';
  }else if(taps===2){
    busy=true;$('d2').classList.add('on');
    await sleep(450);$('intro').classList.add('gone');gust();
    const g=$('girl');g.className='walk';
    await sleep(3700);
    g.className='here wave';
    $('bubble').classList.add('on');
    await type($('msg'),MSG);
    $('next').classList.remove('hide');
  }
});

// ---------- panels ----------
const P=[
 ['Aap Mere Marvel Hain 🦸‍♂️✨','Multiverse ki har timeline mein, har universe mein, main aapko hi dhundhta, Disha ji. Koi stone nahi chahiye, koi snap nahi. Aap mil gayi, toh mera sab kuch mil gaya. 🌌'],
 ['Aap Meri Geet Hain 🚂','Jab We Met ki Geet jaisi, bindaas, befikr, aur dil se sabse sachchi. Aap meri favourite hain, Disha ji, aur main? Bas aapke saath har safar ka Aditya, kisi station par nahi, zindagi bhar ruka hua. 💞'],
 ['Dear Disha Ji 💌','Aapne mujhe itna special feel karaya, Disha ji, ki main aaj bhi hairaan hoon. Is garden ki tarah, meri zindagi bhi aapse khilti hai. Hawa chalegi, patte hilenge, par main hamesha aapke saath rahunga. Always. 🫶<span class="sign">Forever yours, Daksh 💖</span>']
];
let pi=0;
function show(){
  const [t,b]=P[pi];$('pt').textContent=t;$('pb').innerHTML=b;
  $('pdots').innerHTML=P.map((_,i)=>`<i class="${i<=pi?'on':''}"></i>`).join('');
  $('pn').textContent=pi===P.length-1?'Phir se dekhiye 🔁':'Aage 🌿';
}
$('next').onclick=()=>{
  $('girl').classList.add('mini');$('panel').classList.remove('hide');show();gust();burst(innerWidth/2,innerHeight/2,10)
};
$('pn').onclick=()=>{
  if(pi===P.length-1){location.reload();return}
  pi++;show();burst(innerWidth/2,innerHeight/2,10);
};
