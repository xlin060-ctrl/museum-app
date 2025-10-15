const BASE="https://cws.auckland.ac.nz/museum/api";
const VERSION="1.0.0";
const S=sel=>document.querySelector(sel);
const SS=sel=>document.querySelectorAll(sel);
const state={auth:null,user:null};

const ABOUT_FALLBACK = `The Bob Doran Museum of Computing is dedicated to preserving, showcasing, and celebrating the history of computing in New Zealand. Through our collection of historic computing equipment — both imported and locally manufactured — we educate, inspire, and connect visitors with the rich legacy of innovation that has shaped our digital world.

The Museum's vision is to be New Zealand's leading institution for computing history, fostering a deeper appreciation of the country's contributions to technology while inspiring future generations to explore, innovate, and shape the future of computing.`;

/* ===== VISITS 测试数据（如要改回 API，请设为 null 或 []） ===== */
const OVERRIDE_VISITS = [
  {"date":"16/06/2025","visits":240,"firstTimeVisits":220},{"date":"17/06/2025","visits":248,"firstTimeVisits":203},{"date":"18/06/2025","visits":147,"firstTimeVisits":120},{"date":"19/06/2025","visits":273,"firstTimeVisits":210},{"date":"20/06/2025","visits":285,"firstTimeVisits":199},{"date":"21/06/2025","visits":162,"firstTimeVisits":126},{"date":"22/06/2025","visits":223,"firstTimeVisits":173},{"date":"23/06/2025","visits":286,"firstTimeVisits":174},{"date":"24/06/2025","visits":265,"firstTimeVisits":262},{"date":"25/06/2025","visits":231,"firstTimeVisits":166},{"date":"26/06/2025","visits":257,"firstTimeVisits":239},{"date":"27/06/2025","visits":288,"firstTimeVisits":175},{"date":"28/06/2025","visits":235,"firstTimeVisits":190},{"date":"29/06/2025","visits":278,"firstTimeVisits":241},{"date":"30/06/2025","visits":208,"firstTimeVisits":131},{"date":"01/07/2025","visits":143,"firstTimeVisits":111},{"date":"02/07/2025","visits":163,"firstTimeVisits":161},{"date":"03/07/2025","visits":225,"firstTimeVisits":202},{"date":"04/07/2025","visits":115,"firstTimeVisits":86},{"date":"05/07/2025","visits":171,"firstTimeVisits":167},{"date":"06/07/2025","visits":200,"firstTimeVisits":176},{"date":"07/07/2025","visits":131,"firstTimeVisits":91},{"date":"08/07/2025","visits":273,"firstTimeVisits":248},{"date":"09/07/2025","visits":170,"firstTimeVisits":132},{"date":"10/07/2025","visits":136,"firstTimeVisits":92},{"date":"11/07/2025","visits":183,"firstTimeVisits":161},{"date":"12/07/2025","visits":221,"firstTimeVisits":174},{"date":"13/07/2025","visits":145,"firstTimeVisits":137},{"date":"14/07/2025","visits":258,"firstTimeVisits":229},{"date":"15/07/2025","visits":264,"firstTimeVisits":229},{"date":"16/07/2025","visits":222,"firstTimeVisits":150},{"date":"17/07/2025","visits":271,"firstTimeVisits":257},{"date":"18/07/2025","visits":125,"firstTimeVisits":116},{"date":"19/07/2025","visits":140,"firstTimeVisits":119},{"date":"20/07/2025","visits":258,"firstTimeVisits":175},{"date":"21/07/2025","visits":289,"firstTimeVisits":228},{"date":"22/07/2025","visits":227,"firstTimeVisits":199},{"date":"23/07/2025","visits":255,"firstTimeVisits":163},{"date":"24/07/2025","visits":241,"firstTimeVisits":212},{"date":"25/07/2025","visits":132,"firstTimeVisits":126},{"date":"26/07/2025","visits":144,"firstTimeVisits":113},{"date":"27/07/2025","visits":207,"firstTimeVisits":151},{"date":"28/07/2025","visits":230,"firstTimeVisits":179},{"date":"29/07/2025","visits":260,"firstTimeVisits":239},{"date":"30/07/2025","visits":252,"firstTimeVisits":226},{"date":"31/07/2025","visits":278,"firstTimeVisits":197},{"date":"01/08/2025","visits":204,"firstTimeVisits":175},{"date":"02/08/2025","visits":169,"firstTimeVisits":119},{"date":"03/08/2025","visits":257,"firstTimeVisits":174},{"date":"04/08/2025","visits":143,"firstTimeVisits":88},{"date":"05/08/2025","visits":222,"firstTimeVisits":193},{"date":"06/08/2025","visits":223,"firstTimeVisits":216},{"date":"07/08/2025","visits":149,"firstTimeVisits":144},{"date":"08/08/2025","visits":121,"firstTimeVisits":116},{"date":"09/08/2025","visits":232,"firstTimeVisits":146},{"date":"10/08/2025","visits":136,"firstTimeVisits":87},{"date":"11/08/2025","visits":219,"firstTimeVisits":214},{"date":"12/08/2025","visits":198,"firstTimeVisits":128},{"date":"13/08/2025","visits":231,"firstTimeVisits":189},{"date":"14/08/2025","visits":150,"firstTimeVisits":126},{"date":"15/08/2025","visits":110,"firstTimeVisits":81},{"date":"16/08/2025","visits":263,"firstTimeVisits":163},{"date":"17/08/2025","visits":160,"firstTimeVisits":140},{"date":"18/08/2025","visits":282,"firstTimeVisits":279},{"date":"19/08/2025","visits":179,"firstTimeVisits":143},{"date":"20/08/2025","visits":160,"firstTimeVisits":128},{"date":"21/08/2025","visits":205,"firstTimeVisits":127},{"date":"22/08/2025","visits":160,"firstTimeVisits":126},{"date":"23/08/2025","visits":262,"firstTimeVisits":220},{"date":"24/08/2025","visits":128,"firstTimeVisits":113},{"date":"25/08/2025","visits":182,"firstTimeVisits":176},{"date":"26/08/2025","visits":133,"firstTimeVisits":115},{"date":"27/08/2025","visits":220,"firstTimeVisits":204},{"date":"28/08/2025","visits":233,"firstTimeVisits":191},{"date":"29/08/2025","visits":141,"firstTimeVisits":94},{"date":"30/08/2025","visits":219,"firstTimeVisits":153},{"date":"31/08/2025","visits":289,"firstTimeVisits":236},{"date":"01/09/2025","visits":121,"firstTimeVisits":84},{"date":"02/09/2025","visits":261,"firstTimeVisits":214},{"date":"03/09/2025","visits":226,"firstTimeVisits":180},{"date":"04/09/2025","visits":284,"firstTimeVisits":178},{"date":"05/09/2025","visits":202,"firstTimeVisits":133},{"date":"06/09/2025","visits":256,"firstTimeVisits":217},{"date":"07/09/2025","visits":213,"firstTimeVisits":174},{"date":"08/09/2025","visits":231,"firstTimeVisits":228},{"date":"09/09/2025","visits":164,"firstTimeVisits":101},{"date":"10/09/2025","visits":193,"firstTimeVisits":152},{"date":"11/09/2025","visits":148,"firstTimeVisits":91},{"date":"12/09/2025","visits":151,"firstTimeVisits":99},{"date":"13/09/2025","visits":190,"firstTimeVisits":148},{"date":"14/09/2025","visits":113,"firstTimeVisits":84},{"date":"15/09/2025","visits":256,"firstTimeVisits":174},{"date":"16/09/2025","visits":274,"firstTimeVisits":167},{"date":"17/09/2025","visits":201,"firstTimeVisits":196},{"date":"18/09/2025","visits":288,"firstTimeVisits":172},{"date":"19/09/2025","visits":227,"firstTimeVisits":161},{"date":"20/09/2025","visits":284,"firstTimeVisits":235},{"date":"21/09/2025","visits":248,"firstTimeVisits":178},{"date":"22/09/2025","visits":185,"firstTimeVisits":181},{"date":"23/09/2025","visits":269,"firstTimeVisits":263},{"date":"24/09/2025","visits":155,"firstTimeVisits":100},{"date":"25/09/2025","visits":271,"firstTimeVisits":181},{"date":"26/09/2025","visits":268,"firstTimeVisits":217},{"date":"27/09/2025","visits":251,"firstTimeVisits":200},{"date":"28/09/2025","visits":173,"firstTimeVisits":171},{"date":"29/09/2025","visits":116,"firstTimeVisits":100},{"date":"30/09/2025","visits":131,"firstTimeVisits":87},{"date":"01/10/2025","visits":199,"firstTimeVisits":165},{"date":"02/10/2025","visits":157,"firstTimeVisits":113},{"date":"03/10/2025","visits":153,"firstTimeVisits":139},{"date":"04/10/2025","visits":133,"firstTimeVisits":111},{"date":"05/10/2025","visits":210,"firstTimeVisits":180},{"date":"06/10/2025","visits":171,"firstTimeVisits":102},{"date":"07/10/2025","visits":127,"firstTimeVisits":120},{"date":"08/10/2025","visits":237,"firstTimeVisits":225},{"date":"09/10/2025","visits":227,"firstTimeVisits":158},{"date":"10/10/2025","visits":157,"firstTimeVisits":122},{"date":"11/10/2025","visits":145,"firstTimeVisits":137},{"date":"12/10/2025","visits":198,"firstTimeVisits":168},{"date":"13/10/2025","visits":167,"firstTimeVisits":123},{"date":"14/10/2025","visits":154,"firstTimeVisits":152},{"date":"15/10/2025","visits":219,"firstTimeVisits":131},{"date":"16/10/2025","visits":287,"firstTimeVisits":281}
];

