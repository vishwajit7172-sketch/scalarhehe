import { useState, useEffect, useRef } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────
const TABS = [
  { id:"assignment", label:"Assignment",   num:"01", icon:"✦" },
  { id:"solver",     label:"Solver",       num:"02", icon:"◎" },
  { id:"summarizer", label:"Notes",        num:"03", icon:"▣" },
  { id:"exam",       label:"Exam Prep",    num:"04", icon:"◈" },
  { id:"topper",     label:"Topper Notes", num:"05", icon:"▤" },
  { id:"youtube",    label:"Free Classes", num:"06", icon:"▷" },
];

const TOPPER_NOTES = {
  Physics:{
    JEE:[
      {chapter:"Kinematics",           source:"SelfStudys",    url:"https://www.selfstudys.com/books/jee-topper-notes/english/physics"},
      {chapter:"Laws of Motion",       source:"SelfStudys",    url:"https://www.selfstudys.com/books/jee-topper-notes/english/physics"},
      {chapter:"Work, Energy & Power", source:"JEEBooks",      url:"https://www.jeebooks.in/2020/09/handwritten-toppers-notes-for-jee-and-neet.html"},
      {chapter:"Rotational Motion",    source:"SelfStudys",    url:"https://www.selfstudys.com/books/jee-topper-notes/english/physics"},
      {chapter:"Gravitation",          source:"AajKaTopper",   url:"https://aajkatopper.com/handwritten-notes-neet-jee-physics-chemistry-biology-math/"},
      {chapter:"Thermodynamics",       source:"JEEBooks",      url:"https://www.jeebooks.in/2020/09/handwritten-toppers-notes-for-jee-and-neet.html"},
      {chapter:"Waves & Oscillations", source:"AajKaTopper",   url:"https://aajkatopper.com/handwritten-notes-neet-jee-physics-chemistry-biology-math/"},
      {chapter:"Electrostatics",       source:"SelfStudys",    url:"https://www.selfstudys.com/books/jee-topper-notes/english/physics"},
      {chapter:"Current Electricity",  source:"JEEBooks",      url:"https://www.jeebooks.in/2020/09/handwritten-toppers-notes-for-jee-and-neet.html"},
      {chapter:"Magnetism",            source:"AajKaTopper",   url:"https://aajkatopper.com/handwritten-notes-neet-jee-physics-chemistry-biology-math/"},
      {chapter:"Modern Physics",       source:"SelfStudys",    url:"https://www.selfstudys.com/books/jee-topper-notes/english/physics"},
      {chapter:"Optics",               source:"JEEBooks",      url:"https://www.jeebooks.in/2020/09/handwritten-toppers-notes-for-jee-and-neet.html"},
    ],
    NEET:[
      {chapter:"Laws of Motion",      source:"SelfStudys",url:"https://www.selfstudys.com/books/neet-topper-notes"},
      {chapter:"Thermodynamics",      source:"SelfStudys",url:"https://www.selfstudys.com/books/neet-topper-notes"},
      {chapter:"Electrostatics",      source:"AajKaTopper",url:"https://aajkatopper.com/handwritten-notes-neet-jee-physics-chemistry-biology-math/"},
      {chapter:"Current Electricity", source:"PW Notes",url:"https://www.physicswallahnotes.net/"},
      {chapter:"Modern Physics",      source:"SelfStudys",url:"https://www.selfstudys.com/books/neet-topper-notes"},
      {chapter:"Optics",              source:"AajKaTopper",url:"https://aajkatopper.com/handwritten-notes-neet-jee-physics-chemistry-biology-math/"},
    ],
  },
  Chemistry:{
    JEE:[
      {chapter:"Mole Concept",            source:"SelfStudys",url:"https://www.selfstudys.com/books/jee-topper-notes/english/chemistry"},
      {chapter:"Chemical Bonding",        source:"Scribd",url:"https://www.scribd.com/document/744949113/Chemical-Bonding-Topper-s-Handwritten-Short-Notes-For-Jee-Neet"},
      {chapter:"Periodic Table",          source:"Scribd",url:"https://www.scribd.com/document/744949113/Chemical-Bonding-Topper-s-Handwritten-Short-Notes-For-Jee-Neet"},
      {chapter:"Thermodynamics",          source:"Scribd",url:"https://www.scribd.com/document/744949113/Chemical-Bonding-Topper-s-Handwritten-Short-Notes-For-Jee-Neet"},
      {chapter:"Ionic Equilibrium",       source:"Scribd",url:"https://www.scribd.com/document/744949113/Chemical-Bonding-Topper-s-Handwritten-Short-Notes-For-Jee-Neet"},
      {chapter:"GOC (Organic)",           source:"Scribd",url:"https://www.scribd.com/document/744949113/Chemical-Bonding-Topper-s-Handwritten-Short-Notes-For-Jee-Neet"},
      {chapter:"Coordination Compounds",  source:"Scribd",url:"https://www.scribd.com/document/744949113/Chemical-Bonding-Topper-s-Handwritten-Short-Notes-For-Jee-Neet"},
      {chapter:"Electrochemistry",        source:"JEEBooks",url:"https://www.jeebooks.in/2020/09/handwritten-toppers-notes-for-jee-and-neet.html"},
      {chapter:"p-Block Elements",        source:"Scribd",url:"https://www.scribd.com/document/744949113/Chemical-Bonding-Topper-s-Handwritten-Short-Notes-For-Jee-Neet"},
    ],
    NEET:[
      {chapter:"Mole Concept",    source:"SelfStudys",url:"https://www.selfstudys.com/books/neet-topper-notes"},
      {chapter:"Chemical Bonding",source:"Scribd",url:"https://www.scribd.com/document/744949113/Chemical-Bonding-Topper-s-Handwritten-Short-Notes-For-Jee-Neet"},
      {chapter:"Thermodynamics",  source:"Scribd",url:"https://www.scribd.com/document/744949113/Chemical-Bonding-Topper-s-Handwritten-Short-Notes-For-Jee-Neet"},
      {chapter:"Organic Chemistry",source:"PW Notes",url:"https://www.physicswallahnotes.net/"},
      {chapter:"Ionic Equilibrium",source:"Scribd",url:"https://www.scribd.com/document/744949113/Chemical-Bonding-Topper-s-Handwritten-Short-Notes-For-Jee-Neet"},
      {chapter:"p-Block Elements",source:"SelfStudys",url:"https://www.selfstudys.com/books/neet-topper-notes"},
    ],
  },
  Maths:{
    JEE:[
      {chapter:"Limits & Continuity",     source:"SelfStudys",url:"https://www.selfstudys.com/books/jee-topper-notes/english/maths"},
      {chapter:"Differentiation",         source:"JEEBooks",url:"https://www.jeebooks.in/2020/09/handwritten-toppers-notes-for-jee-and-neet.html"},
      {chapter:"Integration",             source:"SelfStudys",url:"https://www.selfstudys.com/books/jee-topper-notes/english/maths"},
      {chapter:"Sequence & Series",       source:"Scribd",url:"https://www.scribd.com/document/744949113/Chemical-Bonding-Topper-s-Handwritten-Short-Notes-For-Jee-Neet"},
      {chapter:"Matrices & Determinants", source:"SelfStudys",url:"https://www.selfstudys.com/books/jee-topper-notes/english/maths"},
      {chapter:"Probability",             source:"JEEBooks",url:"https://www.jeebooks.in/2020/09/handwritten-toppers-notes-for-jee-and-neet.html"},
      {chapter:"Conic Sections",          source:"SelfStudys",url:"https://www.selfstudys.com/books/jee-topper-notes/english/maths"},
      {chapter:"Vectors & 3D",            source:"JEEBooks",url:"https://www.jeebooks.in/2020/09/handwritten-toppers-notes-for-jee-and-neet.html"},
      {chapter:"Complex Numbers",         source:"SelfStudys",url:"https://www.selfstudys.com/books/jee-topper-notes/english/maths"},
    ],
    NEET:[],
  },
  Biology:{
    NEET:[
      {chapter:"Cell Structure",    source:"SelfStudys",url:"https://www.selfstudys.com/books/neet-topper-notes"},
      {chapter:"Cell Division",     source:"AajKaTopper",url:"https://aajkatopper.com/handwritten-notes-neet-jee-physics-chemistry-biology-math/"},
      {chapter:"Photosynthesis",    source:"SelfStudys",url:"https://www.selfstudys.com/books/neet-topper-notes"},
      {chapter:"Respiration",       source:"PW Notes",url:"https://www.physicswallahnotes.net/"},
      {chapter:"Human Physiology",  source:"SelfStudys",url:"https://www.selfstudys.com/books/neet-topper-notes"},
      {chapter:"Genetics",          source:"AajKaTopper",url:"https://aajkatopper.com/handwritten-notes-neet-jee-physics-chemistry-biology-math/"},
      {chapter:"Evolution",         source:"SelfStudys",url:"https://www.selfstudys.com/books/neet-topper-notes"},
      {chapter:"Ecology",           source:"PW Notes",url:"https://www.physicswallahnotes.net/"},
      {chapter:"Plant Kingdom",     source:"AajKaTopper",url:"https://aajkatopper.com/handwritten-notes-neet-jee-physics-chemistry-biology-math/"},
      {chapter:"Animal Kingdom",    source:"SelfStudys",url:"https://www.selfstudys.com/books/neet-topper-notes"},
    ],
    JEE:[],
  },
  Commerce:{
    "Class 11-12":[
      {chapter:"Accounting – Basic Concepts",         source:"SelfStudys (Commerce)",    url:"https://www.selfstudys.com/books/cbse-topper-notes/english/accountancy"},
      {chapter:"Recording of Transactions",           source:"SelfStudys (Commerce)",    url:"https://www.selfstudys.com/books/cbse-topper-notes/english/accountancy"},
      {chapter:"Trial Balance & Rectification",       source:"Vedantu Commerce Notes",   url:"https://www.vedantu.com/commerce/accountancy-class-11-notes"},
      {chapter:"Financial Statements",                source:"SelfStudys (Commerce)",    url:"https://www.selfstudys.com/books/cbse-topper-notes/english/accountancy"},
      {chapter:"Cash Flow Statement",                 source:"Vedantu Commerce Notes",   url:"https://www.vedantu.com/commerce/accountancy-class-12-notes"},
      {chapter:"Partnership Accounts",                source:"SelfStudys (Commerce)",    url:"https://www.selfstudys.com/books/cbse-topper-notes/english/accountancy"},
      {chapter:"Company Accounts & Shares",           source:"Scribd – Commerce Topper", url:"https://www.scribd.com/document/commerce-topper-notes"},
      {chapter:"Analysis of Financial Statements",    source:"Vedantu Commerce Notes",   url:"https://www.vedantu.com/commerce/accountancy-class-12-notes"},
      {chapter:"Business Studies – Nature & Purpose", source:"SelfStudys (Commerce)",    url:"https://www.selfstudys.com/books/cbse-topper-notes/english/business-studies"},
      {chapter:"Forms of Business Organisation",      source:"SelfStudys (Commerce)",    url:"https://www.selfstudys.com/books/cbse-topper-notes/english/business-studies"},
      {chapter:"Business Finance",                    source:"Vedantu Commerce Notes",   url:"https://www.vedantu.com/commerce/business-studies-class-12-notes"},
      {chapter:"Marketing Management",                source:"SelfStudys (Commerce)",    url:"https://www.selfstudys.com/books/cbse-topper-notes/english/business-studies"},
      {chapter:"Consumer Protection",                 source:"Vedantu Commerce Notes",   url:"https://www.vedantu.com/commerce/business-studies-class-12-notes"},
      {chapter:"Economics – Micro Intro & Demand",    source:"SelfStudys (Commerce)",    url:"https://www.selfstudys.com/books/cbse-topper-notes/english/economics"},
      {chapter:"Supply & Market Equilibrium",         source:"Vedantu Commerce Notes",   url:"https://www.vedantu.com/commerce/economics-class-11-notes"},
      {chapter:"National Income & Macroeconomics",    source:"SelfStudys (Commerce)",    url:"https://www.selfstudys.com/books/cbse-topper-notes/english/economics"},
      {chapter:"Money & Banking",                     source:"Vedantu Commerce Notes",   url:"https://www.vedantu.com/commerce/economics-class-12-notes"},
      {chapter:"Government Budget",                   source:"SelfStudys (Commerce)",    url:"https://www.selfstudys.com/books/cbse-topper-notes/english/economics"},
      {chapter:"Balance of Payments",                 source:"Vedantu Commerce Notes",   url:"https://www.vedantu.com/commerce/economics-class-12-notes"},
    ],
    "CA Foundation":[
      {chapter:"Principles of Accounting",            source:"ICAI Study Material",      url:"https://www.icai.org/post/ca-foundation-study-material"},
      {chapter:"Mercantile Law",                      source:"ICAI Study Material",      url:"https://www.icai.org/post/ca-foundation-study-material"},
      {chapter:"Business Economics",                  source:"ICAI Study Material",      url:"https://www.icai.org/post/ca-foundation-study-material"},
      {chapter:"Business & Commercial Knowledge",     source:"ICAI Study Material",      url:"https://www.icai.org/post/ca-foundation-study-material"},
      {chapter:"Quantitative Aptitude",               source:"ICAI Study Material",      url:"https://www.icai.org/post/ca-foundation-study-material"},
    ],
  },
};

