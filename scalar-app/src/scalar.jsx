import { useState, useEffect, useRef, createContext, useContext } from "react";

// ─── THEME CONTEXT ─────────────────────────────────────────────────────────────
const ThemeCtx = createContext({ theme: "light", T: {} });
const useTheme = () => useContext(ThemeCtx);

// ─── DESIGN TOKENS ─────────────────────────────────────────────────────────────
const LIGHT = {
  bg:           "#F0EFFF",
  bgGrad:       "linear-gradient(145deg, #F0EFFF 0%, #E8F4FF 40%, #FFF0F8 100%)",
  surface:      "#FFFFFF",
  surfaceAlt:   "#F7F5FF",
  border:       "rgba(120,80,255,0.12)",
  borderHover:  "rgba(120,80,255,0.28)",
  text:         "#1A1333",
  textSub:      "#5B5680",
  textFaint:    "#9B97BF",
  accent:       "#6C47FF",
  accentDark:   "#4B2ECC",
  accentLight:  "#EDE8FF",
  accentGlow:   "rgba(108,71,255,0.18)",
  pink:         "#FF4FA3",
  pinkLight:    "#FFE8F4",
  teal:         "#00C9B1",
  tealLight:    "#D6FBF6",
  orange:       "#FF7D3B",
  orangeLight:  "#FFF0E8",
  yellow:       "#FFD166",
  yellowLight:  "#FFF9E6",
  blue:         "#3B9EFF",
  blueLight:    "#E6F2FF",
  green:        "#22C55E",
  greenLight:   "#E6FAF0",
  pillOn:       "#6C47FF",
  pillOff:      "#FFFFFF",
  pillOnTxt:    "#FFFFFF",
  pillOffTxt:   "#5B5680",
  inputBg:      "#FFFFFF",
  inputBorder:  "rgba(120,80,255,0.2)",
  inputFocus:   "rgba(108,71,255,0.3)",
  btnGrad:      "linear-gradient(135deg, #6C47FF 0%, #9B66FF 100%)",
  cardShadow:   "0 4px 24px rgba(108,71,255,0.10), 0 1px 4px rgba(108,71,255,0.06)",
  cardShadowLg: "0 16px 48px rgba(108,71,255,0.14), 0 4px 16px rgba(108,71,255,0.08)",
  nav:          "#FFFFFF",
  navBorder:    "rgba(120,80,255,0.10)",
  navActive:    "#6C47FF",
  navInactive:  "#B0ABDB",
  divider:      "rgba(120,80,255,0.08)",
  hlBg:         "rgba(255,209,102,0.35)",
  hlTxt:        "#7A4F00",
  codeBg:       "#EDE8FF",
  codeTxt:      "#4B2ECC",
  callBg:       "rgba(255,127,59,0.07)",
  callBdr:      "rgba(255,127,59,0.25)",
  callLeft:     "#FF7D3B",
  callTxt:      "#7A3800",
  remBg:        "rgba(59,158,255,0.07)",
  remBdr:       "rgba(59,158,255,0.25)",
  remLeft:      "#3B9EFF",
  remTxt:       "#003D7A",
  fmlBg:        "rgba(108,71,255,0.06)",
  fmlBdr:       "rgba(108,71,255,0.2)",
  fmlTxt:       "#4B2ECC",
  outBox:       "#F7F5FF",
  outBdr:       "rgba(120,80,255,0.12)",
  spinHead:     "#6C47FF",
  spinTrack:    "rgba(108,71,255,0.12)",
  eraseBtn:     "#9B97BF",
  infoTxt:      "#9B97BF",
};

const DARK = {
  bg:           "#0E0A1E",
  bgGrad:       "linear-gradient(145deg, #0E0A1E 0%, #0D1628 50%, #160A20 100%)",
  surface:      "#1A1333",
  surfaceAlt:   "#120D26",
  border:       "rgba(150,120,255,0.14)",
  borderHover:  "rgba(150,120,255,0.32)",
  text:         "#F0EEFF",
  textSub:      "#A89DD8",
  textFaint:    "#6B638F",
  accent:       "#8B5CF6",
  accentDark:   "#6C47FF",
  accentLight:  "rgba(139,92,246,0.18)",
  accentGlow:   "rgba(139,92,246,0.22)",
  pink:         "#FF6FBB",
  pinkLight:    "rgba(255,111,187,0.14)",
  teal:         "#00E5CC",
  tealLight:    "rgba(0,229,204,0.12)",
  orange:       "#FF9155",
  orangeLight:  "rgba(255,145,85,0.12)",
  yellow:       "#FFD166",
  yellowLight:  "rgba(255,209,102,0.12)",
  blue:         "#60AFFF",
  blueLight:    "rgba(96,175,255,0.12)",
  green:        "#4ADE80",
  greenLight:   "rgba(74,222,128,0.12)",
  pillOn:       "#8B5CF6",
  pillOff:      "rgba(139,92,246,0.12)",
  pillOnTxt:    "#FFFFFF",
  pillOffTxt:   "#A89DD8",
  inputBg:      "rgba(255,255,255,0.05)",
  inputBorder:  "rgba(150,120,255,0.2)",
  inputFocus:   "rgba(139,92,246,0.35)",
  btnGrad:      "linear-gradient(135deg, #8B5CF6 0%, #6C47FF 100%)",
  cardShadow:   "0 4px 24px rgba(0,0,0,0.4), 0 1px 4px rgba(0,0,0,0.3)",
  cardShadowLg: "0 16px 48px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.35)",
  nav:          "#1A1333",
  navBorder:    "rgba(150,120,255,0.12)",
  navActive:    "#8B5CF6",
  navInactive:  "#4B4470",
  divider:      "rgba(150,120,255,0.1)",
  hlBg:         "rgba(255,209,102,0.2)",
  hlTxt:        "#FFD166",
  codeBg:       "rgba(139,92,246,0.18)",
  codeTxt:      "#C4B5FD",
  callBg:       "rgba(255,145,85,0.08)",
  callBdr:      "rgba(255,145,85,0.25)",
  callLeft:     "#FF9155",
  callTxt:      "#FFD0A8",
  remBg:        "rgba(96,175,255,0.08)",
  remBdr:       "rgba(96,175,255,0.25)",
  remLeft:      "#60AFFF",
  remTxt:       "#B8D9FF",
  fmlBg:        "rgba(139,92,246,0.1)",
  fmlBdr:       "rgba(139,92,246,0.25)",
  fmlTxt:       "#C4B5FD",
  outBox:       "rgba(255,255,255,0.03)",
  outBdr:       "rgba(150,120,255,0.12)",
  spinHead:     "#8B5CF6",
  spinTrack:    "rgba(139,92,246,0.15)",
  eraseBtn:     "#6B638F",
  infoTxt:      "#6B638F",
};