/* ===== 导航 ===== */
function showSection(id){
  SS(".section").forEach(s=>s.classList.remove("active"));
  S("#"+id).classList.add("active");
  SS("nav a").forEach(a=>a.classList.toggle("active", a.dataset.section===id));
  history.replaceState(null,"","#"+id);
}
function setupNav(){
  SS("nav a").forEach(a=>{
    a.addEventListener("click",e=>{
      e.preventDefault();
      showSection(a.dataset.section);
    });
  });
  const hash=location.hash.replace("#","");
  showSection(["about","artefacts","register","guestbook","events","visits"].includes(hash)?hash:"about");
}

/* ===== Fetch helper ===== */
async function getJSON(url,opt={}){
  const r=await fetch(url,opt);
  if(!r.ok) throw new Error(await r.text().catch(()=>r.statusText));
  const ct=r.headers.get("content-type")||"";
  if(ct.includes("application/json")) return r.json();
  return r.text();
}

/* ===== Footer version ===== */
function setVersion(){ S("#app-version").textContent=VERSION; }

/* ===== About ===== */
async function loadAbout(){
  const box = S("#about-content");
  try{
    const data = await getJSON(`${BASE}/Intro`);
    const html = (typeof data==="string" && data.trim())
      ? data
      : (data && (data.text||data.content||data.intro))
        ? (data.text||data.content||data.intro)
        : ABOUT_FALLBACK;
    box.innerHTML = html;
  }catch(e){
    box.textContent = "";
    box.innerHTML = ABOUT_FALLBACK.replace(/\n/g,"<br>");
  }
}