const YOUTUBE_CHANNELS = [
  { subject:"Physics", exam:"JEE + NEET", channels:[
    {name:"Physics Wallah – Alakh Pandey", desc:"Complete JEE + NEET syllabus free. Most trusted name in affordable coaching.", url:"https://www.youtube.com/@PhysicsWallah", badge:"#1"},
    {name:"Physics Galaxy – Ashish Arora", desc:"Head of Allen Jaipur. Deep conceptual clarity, IPhO-level content.", url:"https://www.youtube.com/@PhysicsGalaxy", badge:"Expert"},
  ]},
  { subject:"Chemistry", exam:"JEE + NEET", channels:[
    {name:"ATP Star – Vineet Khatri", desc:"Kota faculty. Best for organic & inorganic. Short, focused, exam-targeted.", url:"https://www.youtube.com/@ATPSTAR", badge:"#1"},
    {name:"IITian Explains – MKA Sir", desc:"IIT Kharagpur M.Tech. Conceptual organic & inorganic from basics to JEE Advanced.", url:"https://www.youtube.com/@IITianExplains", badge:"Expert"},
  ]},
  { subject:"Maths", exam:"JEE", channels:[
    {name:"Mohit Tyagi", desc:"15+ years teaching. Scratch to JEE Advanced. Consistent practice, clear shortcuts.", url:"https://www.youtube.com/@MohitTyagiSir", badge:"#1"},
    {name:"Unacademy JEE – Maths", desc:"High-calibre IIT faculty. Rigorous sessions for students who want to level up fast.", url:"https://www.youtube.com/@UnacademyJEEkota", badge:"Expert"},
  ]},
  { subject:"Biology", exam:"NEET", channels:[
    {name:"Biomentors – Dr. Geetendra", desc:"Best Biology for NEET. NCERT line-by-line, mnemonics, diagrams, 600+ score focus.", url:"https://www.youtube.com/@Biomentors", badge:"#1"},
    {name:"Vedantu Biotonic for NEET", desc:"Animated explanations, chapter-wise playlists that mirror NCERT perfectly.", url:"https://www.youtube.com/@VedantuBiotonicforNEET", badge:"Expert"},
  ]},
  { subject:"Commerce", exam:"Class 11-12 · CA Foundation", channels:[
    {name:"Rajat Arora – Accounts", desc:"Most subscribed Accountancy channel in India. Crystal-clear concepts for Class 11, 12 & CA Foundation. Teaches like a friend.", url:"https://www.youtube.com/@RajatAroraAccounts", badge:"#1"},
    {name:"Harsh Pokharna – Economics", desc:"Best Economics channel for Class 11 & 12 CBSE. Concept-first, diagram-heavy, super exam-relevant.", url:"https://www.youtube.com/@HarshPokharnaEconomics", badge:"#1"},
    {name:"Sunil Panda – Business Studies", desc:"Top BST channel for CBSE boards. Chapter-wise concise lectures with case studies. 500K+ students.", url:"https://www.youtube.com/@SunilPandaBST", badge:"Expert"},
    {name:"CA Wallah by PW", desc:"CA Foundation, Inter & Final by Physics Wallah. Free lectures for Accounts, Law, Economics & Maths.", url:"https://www.youtube.com/@CAWallah", badge:"CA Pick"},
  ]},
];