// ─── DATA ──────────────────────────────────────────────────────────────────────
const TABS = [
  { id:"assignment", label:"Assignment", icon:"📝", color:"#6C47FF", lightColor:"#EDE8FF", darkColor:"rgba(108,71,255,0.18)" },
  { id:"solver",     label:"Solver",     icon:"🧮", color:"#FF4FA3", lightColor:"#FFE8F4", darkColor:"rgba(255,79,163,0.18)" },
  { id:"summarizer", label:"Notes",      icon:"✨", color:"#00C9B1", lightColor:"#D6FBF6", darkColor:"rgba(0,201,177,0.18)" },
  { id:"exam",       label:"Exam Prep",  icon:"🎯", color:"#FF7D3B", lightColor:"#FFF0E8", darkColor:"rgba(255,125,59,0.18)" },
  { id:"topper",     label:"Toppers",    icon:"🏆", color:"#FFD166", lightColor:"#FFF9E6", darkColor:"rgba(255,209,102,0.18)" },
  { id:"youtube",    label:"Classes",    icon:"▶️", color:"#3B9EFF", lightColor:"#E6F2FF", darkColor:"rgba(59,158,255,0.18)" },
];

const TOPPER_NOTES = {
  Physics:{
    JEE:[
      {chapter:"Kinematics",           source:"SelfStudys",  url:"https://www.selfstudys.com/books/jee-topper-notes/english/physics"},
      {chapter:"Laws of Motion",       source:"SelfStudys",  url:"https://www.selfstudys.com/books/jee-topper-notes/english/physics"},
      {chapter:"Work, Energy & Power", source:"JEEBooks",    url:"https://www.jeebooks.in/2020/09/handwritten-toppers-notes-for-jee-and-neet.html"},
      {chapter:"Rotational Motion",    source:"SelfStudys",  url:"https://www.selfstudys.com/books/jee-topper-notes/english/physics"},
      {chapter:"Thermodynamics",       source:"JEEBooks",    url:"https://www.jeebooks.in/2020/09/handwritten-toppers-notes-for-jee-and-neet.html"},
      {chapter:"Electrostatics",       source:"SelfStudys",  url:"https://www.selfstudys.com/books/jee-topper-notes/english/physics"},
      {chapter:"Magnetism",            source:"AajKaTopper", url:"https://aajkatopper.com/"},
      {chapter:"Modern Physics",       source:"SelfStudys",  url:"https://www.selfstudys.com/books/jee-topper-notes/english/physics"},
      {chapter:"Optics",               source:"JEEBooks",    url:"https://www.jeebooks.in/2020/09/handwritten-toppers-notes-for-jee-and-neet.html"},
    ],
    NEET:[
      {chapter:"Laws of Motion",      source:"SelfStudys",  url:"https://www.selfstudys.com/books/neet-topper-notes"},
      {chapter:"Thermodynamics",      source:"SelfStudys",  url:"https://www.selfstudys.com/books/neet-topper-notes"},
      {chapter:"Electrostatics",      source:"AajKaTopper", url:"https://aajkatopper.com/"},
      {chapter:"Current Electricity", source:"PW Notes",    url:"https://www.physicswallahnotes.net/"},
      {chapter:"Modern Physics",      source:"SelfStudys",  url:"https://www.selfstudys.com/books/neet-topper-notes"},
      {chapter:"Optics",              source:"AajKaTopper", url:"https://aajkatopper.com/"},
    ],
  },
  Chemistry:{
    JEE:[
      {chapter:"Mole Concept",           source:"SelfStudys", url:"https://www.selfstudys.com/books/jee-topper-notes/english/chemistry"},
      {chapter:"Chemical Bonding",       source:"Scribd",     url:"https://www.scribd.com/"},
      {chapter:"Thermodynamics",         source:"Scribd",     url:"https://www.scribd.com/"},
      {chapter:"Ionic Equilibrium",      source:"Scribd",     url:"https://www.scribd.com/"},
      {chapter:"GOC (Organic)",          source:"Scribd",     url:"https://www.scribd.com/"},
      {chapter:"Electrochemistry",       source:"JEEBooks",   url:"https://www.jeebooks.in/"},
      {chapter:"p-Block Elements",       source:"Scribd",     url:"https://www.scribd.com/"},
    ],
    NEET:[
      {chapter:"Mole Concept",     source:"SelfStudys", url:"https://www.selfstudys.com/books/neet-topper-notes"},
      {chapter:"Chemical Bonding", source:"Scribd",     url:"https://www.scribd.com/"},
      {chapter:"Thermodynamics",   source:"Scribd",     url:"https://www.scribd.com/"},
      {chapter:"Organic Chemistry",source:"PW Notes",   url:"https://www.physicswallahnotes.net/"},
    ],
  },
  Maths:{
    JEE:[
      {chapter:"Limits & Continuity",    source:"SelfStudys", url:"https://www.selfstudys.com/books/jee-topper-notes/english/maths"},
      {chapter:"Differentiation",        source:"JEEBooks",   url:"https://www.jeebooks.in/"},
      {chapter:"Integration",            source:"SelfStudys", url:"https://www.selfstudys.com/books/jee-topper-notes/english/maths"},
      {chapter:"Matrices & Determinants",source:"SelfStudys", url:"https://www.selfstudys.com/books/jee-topper-notes/english/maths"},
      {chapter:"Probability",            source:"JEEBooks",   url:"https://www.jeebooks.in/"},
      {chapter:"Conic Sections",         source:"SelfStudys", url:"https://www.selfstudys.com/books/jee-topper-notes/english/maths"},
      {chapter:"Vectors & 3D",           source:"JEEBooks",   url:"https://www.jeebooks.in/"},
    ],
    NEET:[],
  },
  Biology:{
    NEET:[
      {chapter:"Cell Structure",   source:"SelfStudys",  url:"https://www.selfstudys.com/books/neet-topper-notes"},
      {chapter:"Cell Division",    source:"AajKaTopper", url:"https://aajkatopper.com/"},
      {chapter:"Photosynthesis",   source:"SelfStudys",  url:"https://www.selfstudys.com/books/neet-topper-notes"},
      {chapter:"Human Physiology", source:"SelfStudys",  url:"https://www.selfstudys.com/books/neet-topper-notes"},
      {chapter:"Genetics",         source:"AajKaTopper", url:"https://aajkatopper.com/"},
      {chapter:"Evolution",        source:"SelfStudys",  url:"https://www.selfstudys.com/books/neet-topper-notes"},
      {chapter:"Ecology",          source:"PW Notes",    url:"https://www.physicswallahnotes.net/"},
    ],
    JEE:[],
  },
};

