import { useState, useEffect, useRef, createContext, useContext } from "react";

// ─── THEME CONTEXT ────────────────────────────────────────────────────────────
const ThemeCtx = createContext({ theme:"dark", T:{} });
const useTheme = () => useContext(ThemeCtx);

// Dark theme tokens
const DARK = {
  bg:          "#060608",
  card:        "rgba(12,12,12,0.97)",
  cardBorder:  "rgba(255,255,255,0.08)",
  nav:         "rgba(5,5,5,0.97)",
  navBorder:   "rgba(255,255,255,0.08)",
  text:        "rgba(255,255,255,0.88)",
  textSub:     "rgba(255,255,255,0.45)",
  textFaint:   "rgba(255,255,255,0.25)",
  inputBg:     "rgba(255,255,255,0.05)",
  inputBorder: "rgba(255,255,255,0.09)",
  inputText:   "rgba(255,255,255,0.85)",
  pillOn:      "rgba(255,255,255,0.15)",
  pillOnBdr:   "rgba(255,255,255,0.5)",
  pillOff:     "rgba(255,255,255,0.04)",
  pillOffBdr:  "rgba(255,255,255,0.1)",
  pillOnTxt:   "#fff",
  pillOffTxt:  "rgba(255,255,255,0.4)",
  btnBg:       "rgba(255,255,255,0.1)",
  btnBdr:      "rgba(255,255,255,0.15)",
  btnTxt:      "rgba(255,255,255,0.9)",
  outBox:      "rgba(255,255,255,0.03)",
  outBdr:      "rgba(255,255,255,0.07)",
  hlBg:        "rgba(255,220,50,0.22)",
  hlTxt:       "rgba(255,230,100,0.95)",
  codeBg:      "rgba(255,255,255,0.08)",
  codeTxt:     "rgba(180,220,255,0.9)",
  callBg:      "rgba(255,200,50,0.06)",
  callBdr:     "rgba(255,200,50,0.18)",
  callLeft:    "rgba(255,200,50,0.6)",
  callTxt:     "rgba(255,230,130,0.9)",
  remBg:       "rgba(100,180,255,0.05)",
  remBdr:      "rgba(100,180,255,0.15)",
  remLeft:     "rgba(100,180,255,0.5)",
  remTxt:      "rgba(150,210,255,0.9)",
  fmlBg:       "rgba(255,255,255,0.04)",
  fmlBdr:      "rgba(255,255,255,0.1)",
  fmlTxt:      "rgba(200,240,200,0.9)",
  fcBg:        "rgba(255,255,255,0.03)",
  fcBdr:       "rgba(255,255,255,0.07)",
  fcQ:         "rgba(255,255,255,0.25)",
  fcQTxt:      "rgba(255,255,255,0.85)",
  fcA:         "rgba(100,200,255,0.4)",
  fcATxt:      "rgba(150,210,255,0.8)",
  divider:     "rgba(255,255,255,0.06)",
  infoBg:      "rgba(255,255,255,0.03)",
  infoBdr:     "rgba(255,255,255,0.07)",
  infoTxt:     "rgba(255,255,255,0.3)",
  notesBg:     "rgba(255,220,50,0.04)",
  notesBdr:    "rgba(255,220,50,0.1)",
  notesTxt:    "rgba(255,220,100,0.5)",
  topperRow:   "rgba(255,255,255,0.03)",
  topperBdr:   "rgba(255,255,255,0.07)",
  topperTxt:   "rgba(255,255,255,0.85)",
  topperSrc:   "rgba(255,255,255,0.25)",
  topperArrow: "rgba(255,255,255,0.25)",
  ytCardBg:    "rgba(255,255,255,0.03)",
  ytCardBdr:   "rgba(255,255,255,0.07)",
  ytName:      "rgba(255,255,255,0.9)",
  ytDesc:      "rgba(255,255,255,0.45)",
  ytLink:      "rgba(255,255,255,0.25)",
  ytBadge1Bg:  "rgba(255,255,255,0.12)",
  ytBadge1Bdr: "rgba(255,255,255,0.25)",
  ytBadge1Txt: "#fff",
  ytBadgeXBdr: "rgba(255,255,255,0.1)",
  ytBadgeXTxt: "rgba(255,255,255,0.35)",
  spinTrack:   "rgba(255,255,255,0.08)",
  spinHead:    "rgba(255,255,255,0.7)",
  spinTxt:     "rgba(255,255,255,0.35)",
  headerNum:   "rgba(255,255,255,0.18)",
  headerTitle: "rgba(255,255,255,0.88)",
  headerBdr:   "rgba(255,255,255,0.06)",
  badgeDot:    "rgba(255,255,255,0.6)",
  badgeTxt:    "rgba(255,255,255,0.35)",
  tagline:     "rgba(255,255,255,0.28)",
  featurePill: "rgba(255,255,255,0.28)",
  featureBdr:  "rgba(255,255,255,0.07)",
  featureBg:   "rgba(255,255,255,0.02)",
  navIconOn:   "rgba(255,255,255,0.95)",
  navIconOff:  "rgba(255,255,255,0.28)",
  navLblOn:    "rgba(255,255,255,0.9)",
  navLblOff:   "rgba(255,255,255,0.25)",
  navBubbleOn: "rgba(255,255,255,0.08)",
  navBubbleBdrOn: "rgba(255,255,255,0.15)",
  eraseBtn:    "rgba(255,255,255,0.35)",
  poweredBy:   "rgba(255,255,255,0.1)",
};