/* ===== Artefacts ===== */
function artefactImageSources(a){
  const id=a.id??a.ID??a.ArtifactId??a.ArtifactID;
  const img=a.image||a.imageName||a.file||a.File||a.Image||a.ImageName;
  const c=[];
  if(id!=null) c.push(`${BASE}/Image/${id}`,`${BASE}/Image?id=${encodeURIComponent(id)}`);
  if(img) c.push(`${BASE}/Image/${encodeURIComponent(img)}`,`${BASE}/Image?file=${encodeURIComponent(img)}`,`${BASE}/Image?name=${encodeURIComponent(img)}`);
  return c.length?c:[];
}
async function loadArtefacts(term=""){
  const grid=S("#artefacts-grid");
  grid.innerHTML="";
  try{
    const url=new URL(`${BASE}/Artefacts`);
    if(term) url.searchParams.set("search",term);
    const list=await getJSON(url);
    const arr=Array.isArray(list)?list:(list?.items||list?.results||[]);
    if(!arr.length){grid.innerHTML="<p>No artefacts.</p>";return;}
    for(const a of arr){
      const card=document.createElement("article");
      card.className="card";
      const media=document.createElement("div");
      media.className="media";
      const img=document.createElement("img");
      img.loading="lazy";
      img.alt=(a.title||a.name||"Artefact");
      const sources=artefactImageSources(a);
      if(sources.length){
        let i=0;
        const tryNext=()=>{ if(i>=sources.length){img.remove();media.textContent="No image";return;}
          const src=sources[i++]; const test=new Image();
          test.onload=()=>{img.src=src;};
          test.onerror=tryNext;
          test.src=src;
        };
        tryNext();
      }else media.textContent="No image";
      if(img) media.appendChild(img);
      const body=document.createElement("div");
      body.className="body";
      const h=document.createElement("h3");
      h.textContent=a.title||a.name||`Artefact`;
      const p=document.createElement("p");
      p.textContent=a.description||a.desc||a.summary||"";
      body.append(h,p);
      card.append(media,body);
      grid.append(card);
    }
  }catch(e){
    grid.innerHTML="<p>Failed to load artefacts.</p>";
  }
}
function setupArtefactSearch(){
  const input=S("#artefact-search");
  let t;
  input.addEventListener("input",()=>{
    clearTimeout(t);
    t=setTimeout(()=>loadArtefacts(input.value.trim()),200);
  });
}