// ─── GROQ CALLER (unchanged) ──────────────────────────────────────────────────
async function callGroq(system, user) {
  const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method:"POST",
    headers:{"Content-Type":"application/json","Authorization":"Bearer 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"},
    body: JSON.stringify({
      model:"llama3-8b-8192",
      messages:[{role:"system",content:system},{role:"user",content:user}],
      temperature:0.7, max_tokens:3000,
    }),
  });
  if (!r.ok) throw new Error("API error");
  const d = await r.json();
  return d.choices?.[0]?.message?.content || "";
}

// ─── SPINNER ──────────────────────────────────────────────────────────────────
function Spinner() {
  const { T } = useTheme();
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:12, padding:"24px 0" }}>
      <div style={{
        width:36, height:36, borderRadius:"50%",
        border:`3px solid ${T.spinTrack}`,
        borderTopColor: T.spinHead,
        animation:"spin .8s linear infinite"
      }}/>
      <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:13, color:T.textFaint }}>thinking…</span>
    </div>
  );
}

// ─── INLINE BOLD ──────────────────────────────────────────────────────────────
function inlineBold(text, T) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) =>
    p.startsWith("**") ? <strong key={i} style={{ color:T.text, fontWeight:700 }}>{p.replace(/\*\*/g,"")}</strong> : p
  );
}

// ─── RESULT BOX ──────────────────────────────────────────────────────────────
function renderMarkdown(text, T) {
  const lines = text.split("\n");
  const els = []; let key = 0;
  for (const line of lines) {
    const tr = line.trim();
    if (!tr) { els.push(<div key={key++} style={{height:8}}/>); continue; }
    if (/^##\s/.test(tr)) {
      els.push(<div key={key++} style={{margin:"18px 0 6px",paddingBottom:6,borderBottom:`1.5px solid ${T.divider}`}}>
        <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:17,color:T.text}}>{tr.replace(/^##\s/,"")}</span>
      </div>);
    } else if (/^#\s/.test(tr)) {
      els.push(<div key={key++} style={{margin:"22px 0 8px",paddingBottom:8,borderBottom:`2px solid ${T.accent}33`}}>
        <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:20,color:T.accent}}>{tr.replace(/^#\s/,"")}</span>
      </div>);
    } else if (/^[-•*]\s/.test(tr)) {
      const txt = tr.replace(/^[-•*]\s/,"");
      els.push(<div key={key++} style={{display:"flex",gap:10,marginBottom:5,paddingLeft:4}}>
        <span style={{color:T.accent,marginTop:4,flexShrink:0,fontSize:10}}>◆</span>
        <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:14,color:T.textSub,lineHeight:1.75}}>{inlineBold(txt,T)}</span>
      </div>);
    } else if (/^\d+\.\s/.test(tr)) {
      const num = tr.match(/^(\d+)\./)[1];
      const txt = tr.replace(/^\d+\.\s/,"");
      els.push(<div key={key++} style={{display:"flex",gap:10,marginBottom:5,paddingLeft:4}}>
        <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:12,color:T.accent,marginTop:3,flexShrink:0,minWidth:20,fontWeight:700}}>{num}.</span>
        <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:14,color:T.textSub,lineHeight:1.75}}>{inlineBold(txt,T)}</span>
      </div>);
    } else {
      els.push(<p key={key++} style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:14,color:T.textSub,lineHeight:1.85,marginBottom:5}}>{inlineBold(line,T)}</p>);
    }
  }
  return els;
}