// ─── AI ───────────────────────────────────────────────────────────────────────
async function callClaude(sys, msg) {
  const r = await fetch("https://api.anthropic.com/v1/messages",{
    method:"POST", headers:{"Content-Type":"application/json"},
    body:JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:4000, system:sys, messages:[{role:"user",content:msg}] })
  });
  const d = await r.json();
  if (d.error) throw new Error(d.error.message);
  return d.content[0].text;
}

// ─── MICRO COMPONENTS ─────────────────────────────────────────────────────────
function Spinner() {
  return (
    <div style={{display:"flex",alignItems:"center",gap:14,padding:"36px 0"}}>
      <div style={{position:"relative",width:22,height:22}}>
        <div style={{position:"absolute",inset:0,borderRadius:"50%",border:"2px solid rgba(255,255,255,0.08)"}}/>
        <div style={{position:"absolute",inset:0,borderRadius:"50%",border:"2px solid transparent",borderTopColor:"rgba(255,255,255,0.7)",animation:"spin .7s linear infinite"}}/>
      </div>
      <span style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:"rgba(255,255,255,0.35)",letterSpacing:"0.1em"}}>processing...</span>
    </div>
  );
}

function ResultBox({text}) {
  const [copied,setCopied]=useState(false);
  return (
    <div style={{marginTop:24,animation:"fadeUp .4s ease"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:6,height:6,borderRadius:"50%",background:"rgba(255,255,255,0.25)"}}/>
          <span style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:"rgba(255,255,255,0.3)",letterSpacing:"0.15em",textTransform:"uppercase"}}>output</span>
        </div>
        <button onClick={()=>{navigator.clipboard.writeText(text);setCopied(true);setTimeout(()=>setCopied(false),2000);}} style={{
          background:copied?"rgba(255,255,255,0.12)":"transparent",
          border:"1px solid",borderColor:copied?"rgba(255,255,255,0.3)":"rgba(255,255,255,0.1)",
          borderRadius:6,padding:"4px 14px",fontSize:11,cursor:"pointer",
          fontFamily:"'DM Mono',monospace",color:copied?"rgba(255,255,255,0.9)":"rgba(255,255,255,0.35)",
          transition:"all .2s",letterSpacing:"0.06em"
        }}>{copied?"copied ✓":"copy"}</button>
      </div>
      <div style={{
        background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",
        borderRadius:12,padding:"20px 22px",
        boxShadow:"inset 0 1px 0 rgba(255,255,255,0.04)"
      }}>
        <pre style={{whiteSpace:"pre-wrap",wordBreak:"break-word",fontFamily:"'DM Sans',sans-serif",fontSize:14,color:"rgba(255,255,255,0.78)",lineHeight:1.85,margin:0}}>{text}</pre>
      </div>
    </div>
  );
}

const S = {
  label:{display:"block",marginBottom:8,fontFamily:"'DM Mono',monospace",fontSize:10,color:"rgba(255,255,255,0.3)",letterSpacing:"0.15em",textTransform:"uppercase"},
  input:{width:"100%",padding:"12px 16px",border:"1px solid rgba(255,255,255,0.09)",borderRadius:10,fontSize:14,fontFamily:"'DM Sans',sans-serif",color:"rgba(255,255,255,0.85)",background:"rgba(255,255,255,0.05)",outline:"none",boxSizing:"border-box",transition:"border-color .2s, background .2s",caretColor:"white"},
  btn:{width:"100%",padding:"14px",borderRadius:10,border:"1px solid rgba(255,255,255,0.15)",background:"rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.9)",fontSize:14,fontFamily:"'DM Sans',sans-serif",fontWeight:600,cursor:"pointer",letterSpacing:"0.04em",transition:"all .2s",backdropFilter:"blur(4px)"},
  err:{color:"#ff6b6b",fontSize:12,fontFamily:"'DM Mono',monospace",marginTop:8},
};

function Field({label,children}){
  return <div><label style={S.label}>{label}</label>{children}</div>;
}

function PillGroup({options,value,onChange}){
  return(
    <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
      {options.map(([val,lbl])=>(
        <button key={val} onClick={()=>onChange(val)} style={{
          padding:"8px 18px",borderRadius:8,fontSize:13,cursor:"pointer",
          fontFamily:"'DM Sans',sans-serif",fontWeight:600,transition:"all .15s",
          border:value===val?"1px solid rgba(255,255,255,0.5)":"1px solid rgba(255,255,255,0.1)",
          background:value===val?"rgba(255,255,255,0.15)":"rgba(255,255,255,0.04)",
          color:value===val?"white":"rgba(255,255,255,0.4)",
          transition:"border-color .15s,background .15s,color .15s",
          boxShadow:value===val?"0 0 20px rgba(255,255,255,0.05)":"none"
        }}>{lbl}</button>
      ))}
    </div>
  );
}

// Custom select replacement — no native UI
function OptionGroup({options,value,onChange,wrap=false}){
  return(
    <div style={{display:"flex",gap:8,flexWrap:wrap?"wrap":"nowrap",overflowX:wrap?"visible":"auto",paddingBottom:2}}>
      {options.map(([val,lbl])=>(
        <button key={val} onClick={()=>onChange(val)} style={{
          padding:"10px 16px",borderRadius:9,fontSize:13,cursor:"pointer",
          fontFamily:"'DM Sans',sans-serif",fontWeight:600,
          whiteSpace:"nowrap",flexShrink:0,
          border:value===val?"1px solid rgba(255,255,255,0.45)":"1px solid rgba(255,255,255,0.09)",
          background:value===val?"rgba(255,255,255,0.13)":"rgba(255,255,255,0.03)",
          color:value===val?"white":"rgba(255,255,255,0.38)",
          boxShadow:value===val?"0 0 16px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.08)":"none",
          transition:"all .15s ease",
        }}>{lbl}</button>
      ))}
    </div>
  );
}

// ─── AI TABS ──────────────────────────────────────────────────────────────────
function AssignmentTab(){
  const [topic,setTopic]=useState(""); const [subject,setSubject]=useState(""); const [words,setWords]=useState("500");
  const [result,setResult]=useState(""); const [loading,setLoading]=useState(false); const [error,setError]=useState("");
  const run=async()=>{
    if(!topic.trim())return; setLoading(true);setError("");setResult("");
    try{setResult(await callClaude("You are an expert academic writer. Write well-structured, plagiarism-free assignments with proper headings, introduction, body, and conclusion. Academic but student-appropriate tone.",`Write a complete assignment on: "${topic}"\nSubject: ${subject||"General"}\nWord count: ~${words} words\nInclude: Introduction, main sections with headings, Conclusion.`));}
    catch{setError("Something went wrong. Try again.");} setLoading(false);
  };
  return(
    <div style={{display:"grid",gap:20}}>
      <Field label="topic *"><input style={S.input} placeholder="e.g. Impact of Social Media on Mental Health" value={topic} onChange={e=>setTopic(e.target.value)}/></Field>
      <Field label="subject"><input style={S.input} placeholder="e.g. Psychology" value={subject} onChange={e=>setSubject(e.target.value)}/></Field>
      <Field label="length">
        <OptionGroup options={[["300","Short (~300w)"],["500","Medium (~500w)"],["800","Detailed (~800w)"],["1200","Long (~1200w)"]]} value={words} onChange={setWords} wrap={true}/>
      </Field>
      <button style={S.btn} onClick={run} disabled={loading||!topic.trim()}>{loading?"writing...":"Generate Assignment →"}</button>
      {error&&<p style={S.err}>{error}</p>}{loading&&<Spinner/>}{result&&<ResultBox text={result}/>}
    </div>
  );
}