/* ===== Register ===== */
async function registerUser(){
  const u=S("#reg-username").value.trim();
  const p=S("#reg-password").value;
  const out=S("#reg-result");
  out.textContent="";
  if(!u||!p){out.textContent="Username and password required.";return;}
  try{
    const r=await fetch(`${BASE}/Register`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:u,password:p})});
    const txt=await r.text();
    if(!r.ok) throw new Error(txt||"Register failed");
    out.textContent=txt||"Registered.";
  }catch(e){
    out.textContent=String(e.message||e);
  }
}
function setupRegister(){ S("#reg-button").addEventListener("click",registerUser); }

/* ===== Auth / Login dialog + 用户徽标 ===== */
function saveAuth(u,p){
  const token=btoa(`${u}:${p}`);
  state.auth=`Basic ${token}`;
  state.user=u;
  sessionStorage.setItem("museum_auth",state.auth);
  sessionStorage.setItem("museum_user",state.user);
  renderUserBadge();
}
function loadAuth(){
  const a=sessionStorage.getItem("museum_auth");
  const u=sessionStorage.getItem("museum_user");
  if(a&&u){state.auth=a;state.user=u;}
  renderUserBadge();
}
function renderUserBadge(){
  const header = document.querySelector("header");
  let badge = document.getElementById("user-badge");
  if(!badge){
    badge = document.createElement("div");
    badge.id = "user-badge";
    badge.style.cssText = "position:absolute;right:16px;top:12px;display:flex;gap:8px;align-items:center;font-size:14px;color:#5b6472";
    header.style.position = "relative";
    header.appendChild(badge);
  }
  if(state.user){
    badge.innerHTML = `Signed in as <strong style="color:#101828">${state.user}</strong>
      <button id="logout-btn" type="button" style="margin-left:6px;padding:4px 8px;border:1px solid #d6dae3;border-radius:8px;background:#fff;cursor:pointer">Logout</button>`;
    document.getElementById("logout-btn").onclick = logout;
  }else{
    badge.textContent = "Guest (not signed in)";
  }
}
function logout(){
  sessionStorage.removeItem("museum_auth");
  sessionStorage.removeItem("museum_user");
  state.auth=null; state.user=null;
  renderUserBadge();
  alert("Logged out");
}