// Light theme tokens — clean, high contrast, LCD friendly, zero GPU effects
const LIGHT = {
  bg:          "#f5f5f7",
  card:        "#ffffff",
  cardBorder:  "#e0e0e5",
  nav:         "#ffffff",
  navBorder:   "#e0e0e5",
  text:        "#111114",
  textSub:     "#444450",
  textFaint:   "#999",
  inputBg:     "#f9f9fb",
  inputBorder: "#d0d0d8",
  inputText:   "#111114",
  pillOn:      "#111114",
  pillOnBdr:   "#111114",
  pillOff:     "#f0f0f4",
  pillOffBdr:  "#d0d0d8",
  pillOnTxt:   "#fff",
  pillOffTxt:  "#555560",
  btnBg:       "#111114",
  btnBdr:      "#111114",
  btnTxt:      "#fff",
  outBox:      "#f9f9fb",
  outBdr:      "#e0e0e5",
  hlBg:        "rgba(255,200,0,0.18)",
  hlTxt:       "#7a5500",
  codeBg:      "#eef2ff",
  codeTxt:     "#3040b0",
  callBg:      "#fffbea",
  callBdr:     "#f0d060",
  callLeft:    "#d09000",
  callTxt:     "#6a4d00",
  remBg:       "#eef6ff",
  remBdr:      "#90c0f0",
  remLeft:     "#1a70c0",
  remTxt:      "#0d3d70",
  fmlBg:       "#f0fff4",
  fmlBdr:      "#80d0a0",
  fmlTxt:      "#0d5030",
  fcBg:        "#f9f9fb",
  fcBdr:       "#e0e0e5",
  fcQ:         "#d09000",
  fcQTxt:      "#111114",
  fcA:         "#1a70c0",
  fcATxt:      "#0d3d70",
  divider:     "#e8e8ee",
  infoBg:      "#f5f5f7",
  infoBdr:     "#e0e0e5",
  infoTxt:     "#777",
  notesBg:     "#fffdf0",
  notesBdr:    "#f0d060",
  notesTxt:    "#7a5500",
  topperRow:   "#f9f9fb",
  topperBdr:   "#e0e0e5",
  topperTxt:   "#111114",
  topperSrc:   "#888",
  topperArrow: "#aaa",
  ytCardBg:    "#f9f9fb",
  ytCardBdr:   "#e0e0e5",
  ytName:      "#111114",
  ytDesc:      "#444450",
  ytLink:      "#888",
  ytBadge1Bg:  "#111114",
  ytBadge1Bdr: "#111114",
  ytBadge1Txt: "#fff",
  ytBadgeXBdr: "#d0d0d8",
  ytBadgeXTxt: "#555560",
  spinTrack:   "#e0e0e5",
  spinHead:    "#111114",
  spinTxt:     "#888",
  headerNum:   "#aaa",
  headerTitle: "#111114",
  headerBdr:   "#e8e8ee",
  badgeDot:    "#111114",
  badgeTxt:    "#777",
  tagline:     "#666",
  featurePill: "#555560",
  featureBdr:  "#d8d8e0",
  featureBg:   "#f5f5f7",
  navIconOn:   "#111114",
  navIconOff:  "#bbb",
  navLblOn:    "#111114",
  navLblOff:   "#bbb",
  navBubbleOn: "rgba(0,0,0,0.07)",
  navBubbleBdrOn: "rgba(0,0,0,0.15)",
  eraseBtn:    "#888",
  poweredBy:   "#bbb",
};

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
      {chapter:"Principles of Accounting",        source:"ICAI Study Material", url:"https://www.icai.org/post/ca-foundation-study-material"},
      {chapter:"Mercantile Law",                  source:"ICAI Study Material", url:"https://www.icai.org/post/ca-foundation-study-material"},
      {chapter:"Business Economics",              source:"ICAI Study Material", url:"https://www.icai.org/post/ca-foundation-study-material"},
      {chapter:"Business & Commercial Knowledge", source:"ICAI Study Material", url:"https://www.icai.org/post/ca-foundation-study-material"},
      {chapter:"Quantitative Aptitude",           source:"ICAI Study Material", url:"https://www.icai.org/post/ca-foundation-study-material"},
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
    {name:"Rajat Arora – Accounts", desc:"Most subscribed Accountancy channel in India. Crystal-clear concepts for Class 11, 12 & CA Foundation.", url:"https://www.youtube.com/@RajatAroraAccounts", badge:"#1"},
    {name:"Harsh Pokharna – Economics", desc:"Best Economics channel for Class 11 & 12 CBSE. Concept-first, diagram-heavy, super exam-relevant.", url:"https://www.youtube.com/@HarshPokharnaEconomics", badge:"#1"},
    {name:"Sunil Panda – Business Studies", desc:"Top BST channel for CBSE boards. Chapter-wise concise lectures with case studies. 500K+ students.", url:"https://www.youtube.com/@SunilPandaBST", badge:"Expert"},
    {name:"CA Wallah by PW", desc:"CA Foundation, Inter & Final by Physics Wallah. Free lectures for Accounts, Law, Economics & Maths.", url:"https://www.youtube.com/@CAWallah", badge:"CA Pick"},
  ]},
];

// ─── AI ───────────────────────────────────────────────────────────────────────
async function callGroq(sys, msg) {
  const r = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ system: sys, message: msg }),
  });
  const d = await r.json();
  if (d.error) throw new Error(d.error);
  return d.text;
}

// ─── MICRO COMPONENTS ─────────────────────────────────────────────────────────
function Spinner() {
  const { T } = useTheme();
  return (
    <div style={{display:"flex",alignItems:"center",gap:14,padding:"36px 0"}}>
      <div style={{position:"relative",width:22,height:22}}>
        <div style={{position:"absolute",inset:0,borderRadius:"50%",border:`2px solid ${T.spinTrack}`}}/>
        <div style={{position:"absolute",inset:0,borderRadius:"50%",border:"2px solid transparent",borderTopColor:T.spinHead,animation:"spin .7s linear infinite"}}/>
      </div>
      <span style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.spinTxt,letterSpacing:"0.1em"}}>processing...</span>
    </div>
  );
}

// ─── RICH ASSIGNMENT RENDERER ─────────────────────────────────────────────────
function inlineBold(text, T) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) =>
    /^\*\*/.test(p)
      ? <strong key={i} style={{color:T.text,fontWeight:700}}>{p.replace(/\*\*/g,"")}</strong>
      : p
  );
}