function SolverTab(){
  const [q,setQ]=useState(""); const [level,setLevel]=useState("high school");
  const [result,setResult]=useState(""); const [loading,setLoading]=useState(false); const [error,setError]=useState("");
  const run=async()=>{
    if(!q.trim())return; setLoading(true);setError("");setResult("");
    try{setResult(await callClaude(`You are a brilliant, patient tutor for ${level} students. Show step-by-step solutions. Explain WHY each step works. Give a clear final answer.`,`Solve this step-by-step:\n\n${q}`));}
    catch{setError("Something went wrong. Try again.");} setLoading(false);
  };
  return(
    <div style={{display:"grid",gap:20}}>
      <Field label="your question *"><textarea style={{...S.input,minHeight:130,resize:"vertical"}} placeholder="Paste any question — math, science, history, anything..." value={q} onChange={e=>setQ(e.target.value)}/></Field>
      <Field label="level">
        <OptionGroup wrap={true} options={[["middle school","Middle School"],["high school","High School"],["undergraduate","Undergraduate"],["competitive exam (JEE/NEET)","JEE / NEET"]]} value={level} onChange={setLevel}/>
      </Field>
      <button style={S.btn} onClick={run} disabled={loading||!q.trim()}>{loading?"solving...":"Solve This →"}</button>
      {error&&<p style={S.err}>{error}</p>}{loading&&<Spinner/>}{result&&<ResultBox text={result}/>}
    </div>
  );
}

// ─── RICH NOTES RENDERER ──────────────────────────────────────────────────────

function HighlightText({text}){
  // Parse **bold**, ==highlight==, `formula` inline
  const parts=[];
  const regex=/==([^=]+)==|\*\*([^*]+)\*\*|`([^`]+)`/g;
  let last=0,m;
  while((m=regex.exec(text))!==null){
    if(m.index>last) parts.push({t:"plain",v:text.slice(last,m.index)});
    if(m[1]) parts.push({t:"hl",v:m[1]});
    else if(m[2]) parts.push({t:"bold",v:m[2]});
    else if(m[3]) parts.push({t:"code",v:m[3]});
    last=m.index+m[0].length;
  }
  if(last<text.length) parts.push({t:"plain",v:text.slice(last)});
  return(
    <span>{parts.map((p,i)=>{
      if(p.t==="hl") return <mark key={i} style={{background:"rgba(255,220,50,0.22)",color:"rgba(255,230,100,0.95)",borderRadius:3,padding:"1px 4px",fontWeight:600}}>{p.v}</mark>;
      if(p.t==="bold") return <strong key={i} style={{color:"white",fontWeight:700}}>{p.v}</strong>;
      if(p.t==="code") return <code key={i} style={{background:"rgba(255,255,255,0.08)",color:"rgba(180,220,255,0.9)",borderRadius:4,padding:"1px 6px",fontFamily:"'DM Mono',monospace",fontSize:"0.9em"}}>{p.v}</code>;
      return <span key={i}>{p.v}</span>;
    })}</span>
  );
}

function NoteBlock({block}){
  const base={fontFamily:"'DM Sans',sans-serif",fontSize:14,lineHeight:1.75,color:"rgba(255,255,255,0.72)"};

  if(block.type==="heading") return(
    <div style={{marginBottom:6,marginTop:18,paddingBottom:8,borderBottom:"1px solid rgba(255,255,255,0.08)"}}>
      <span style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:700,fontSize:20,color:"rgba(255,255,255,0.88)",letterSpacing:"-0.01em"}}>
        <HighlightText text={block.content}/>
      </span>
    </div>
  );

  if(block.type==="subheading") return(
    <div style={{marginBottom:4,marginTop:14}}>
      <span style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:15,color:"rgba(255,255,255,0.85)",letterSpacing:"0.01em"}}>
        <HighlightText text={block.content}/>
      </span>
    </div>
  );

  if(block.type==="bullet") return(
    <div style={{display:"flex",gap:10,marginBottom:6,paddingLeft:4,...base}}>
      <span style={{color:"rgba(255,255,255,0.2)",marginTop:2,flexShrink:0}}>◦</span>
      <span><HighlightText text={block.content}/></span>
    </div>
  );

  if(block.type==="callout") return(
    <div style={{
      margin:"14px 0",padding:"14px 18px",
      background:"rgba(255,200,50,0.06)",
      border:"1px solid rgba(255,200,50,0.18)",
      borderLeft:"3px solid rgba(255,200,50,0.6)",
      borderRadius:"0 10px 10px 0",
    }}>
      <div style={{display:"flex",gap:8,alignItems:"flex-start"}}>
        <span style={{fontSize:14,marginTop:1,flexShrink:0}}>⚡</span>
        <span style={{...base,color:"rgba(255,230,130,0.9)",fontWeight:500}}>
          <HighlightText text={block.content}/>
        </span>
      </div>
    </div>
  );

  if(block.type==="remember") return(
    <div style={{
      margin:"14px 0",padding:"14px 18px",
      background:"rgba(100,180,255,0.05)",
      border:"1px solid rgba(100,180,255,0.15)",
      borderLeft:"3px solid rgba(100,180,255,0.5)",
      borderRadius:"0 10px 10px 0",
    }}>
      <div style={{display:"flex",gap:8,alignItems:"flex-start"}}>
        <span style={{fontSize:14,marginTop:1,flexShrink:0}}>📌</span>
        <span style={{...base,color:"rgba(150,210,255,0.9)",fontWeight:500}}>
          <HighlightText text={block.content}/>
        </span>
      </div>
    </div>
  );

  if(block.type==="formula") return(
    <div style={{
      margin:"14px 0",padding:"16px 20px",
      background:"rgba(255,255,255,0.04)",
      border:"1px solid rgba(255,255,255,0.1)",
      borderRadius:10,textAlign:"center",
    }}>
      <span style={{fontFamily:"'DM Mono',monospace",fontSize:15,color:"rgba(200,240,200,0.9)",letterSpacing:"0.05em"}}>
        {block.content}
      </span>
      {block.label&&<div style={{marginTop:6,fontFamily:"'DM Mono',monospace",fontSize:10,color:"rgba(255,255,255,0.25)",letterSpacing:"0.1em"}}>{block.label}</div>}
    </div>
  );

  if(block.type==="flashcard") return(
    <div style={{
      margin:"8px 0",padding:"14px 18px",
      background:"rgba(255,255,255,0.03)",
      border:"1px solid rgba(255,255,255,0.07)",
      borderRadius:10,
    }}>
      <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:"rgba(255,255,255,0.25)",letterSpacing:"0.15em",marginBottom:6}}>Q</div>
      <div style={{...base,color:"rgba(255,255,255,0.85)",fontWeight:600,marginBottom:10}}><HighlightText text={block.question}/></div>
      <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:"rgba(100,200,255,0.4)",letterSpacing:"0.15em",marginBottom:6}}>A</div>
      <div style={{...base,color:"rgba(150,210,255,0.8)"}}><HighlightText text={block.answer}/></div>
    </div>
  );

  if(block.type==="diagram"){
    // Render an inline SVG diagram described by block.svg (raw SVG string)
    return(
      <div style={{margin:"18px 0",borderRadius:12,overflow:"hidden",border:"1px solid rgba(255,255,255,0.08)",background:"rgba(255,255,255,0.02)"}}>
        {block.caption&&<div style={{padding:"8px 16px",borderBottom:"1px solid rgba(255,255,255,0.06)",fontFamily:"'DM Mono',monospace",fontSize:10,color:"rgba(255,255,255,0.25)",letterSpacing:"0.1em"}}>{block.caption}</div>}
        <div style={{padding:"16px",display:"flex",justifyContent:"center"}} dangerouslySetInnerHTML={{__html:block.svg}}/>
      </div>
    );
  }

  if(block.type==="divider") return <div style={{borderTop:"1px solid rgba(255,255,255,0.06)",margin:"20px 0"}}/>;

  // fallback paragraph
  return <p style={{...base,marginBottom:8}}><HighlightText text={block.content||""}/></p>;
}

const NOTES_SYSTEM=`You are an elite study notes creator for JEE/NEET/school students. Given chapter content, produce DETAILED, VISUAL, EXAM-FOCUSED notes.