function openLogin(){
  const d=S("#login-dialog");
  if(typeof d.showModal==="function") d.showModal(); else d.setAttribute("open","");
}
function closeLogin(){
  const d=S("#login-dialog");
  if(d.open) d.close(); else d.removeAttribute("open");
}
async function doLogin(){
  const u=S("#login-username").value.trim();
  const p=S("#login-password").value;
  const out=S("#login-result");
  out.textContent="";
  if(!u||!p){out.textContent="Username and password required.";return;}
  try{
    const res=await fetch(`${BASE}/Login`,{
      method:"GET",
      headers:{ Authorization:`Basic ${btoa(`${u}:${p}`)}` }
    });
    const msg = await res.text().catch(()=> "");
    if(!res.ok){
      out.textContent = msg || `Login failed (HTTP ${res.status}).`;
      return;
    }
    saveAuth(u,p);
    out.textContent="Logged in.";
    setTimeout(closeLogin,300);
  }catch(e){
    out.textContent=`Login error. ${e?.message||e}`;
  }
}
function setupLoginModal(){
  S("#login-confirm").addEventListener("click",doLogin);
  S("#login-cancel").addEventListener("click",closeLogin);
}

/* ===== Guestbook ===== */
async function postComment(){
  const txt=S("#gb-text").value.trim();
  const out=S("#gb-result");
  out.textContent="";
  if(!txt){out.textContent="Write something first.";return;}
  if(txt.length < 3){out.textContent="Comment is too short.";return;}

  if(!state.auth){
    openLogin();
    out.textContent="Please login first.";
    return;
  }
  try{
    const r=await fetch(`${BASE}/Comment`,{
      method:"POST",
      headers:{
        Authorization: state.auth,
        "Content-Type":"text/plain;charset=utf-8"
      },
      body:txt
    });
    const t=await r.text().catch(()=> "");
    if(!r.ok){
      if(r.status===401){
        out.textContent="Unauthorized. Please log in again.";
        openLogin();
      }else if(r.status===415){
        out.textContent="Unsupported Media Type. Server expects text/plain.";
      }else if(r.status===400){
        out.textContent=t || "Bad request. Please check your comment.";
      }else{
        out.textContent=t || `Failed to post (HTTP ${r.status}).`;
      }
      return;
    }
    out.textContent=t||"Posted.";
    S("#gb-text").value="";
    S("#gb-iframe").src=`${BASE}/Comments?ts=${Date.now()}`;
  }catch(e){
    out.textContent=`Failed to post. ${e?.message||e}`;
  }
}
function setupGuestbook(){ S("#gb-post").addEventListener("click",postComment); }