function renderAssignmentText(text, T) {
  const lines = text.split("\n");
  const els = [];
  let key = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const tr = line.trim();
    if (!tr) { els.push(<div key={key++} style={{height:8}}/>); continue; }
    if (/^#{1,2}\s/.test(tr)) {
      const txt = tr.replace(/^#{1,2}\s/,"");
      els.push(<div key={key++} style={{margin:"20px 0 8px",paddingBottom:7,borderBottom:`1px solid ${T.divider}`}}>
        <span style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:700,fontSize:19,color:T.text,letterSpacing:"-0.01em"}}>{txt}</span>
      </div>);
      continue;
    }
    if (/^###\s/.test(tr)) {
      const txt = tr.replace(/^###\s/,"");
      els.push(<div key={key++} style={{margin:"14px 0 5px"}}>
        <span style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:15,color:T.text}}>{txt}</span>
      </div>);
      continue;
    }
    if (/^\*\*[^*]+\*\*:?$/.test(tr)) {
      const txt = tr.replace(/\*\*/g,"").replace(/:$/,"");
      els.push(<div key={key++} style={{margin:"16px 0 6px",paddingBottom:5,borderBottom:`1px solid ${T.divider}`}}>
        <span style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:15,color:T.callTxt}}>{txt}</span>
      </div>);
      continue;
    }
    if (/^[-•*]\s/.test(tr)) {
      const txt = tr.replace(/^[-•*]\s/,"");
      els.push(<div key={key++} style={{display:"flex",gap:10,marginBottom:5,paddingLeft:4}}>
        <span style={{color:T.callLeft,marginTop:3,flexShrink:0,fontSize:11}}>◆</span>
        <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:14,color:T.text,lineHeight:1.75}}>{inlineBold(txt,T)}</span>
      </div>);
      continue;
    }
    if (/^\d+\.\s/.test(tr)) {
      const num = tr.match(/^(\d+)\./)[1];
      const txt = tr.replace(/^\d+\.\s/,"");
      els.push(<div key={key++} style={{display:"flex",gap:10,marginBottom:5,paddingLeft:4}}>
        <span style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:T.callLeft,marginTop:3,flexShrink:0,minWidth:18,fontWeight:600}}>{num}.</span>
        <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:14,color:T.text,lineHeight:1.75}}>{inlineBold(txt,T)}</span>
      </div>);
      continue;
    }
    if (tr === tr.toUpperCase() && tr.length > 3 && tr.length < 60 && /[A-Z]/.test(tr)) {
      els.push(<div key={key++} style={{margin:"18px 0 7px",paddingBottom:5,borderBottom:`1px solid ${T.callBdr}`}}>
        <span style={{fontFamily:"'DM Mono',monospace",fontSize:11,letterSpacing:"0.18em",color:T.callLeft,fontWeight:600}}>{tr}</span>
      </div>);
      continue;
    }
    els.push(<p key={key++} style={{fontFamily:"'DM Sans',sans-serif",fontSize:14,color:T.textSub,lineHeight:1.85,marginBottom:5}}>{inlineBold(line,T)}</p>);
  }
  return els;
}

function ResultBox({text}) {
  const { T } = useTheme();
  const [copied,setCopied]=useState(false);
  return (
    <div style={{marginTop:24}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:6,height:6,borderRadius:"50%",background:T.callLeft}}/>
          <span style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:T.textSub,letterSpacing:"0.15em",textTransform:"uppercase"}}>output</span>
        </div>
        <button onClick={()=>{navigator.clipboard.writeText(text);setCopied(true);setTimeout(()=>setCopied(false),2000);}} style={{
          background:copied?T.pillOn:"transparent",
          border:`1px solid ${copied?T.pillOnBdr:T.outBdr}`,
          borderRadius:6,padding:"4px 14px",fontSize:11,cursor:"pointer",
          fontFamily:"'DM Mono',monospace",color:copied?T.pillOnTxt:T.eraseBtn,
          transition:"all .2s",letterSpacing:"0.06em"
        }}>{copied?"copied ✓":"copy"}</button>
      </div>
      <div style={{background:T.outBox,border:`1px solid ${T.outBdr}`,borderRadius:12,padding:"20px 22px"}}>
        {renderAssignmentText(text,T)}
      </div>
    </div>
  );
}

// ─── THEME-AWARE STYLES ───────────────────────────────────────────────────────
function useS() {
  const { T } = useTheme();
  return {
    label: {display:"block",marginBottom:8,fontFamily:"'DM Mono',monospace",fontSize:10,color:T.textFaint,letterSpacing:"0.15em",textTransform:"uppercase"},
    input: {width:"100%",padding:"12px 16px",border:`1px solid ${T.inputBorder}`,borderRadius:10,fontSize:14,fontFamily:"'DM Sans',sans-serif",color:T.inputText,background:T.inputBg,outline:"none",boxSizing:"border-box",caretColor:T.text},
    btn:   {width:"100%",padding:"14px",borderRadius:10,border:`1px solid ${T.btnBdr}`,background:T.btnBg,color:T.btnTxt,fontSize:14,fontFamily:"'DM Sans',sans-serif",fontWeight:600,cursor:"pointer",letterSpacing:"0.04em"},
    err:   {color:"#e53e3e",fontSize:12,fontFamily:"'DM Mono',monospace",marginTop:8},
  };
}

function Field({label,children}){
  const S=useS();
  return <div><label style={S.label}>{label}</label>{children}</div>;
}

function PillGroup({options,value,onChange}){
  const { T }=useTheme();
  return(
    <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
      {options.map(([val,lbl])=>(
        <button key={val} onClick={()=>onChange(val)} style={{
          padding:"8px 18px",borderRadius:8,fontSize:13,cursor:"pointer",
          fontFamily:"'DM Sans',sans-serif",fontWeight:600,
          border:value===val?`1px solid ${T.pillOnBdr}`:`1px solid ${T.pillOffBdr}`,
          background:value===val?T.pillOn:T.pillOff,
          color:value===val?T.pillOnTxt:T.pillOffTxt,
        }}>{lbl}</button>
      ))}
    </div>
  );
}

function OptionGroup({options,value,onChange,wrap=false}){
  const { T }=useTheme();
  return(
    <div style={{display:"flex",gap:8,flexWrap:wrap?"wrap":"nowrap",overflowX:wrap?"visible":"auto",paddingBottom:2}}>
      {options.map(([val,lbl])=>(
        <button key={val} onClick={()=>onChange(val)} style={{
          padding:"10px 16px",borderRadius:9,fontSize:13,cursor:"pointer",
          fontFamily:"'DM Sans',sans-serif",fontWeight:600,whiteSpace:"nowrap",flexShrink:0,
          border:value===val?`1px solid ${T.pillOnBdr}`:`1px solid ${T.pillOffBdr}`,
          background:value===val?T.pillOn:T.pillOff,
          color:value===val?T.pillOnTxt:T.pillOffTxt,
        }}>{lbl}</button>
      ))}
    </div>
  );
}