Respond ONLY with a valid JSON array of block objects. No markdown, no backticks, no preamble.

Block types and their fields:
- {"type":"heading","content":"..."} — main section title
- {"type":"subheading","content":"..."} — sub-section title  
- {"type":"bullet","content":"..."} — use ==text== for yellow highlights, **text** for bold, \`formula\` for inline code
- {"type":"callout","content":"..."} — ⚡ critical exam tip or tricky concept
- {"type":"remember","content":"..."} — 📌 must-memorize fact, definition, or rule
- {"type":"formula","content":"F = ma","label":"Newton's Second Law"} — key equation
- {"type":"flashcard","question":"...","answer":"..."} — Q&A pair (use for key definitions)
- {"type":"diagram","svg":"<svg>...</svg>","caption":"..."} — SVG diagram (dark theme: bg transparent, strokes white/gray, text fill rgba(255,255,255,0.8), font-size 12, max width 500)
- {"type":"divider"} — section separator

Rules:
1. Be COMPREHENSIVE — cover every important concept from the input
2. Use ==highlights== generously on critical terms, values, and exam-relevant phrases
3. Include at least 2-3 formula blocks if the topic has equations
4. Include at least 1 diagram SVG for topics that benefit from visual representation (cycles, graphs, structures, timelines, force diagrams, graphs with axes)
5. Mix callouts and remember blocks to break monotony
6. End with 3-5 flashcard blocks for key definitions
7. Add dividers between major sections
8. SVG diagrams: use viewBox="0 0 500 200" or similar, keep clean and minimal, white/light strokes on dark bg`;

function RichNotesOutput({blocks}){
  const [copied,setCopied]=useState(false);
  const plainText=blocks.map(b=>{
    if(b.type==="flashcard") return `Q: ${b.question}\nA: ${b.answer}`;
    if(b.type==="formula") return `${b.content}${b.label?" ("+b.label+")":""}`;
    if(b.type==="diagram") return `[Diagram: ${b.caption||""}]`;
    return b.content||"";
  }).join("\n");

  return(
    <div style={{marginTop:24,animation:"fadeUp .4s ease"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:6,height:6,borderRadius:"50%",background:"rgba(255,220,50,0.5)"}}/>
          <span style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:"rgba(255,255,255,0.3)",letterSpacing:"0.15em",textTransform:"uppercase"}}>rich notes</span>
        </div>
        <button onClick={()=>{navigator.clipboard.writeText(plainText);setCopied(true);setTimeout(()=>setCopied(false),2000);}} style={{
          background:copied?"rgba(255,255,255,0.12)":"transparent",
          border:"1px solid",borderColor:copied?"rgba(255,255,255,0.3)":"rgba(255,255,255,0.1)",
          borderRadius:6,padding:"4px 14px",fontSize:11,cursor:"pointer",
          fontFamily:"'DM Mono',monospace",color:copied?"rgba(255,255,255,0.9)":"rgba(255,255,255,0.35)",
          transition:"all .2s"
        }}>{copied?"copied ✓":"copy plain"}</button>
      </div>
      <div style={{
        background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.07)",
        borderRadius:14,padding:"24px 24px 20px",
        boxShadow:"inset 0 1px 0 rgba(255,255,255,0.04)"
      }}>
        {blocks.map((b,i)=><NoteBlock key={i} block={b}/>)}
      </div>
    </div>
  );
}

function SummarizerTab(){
  const [text,setText]=useState("");
  const [blocks,setBlocks]=useState(null);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");

  const run=async()=>{
    if(!text.trim())return;
    setLoading(true);setError("");setBlocks(null);
    try{
      const raw=await callClaude(NOTES_SYSTEM,`Create detailed rich study notes for this content:\n\n${text}`);
      // strip possible markdown fences
      const clean=raw.replace(/```json|```/g,"").trim();
      const parsed=JSON.parse(clean);
      setBlocks(parsed);
    } catch(e){
      setError("Couldn't parse rich notes. Try again.");
    }
    setLoading(false);
  };

  return(
    <div style={{display:"grid",gap:20}}>
      <div style={{background:"rgba(255,220,50,0.04)",border:"1px solid rgba(255,220,50,0.1)",borderRadius:10,padding:"12px 16px"}}>
        <p style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:"rgba(255,220,100,0.5)",lineHeight:1.7}}>
          ✦ &nbsp;Generates rich notes with <strong style={{color:"rgba(255,220,100,0.7)"}}>highlights, formulas, diagrams, callouts & flashcards</strong> — not plain text.
        </p>
      </div>
      <Field label="paste your chapter text *">
        <textarea style={{...S.input,minHeight:160,resize:"vertical"}} placeholder="Paste any chapter, topic, or study material here..." value={text} onChange={e=>setText(e.target.value)}/>
      </Field>
      <button style={S.btn} onClick={run} disabled={loading||!text.trim()}>
        {loading?"generating rich notes...":"Generate Rich Notes →"}
      </button>
      {error&&<p style={S.err}>{error}</p>}
      {loading&&<Spinner/>}
      {blocks&&<RichNotesOutput blocks={blocks}/>}
    </div>
  );
}

function ExamPrepTab(){
  const [topic,setTopic]=useState(""); const [type,setType]=useState("mcq"); const [count,setCount]=useState("5");
  const [result,setResult]=useState(""); const [loading,setLoading]=useState(false); const [error,setError]=useState("");
  const typeMap={mcq:`${count} MCQs. For each: question, options A–D, "Answer: [X]" + explanation.`,short:`${count} short-answer Qs with model answers (2–4 sentences). Q: ...\nA: ...`,long:`${count} essay-type Qs with key points.\nQ: ...\nKey points: [bullets]`};
  const run=async()=>{
    if(!topic.trim())return; setLoading(true);setError("");setResult("");
    try{setResult(await callClaude("You are an expert exam question creator. Generate challenging but fair questions that test real understanding.",`Topic: ${topic}\n${typeMap[type]}`));}
    catch{setError("Something went wrong. Try again.");} setLoading(false);
  };
  return(
    <div style={{display:"grid",gap:20}}>
      <Field label="topic / chapter *"><input style={S.input} placeholder="e.g. Photosynthesis, French Revolution, Quadratic Equations" value={topic} onChange={e=>setTopic(e.target.value)}/></Field>
      <Field label="question type">
        <OptionGroup options={[["mcq","MCQ"],["short","Short Answer"],["long","Essay"]]} value={type} onChange={setType}/>
      </Field>
      <Field label="quantity">
        <OptionGroup options={[["3","3 Qs"],["5","5 Qs"],["10","10 Qs"]]} value={count} onChange={setCount}/>
      </Field>
      <button style={S.btn} onClick={run} disabled={loading||!topic.trim()}>{loading?"generating...":"Generate Questions →"}</button>
      {error&&<p style={S.err}>{error}</p>}{loading&&<Spinner/>}{result&&<ResultBox text={result}/>}
    </div>
  );
}