function ResultBox({ text }) {
  const { T } = useTheme();
  const [copied, setCopied] = useState(false);
  return (
    <div style={{ marginTop:20 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ width:8, height:8, borderRadius:"50%", background:T.accent }}/>
          <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:12, color:T.textFaint, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.08em" }}>Output</span>
        </div>
        <button onClick={()=>{ navigator.clipboard.writeText(text); setCopied(true); setTimeout(()=>setCopied(false),2000); }}
          style={{ background:copied?T.accent:"transparent", border:`1.5px solid ${copied?T.accent:T.outBdr}`, borderRadius:8, padding:"5px 16px", fontSize:12,
            cursor:"pointer", fontFamily:"'Plus Jakarta Sans',sans-serif", color:copied?"#fff":T.eraseBtn, fontWeight:600, transition:"all .2s" }}>
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </div>
      <div style={{ background:T.outBox, border:`1.5px solid ${T.outBdr}`, borderRadius:16, padding:"20px 22px" }}>
        {renderMarkdown(text, T)}
      </div>
    </div>
  );
}

// ─── FORM PRIMITIVES ─────────────────────────────────────────────────────────
function useS() {
  const { T } = useTheme();
  return {
    label: { display:"block", marginBottom:8, fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:12, color:T.textFaint, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase" },
    input: { width:"100%", padding:"13px 16px", border:`1.5px solid ${T.inputBorder}`, borderRadius:14, fontSize:14, fontFamily:"'Plus Jakarta Sans',sans-serif", color:T.text, background:T.inputBg, outline:"none", boxSizing:"border-box" },
    btn:   { width:"100%", padding:"15px", borderRadius:14, border:"none", background:T.btnGrad, color:"#fff", fontSize:15, fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, cursor:"pointer", letterSpacing:"0.02em", boxShadow:`0 6px 20px ${T.accentGlow}` },
    err:   { color:"#EF4444", fontSize:12, fontFamily:"'Plus Jakarta Sans',sans-serif", marginTop:8, fontWeight:600 },
  };
}

function Field({ label, children }) {
  const S = useS();
  return <div><label style={S.label}>{label}</label>{children}</div>;
}

function PillGroup({ options, value, onChange }) {
  const { T } = useTheme();
  return (
    <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
      {options.map(([val, lbl]) => (
        <button key={val} onClick={()=>onChange(val)} style={{
          padding:"9px 18px", borderRadius:50, fontSize:13, cursor:"pointer",
          fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700,
          border:`1.5px solid ${value===val ? T.accent : T.border}`,
          background: value===val ? T.accent : T.pillOff,
          color: value===val ? "#fff" : T.textSub,
          transition:"all .18s",
        }}>{lbl}</button>
      ))}
    </div>
  );
}

// ─── TABS ─────────────────────────────────────────────────────────────────────
function AssignmentTab() {
  const S = useS();
  const [topic, setTopic] = useState(""); const [subject, setSubject] = useState(""); const [words, setWords] = useState("500");
  const [result, setResult] = useState(""); const [loading, setLoading] = useState(false); const [error, setError] = useState("");
  const run = async () => {
    if (!topic.trim()) return; setLoading(true); setError(""); setResult("");
    try { setResult(await callGroq("You are an expert academic writer. Write well-structured, plagiarism-free assignments with proper headings, introduction, body, and conclusion.",
      `Write a complete assignment on: "${topic}"\nSubject: ${subject||"General"}\nWord count: ~${words} words\nInclude: Introduction, main sections with headings, Conclusion.`)); }
    catch { setError("Something went wrong. Try again."); } setLoading(false);
  };
  return (
    <div style={{ display:"grid", gap:20 }}>
      <Field label="Topic *"><input style={S.input} placeholder="e.g. Impact of Social Media on Mental Health" value={topic} onChange={e=>setTopic(e.target.value)}/></Field>
      <Field label="Subject"><input style={S.input} placeholder="e.g. Psychology, Physics…" value={subject} onChange={e=>setSubject(e.target.value)}/></Field>
      <Field label="Length">
        <PillGroup options={[["300","Short (~300w)"],["500","Medium (~500w)"],["800","Detailed (~800w)"],["1200","Long (~1200w)"]]} value={words} onChange={setWords}/>
      </Field>
      <button style={S.btn} onClick={run} disabled={loading||!topic.trim()}>{loading ? "Writing…" : "Generate Assignment →"}</button>
      {error && <p style={S.err}>{error}</p>}
      {loading && <Spinner/>}
      {result && <ResultBox text={result}/>}
    </div>
  );
}

function SolverTab() {
  const S = useS();
  const [q, setQ] = useState(""); const [level, setLevel] = useState("high school");
  const [result, setResult] = useState(""); const [loading, setLoading] = useState(false); const [error, setError] = useState("");
  const run = async () => {
    if (!q.trim()) return; setLoading(true); setError(""); setResult("");
    try { setResult(await callGroq(`You are a brilliant patient tutor for ${level} students. Show step-by-step solutions. Explain WHY each step works.`, `Solve step-by-step:\n\n${q}`)); }
    catch { setError("Something went wrong. Try again."); } setLoading(false);
  };
  return (
    <div style={{ display:"grid", gap:20 }}>
      <Field label="Your Question *"><textarea style={{...S.input,minHeight:130,resize:"vertical"}} placeholder="Paste any question — math, physics, chemistry, anything…" value={q} onChange={e=>setQ(e.target.value)}/></Field>
      <Field label="Level">
        <PillGroup options={[["middle school","Middle School"],["high school","High School"],["undergraduate","Undergrad"],["competitive exam (JEE/NEET)","JEE / NEET"]]} value={level} onChange={setLevel}/>
      </Field>
      <button style={S.btn} onClick={run} disabled={loading||!q.trim()}>{loading ? "Solving…" : "Solve This →"}</button>
      {error && <p style={S.err}>{error}</p>}
      {loading && <Spinner/>}
      {result && <ResultBox text={result}/>}
    </div>
  );
}

function SummarizerTab() {
  const S = useS();
  const [text, setText] = useState(""); const [chapter, setChapter] = useState("");
  const [result, setResult] = useState(""); const [loading, setLoading] = useState(false); const [error, setError] = useState("");
  const run = async () => {
    if (!text.trim() && !chapter.trim()) return; setLoading(true); setError(""); setResult("");
    const prompt = chapter.trim() ? `Create comprehensive, exam-focused study notes for: "${chapter}"` : `Create structured study notes from this content:\n\n${text}`;
    try { setResult(await callGroq("You are an elite study notes creator. Produce detailed, exam-focused notes with clear headings, key concepts, formulas, and important points.", prompt)); }
    catch { setError("Something went wrong. Try again."); } setLoading(false);
  };
  return (
    <div style={{ display:"grid", gap:20 }}>
      <Field label="Chapter / Topic Name"><input style={S.input} placeholder="e.g. Electrostatics, French Revolution…" value={chapter} onChange={e=>setChapter(e.target.value)}/></Field>
      <Field label="Or Paste Content"><textarea style={{...S.input,minHeight:120,resize:"vertical"}} placeholder="Paste text you want converted into notes…" value={text} onChange={e=>setText(e.target.value)}/></Field>
      <button style={S.btn} onClick={run} disabled={loading||(!text.trim()&&!chapter.trim())}>{loading ? "Creating notes…" : "Create Rich Notes →"}</button>
      {error && <p style={S.err}>{error}</p>}
      {loading && <Spinner/>}
      {result && <ResultBox text={result}/>}
    </div>
  );
}

function ExamPrepTab() {
  const S = useS();
  const [subject, setSubject] = useState(""); const [exam, setExam] = useState("JEE"); const [type, setType] = useState("mcq");
  const [result, setResult] = useState(""); const [loading, setLoading] = useState(false); const [error, setError] = useState("");
  const run = async () => {
    if (!subject.trim()) return; setLoading(true); setError(""); setResult("");
    const prompt = type==="mcq"
      ? `Create 10 high-quality MCQs on "${subject}" for ${exam}. Each: question, 4 options (A-D), correct answer, brief explanation.`
      : `Create 10 important ${type==="short"?"short answer":"long answer"} questions on "${subject}" for ${exam} with ideal answers.`;
    try { setResult(await callGroq(`You are an expert ${exam} preparation coach. Create exam-standard questions.`, prompt)); }
    catch { setError("Something went wrong. Try again."); } setLoading(false);
  };
  return (
    <div style={{ display:"grid", gap:20 }}>
      <Field label="Subject / Chapter *"><input style={S.input} placeholder="e.g. Organic Chemistry, Integration…" value={subject} onChange={e=>setSubject(e.target.value)}/></Field>
      <Field label="Exam"><PillGroup options={[["JEE","JEE"],["NEET","NEET"],["CBSE","CBSE"],["Other","Other"]]} value={exam} onChange={setExam}/></Field>
      <Field label="Question Type"><PillGroup options={[["mcq","MCQs"],["short","Short Ans"],["long","Long Ans"]]} value={type} onChange={setType}/></Field>
      <button style={S.btn} onClick={run} disabled={loading||!subject.trim()}>{loading ? "Generating…" : "Generate Questions →"}</button>
      {error && <p style={S.err}>{error}</p>}
      {loading && <Spinner/>}
      {result && <ResultBox text={result}/>}
    </div>
  );
}

function TopperNotesTab() {
  const { T } = useTheme();
  const [subject, setSubject] = useState("Physics");
  const [exam, setExam] = useState("JEE");
  const subjects = Object.keys(TOPPER_NOTES);
  const subjectData = TOPPER_NOTES[subject] || {};
  const exams = Object.keys(subjectData).filter(e => (subjectData[e]||[]).length > 0);
  const activeExam = exams.includes(exam) ? exam : exams[0];
  const notes = (subjectData[activeExam] || []);

  return (
    <div style={{ display:"grid", gap:20 }}>
      <div>
        <label style={{ display:"block", marginBottom:8, fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:12, color:T.textFaint, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase" }}>Subject</label>
        <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
          {subjects.map(s => (
            <button key={s} onClick={()=>setSubject(s)} style={{
              padding:"9px 18px", borderRadius:50, fontSize:13, cursor:"pointer",
              fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, border:`1.5px solid ${subject===s ? T.accent : T.border}`,
              background: subject===s ? T.accent : T.pillOff, color: subject===s ? "#fff" : T.textSub, transition:"all .18s",
            }}>{s}</button>
          ))}
        </div>
      </div>
      {exams.length > 1 && (
        <div>
          <label style={{ display:"block", marginBottom:8, fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:12, color:T.textFaint, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase" }}>Exam</label>
          <div style={{ display:"flex", gap:8 }}>
            {exams.map(e => (
              <button key={e} onClick={()=>setExam(e)} style={{
                padding:"9px 20px", borderRadius:50, fontSize:13, cursor:"pointer",
                fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, border:`1.5px solid ${activeExam===e ? T.accent : T.border}`,
                background: activeExam===e ? T.accent : T.pillOff, color: activeExam===e ? "#fff" : T.textSub, transition:"all .18s",
              }}>{e}</button>
            ))}
          </div>
        </div>
      )}
      <div style={{ display:"grid", gap:10 }}>
        {notes.length === 0
          ? <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:14, color:T.textFaint, textAlign:"center", padding:"24px 0" }}>No notes available for this combination.</p>
          : notes.map((note, i) => (
            <a key={i} href={note.url} target="_blank" rel="noopener noreferrer" style={{
              display:"flex", alignItems:"center", justifyContent:"space-between",
              padding:"14px 18px", border:`1.5px solid ${T.border}`, borderRadius:14, textDecoration:"none",
              background:T.surface, transition:"all .2s", gap:12,
            }}>
              <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                <div style={{ width:8, height:8, borderRadius:"50%", background:T.accent, flexShrink:0 }}/>
                <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:600, fontSize:14, color:T.text }}>{note.chapter}</span>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:11, color:T.textFaint }}>{note.source}</span>
                <span style={{ color:T.accent, fontSize:14 }}>→</span>
              </div>
            </a>
          ))
        }
      </div>
    </div>
  );
}