// ─── AI TABS ──────────────────────────────────────────────────────────────────
function AssignmentTab(){
  const S=useS();
  const [topic,setTopic]=useState(""); const [subject,setSubject]=useState(""); const [words,setWords]=useState("500");
  const [result,setResult]=useState(""); const [loading,setLoading]=useState(false); const [error,setError]=useState("");
  const run=async()=>{
    if(!topic.trim())return; setLoading(true);setError("");setResult("");
    try{setResult(await callGroq("You are an expert academic writer. Write well-structured, plagiarism-free assignments with proper headings, introduction, body, and conclusion. Academic but student-appropriate tone.",`Write a complete assignment on: "${topic}"\nSubject: ${subject||"General"}\nWord count: ~${words} words\nInclude: Introduction, main sections with headings, Conclusion.`));}
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
  const S=useS();
  const [q,setQ]=useState(""); const [level,setLevel]=useState("high school");
  const [result,setResult]=useState(""); const [loading,setLoading]=useState(false); const [error,setError]=useState("");
  const run=async()=>{
    if(!q.trim())return; setLoading(true);setError("");setResult("");
    try{setResult(await callGroq(`You are a brilliant, patient tutor for ${level} students. Show step-by-step solutions. Explain WHY each step works. Give a clear final answer.`,`Solve this step-by-step:\n\n${q}`));}
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
  const { T }=useTheme();
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
      if(p.t==="hl") return <mark key={i} style={{background:T.hlBg,color:T.hlTxt,borderRadius:3,padding:"1px 4px",fontWeight:600}}>{p.v}</mark>;
      if(p.t==="bold") return <strong key={i} style={{color:T.text,fontWeight:700}}>{p.v}</strong>;
      if(p.t==="code") return <code key={i} style={{background:T.codeBg,color:T.codeTxt,borderRadius:4,padding:"1px 6px",fontFamily:"'DM Mono',monospace",fontSize:"0.9em"}}>{p.v}</code>;
      return <span key={i}>{p.v}</span>;
    })}</span>
  );
}