// ─── TOPPER NOTES ─────────────────────────────────────────────────────────────
function TopperNotesTab(){
  const subjects=Object.keys(TOPPER_NOTES);
  const [selSub,setSelSub]=useState("Physics");
  const streams=Object.keys(TOPPER_NOTES[selSub]).filter(e=>TOPPER_NOTES[selSub][e].length>0);
  const [selStream,setSelStream]=useState(streams[0]||"JEE");
  const [search,setSearch]=useState("");
  useEffect(()=>{
    const a=Object.keys(TOPPER_NOTES[selSub]).filter(e=>TOPPER_NOTES[selSub][e].length>0);
    setSelStream(a[0]||"JEE");
    setSearch("");
  },[selSub]);
  const notes=(TOPPER_NOTES[selSub][selStream]||[]).filter(n=>n.chapter.toLowerCase().includes(search.toLowerCase()));
  const streamLabel=selSub==="Commerce"?"stream":"exam";
  return(
    <div style={{display:"grid",gap:20}}>
      <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:10,padding:"12px 16px"}}>
        <p style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:"rgba(255,255,255,0.3)",lineHeight:1.7}}>
          ✎ &nbsp;Sourced from SelfStudys, Vedantu, ICAI, JEEBooks & Scribd — curated from top rankers & board toppers.
        </p>
      </div>
      <Field label="subject"><PillGroup options={subjects.map(s=>[s,s])} value={selSub} onChange={setSelSub}/></Field>
      <Field label={streamLabel}><PillGroup options={streams.map(e=>[e,e])} value={selStream} onChange={setSelStream}/></Field>
      <Field label="search chapter"><input style={S.input} placeholder="e.g. Kinematics, Accounting, Organic..." value={search} onChange={e=>setSearch(e.target.value)}/></Field>
      <div>
        <label style={S.label}>{notes.length} chapters</label>
        <div style={{display:"grid",gap:8}}>
          {notes.length===0&&<p style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:"rgba(255,255,255,0.2)",padding:"16px 0"}}>No chapters found.</p>}
          {notes.map((n,i)=>(
            <a key={i} href={n.url} target="_blank" rel="noopener noreferrer"
              style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 18px",border:"1px solid rgba(255,255,255,0.07)",borderRadius:10,textDecoration:"none",background:"rgba(255,255,255,0.03)",transition:"all .18s",cursor:"pointer"}}
              onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.07)";e.currentTarget.style.borderColor="rgba(255,255,255,0.18)";e.currentTarget.style.transform="translateX(4px)";}}
              onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.03)";e.currentTarget.style.borderColor="rgba(255,255,255,0.07)";e.currentTarget.style.transform="translateX(0)";}}>
              <div>
                <p style={{fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:14,color:"rgba(255,255,255,0.85)",marginBottom:3}}>{n.chapter}</p>
                <p style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:"rgba(255,255,255,0.25)",letterSpacing:"0.05em"}}>{n.source}</p>
              </div>
              <span style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:"rgba(255,255,255,0.25)",flexShrink:0,marginLeft:16}}>↗</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── YOUTUBE TAB ──────────────────────────────────────────────────────────────