/* ===== Events ===== */
function fmtTime(s){
  const d=new Date(s);
  if(isNaN(d)) return s;
  const z=n=>String(n).padStart(2,"0");
  const Y=d.getFullYear(),M=z(d.getMonth()+1),D=z(d.getDate()),h=z(d.getHours()),m=z(d.getMinutes());
  return `${Y}-${M}-${D} ${h}:${m}`;
}
async function loadEvents(){
  const grid=S("#events-grid");
  grid.innerHTML="";
  try{
    const count=await getJSON(`${BASE}/EventCount`);
    const n=Number(count?.count??count);
    if(!Number.isFinite(n)||n<=0){grid.innerHTML="<p>No events.</p>";return;}
    const cards=[];
    for(let i=0;i<n;i++){
      try{
        const e=await getJSON(`${BASE}/Event/${i}`);
        const card=document.createElement("article");
        card.className="card";
        const body=document.createElement("div"); body.className="body";
        const h=document.createElement("h3"); h.textContent=e.title||e.summary||`Event #${i+1}`;
        const p=document.createElement("p"); p.textContent=e.description||e.desc||"";
        const where=document.createElement("p"); where.className="when"; where.textContent=`${e.location||"Location TBA"}`;
        const when=document.createElement("p"); when.className="when";
        const start=e.start||e.startTime||e.Start||e.Begin;
        const end=e.end||e.endTime||e.End||e.Finish;
        when.textContent=`Starts: ${fmtTime(start)} | Ends: ${fmtTime(end)}`;
        const row=document.createElement("div"); row.className="row";
        const link=document.createElement("a");
        link.href=`${BASE}/Event/${i}`;
        link.target="_blank"; link.rel="noopener";
        link.textContent="Add to calendar";
        row.append(link);
        body.append(h,p,where,when,row);
        card.append(body);
        cards.push(card);
      }catch{}
    }
    if(!cards.length){grid.innerHTML="<p>No events.</p>";return;}
    cards.forEach(c=>grid.append(c));
  }catch(e){
    grid.innerHTML="<p>Failed to load events.</p>";
  }
}