function NoteBlock({block}){
  const { T }=useTheme();
  const base={fontFamily:"'DM Sans',sans-serif",fontSize:14,lineHeight:1.75,color:T.textSub};
  if(block.type==="heading") return(
    <div style={{marginBottom:6,marginTop:18,paddingBottom:8,borderBottom:`1px solid ${T.divider}`}}>
      <span style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:700,fontSize:20,color:T.text,letterSpacing:"-0.01em"}}><HighlightText text={block.content}/></span>
    </div>
  );
  if(block.type==="subheading") return(
    <div style={{marginBottom:4,marginTop:14}}>
      <span style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:15,color:T.text,letterSpacing:"0.01em"}}><HighlightText text={block.content}/></span>
    </div>
  );
  if(block.type==="bullet") return(
    <div style={{display:"flex",gap:10,marginBottom:6,paddingLeft:4,...base}}>
      <span style={{color:T.textFaint,marginTop:2,flexShrink:0}}>◦</span>
      <span><HighlightText text={block.content}/></span>
    </div>
  );
  if(block.type==="callout") return(
    <div style={{margin:"14px 0",padding:"14px 18px",background:T.callBg,border:`1px solid ${T.callBdr}`,borderLeft:`3px solid ${T.callLeft}`,borderRadius:"0 10px 10px 0"}}>
      <div style={{display:"flex",gap:8,alignItems:"flex-start"}}>
        <span style={{fontSize:14,marginTop:1,flexShrink:0}}>⚡</span>
        <span style={{...base,color:T.callTxt,fontWeight:500}}><HighlightText text={block.content}/></span>
      </div>
    </div>
  );
  if(block.type==="remember") return(
    <div style={{margin:"14px 0",padding:"14px 18px",background:T.remBg,border:`1px solid ${T.remBdr}`,borderLeft:`3px solid ${T.remLeft}`,borderRadius:"0 10px 10px 0"}}>
      <div style={{display:"flex",gap:8,alignItems:"flex-start"}}>
        <span style={{fontSize:14,marginTop:1,flexShrink:0}}>📌</span>
        <span style={{...base,color:T.remTxt,fontWeight:500}}><HighlightText text={block.content}/></span>
      </div>
    </div>
  );
  if(block.type==="formula") return(
    <div style={{margin:"14px 0",padding:"16px 20px",background:T.fmlBg,border:`1px solid ${T.fmlBdr}`,borderRadius:10,textAlign:"center"}}>
      <span style={{fontFamily:"'DM Mono',monospace",fontSize:15,color:T.fmlTxt,letterSpacing:"0.05em",fontWeight:600}}>{block.content}</span>
      {block.label&&<div style={{marginTop:6,fontFamily:"'DM Mono',monospace",fontSize:10,color:T.textFaint,letterSpacing:"0.1em"}}>{block.label}</div>}
    </div>
  );
  if(block.type==="flashcard") return(
    <div style={{margin:"8px 0",padding:"14px 18px",background:T.fcBg,border:`1px solid ${T.fcBdr}`,borderRadius:10}}>
      <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:T.fcQ,letterSpacing:"0.15em",marginBottom:6}}>Q</div>
      <div style={{...base,color:T.fcQTxt,fontWeight:600,marginBottom:10}}><HighlightText text={block.question}/></div>
      <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:T.fcA,letterSpacing:"0.15em",marginBottom:6}}>A</div>
      <div style={{...base,color:T.fcATxt}}><HighlightText text={block.answer}/></div>
    </div>
  );
  if(block.type==="diagram") return(
    <div style={{margin:"18px 0",borderRadius:12,overflow:"hidden",border:`1px solid ${T.outBdr}`,background:T.outBox}}>
      {block.caption&&<div style={{padding:"8px 16px",borderBottom:`1px solid ${T.divider}`,fontFamily:"'DM Mono',monospace",fontSize:10,color:T.textFaint,letterSpacing:"0.1em"}}>{block.caption}</div>}
      <div style={{padding:"16px",display:"flex",justifyContent:"center"}} dangerouslySetInnerHTML={{__html:block.svg}}/>
    </div>
  );
  if(block.type==="divider") return <div style={{borderTop:`1px solid ${T.divider}`,margin:"20px 0"}}/>;
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
4. Include at least 1 diagram SVG for topics that benefit from visual representation
5. Mix callouts and remember blocks to break monotony
6. End with 3-5 flashcard blocks for key definitions
7. Add dividers between major sections
8. SVG diagrams: use viewBox="0 0 500 200" or similar, keep clean and minimal, white/light strokes on dark bg`;

function RichNotesOutput({blocks}){
  const { T }=useTheme();
  const [copied,setCopied]=useState(false);
  const plainText=blocks.map(b=>{
    if(b.type==="flashcard") return `Q: ${b.question}\nA: ${b.answer}`;
    if(b.type==="formula") return `${b.content}${b.label?" ("+b.label+")":""}`;
    if(b.type==="diagram") return `[Diagram: ${b.caption||""}]`;
    return b.content||"";
  }).join("\n");
  return(
    <div style={{marginTop:24}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:6,height:6,borderRadius:"50%",background:T.callLeft}}/>
          <span style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:T.textSub,letterSpacing:"0.15em",textTransform:"uppercase"}}>rich notes</span>
        </div>
        <button onClick={()=>{navigator.clipboard.writeText(plainText);setCopied(true);setTimeout(()=>setCopied(false),2000);}} style={{
          background:copied?T.pillOn:"transparent",border:`1px solid ${copied?T.pillOnBdr:T.outBdr}`,
          borderRadius:6,padding:"4px 14px",fontSize:11,cursor:"pointer",
          fontFamily:"'DM Mono',monospace",color:copied?T.pillOnTxt:T.eraseBtn,transition:"all .2s"
        }}>{copied?"copied ✓":"copy plain"}</button>
      </div>
      <div style={{background:T.outBox,border:`1px solid ${T.outBdr}`,borderRadius:14,padding:"24px 24px 20px"}}>
        {blocks.map((b,i)=><NoteBlock key={i} block={b}/>)}
      </div>
    </div>
  );
}

function SummarizerTab(){
  const S=useS(); const { T }=useTheme();
  const [text,setText]=useState(""); const [blocks,setBlocks]=useState(null);
  const [loading,setLoading]=useState(false); const [error,setError]=useState("");
  const run=async()=>{
    if(!text.trim())return;
    setLoading(true);setError("");setBlocks(null);
    try{
      const raw=await callGroq(NOTES_SYSTEM,`Create detailed rich study notes for this content:\n\n${text}`);
      const clean=raw.replace(/```json|```/g,"").trim();
      setBlocks(JSON.parse(clean));
    } catch(e){ setError("Couldn't parse rich notes. Try again."); }
    setLoading(false);
  };
  return(
    <div style={{display:"grid",gap:20}}>
      <div style={{background:T.notesBg,border:`1px solid ${T.notesBdr}`,borderRadius:10,padding:"12px 16px"}}>
        <p style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:T.notesTxt,lineHeight:1.7}}>
          ✦ &nbsp;Generates rich notes with <strong style={{color:T.callLeft}}>highlights, formulas, diagrams, callouts & flashcards</strong> — not plain text.
        </p>
      </div>
      <Field label="paste your chapter text *">
        <textarea style={{...S.input,minHeight:160,resize:"vertical"}} placeholder="Paste any chapter, topic, or study material here..." value={text} onChange={e=>setText(e.target.value)}/>
      </Field>
      <button style={S.btn} onClick={run} disabled={loading||!text.trim()}>{loading?"generating rich notes...":"Generate Rich Notes →"}</button>
      {error&&<p style={S.err}>{error}</p>}
      {loading&&<Spinner/>}
      {blocks&&<RichNotesOutput blocks={blocks}/>}
    </div>
  );
}

function ExamPrepTab(){
  const S=useS();
  const [topic,setTopic]=useState(""); const [type,setType]=useState("mcq"); const [count,setCount]=useState("5");
  const [result,setResult]=useState(""); const [loading,setLoading]=useState(false); const [error,setError]=useState("");
  const typeMap={mcq:`${count} MCQs. For each: question, options A–D, "Answer: [X]" + explanation.`,short:`${count} short-answer Qs with model answers (2–4 sentences). Q: ...\nA: ...`,long:`${count} essay-type Qs with key points.\nQ: ...\nKey points: [bullets]`};
  const run=async()=>{
    if(!topic.trim())return; setLoading(true);setError("");setResult("");
    try{setResult(await callGroq("You are an expert exam question creator. Generate challenging but fair questions that test real understanding.",`Topic: ${topic}\n${typeMap[type]}`));}
    catch{setError("Something went wrong. Try again.");} setLoading(false);
  };
  return(
    <div style={{display:"grid",gap:20}}>
      <Field label="topic / chapter *"><input style={S.input} placeholder="e.g. Photosynthesis, French Revolution, Quadratic Equations" value={topic} onChange={e=>setTopic(e.target.value)}/></Field>
      <Field label="question type"><OptionGroup options={[["mcq","MCQ"],["short","Short Answer"],["long","Essay"]]} value={type} onChange={setType}/></Field>
      <Field label="quantity"><OptionGroup options={[["3","3 Qs"],["5","5 Qs"],["10","10 Qs"]]} value={count} onChange={setCount}/></Field>
      <button style={S.btn} onClick={run} disabled={loading||!topic.trim()}>{loading?"generating...":"Generate Questions →"}</button>
      {error&&<p style={S.err}>{error}</p>}{loading&&<Spinner/>}{result&&<ResultBox text={result}/>}
    </div>
  );
}

// ─── TOPPER NOTES ─────────────────────────────────────────────────────────────
function TopperNotesTab(){
  const S=useS(); const { T }=useTheme();
  const subjects=Object.keys(TOPPER_NOTES);
  const [selSub,setSelSub]=useState("Physics");
  const streams=Object.keys(TOPPER_NOTES[selSub]).filter(e=>TOPPER_NOTES[selSub][e].length>0);
  const [selStream,setSelStream]=useState(streams[0]||"JEE");
  const [search,setSearch]=useState("");
  useEffect(()=>{
    const a=Object.keys(TOPPER_NOTES[selSub]).filter(e=>TOPPER_NOTES[selSub][e].length>0);
    setSelStream(a[0]||"JEE"); setSearch("");
  },[selSub]);
  const notes=(TOPPER_NOTES[selSub][selStream]||[]).filter(n=>n.chapter.toLowerCase().includes(search.toLowerCase()));
  const streamLabel=selSub==="Commerce"?"stream":"exam";
  return(
    <div style={{display:"grid",gap:20}}>
      <div style={{background:T.infoBg,border:`1px solid ${T.infoBdr}`,borderRadius:10,padding:"12px 16px"}}>
        <p style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:T.infoTxt,lineHeight:1.7}}>
          ✎ &nbsp;Sourced from SelfStudys, Vedantu, ICAI, JEEBooks & Scribd — curated from top rankers & board toppers.
        </p>
      </div>
      <Field label="subject"><PillGroup options={subjects.map(s=>[s,s])} value={selSub} onChange={setSelSub}/></Field>
      <Field label={streamLabel}><PillGroup options={streams.map(e=>[e,e])} value={selStream} onChange={setSelStream}/></Field>
      <Field label="search chapter"><input style={S.input} placeholder="e.g. Kinematics, Accounting, Organic..." value={search} onChange={e=>setSearch(e.target.value)}/></Field>
      <div>
        <label style={{display:"block",marginBottom:8,fontFamily:"'DM Mono',monospace",fontSize:10,color:T.textFaint,letterSpacing:"0.15em",textTransform:"uppercase"}}>{notes.length} chapters</label>
        <div style={{display:"grid",gap:8}}>
          {notes.length===0&&<p style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.textFaint,padding:"16px 0"}}>No chapters found.</p>}
          {notes.map((n,i)=>(
            <a key={i} href={n.url} target="_blank" rel="noopener noreferrer"
              style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 18px",border:`1px solid ${T.topperBdr}`,borderRadius:10,textDecoration:"none",background:T.topperRow,cursor:"pointer"}}>
              <div>
                <p style={{fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:14,color:T.topperTxt,marginBottom:3}}>{n.chapter}</p>
                <p style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:T.topperSrc,letterSpacing:"0.05em"}}>{n.source}</p>
              </div>
              <span style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:T.topperArrow,flexShrink:0,marginLeft:16}}>↗</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── YOUTUBE TAB ──────────────────────────────────────────────────────────────
function YoutubeTab(){
  const { T }=useTheme();
  const [sel,setSel]=useState("Physics");
  const data=YOUTUBE_CHANNELS.find(c=>c.subject===sel);
  return(
    <div style={{display:"grid",gap:20}}>
      <div style={{background:T.infoBg,border:`1px solid ${T.infoBdr}`,borderRadius:10,padding:"12px 16px"}}>
        <p style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:T.infoTxt,lineHeight:1.7}}>
          ▶ &nbsp;Handpicked from 50+ channels. #1 = best all-round. Expert / CA Pick = for specialised work. All free.
        </p>
      </div>
      <Field label="subject"><PillGroup options={YOUTUBE_CHANNELS.map(c=>[c.subject,c.subject])} value={sel} onChange={setSel}/></Field>
      {data&&<div style={{display:"flex",alignItems:"center",gap:8}}>
        <span style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:T.textFaint,letterSpacing:"0.1em",textTransform:"uppercase"}}>for</span>
        <span style={{border:`1px solid ${T.infoBdr}`,borderRadius:6,padding:"3px 10px",fontFamily:"'DM Mono',monospace",fontSize:11,color:T.textSub}}>{data.exam}</span>
      </div>}
      <div style={{display:"grid",gap:14}}>
        {data?.channels.map((ch,i)=>(
          <a key={i} href={ch.url} target="_blank" rel="noopener noreferrer"
            style={{display:"block",padding:"20px 22px",border:`1px solid ${T.ytCardBdr}`,borderRadius:12,textDecoration:"none",background:T.ytCardBg}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10,gap:12}}>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:15,color:T.ytName,lineHeight:1.3}}>{ch.name}</p>
              <span style={{
                background:ch.badge==="#1"?T.ytBadge1Bg:"transparent",
                border:`1px solid ${ch.badge==="#1"?T.ytBadge1Bdr:T.ytBadgeXBdr}`,
                borderRadius:6,padding:"3px 10px",fontSize:11,fontFamily:"'DM Mono',monospace",
                color:ch.badge==="#1"?T.ytBadge1Txt:T.ytBadgeXTxt,flexShrink:0,whiteSpace:"nowrap"
              }}>{ch.badge}</span>
            </div>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:13.5,color:T.ytDesc,lineHeight:1.65,marginBottom:14}}>{ch.desc}</p>
            <span style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:T.ytLink,letterSpacing:"0.05em"}}>↗ open on youtube</span>
          </a>
        ))}
      </div>
    </div>
  );
}

// ─── THEME TOGGLE BUTTON ──────────────────────────────────────────────────────
function ThemeToggle({theme,setTheme}){
  const T = theme==="dark" ? DARK : LIGHT;
  const isDark = theme==="dark";
  return(
    <button
      onClick={()=>setTheme(isDark?"light":"dark")}
      style={{
        position:"fixed",top:16,right:16,zIndex:100,
        display:"flex",alignItems:"center",gap:7,
        padding:"7px 14px 7px 10px",
        borderRadius:100,
        border:`1px solid ${isDark?"rgba(255,255,255,0.15)":"#d0d0d8"}`,
        background:isDark?"rgba(255,255,255,0.08)":"#fff",
        cursor:"pointer",
        boxShadow:isDark?"none":"0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      <span style={{fontSize:15,lineHeight:1}}>{isDark?"☀️":"🌙"}</span>
      <span style={{
        fontFamily:"'DM Mono',monospace",fontSize:10,letterSpacing:"0.1em",
        color:isDark?"rgba(255,255,255,0.7)":"#555",fontWeight:500,
        textTransform:"uppercase",
      }}>{isDark?"Light":"Dark"}</span>
    </button>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App(){
  const [active,setActive]=useState("assignment");
  const [mounted,setMounted]=useState(false);
  const [theme,setTheme]=useState(()=>{
    try{ return localStorage.getItem("scalar-theme")||"dark"; }catch{ return "dark"; }
  });
  const glowRef=useRef(null);
  const T = theme==="dark" ? DARK : LIGHT;
  const isDark = theme==="dark";

  useEffect(()=>{ try{ localStorage.setItem("scalar-theme",theme); }catch{} document.body.style.background=T.bg; },[theme]);
  useEffect(()=>{setTimeout(()=>setMounted(true),80);},[]);

  // Mouse glow — dark mode only, desktop only
  useEffect(()=>{
    if(!isDark) return;
    if(window.matchMedia("(pointer: coarse)").matches) return;
    let rafId=null;
    let tx=50,ty=30,cx=50,cy=30;
    const lerp=(a,b,t)=>a+(b-a)*t;
    const tick=()=>{
      cx=lerp(cx,tx,0.06); cy=lerp(cy,ty,0.06);
      if(glowRef.current) glowRef.current.style.background=`radial-gradient(ellipse 55vw 45vh at ${cx.toFixed(2)}% ${cy.toFixed(2)}%, rgba(255,255,255,0.032) 0%, transparent 70%)`;
      rafId=requestAnimationFrame(tick);
    };
    const onMove=(e)=>{ tx=(e.clientX/window.innerWidth)*100; ty=(e.clientY/window.innerHeight)*100; };
    window.addEventListener("mousemove",onMove,{passive:true});
    rafId=requestAnimationFrame(tick);
    return()=>{ window.removeEventListener("mousemove",onMove); cancelAnimationFrame(rafId); if(glowRef.current) glowRef.current.style.background="none"; };
  },[isDark]);

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
    <ThemeCtx.Provider value={{theme, T}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500;600;700&family=Cormorant+Garamond:wght@600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{background:${T.bg};overflow-x:hidden;}
        ::selection{background:${isDark?"rgba(255,255,255,0.15)":"rgba(0,0,0,0.1)"};}
        input,textarea,select{color-scheme:${isDark?"dark":"light"};}
        input::placeholder,textarea::placeholder{color:${T.textFaint}!important;}
        input:focus,textarea:focus{
          border-color:${isDark?"rgba(255,255,255,0.3)":"#999"}!important;
          background:${isDark?"rgba(255,255,255,0.07)":"#fff"}!important;
          outline:none;
          box-shadow:0 0 0 3px ${isDark?"rgba(255,255,255,0.04)":"rgba(0,0,0,0.06)"};
        }
        button:disabled{opacity:0.35;cursor:not-allowed;}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes pulse{0%,100%{opacity:.25}50%{opacity:.55}}
        @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        .panel-enter{animation:fadeIn .2s ease both;}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-track{background:transparent;}
        ::-webkit-scrollbar-thumb{background:${isDark?"rgba(255,255,255,0.08)":"rgba(0,0,0,0.1)"};border-radius:2px;}

        ${isDark?`
        @keyframes tubeOn{
          0%{opacity:0;text-shadow:none;}
          5%{opacity:0.9;text-shadow:0 0 40px rgba(255,255,255,0.9),0 0 80px rgba(255,255,255,0.5),0 0 120px rgba(255,255,255,0.25);}
          6%{opacity:0.1;}7%{opacity:0.95;text-shadow:0 0 40px rgba(255,255,255,0.9),0 0 80px rgba(255,255,255,0.5);}
          8%{opacity:0.2;}10%{opacity:1;text-shadow:0 0 40px rgba(255,255,255,0.9),0 0 80px rgba(255,255,255,0.5),0 0 120px rgba(255,255,255,0.25);}
          15%{opacity:0.4;}16%{opacity:1;text-shadow:0 0 40px rgba(255,255,255,0.9),0 0 80px rgba(255,255,255,0.5);}
          25%{opacity:0.8;}26%{opacity:1;text-shadow:0 0 50px rgba(255,255,255,1),0 0 100px rgba(255,255,255,0.6),0 0 160px rgba(255,255,255,0.3);}
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
          0%,100%{opacity:1;}49%{opacity:1;}49.5%{opacity:0.6;}50%{opacity:1;}
          92.5%{opacity:1;}93%{opacity:0.7;}93.5%{opacity:1;}
        }
        @keyframes grainShift{
          0%{transform:translate(0,0)}10%{transform:translate(-2%,-3%)}20%{transform:translate(3%,2%)}
          30%{transform:translate(-1%,4%)}40%{transform:translate(2%,-2%)}50%{transform:translate(-3%,1%)}
          60%{transform:translate(1%,3%)}70%{transform:translate(-2%,-1%)}80%{transform:translate(3%,2%)}
          90%{transform:translate(-1%,-3%)}100%{transform:translate(0,0)}
        }
        @keyframes scanMove{0%{transform:translateY(-100%)}100%{transform:translateY(100vh)}}
        .tube-on{animation:tubeOn 1.8s ease forwards;}
        .tube-idle{animation:tubeIdle 7s ease-in-out infinite;}
        .grain-layer{
          position:fixed;inset:-50%;width:200%;height:200%;
          pointer-events:none;z-index:3;opacity:0.045;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E");
          background-size:220px 220px;animation:grainShift 0.1s steps(1) infinite;mix-blend-mode:screen;
        }
        .scanlines{position:fixed;inset:0;pointer-events:none;z-index:2;background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.06) 2px,rgba(0,0,0,0.06) 4px);}
        .vignette{position:fixed;inset:0;pointer-events:none;z-index:2;background:radial-gradient(ellipse at center,transparent 35%,rgba(0,0,0,0.5) 75%,rgba(0,0,0,0.88) 100%);}
        `:`
        .tube-on{} .tube-idle{}
        .grain-layer,.scanlines,.vignette{display:none;}
        `}
      `}</style>

      <ThemeToggle theme={theme} setTheme={setTheme}/>

      {/* DARK MODE ATMOSPHERE LAYERS */}
      {isDark&&<>
        <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,background:"radial-gradient(ellipse 80% 45% at 50% 0%, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 40%, transparent 70%)",animation:"bgFlicker 7s ease-in-out infinite"}}/>
        <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,background:"radial-gradient(ellipse 60% 25% at 50% 100%, rgba(255,255,255,0.04) 0%, transparent 60%)"}}/>
        <div ref={glowRef} style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,willChange:"background"}}/>
        <div className="grain-layer"/>
        <div className="scanlines"/>
        <div className="vignette"/>
        <div style={{position:"fixed",left:0,right:0,height:160,pointerEvents:"none",zIndex:2,background:"linear-gradient(180deg,transparent,rgba(255,255,255,0.012),transparent)",animation:"scanMove 10s linear infinite",top:0}}/>
        <div style={{position:"fixed",top:20,left:20,width:40,height:40,borderTop:"1px solid rgba(255,255,255,0.08)",borderLeft:"1px solid rgba(255,255,255,0.08)",pointerEvents:"none",zIndex:4}}/>
        <div style={{position:"fixed",top:20,right:20,width:40,height:40,borderTop:"1px solid rgba(255,255,255,0.08)",borderRight:"1px solid rgba(255,255,255,0.08)",pointerEvents:"none",zIndex:4}}/>
        <div style={{position:"fixed",bottom:88,left:20,width:40,height:40,borderBottom:"1px solid rgba(255,255,255,0.08)",borderLeft:"1px solid rgba(255,255,255,0.08)",pointerEvents:"none",zIndex:4}}/>
        <div style={{position:"fixed",bottom:88,right:20,width:40,height:40,borderBottom:"1px solid rgba(255,255,255,0.08)",borderRight:"1px solid rgba(255,255,255,0.08)",pointerEvents:"none",zIndex:4}}/>
      </>}

      {/* MAIN CONTENT */}
      <div style={{
        position:"relative",zIndex:5,
        minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",
        padding:"48px 16px 140px",
        opacity:mounted?1:0,transition:"opacity .4s ease",
      }}>
        {/* HEADER */}
        <div style={{marginBottom:40,textAlign:"center",width:"100%",maxWidth:680}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,marginBottom:22,
            border:`1px solid ${T.cardBorder}`,borderRadius:100,
            padding:"6px 18px 6px 12px",background:T.inputBg}}>
            <div style={{width:6,height:6,borderRadius:"50%",background:T.badgeDot,animation:isDark?"pulse 2.5s ease infinite":"none"}}/>
            <span style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:T.badgeTxt,letterSpacing:"0.22em",textTransform:"uppercase"}}>scalar · ai study platform</span>
          </div>

          <div style={{position:"relative",display:"inline-block",marginTop:4}}>
            {isDark&&<div style={{position:"absolute",top:-14,left:"50%",transform:"translateX(-50%)",width:"110%",height:3,borderRadius:2,background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.08),rgba(200,220,255,0.5),rgba(255,255,255,0.08),transparent)",boxShadow:"0 0 8px rgba(255,255,255,0.3), 0 0 20px rgba(255,255,255,0.12)",animation:"glowPulse 7s ease-in-out infinite"}}/>}
            <h1 className={isDark&&mounted?"tube-on tube-idle":""} style={{
              fontFamily:"'Cormorant Garamond',serif",fontWeight:700,
              fontSize:"clamp(56px,11vw,96px)",
              color:T.text,letterSpacing:"-0.03em",lineHeight:1,
            }}>Scalar</h1>
            {isDark&&<div style={{position:"absolute",bottom:-8,left:"50%",transform:"translateX(-50%)",width:"110%",height:2,borderRadius:2,background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.06),rgba(255,255,255,0.3),rgba(255,255,255,0.06),transparent)",boxShadow:"0 0 6px rgba(255,255,255,0.18)",animation:"glowPulse 7s ease-in-out infinite"}}/>}
          </div>

          <p style={{marginTop:20,fontFamily:"'DM Sans',sans-serif",fontWeight:300,fontSize:15,color:T.tagline,letterSpacing:"0.01em",lineHeight:1.6}}>
            The AI-powered study platform for every student.
          </p>

          <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:8,marginTop:20}}>
            {["Assignments","Solver","Rich Notes","Exam Prep","Topper Notes","Free Classes"].map((f,i)=>(
              <span key={i} style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:T.featurePill,letterSpacing:"0.08em",border:`1px solid ${T.featureBdr}`,borderRadius:100,padding:"5px 12px",background:T.featureBg}}>{f}</span>
            ))}
          </div>

          <div style={{width:1,height:32,background:isDark?"linear-gradient(180deg,rgba(255,255,255,0.15),transparent)":"linear-gradient(180deg,rgba(0,0,0,0.1),transparent)",margin:"24px auto 0"}}/>
        </div>

        {/* CARD */}
        <div style={{
          background:T.card,width:"100%",maxWidth:680,borderRadius:16,
          padding:"26px 26px 32px",border:`1px solid ${T.cardBorder}`,
          boxShadow:isDark?"0 32px 80px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.06)":"0 4px 24px rgba(0,0,0,0.07)",
        }}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:24,paddingBottom:18,borderBottom:`1px solid ${T.headerBdr}`}}>
            <span style={{fontSize:14,color:T.textSub,fontFamily:"monospace",marginRight:2}}>{activeTab?.icon}</span>
            <span style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:T.headerNum,letterSpacing:"0.2em"}}>{activeTab?.num}</span>
            <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:700,fontSize:20,color:T.headerTitle,letterSpacing:"-0.01em"}}>{activeTab?.label}</h2>
          </div>
          {TABS.map(tab=>(
            <div key={tab.id} className={active===tab.id?"panel-enter":""} style={{display:active===tab.id?"block":"none"}}>
              {panels[tab.id]}
            </div>
          ))}
        </div>

        <p style={{marginTop:28,fontFamily:"'DM Mono',monospace",fontSize:10,color:T.poweredBy,letterSpacing:"0.15em",textTransform:"uppercase",textAlign:"center"}}>
          powered by groq
        </p>
      </div>

      {/* BOTTOM NAV */}
      <nav style={{
        position:"fixed",bottom:0,left:0,right:0,zIndex:50,
        background:T.nav,borderTop:`1px solid ${T.navBorder}`,
        display:"flex",justifyContent:"space-around",alignItems:"stretch",
        boxShadow:isDark?"0 -20px 60px rgba(0,0,0,0.7)":"0 -2px 12px rgba(0,0,0,0.06)",
        paddingBottom:"env(safe-area-inset-bottom,0px)",
      }}>
        {TABS.map(tab=>{
          const on=active===tab.id;
          return(
            <button key={tab.id} onClick={()=>setActive(tab.id)} style={{
              flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
              gap:7,padding:"16px 4px 18px",border:"none",background:"transparent",cursor:"pointer",position:"relative",minWidth:0,
            }}>
              <div style={{
                position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",
                height:2,borderRadius:"0 0 4px 4px",
                width:on?32:0,background:T.navIconOn,
                transition:"width .25s cubic-bezier(.4,0,.2,1)",
              }}/>
              <div style={{
                width:46,height:46,borderRadius:14,display:"flex",alignItems:"center",justifyContent:"center",
                background:on?T.navBubbleOn:"transparent",
                border:`1px solid ${on?T.navBubbleBdrOn:T.navBorder}`,transition:"all .2s",
              }}>
                <span style={{fontSize:18,lineHeight:1,display:"block",fontFamily:"monospace",color:on?T.navIconOn:T.navIconOff,transition:"color .2s",letterSpacing:0}}>{tab.icon}</span>
              </div>
              <span style={{
                fontFamily:"'DM Mono',monospace",fontSize:9,letterSpacing:"0.06em",
                whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",maxWidth:"90%",
                color:on?T.navLblOn:T.navLblOff,fontWeight:on?500:400,transition:"color .2s",textTransform:"uppercase",
              }}>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </ThemeCtx.Provider>
  );
}