function YoutubeTab() {
  const S = useS();
  const { T } = useTheme();
  const [subject, setSubject] = useState(""); const [exam, setExam] = useState("JEE");
  const [data, setData] = useState(null); const [loading, setLoading] = useState(false); const [error, setError] = useState("");
  const run = async () => {
    if (!subject.trim()) return; setLoading(true); setError(""); setData(null);
    try {
      const raw = await callGroq("You are an expert in Indian competitive exam preparation. Return ONLY valid JSON, no markdown.",
        `Return a JSON object {exam:"${exam}",channels:[{name,url,desc,badge}]} with 4 best free YouTube channels for "${subject}" for ${exam}. Use real channel names and YouTube URLs. Badge: "#1" for best, "#2","#3","#4" for others.`);
      const clean = raw.replace(/```json|```/g,"").trim();
      setData(JSON.parse(clean));
    } catch { setError("Couldn't load recommendations. Try again."); } setLoading(false);
  };
  return (
    <div style={{ display:"grid", gap:20 }}>
      <Field label="Subject / Topic *"><input style={S.input} placeholder="e.g. Physical Chemistry, Calculus…" value={subject} onChange={e=>setSubject(e.target.value)}/></Field>
      <Field label="Exam"><PillGroup options={[["JEE","JEE"],["NEET","NEET"],["CBSE","CBSE"]]} value={exam} onChange={setExam}/></Field>
      <button style={S.btn} onClick={run} disabled={loading||!subject.trim()}>{loading ? "Finding…" : "Find Best Channels →"}</button>
      {error && <p style={S.err}>{error}</p>}
      {loading && <Spinner/>}
      {data && (
        <div style={{ display:"grid", gap:10 }}>
          {data.channels?.map((ch, i) => (
            <a key={i} href={ch.url} target="_blank" rel="noopener noreferrer"
              style={{ display:"block", padding:"18px 20px", border:`1.5px solid ${T.border}`, borderRadius:16, textDecoration:"none", background:T.surface, transition:"all .2s" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8, gap:12 }}>
                <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, fontSize:15, color:T.text, lineHeight:1.3 }}>{ch.name}</p>
                <span style={{
                  background: ch.badge==="#1" ? T.accent : "transparent",
                  border:`1.5px solid ${ch.badge==="#1" ? T.accent : T.border}`,
                  borderRadius:20, padding:"3px 10px", fontSize:11, fontFamily:"'Plus Jakarta Sans',sans-serif",
                  color: ch.badge==="#1" ? "#fff" : T.textFaint, fontWeight:700, flexShrink:0
                }}>{ch.badge}</span>
              </div>
              <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:13, color:T.textSub, lineHeight:1.65, marginBottom:12 }}>{ch.desc}</p>
              <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:12, color:T.accent, fontWeight:600 }}>↗ Open on YouTube</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── HOME SCREEN ──────────────────────────────────────────────────────────────
function HomeScreen({ onSelectTab }) {
  const { T, theme } = useTheme();
  const isDark = theme === "dark";
  const stats = [
    { label:"Active Students", value:"50K+", icon:"👥" },
    { label:"Questions Solved", value:"2M+",  icon:"✅" },
    { label:"Notes Created",   value:"500K+", icon:"📚" },
  ];
  const subjectCards = [
    { label:"Physics",   icon:"⚛️",  color:"#6C47FF", bg: isDark ? "rgba(108,71,255,0.15)" : "#EDE8FF" },
    { label:"Chemistry", icon:"🧪", color:"#FF4FA3", bg: isDark ? "rgba(255,79,163,0.15)"  : "#FFE8F4" },
    { label:"Maths",     icon:"📐",  color:"#00C9B1", bg: isDark ? "rgba(0,201,177,0.15)"  : "#D6FBF6" },
    { label:"Biology",   icon:"🧬",  color:"#FF7D3B", bg: isDark ? "rgba(255,125,59,0.15)" : "#FFF0E8" },
  ];
  return (
    <div style={{ display:"grid", gap:24 }}>
      {/* Greeting */}
      <div>
        <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:13, color:T.textFaint, fontWeight:600, marginBottom:4 }}>Good morning! 👋</p>
        <h2 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:26, fontWeight:800, color:T.text, lineHeight:1.2, letterSpacing:"-0.02em" }}>
          Ready to crack<br/>
          <span style={{ background:T.btnGrad, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>JEE & NEET?</span>
        </h2>
      </div>

      {/* Stats Row */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
        {stats.map((s,i) => (
          <div key={i} style={{ background:T.surface, border:`1.5px solid ${T.border}`, borderRadius:16, padding:"14px 12px", textAlign:"center", boxShadow:T.cardShadow }}>
            <div style={{ fontSize:20, marginBottom:6 }}>{s.icon}</div>
            <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:800, fontSize:15, color:T.accent, marginBottom:3 }}>{s.value}</div>
            <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:10, color:T.textFaint, fontWeight:600, lineHeight:1.3 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tools Grid */}
      <div>
        <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:13, color:T.textFaint, fontWeight:700, marginBottom:12, textTransform:"uppercase", letterSpacing:"0.06em" }}>AI Tools</p>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          {TABS.map(tab => (
            <button key={tab.id} onClick={()=>onSelectTab(tab.id)} style={{
              display:"flex", alignItems:"center", gap:12, padding:"16px",
              background:T.surface, border:`1.5px solid ${T.border}`, borderRadius:18,
              cursor:"pointer", textAlign:"left", boxShadow:T.cardShadow, transition:"all .2s",
            }}>
              <div style={{ width:40, height:40, borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20,
                background: isDark ? tab.darkColor : tab.lightColor, flexShrink:0 }}>
                {tab.icon}
              </div>
              <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, fontSize:13, color:T.text, lineHeight:1.3 }}>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Subject Badges */}
      <div>
        <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:13, color:T.textFaint, fontWeight:700, marginBottom:12, textTransform:"uppercase", letterSpacing:"0.06em" }}>Subjects</p>
        <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
          {subjectCards.map((s,i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 16px", borderRadius:50, background:s.bg, border:`1.5px solid ${s.color}30` }}>
              <span style={{ fontSize:16 }}>{s.icon}</span>
              <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, fontSize:13, color:s.color }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState("home");
  const [theme, setTheme] = useState(() => { try { return localStorage.getItem("scalar-theme") || "light"; } catch { return "light"; } });
  const [mounted, setMounted] = useState(false);
  const T = theme === "dark" ? DARK : LIGHT;
  const isDark = theme === "dark";

  useEffect(() => { try { localStorage.setItem("scalar-theme", theme); } catch {} document.body.style.background = T.bg; }, [theme, T.bg]);
  useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);

  const panels = {
    home: <HomeScreen onSelectTab={setActive}/>,
    assignment: <AssignmentTab/>,
    solver: <SolverTab/>,
    summarizer: <SummarizerTab/>,
    exam: <ExamPrepTab/>,
    topper: <TopperNotesTab/>,
    youtube: <YoutubeTab/>,
  };

  const navTabs = [
    { id:"home",   label:"Home",   icon:"🏠" },
    ...TABS,
  ];

  // Active tab info for header
  const activeTab = navTabs.find(t => t.id === active);

  return (
    <ThemeCtx.Provider value={{ theme, T }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{background:${T.bg};overflow-x:hidden;}
        ::selection{background:${T.accentGlow};}
        input,textarea{color-scheme:${isDark?"dark":"light"};}
        input::placeholder,textarea::placeholder{color:${T.textFaint}!important;}
        input:focus,textarea:focus{
          border-color:${T.accent}!important;
          box-shadow:0 0 0 3px ${T.accentGlow};
          outline:none;
        }
        button:disabled{opacity:0.4;cursor:not-allowed;}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        .panel-enter{animation:fadeUp .22s ease both;}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-track{background:transparent;}
        ::-webkit-scrollbar-thumb{background:${T.border};border-radius:2px;}
        a:hover{opacity:0.85;}
      `}</style>

      {/* Background blobs */}
      <div style={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none", background:T.bgGrad }}/>
      <div style={{ position:"fixed", top:"-10%", left:"-10%", width:"60%", height:"60%", borderRadius:"50%", background: isDark ? "rgba(139,92,246,0.07)" : "rgba(108,71,255,0.08)", filter:"blur(80px)", pointerEvents:"none", zIndex:0 }}/>
      <div style={{ position:"fixed", bottom:"-10%", right:"-10%", width:"55%", height:"55%", borderRadius:"50%", background: isDark ? "rgba(255,79,163,0.06)" : "rgba(255,79,163,0.07)", filter:"blur(80px)", pointerEvents:"none", zIndex:0 }}/>

      {/* MAIN SCROLL AREA */}
      <div style={{
        position:"relative", zIndex:5, minHeight:"100vh",
        display:"flex", flexDirection:"column", alignItems:"center",
        padding:"0 0 100px", opacity: mounted ? 1 : 0, transition:"opacity .4s ease",
      }}>

        {/* HEADER */}
        <div style={{
          width:"100%", maxWidth:480,
          padding:"20px 20px 0",
          position:"sticky", top:0, zIndex:20,
        }}>
          <div style={{
            display:"flex", alignItems:"center", justifyContent:"space-between",
            background: isDark ? "rgba(26,19,51,0.85)" : "rgba(255,255,255,0.85)",
            backdropFilter:"blur(20px)", borderRadius:20, padding:"12px 16px",
            border:`1.5px solid ${T.border}`, boxShadow:T.cardShadow,
            marginBottom:20,
          }}>
            {/* Logo */}
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ width:36, height:36, borderRadius:10, background:T.btnGrad, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:`0 4px 12px ${T.accentGlow}` }}>
                <span style={{ fontSize:18, lineHeight:1 }}>⚡</span>
              </div>
              <div>
                <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:800, fontSize:17, color:T.text, letterSpacing:"-0.02em", lineHeight:1 }}>Scalar</div>
                <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:10, color:T.textFaint, fontWeight:600 }}>AI Study Platform</div>
              </div>
            </div>
            {/* Theme toggle */}
            <button onClick={()=>setTheme(isDark?"light":"dark")} style={{
              width:36, height:36, borderRadius:10, border:`1.5px solid ${T.border}`,
              background:T.surface, cursor:"pointer", fontSize:16, display:"flex", alignItems:"center", justifyContent:"center"
            }}>{isDark ? "☀️" : "🌙"}</button>
          </div>

          {/* Page Title (non-home) */}
          {active !== "home" && (
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16, paddingBottom:16, borderBottom:`1.5px solid ${T.divider}` }}>
              <button onClick={()=>setActive("home")} style={{ background:"transparent", border:`1.5px solid ${T.border}`, borderRadius:10, width:34, height:34, cursor:"pointer", fontSize:16, display:"flex", alignItems:"center", justifyContent:"center", color:T.text }}>←</button>
              <div style={{ width:36, height:36, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18,
                background: activeTab?.id !== "home" ? (isDark ? activeTab?.darkColor : activeTab?.lightColor) : T.accentLight }}>
                {activeTab?.icon}
              </div>
              <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:800, fontSize:18, color:T.text }}>{activeTab?.label}</span>
            </div>
          )}
        </div>

        {/* CONTENT CARD */}
        <div style={{
          background: isDark ? "rgba(26,19,51,0.75)" : "rgba(255,255,255,0.85)",
          backdropFilter:"blur(20px)",
          width:"100%", maxWidth:480,
          borderRadius: active==="home" ? 0 : 24,
          padding: active==="home" ? "0 20px" : "24px 20px",
          border: active==="home" ? "none" : `1.5px solid ${T.border}`,
          boxShadow: active==="home" ? "none" : T.cardShadowLg,
          marginLeft:0, marginRight:0,
        }}>
          <div key={active} className="panel-enter">
            {panels[active]}
          </div>
        </div>

        {/* Powered by */}
        <p style={{ marginTop:20, fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:11, color:T.textFaint, fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase" }}>
          Powered by Groq
        </p>
      </div>

      {/* BOTTOM NAV */}
      <nav style={{
        position:"fixed", bottom:0, left:0, right:0, zIndex:50,
        background: isDark ? "rgba(14,10,30,0.92)" : "rgba(255,255,255,0.92)",
        backdropFilter:"blur(24px)",
        borderTop:`1.5px solid ${T.navBorder}`,
        display:"flex", justifyContent:"space-around", alignItems:"stretch",
        paddingBottom:"env(safe-area-inset-bottom,0px)",
        boxShadow: isDark ? "0 -8px 32px rgba(0,0,0,0.4)" : "0 -4px 20px rgba(108,71,255,0.08)",
      }}>
        {navTabs.map(tab => {
          const on = active === tab.id;
          const tabColor = tab.color || T.accent;
          return (
            <button key={tab.id} onClick={()=>setActive(tab.id)} style={{
              flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
              gap:5, padding:"12px 2px 14px", border:"none", background:"transparent", cursor:"pointer", minWidth:0,
            }}>
              <div style={{
                width:40, height:40, borderRadius:13, display:"flex", alignItems:"center", justifyContent:"center", fontSize:19,
                background: on ? (isDark ? `${tabColor}28` : `${tabColor}18`) : "transparent",
                transition:"all .2s",
              }}>
                {tab.icon}
              </div>
              <span style={{
                fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:9.5, letterSpacing:"0.02em",
                whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", maxWidth:"90%",
                color: on ? tabColor : T.navInactive, fontWeight: on ? 800 : 600, transition:"color .2s",
              }}>{tab.label}</span>
              {on && <div style={{ width:4, height:4, borderRadius:"50%", background:tabColor, marginTop:-2 }}/>}
            </button>
          );
        })}
      </nav>
    </ThemeCtx.Provider>
  );
}