/* ===== Visits（SVG 折线图 + 轴最小/最大 + 图例 + 原始数据） ===== */
function pickKeyLike(obj,alts){
  for(const k of Object.keys(obj)){ const l=k.toLowerCase();
    if(alts.some(a=>l.includes(a))) return k;
  }
  return null;
}
function scale(v,a,b,A,B){ if(a===b) return (A+B)/2; return A+(v-a)*(B-A)/(b-a); }
function pathFromPoints(pts){ return pts.map((p,i)=> (i?"L":"M")+p[0].toFixed(2)+" "+p[1].toFixed(2)).join(" "); }
function parseDMY(s){
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(String(s).trim());
  if(m) return new Date(`${m[3]}-${m[2]}-${m[1]}T00:00:00`);
  return new Date(s);
}
async function fetchVisitsData(){
  if(Array.isArray(OVERRIDE_VISITS) && OVERRIDE_VISITS.length) return OVERRIDE_VISITS;
  return await getJSON(`${BASE}/Log`);
}
async function loadVisits(){
  const svg=S("#visits-svg"); while(svg.firstChild) svg.removeChild(svg.firstChild);
  const wrap=S("#visits-table-wrap"); wrap.innerHTML="";
  try{
    const data=await fetchVisitsData();
    const rows=Array.isArray(data)?data:(data?.items||data?.results||[]);
    if(!rows.length){svg.insertAdjacentHTML("beforeend",`<text x="20" y="40" fill="currentColor">No data</text>`);return;}
    const dk=pickKeyLike(rows[0],["date","day"]);
    const tk=pickKeyLike(rows[0],["total","visits","count"]);
    const fk=pickKeyLike(rows[0],["first","new"]);
    const parsed=rows.map(r=>{
      const d=parseDMY(r[dk]); 
      return {d,isNaN:isNaN(d), t:Number(r[tk]), f:Number(r[fk]) , raw:r};
    }).filter(x=>!x.isNaN && Number.isFinite(x.t) && Number.isFinite(x.f));
    parsed.sort((a,b)=>a.d-b.d);

    const dates=parsed.map(x=>x.d);
    const totals=parsed.map(x=>x.t);
    const firsts=parsed.map(x=>x.f);
    const minY=Math.min(...totals.concat(firsts));
    const maxY=Math.max(...totals.concat(firsts));

    const W=960,H=480, L=60,R=20,T=24,B=56;
    const x0=L,y0=H-B,x1=W-R,y1=T;

    const axis=document.createElementNS("http://www.w3.org/2000/svg","g");
    const mkLine=(x1_,y1_,x2_,y2_)=>{const l=document.createElementNS("http://www.w3.org/2000/svg","line"); l.setAttribute("x1",x1_);l.setAttribute("y1",y1_);l.setAttribute("x2",x2_);l.setAttribute("y2",y2_);l.setAttribute("stroke","var(--line)");l.setAttribute("stroke-width","1"); return l;};
    axis.append(mkLine(x0,y0,x1,y0),mkLine(x0,y0,x0,y1),mkLine(x1,y0,x1,y1),mkLine(x0,y1,x1,y1));
    svg.append(axis);

    const mkText=(x,y,text,anchor="middle")=>{const t=document.createElementNS("http://www.w3.org/2000/svg","text"); t.setAttribute("x",x);t.setAttribute("y",y);t.setAttribute("fill","currentColor");t.setAttribute("font-size","12");t.setAttribute("text-anchor",anchor); t.textContent=text; return t;};
    svg.append(mkText(x0,y1-6,`${maxY}`,"start"),mkText(x0,y0+14,`${minY}`,"start"));
    const fmt = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
    svg.append(mkText(x0, H-8, fmt(dates[0]),"start"), mkText(x1, H-8, fmt(dates[dates.length-1]),"end"));

    const toPts=(arr)=>arr.map((v,i)=>[ scale(i,0,parsed.length-1,x0,x1), scale(v,minY,maxY,y0,y1) ]);
    const Ptot=toPts(totals), Pfirst=toPts(firsts);
    const cssVar = name => getComputedStyle(document.documentElement).getPropertyValue(name).trim()||name;
    const mkPath=(d,cls,colorVar)=>{const p=document.createElementNS("http://www.w3.org/2000/svg","path"); p.setAttribute("d",d); p.setAttribute("fill","none"); p.setAttribute("stroke-width","2"); p.classList.add(cls); p.setAttribute("stroke",cssVar(colorVar)); return p;};
    svg.append(mkPath(pathFromPoints(Ptot),"total","--total"), mkPath(pathFromPoints(Pfirst),"first","--first"));

    const mkDot=(x,y,colorVar)=>{const c=document.createElementNS("http://www.w3.org/2000/svg","circle"); c.setAttribute("cx",x);c.setAttribute("cy",y);c.setAttribute("r","2.5"); c.setAttribute("fill",cssVar(colorVar)); return c;};
    for(const p of Ptot) svg.append(mkDot(p[0],p[1],"--total"));
    for(const p of Pfirst) svg.append(mkDot(p[0],p[1],"--first"));

    // 原始数据表
    const tbl=document.createElement("table");
    const thead=document.createElement("thead"); const trh=document.createElement("tr");
    ["Date","Total","First-time"].forEach(h=>{const th=document.createElement("th"); th.textContent=h; trh.append(th);});
    thead.append(trh);
    const tbody=document.createElement("tbody");
    parsed.forEach(row=>{
      const tr=document.createElement("tr");
      const td1=document.createElement("td"); td1.textContent=fmt(row.d);
      const td2=document.createElement("td"); td2.textContent=String(row.t);
      const td3=document.createElement("td"); td3.textContent=String(row.f);
      tr.append(td1,td2,td3); tbody.append(tr);
    });
    tbl.append(thead,tbody); wrap.append(tbl);
  }catch(e){
    svg.insertAdjacentHTML("beforeend",`<text x="20" y="40" fill="currentColor">Failed to load visits</text>`);
  }
}

/* ===== Init ===== */
function init(){
  setVersion();
  setupNav();
  setupArtefactSearch();
  setupRegister();
  setupGuestbook();
  setupLoginModal();
  loadAuth();
  loadAbout();
  loadArtefacts("");
  loadEvents();
  loadVisits();
}
window.addEventListener("DOMContentLoaded",init);