function YoutubeTab(){
  const [sel,setSel]=useState("Physics");
  const data=YOUTUBE_CHANNELS.find(c=>c.subject===sel);
  return(
    <div style={{display:"grid",gap:20}}>
      <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:10,padding:"12px 16px"}}>
        <p style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:"rgba(255,255,255,0.3)",lineHeight:1.7}}>
          ▶ &nbsp;Handpicked from 50+ channels. #1 = best all-round. Expert / CA Pick = for specialised work. All free.
        </p>
      </div>
      <Field label="subject"><PillGroup options={YOUTUBE_CHANNELS.map(c=>[c.subject,c.subject])} value={sel} onChange={setSel}/></Field>
      {data&&<div style={{display:"flex",alignItems:"center",gap:8}}>
        <span style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:"rgba(255,255,255,0.25)",letterSpacing:"0.1em",textTransform:"uppercase"}}>for</span>
        <span style={{border:"1px solid rgba(255,255,255,0.1)",borderRadius:6,padding:"3px 10px",fontFamily:"'DM Mono',monospace",fontSize:11,color:"rgba(255,255,255,0.4)"}}>{data.exam}</span>
      </div>}
      <div style={{display:"grid",gap:14}}>
        {data?.channels.map((ch,i)=>(
          <a key={i} href={ch.url} target="_blank" rel="noopener noreferrer"
            style={{display:"block",padding:"20px 22px",border:"1px solid rgba(255,255,255,0.07)",borderRadius:12,textDecoration:"none",background:"rgba(255,255,255,0.03)",transition:"all .18s"}}
            onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.07)";e.currentTarget.style.borderColor="rgba(255,255,255,0.18)";e.currentTarget.style.transform="translateY(-2px)";}}
            onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.03)";e.currentTarget.style.borderColor="rgba(255,255,255,0.07)";e.currentTarget.style.transform="translateY(0)";}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10,gap:12}}>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:15,color:"rgba(255,255,255,0.9)",lineHeight:1.3}}>{ch.name}</p>
              <span style={{
                background:ch.badge==="#1"?"rgba(255,255,255,0.12)":"transparent",
                border:"1px solid",
                borderColor:ch.badge==="#1"?"rgba(255,255,255,0.25)":"rgba(255,255,255,0.1)",
                borderRadius:6,padding:"3px 10px",fontSize:11,fontFamily:"'DM Mono',monospace",
                color:ch.badge==="#1"?"white":"rgba(255,255,255,0.35)",flexShrink:0,whiteSpace:"nowrap"
              }}>{ch.badge}</span>
            </div>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:13.5,color:"rgba(255,255,255,0.45)",lineHeight:1.65,marginBottom:14}}>{ch.desc}</p>
            <span style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:"rgba(255,255,255,0.25)",letterSpacing:"0.05em"}}>↗ open on youtube</span>
          </a>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App(){
  const [active,setActive]=useState("assignment");
  const [mounted,setMounted]=useState(false);
  const glowRef=useRef(null);

  useEffect(()=>{setTimeout(()=>setMounted(true),80);},[]);

  // ── Glow follows mouse with ZERO React re-renders ──
  // We mutate the DOM node directly via a ref and CSS custom properties.
  useEffect(()=>{
    let rafId=null;
    let tx=50,ty=30,cx=50,cy=30;
    const lerp=(a,b,t)=>a+(b-a)*t;
    const tick=()=>{
      cx=lerp(cx,tx,0.06);
      cy=lerp(cy,ty,0.06);
      if(glowRef.current){
        glowRef.current.style.background=
          `radial-gradient(ellipse 55vw 45vh at ${cx.toFixed(2)}% ${cy.toFixed(2)}%, rgba(255,255,255,0.032) 0%, transparent 70%)`;
      }
      rafId=requestAnimationFrame(tick);
    };
    const onMove=(e)=>{
      tx=(e.clientX/window.innerWidth)*100;
      ty=(e.clientY/window.innerHeight)*100;
    };
    window.addEventListener("mousemove",onMove,{passive:true});
    rafId=requestAnimationFrame(tick);
    return()=>{window.removeEventListener("mousemove",onMove);cancelAnimationFrame(rafId);};
  },[]);

  const panels={
    assignment:<AssignmentTab/>,
    solver:<SolverTab/>,
    summarizer:<SummarizerTab/>,
    exam:<ExamPrepTab/>,
    topper:<TopperNotesTab/>,
    youtube:<YoutubeTab/>,
  };

  const activeTab=TABS.find(t=>t.id===active);

  return(
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500;600;700&family=Cormorant+Garamond:wght@600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{background:#060608;overflow-x:hidden;}
        ::selection{background:rgba(255,255,255,0.15);}
        input,textarea,select{color-scheme:dark;}
        input::placeholder,textarea::placeholder{color:rgba(255,255,255,0.2)!important;}
        input:focus,textarea:focus,select:focus{
          border-color:rgba(255,255,255,0.25)!important;
          background:rgba(255,255,255,0.06)!important;
          outline:none;
          box-shadow:0 0 0 3px rgba(255,255,255,0.04);
        }
        .tab-btn{transition:all .18s !important;}
        .action-btn:hover:not(:disabled){opacity:0.82;transform:translateY(-1px);}
        .action-btn:active:not(:disabled){transform:scale(0.98);}
        .action-btn:disabled{opacity:0.25;cursor:not-allowed;}

        /* ── TUBELIGHT FLICKER ── */
        @keyframes tubeOn{
          0%{opacity:0;text-shadow:none;}
          5%{opacity:0.9;text-shadow:0 0 40px rgba(255,255,255,0.9),0 0 80px rgba(255,255,255,0.5),0 0 120px rgba(255,255,255,0.25);}
          6%{opacity:0.1;}
          7%{opacity:0.95;text-shadow:0 0 40px rgba(255,255,255,0.9),0 0 80px rgba(255,255,255,0.5);}
          8%{opacity:0.2;}
          10%{opacity:1;text-shadow:0 0 40px rgba(255,255,255,0.9),0 0 80px rgba(255,255,255,0.5),0 0 120px rgba(255,255,255,0.25);}
          15%{opacity:0.4;}
          16%{opacity:1;text-shadow:0 0 40px rgba(255,255,255,0.9),0 0 80px rgba(255,255,255,0.5);}
          25%{opacity:0.8;}
          26%{opacity:1;text-shadow:0 0 50px rgba(255,255,255,1),0 0 100px rgba(255,255,255,0.6),0 0 160px rgba(255,255,255,0.3);}
          100%{opacity:1;text-shadow:0 0 30px rgba(255,255,255,0.65),0 0 60px rgba(255,255,255,0.35),0 0 100px rgba(255,255,255,0.18);}
        }
        @keyframes tubeIdle{
          0%,100%{text-shadow:0 0 30px rgba(255,255,255,0.65),0 0 60px rgba(255,255,255,0.35),0 0 100px rgba(255,255,255,0.18);}
          48%{text-shadow:0 0 30px rgba(255,255,255,0.65),0 0 60px rgba(255,255,255,0.35),0 0 100px rgba(255,255,255,0.18);}
          49%{text-shadow:0 0 10px rgba(255,255,255,0.18),0 0 20px rgba(140,180,255,0.2);}
          50%{text-shadow:0 0 30px rgba(255,255,255,0.65),0 0 60px rgba(255,255,255,0.35),0 0 100px rgba(255,255,255,0.18);}
          92%{text-shadow:0 0 30px rgba(255,255,255,0.65),0 0 60px rgba(255,255,255,0.35);}
          93%{text-shadow:0 0 5px rgba(255,255,255,0.12);}
          94%{text-shadow:0 0 30px rgba(255,255,255,0.65),0 0 60px rgba(255,255,255,0.35),0 0 100px rgba(255,255,255,0.18);}
        }
        @keyframes glowPulse{
          0%,100%{opacity:0.7;transform:translateX(-50%) scaleX(1);}
          48%{opacity:0.7;}49%{opacity:0.2;}50%{opacity:0.7;}
          92%{opacity:0.7;}93%{opacity:0.1;}94%{opacity:0.7;}
        }
        @keyframes bgFlicker{
          0%,100%{opacity:1;}
          49%{opacity:1;}49.5%{opacity:0.6;}50%{opacity:1;}
          92.5%{opacity:1;}93%{opacity:0.7;}93.5%{opacity:1;}
        }
        .tube-on{animation:tubeOn 1.8s ease forwards;}
        .tube-idle{animation:tubeIdle 7s ease-in-out infinite;}

        /* ── GRAIN ── */
        @keyframes grainShift{
          0%{transform:translate(0,0)} 10%{transform:translate(-2%,-3%)}
          20%{transform:translate(3%,2%)} 30%{transform:translate(-1%,4%)}
          40%{transform:translate(2%,-2%)} 50%{transform:translate(-3%,1%)}
          60%{transform:translate(1%,3%)} 70%{transform:translate(-2%,-1%)}
          80%{transform:translate(3%,2%)} 90%{transform:translate(-1%,-3%)} 100%{transform:translate(0,0)}
        }
        .grain-layer{
          position:fixed;inset:-50%;width:200%;height:200%;
          pointer-events:none;z-index:3;opacity:0.045;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E");
          background-size:220px 220px;
          animation:grainShift 0.1s steps(1) infinite;
          mix-blend-mode:screen;
        }
        .scanlines{
          position:fixed;inset:0;pointer-events:none;z-index:2;
          background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.06) 2px,rgba(0,0,0,0.06) 4px);
        }
        .vignette{
          position:fixed;inset:0;pointer-events:none;z-index:2;
          background:radial-gradient(ellipse at center,transparent 35%,rgba(0,0,0,0.5) 75%,rgba(0,0,0,0.88) 100%);
        }

        /* ── CONTENT FADE ── */
        @keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes pulse{0%,100%{opacity:.25}50%{opacity:.55}}
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        @keyframes scanMove{0%{transform:translateY(-100%)}100%{transform:translateY(100vh)}}
        .panel-enter{animation:fadeIn .25s ease both;}
        .content-fade{animation:fadeUp .8s ease 1.4s both;}

        /* 90s icon style */
        .retro-icon{
          font-size:22px;
          filter:drop-shadow(0 0 6px rgba(255,255,255,0.18));
          transition:filter .2s,transform .2s;
        }
        .retro-icon-active{
          filter:drop-shadow(0 0 8px rgba(255,255,255,0.6)) drop-shadow(0 0 16px rgba(255,255,255,0.3));
          transform:scale(1.12);
        }

        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-track{background:transparent;}
        ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.08);border-radius:2px;}
      `}</style>

      {/* ── ATMOSPHERE LAYERS ── */}

      {/* 1. Tubelight illuminated BG — blue-white glow radiates from top center */}
      <div style={{
        position:"fixed",inset:0,pointerEvents:"none",zIndex:0,
        background:"radial-gradient(ellipse 80% 45% at 50% 0%, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 40%, transparent 70%)",
        animation:"bgFlicker 7s ease-in-out infinite",
      }}/>

      {/* 2. Secondary floor glow — light bounces up from bottom */}
      <div style={{
        position:"fixed",inset:0,pointerEvents:"none",zIndex:0,
        background:"radial-gradient(ellipse 60% 25% at 50% 100%, rgba(255,255,255,0.04) 0%, transparent 60%)",
      }}/>

      {/* 3. Mouse glow — warm white blob */}
      <div ref={glowRef} style={{
        position:"fixed",inset:0,pointerEvents:"none",zIndex:0,
        willChange:"background",
      }}/>

      {/* 4. Film grain — animated */}
      <div className="grain-layer"/>

      {/* 5. CRT scanlines */}
      <div className="scanlines"/>

      {/* 6. Vignette */}
      <div className="vignette"/>

      {/* 7. Slow scan sweep */}
      <div style={{
        position:"fixed",left:0,right:0,height:160,pointerEvents:"none",zIndex:2,
        background:"linear-gradient(180deg,transparent,rgba(255,255,255,0.012),transparent)",
        animation:"scanMove 10s linear infinite",top:0,
      }}/>

      {/* 8. Corner brackets */}
      <div style={{position:"fixed",top:20,left:20,width:40,height:40,borderTop:"1px solid rgba(255,255,255,0.08)",borderLeft:"1px solid rgba(255,255,255,0.08)",pointerEvents:"none",zIndex:4}}/>
      <div style={{position:"fixed",top:20,right:20,width:40,height:40,borderTop:"1px solid rgba(255,255,255,0.08)",borderRight:"1px solid rgba(255,255,255,0.08)",pointerEvents:"none",zIndex:4}}/>
      <div style={{position:"fixed",bottom:88,left:20,width:40,height:40,borderBottom:"1px solid rgba(255,255,255,0.08)",borderLeft:"1px solid rgba(255,255,255,0.08)",pointerEvents:"none",zIndex:4}}/>
      <div style={{position:"fixed",bottom:88,right:20,width:40,height:40,borderBottom:"1px solid rgba(255,255,255,0.08)",borderRight:"1px solid rgba(255,255,255,0.08)",pointerEvents:"none",zIndex:4}}/>

      {/* ── SCROLLABLE MAIN CONTENT ── */}
      <div className="content-fade" style={{
        position:"relative",zIndex:5,
        minHeight:"100vh",
        display:"flex",flexDirection:"column",alignItems:"center",
        padding:"48px 16px 140px",
        opacity:mounted?1:0,transition:"opacity .6s ease",
      }}>

        {/* HEADER */}
        <div style={{marginBottom:40,textAlign:"center",animation:"fadeIn .6s ease",width:"100%",maxWidth:680}}>

          {/* top badge */}
          <div style={{display:"inline-flex",alignItems:"center",gap:8,marginBottom:22,
            border:"1px solid rgba(255,255,255,0.08)",borderRadius:100,
            padding:"6px 18px 6px 12px",background:"rgba(255,255,255,0.03)",
            backdropFilter:"blur(8px)"}}>
            <div style={{width:6,height:6,borderRadius:"50%",background:"rgba(255,255,255,0.6)",animation:"pulse 2.5s ease infinite"}}/>
            <span style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:"rgba(255,255,255,0.35)",letterSpacing:"0.22em",textTransform:"uppercase"}}>scalar · ai study platform</span>
          </div>

          {/* wordmark — tubelight */}
          <div style={{position:"relative",display:"inline-block",marginTop:4}}>
            {/* tube housing bar above text */}
            <div style={{
              position:"absolute",top:-14,left:"50%",transform:"translateX(-50%)",
              width:"110%",height:3,borderRadius:2,
              background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.08),rgba(200,220,255,0.5),rgba(255,255,255,0.08),transparent)",
              boxShadow:"0 0 8px rgba(255,255,255,0.3), 0 0 20px rgba(255,255,255,0.12)",
              animation:"glowPulse 7s ease-in-out infinite",
            }}/>
            {/* the actual flickering text */}
            <h1 className={mounted?"tube-on tube-idle":""} style={{
              fontFamily:"'Cormorant Garamond',serif",fontWeight:700,
              fontSize:"clamp(56px,11vw,96px)",
              color:"rgba(255,255,255,0.97)",
              letterSpacing:"-0.03em",lineHeight:1,
            }}>Scalar</h1>
            {/* tube housing bar below */}
            <div style={{
              position:"absolute",bottom:-8,left:"50%",transform:"translateX(-50%)",
              width:"110%",height:2,borderRadius:2,
              background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.06),rgba(255,255,255,0.3),rgba(255,255,255,0.06),transparent)",
              boxShadow:"0 0 6px rgba(255,255,255,0.18)",
              animation:"glowPulse 7s ease-in-out infinite",
            }}/>
          </div>

          {/* tagline */}
          <p style={{
            marginTop:20,fontFamily:"'DM Sans',sans-serif",fontWeight:300,
            fontSize:15,color:"rgba(255,255,255,0.28)",letterSpacing:"0.01em",lineHeight:1.6,
          }}>
            The AI-powered study platform for every student.
          </p>

          {/* feature pills row */}
          <div style={{
            display:"flex",flexWrap:"wrap",justifyContent:"center",
            gap:8,marginTop:20,
          }}>
            {["Assignments","Solver","Rich Notes","Exam Prep","Topper Notes","Free Classes"].map((f,i)=>(
              <span key={i} style={{
                fontFamily:"'DM Mono',monospace",fontSize:10,
                color:"rgba(255,255,255,0.28)",letterSpacing:"0.08em",
                border:"1px solid rgba(255,255,255,0.07)",
                borderRadius:100,padding:"5px 12px",
                background:"rgba(255,255,255,0.02)",
              }}>{f}</span>
            ))}
          </div>

          {/* divider */}
          <div style={{
            width:1,height:32,
            background:"linear-gradient(180deg,rgba(255,255,255,0.15),transparent)",
            margin:"24px auto 0",
          }}/>
        </div>

        {/* CARD */}
        <div style={{
          background:"rgba(12,12,12,0.96)",
          width:"100%",maxWidth:680,
          borderRadius:16,
          padding:"26px 26px 32px",
          border:"1px solid rgba(255,255,255,0.08)",
          boxShadow:"0 32px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.03), inset 0 1px 0 rgba(255,255,255,0.06)",
          backdropFilter:"blur(2px)",
        }}>
          {/* Card header */}
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:24,paddingBottom:18,borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
            <span style={{fontSize:14,color:"rgba(255,255,255,0.5)",fontFamily:"monospace",marginRight:2}}>{activeTab?.icon}</span>
            <span style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:"rgba(255,255,255,0.18)",letterSpacing:"0.2em"}}>{activeTab?.num}</span>
            <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:700,fontSize:20,color:"rgba(255,255,255,0.88)",letterSpacing:"-0.01em"}}>{activeTab?.label}</h2>
          </div>

          {/* Panels — display:none keeps state alive across tabs */}
          {TABS.map(tab=>(
            <div key={tab.id} className={active===tab.id?"panel-enter":""} style={{display:active===tab.id?"block":"none"}}>
              {panels[tab.id]}
            </div>
          ))}
        </div>

        <p style={{marginTop:28,fontFamily:"'DM Mono',monospace",fontSize:10,color:"rgba(255,255,255,0.1)",letterSpacing:"0.15em",textTransform:"uppercase",textAlign:"center"}}>
          powered by claude
        </p>
      </div>

      {/* ── BOTTOM NAV BAR ── */}
      <nav style={{
        position:"fixed",bottom:0,left:0,right:0,zIndex:50,
        background:"rgba(5,5,5,0.97)",
        backdropFilter:"blur(28px)",
        WebkitBackdropFilter:"blur(28px)",
        borderTop:"1px solid rgba(255,255,255,0.08)",
        display:"flex",justifyContent:"space-around",alignItems:"stretch",
        boxShadow:"0 -1px 0 rgba(255,255,255,0.04), 0 -20px 60px rgba(0,0,0,0.7)",
        paddingBottom:"env(safe-area-inset-bottom,0px)",
      }}>
        {TABS.map(tab=>{
          const on=active===tab.id;
          return(
            <button key={tab.id} onClick={()=>setActive(tab.id)} style={{
              flex:1,display:"flex",flexDirection:"column",
              alignItems:"center",justifyContent:"center",
              gap:7,padding:"16px 4px 18px",
              border:"none",background:"transparent",cursor:"pointer",
              position:"relative",minWidth:0,
            }}>
              {/* top active line */}
              <div style={{
                position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",
                height:2,borderRadius:"0 0 4px 4px",
                width:on?32:0,background:"rgba(255,255,255,0.85)",boxShadow:"0 0 8px rgba(255,255,255,0.3)",
                transition:"width .25s cubic-bezier(.4,0,.2,1)",
              }}/>

              {/* icon bubble — 90s style */}
              <div style={{
                width:46,height:46,borderRadius:14,
                display:"flex",alignItems:"center",justifyContent:"center",
                background:on?"rgba(255,255,255,0.08)":"transparent",
                border:on?"1px solid rgba(255,255,255,0.15)":"1px solid rgba(255,255,255,0.05)",
                transition:"all .2s",
                boxShadow:on?"0 0 14px rgba(255,255,255,0.08)":"none",
              }}>
                <span style={{
                  fontSize:18,lineHeight:1,display:"block",
                  fontFamily:"monospace",
                  color:on?"rgba(255,255,255,0.95)":"rgba(255,255,255,0.28)",
                  filter:on?"drop-shadow(0 0 8px rgba(255,255,255,0.5))":"none",
                  transition:"color .2s, filter .2s",
                  letterSpacing:0,
                }}>{tab.icon}</span>
              </div>

              {/* label */}
              <span style={{
                fontFamily:"'DM Mono',monospace",
                fontSize:9,letterSpacing:"0.06em",
                whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",
                maxWidth:"90%",
                color:on?"rgba(255,255,255,0.9)":"rgba(255,255,255,0.25)",
                fontWeight:on?500:400,
                transition:"color .2s",
                textTransform:"uppercase",
              }}>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
