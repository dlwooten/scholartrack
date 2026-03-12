import { useState, useEffect, useCallback, useRef } from "react";

const ALL_SCHOOLS = [
  "Alabama A&M University","Auburn University","University of Alabama","University of Alabama at Birmingham",
  "Arizona State University","University of Arizona","University of Arkansas","Arkansas State University",
  "California Institute of Technology (Caltech)","Stanford University","UC Berkeley","UC Davis","UC Irvine",
  "UCLA","UC San Diego","UC Santa Barbara","University of Southern California","San Diego State University",
  "Colorado State University","University of Colorado Boulder","University of Connecticut","Yale University",
  "University of Delaware","Florida A&M University","Florida International University","Florida State University",
  "University of Central Florida","University of Florida","University of Miami","Emory University",
  "Georgia Institute of Technology","Georgia State University","Morehouse College","Savannah College of Art and Design",
  "Spelman College","University of Georgia","University of Hawaii at Manoa","Boise State University","University of Idaho",
  "DePaul University","Illinois Institute of Technology","Loyola University Chicago","Northwestern University",
  "University of Chicago","University of Illinois Urbana-Champaign","Indiana University","Purdue University",
  "University of Notre Dame","Iowa State University","University of Iowa","Kansas State University","University of Kansas",
  "University of Kentucky","University of Louisville","Louisiana State University (LSU)","Tulane University",
  "Bowdoin College","University of Maine","Johns Hopkins University","University of Maryland","United States Naval Academy",
  "Boston College","Boston University","Harvard University","MIT","Northeastern University","Tufts University",
  "University of Massachusetts Amherst","Williams College","Michigan State University","University of Michigan",
  "Wayne State University","Carleton College","University of Minnesota","University of St. Thomas",
  "Mississippi State University","University of Mississippi","Mizzou (University of Missouri)",
  "Washington University in St. Louis","Montana State University","University of Montana","Creighton University",
  "University of Nebraska-Lincoln","University of Nevada Las Vegas","University of Nevada Reno","Dartmouth College",
  "University of New Hampshire","Princeton University","Rutgers University","Seton Hall University",
  "New Mexico State University","University of New Mexico","Columbia University","Cornell University","Fordham University",
  "New York University (NYU)","Rensselaer Polytechnic Institute","Syracuse University","University at Buffalo (SUNY)",
  "Vassar College","Duke University","North Carolina A&T State University","North Carolina State University",
  "UNC Chapel Hill","Wake Forest University","North Dakota State University","University of North Dakota",
  "Case Western Reserve University","Miami University (Ohio)","Ohio State University","Ohio University","Xavier University",
  "Oklahoma State University","University of Oklahoma","Oregon State University","University of Oregon",
  "Carnegie Mellon University","Drexel University","Penn State University","Temple University","University of Pennsylvania",
  "Villanova University","Brown University","Rhode Island School of Design","University of Rhode Island",
  "Clemson University","College of Charleston","University of South Carolina","South Dakota State University",
  "University of South Dakota","Tennessee State University","University of Tennessee","Vanderbilt University",
  "Baylor University","Rice University","Southern Methodist University (SMU)","Texas A&M University",
  "Texas Christian University (TCU)","University of Houston","University of Texas at Austin","University of Texas at Dallas",
  "Brigham Young University (BYU)","University of Utah","Utah State University","University of Vermont",
  "College of William & Mary","George Mason University","Liberty University","University of Richmond",
  "University of Virginia","Virginia Tech","University of Washington","Washington State University",
  "Western Washington University","Marshall University","West Virginia University","Marquette University",
  "University of Wisconsin-Madison","University of Wisconsin-Milwaukee","University of Wyoming",
  "American University","George Washington University","Georgetown University","Howard University",
].sort().filter((v,i,a)=>a.indexOf(v)===i);

const DEMO_USERS=[{username:"admin",password:"scholar2026",role:"admin"},{username:"parent",password:"jacob2026",role:"user"}];
const TODAY=new Date("2026-02-28");
function daysUntil(ds){return Math.ceil((new Date(ds)-TODAY)/86400000);}

const SCHOOL_SCHOLARSHIPS={
  "University of Alabama":[
    {name:"UA Trustee Scholarship",amount:28000,annualNote:"per year × 4 = $112,000",deadline:"2025-11-01",link:"https://financialaid.ua.edu/types-of-aid/scholarships/",category:"Merit",description:"UA's highest automatic merit award. Renewable 4 years for students with exceptional GPA and leadership."},
    {name:"UA Presidential Scholarship",amount:20000,annualNote:"per year × 4 = $80,000",deadline:"2025-11-01",link:"https://financialaid.ua.edu/types-of-aid/scholarships/",category:"Merit",description:"Strong academic performance + community involvement. Total value up to $80,000."},
    {name:"Crimson Achievement Award",amount:8000,annualNote:"per year × 4 = $32,000",deadline:"2025-12-01",link:"https://financialaid.ua.edu/types-of-aid/scholarships/",category:"Merit",description:"For incoming freshmen with solid academic records and demonstrated leadership."},
    {name:"Community Service Scholarship",amount:5000,annualNote:"one-time",deadline:"2026-01-15",link:"https://financialaid.ua.edu/types-of-aid/scholarships/",category:"Service",description:"Recognizes students with 150+ documented volunteer hours."},
  ],
  "Louisiana State University (LSU)":[
    {name:"Tiger Athletic Foundation Scholarship",amount:15000,annualNote:"per year × 4 = $60,000",deadline:"2026-02-01",link:"https://www.lsu.edu/financialaid/scholarships/",category:"Merit + Athletics",description:"For student-athletes and varsity sports backgrounds."},
    {name:"LSU Business Leadership Scholarship",amount:10000,annualNote:"per year × 4 = $40,000",deadline:"2026-02-01",link:"https://www.lsu.edu/financialaid/scholarships/",category:"Leadership",description:"FBLA/DECA or equivalent business leadership required."},
    {name:"Tiger Excellence Award",amount:7000,annualNote:"per year × 4 = $28,000",deadline:"2025-12-15",link:"https://www.lsu.edu/financialaid/scholarships/",category:"Merit",description:"Automatic merit award for incoming freshmen with 3.5+ GPA."},
    {name:"Pelican Award",amount:5500,annualNote:"per year × 4 = $22,000",deadline:"2026-01-15",link:"https://www.lsu.edu/financialaid/scholarships/",category:"Merit",description:"Students with a 3.5+ GPA and documented extracurricular activities."},
  ],
  "Morehouse College":[
    {name:"Benjamin E. Mays Scholarship",amount:20000,annualNote:"per year × 4 = $80,000",deadline:"2026-01-31",link:"https://www.morehouse.edu/admission/financial-aid/",category:"Merit",description:"Named after the legendary Morehouse president. Academic promise and transformational leadership."},
    {name:"Candle in the Dark Scholarship",amount:15000,annualNote:"per year × 4 = $60,000",deadline:"2026-02-15",link:"https://www.morehouse.edu/admission/financial-aid/",category:"Merit",description:"Prestigious merit scholarship for academic excellence and community leadership."},
    {name:"AP Scholar Leadership Grant",amount:8000,annualNote:"per year × 4 = $32,000",deadline:"2026-03-01",link:"https://www.morehouse.edu/admission/financial-aid/",category:"AP & Honors",description:"Specifically for AP Scholar with Distinction or AP Capstone Diploma earners."},
    {name:"FBLA/DECA Leadership Grant",amount:6000,annualNote:"per year × 2 = $12,000",deadline:"2026-03-01",link:"https://www.morehouse.edu/admission/financial-aid/",category:"Leadership",description:"Proven business leadership through FBLA or DECA."},
    {name:"Community Builder Award",amount:4000,annualNote:"one-time",deadline:"2026-03-15",link:"https://www.morehouse.edu/admission/financial-aid/",category:"Service",description:"100+ documented community service hours required."},
  ],
  "Purdue University":[
    {name:"Purdue Merit Scholarship",amount:8000,annualNote:"per year × 4 = $32,000",deadline:"2026-02-01",link:"https://www.purdue.edu/dfa/scholarships/",category:"Merit",description:"Broad merit scholarship for academically strong incoming freshmen."},
    {name:"Dean's Scholarship",amount:15000,annualNote:"per year × 4 = $60,000",deadline:"2026-02-15",link:"https://www.purdue.edu/dfa/scholarships/",category:"Merit",description:"Competitive award for top freshmen. AP honors and NHS strengthen the application."},
  ],
  "Vanderbilt University":[
    {name:"Cornelius Vanderbilt Scholarship",amount:0,fullRide:true,annualNote:"Full Tuition × 4 yrs + stipend (~$280,000+ total)",deadline:"2025-12-01",link:"https://www.vanderbilt.edu/scholarships/",category:"Merit",description:"Full-tuition award plus summer enrichment stipend. Top 1% competitive."},
    {name:"Chancellor's Scholarship",amount:0,fullRide:true,annualNote:"Full Tuition × 4 yrs + stipend",deadline:"2025-12-01",link:"https://www.vanderbilt.edu/scholarships/",category:"Merit + Service",description:"Full-tuition for students who have bridged community gaps through service."},
    {name:"Vanderbilt Merit Award",amount:8000,annualNote:"per year × 4 (minimum $32,000)",deadline:"2025-12-01",link:"https://www.vanderbilt.edu/scholarships/additional.php",category:"Merit",description:"Additional merit scholarships for strong applicants."},
  ],
  "University of Georgia":[
    {name:"Foundation Fellowship",amount:16000,annualNote:"per year × 4 = $64,000",deadline:"2026-01-15",link:"https://www.ugafoundationfellowship.org/",category:"Merit",description:"UGA's most prestigious merit scholarship. Requires Honors College admission."},
    {name:"Leaders for Tomorrow Scholarship",amount:5000,annualNote:"per year × 4 = $20,000",deadline:"2026-02-01",link:"https://osfa.uga.edu/",category:"Merit + Leadership",description:"Strong academics, moral character, and leadership."},
  ],
  "University of Tennessee":[
    {name:"Chancellor's Honors Scholarship",amount:10000,annualNote:"per year × 4 = $40,000",deadline:"2026-02-01",link:"https://onestop.utk.edu/scholarships-financial-aid/scholarships/",category:"Merit",description:"AP Scholar with Distinction and NHS membership strengthen this application."},
    {name:"UT Merit Scholarship",amount:7000,annualNote:"per year × 4 = $28,000",deadline:"2026-02-01",link:"https://onestop.utk.edu/scholarships-financial-aid/scholarships/",category:"Merit",description:"Broad merit award for freshmen with strong GPA and extracurricular involvement."},
    {name:"Tennessee Volunteer Scholarship",amount:5000,annualNote:"per year × 4 = $20,000",deadline:"2026-03-01",link:"https://onestop.utk.edu/scholarships-financial-aid/scholarships/",category:"Service",description:"Recognizes students with significant volunteer history."},
  ],
  "University of Maryland":[
    {name:"Banneker/Key Scholarship",amount:0,fullRide:true,annualNote:"Full Cost of Attendance",deadline:"2025-11-01",link:"https://admissions.umd.edu/tuition/freshman-merit-scholarships",category:"Merit",description:"UMD's most prestigious award. Covers full cost of attendance."},
    {name:"University Merit Scholarship",amount:20000,annualNote:"per year × 4 = $80,000",deadline:"2025-11-01",link:"https://admissions.umd.edu/tuition/freshman-merit-scholarships",category:"Merit",description:"Competitive merit award for top incoming freshmen."},
    {name:"Dean's Scholarship",amount:4500,annualNote:"per year × 2 = $9,000",deadline:"2025-11-01",link:"https://admissions.umd.edu/tuition/freshman-merit-scholarships",category:"Merit",description:"Two-year scholarship. Automatic consideration for all Early Action applicants."},
  ],
  "University of Virginia":[
    {name:"Jefferson Scholarship",amount:0,fullRide:true,annualNote:"Full Ride ~$365,000 OOS",deadline:"2025-12-01",link:"https://www.jeffersonscholars.org/",category:"Merit",description:"One of the most prestigious scholarships in the US. Nomination-only."},
    {name:"Walentas Scholarship",amount:0,fullRide:true,annualNote:"Full Ride for First-Gen Students",deadline:"2025-12-01",link:"https://www.jeffersonscholars.org/",category:"Need + Merit",description:"Full cost of attendance for first-generation college students for 4 years."},
    {name:"UVA Merit Award",amount:8000,annualNote:"per year × 4 (varies $8K–$30K)",deadline:"2026-03-01",link:"https://www.virginia.edu/admissions/financial-aid",category:"Merit",description:"250+ scholarships administered by the Alumni Association."},
  ],
  "Indiana University":[
    {name:"Provost's Scholarship",amount:12000,annualNote:"per year × 4 = $48,000",deadline:"2025-11-01",link:"https://scholarships.indiana.edu/",category:"Merit",description:"IU's most competitive merit scholarship for top freshmen."},
    {name:"Hutton Honors College Scholarship",amount:8000,annualNote:"per year × 4 = $32,000",deadline:"2025-11-01",link:"https://hutton.indiana.edu/funding/scholarships/freshmen-scholarship.html",category:"Merit",description:"AP Capstone Diploma holders are highly competitive."},
    {name:"Wells Scholarship",amount:0,fullRide:true,annualNote:"Full Ride — IU's flagship scholarship",deadline:"2025-11-01",link:"https://wellsscholarship.indiana.edu/",category:"Merit",description:"IU's flagship full-ride scholarship for outstanding academic achievement."},
    {name:"Kelley School of Business Merit Award",amount:6000,annualNote:"per year × 4 = $24,000",deadline:"2026-02-01",link:"https://scholarships.indiana.edu/",category:"Leadership",description:"For students applying to Kelley School. FBLA VP and DECA Secretary are ideal credentials."},
  ],
};

const INDEPENDENT_SCHOLARSHIPS=[
  {name:"NHS Scholarship",amount:25000,amountRange:"$3,200–$25,000",deadline:"2026-11-24",source:"National Honor Society / NASSP",category:"NHS / Merit",link:"https://www.nationalhonorsociety.org/students/the-nhs-scholarship/",description:"600 awards totaling $2M annually. NHS membership = direct eligibility.",match:"high"},
  {name:"FBLA-PBL National Scholarship",amount:5000,amountRange:"up to $5,000",deadline:"2026-03-01",source:"FBLA-PBL National",category:"Leadership",link:"https://www.fbla-pbl.org/fbla/awards/scholarships/",description:"Exclusive to FBLA members with leadership roles. Chapter officers have a direct advantage.",match:"high"},
  {name:"DECA Scholarship Program",amount:5000,amountRange:"$1,000–$5,000 per award",deadline:"2026-01-09",source:"DECA Inc.",category:"Leadership",link:"https://www.deca.org/scholarships",description:"$200,000+ distributed annually. Active DECA chapter officers can apply for multiple awards.",match:"high"},
  {name:"Jackie Robinson Foundation Scholarship",amount:30000,amountRange:"$7,500/yr × 4 years",deadline:"2026-02-01",source:"Jackie Robinson Foundation",category:"Merit + Athletics",link:"https://www.jackierobinson.org/apply/",description:"For minority student-athletes demonstrating leadership and community service.",match:"high"},
  {name:"Foot Locker Scholar Athletes Program",amount:20000,amountRange:"$5,000/yr × 4 years",deadline:"2025-12-15",source:"Foot Locker Foundation",category:"Merit + Athletics",link:"https://www.footlockerscholarathletes.com",description:"Student athletes who excel academically and in community service.",match:"high"},
  {name:"Coca-Cola Scholars Program",amount:20000,amountRange:"$20,000 one-time",deadline:"2025-10-01",source:"Coca-Cola Foundation",category:"Merit + Leadership",link:"https://www.coca-colascholarsfoundation.org",description:"150 awards for seniors demonstrating leadership, academics, and community service.",match:"high"},
  {name:"Ron Brown Scholar Program",amount:40000,amountRange:"$10,000/yr × 4 years",deadline:"2026-01-09",source:"Ron Brown Scholar Fund",category:"Merit + Leadership",link:"https://www.ronbrown.org",description:"For exceptional African American students with leadership, service, and academic excellence.",match:"high"},
  {name:"Elks National Foundation MVS",amount:50000,amountRange:"up to $50,000 total",deadline:"2025-11-05",source:"Elks National Foundation",category:"Merit",link:"https://www.elks.org/scholars",description:"Scholarship, leadership, and service. AP Scholar Distinction and leadership roles boost applications.",match:"high"},
  {name:"AXA Achievement Scholarship",amount:25000,amountRange:"$2,500–$25,000",deadline:"2025-12-15",source:"AXA Foundation",category:"Merit",link:"https://us.axa.com/axa-foundation/scholarship.html",description:"52 awards given annually. AP Capstone Diploma earners stand out among applicants.",match:"high"},
  {name:"Little League Carl E. Stotz Scholarship",amount:5000,amountRange:"$5,000 one-time",deadline:"2026-03-15",source:"Little League International",category:"Athletics + Service",link:"https://www.littleleague.org/scholarships",description:"Former Little League players with academic excellence, leadership, and community service.",match:"high"},
  {name:"NSHSS Student Athlete Scholarship",amount:1000,amountRange:"up to $1,000",deadline:"2026-05-31",source:"National Society of High School Scholars",category:"Merit + Athletics",link:"https://www.nshss.org/scholarships/",description:"High school students graduating 2026 with 3.5+ GPA who balance academics and sports.",match:"high"},
  {name:"Jack Kent Cooke Foundation Scholarship",amount:55000,amountRange:"up to $55,000/yr × 4 years",deadline:"2025-11-18",source:"Jack Kent Cooke Foundation",category:"Need + Merit",link:"https://www.jkcf.org",description:"High-achieving students with financial need.",match:"medium"},
  {name:"Horatio Alger Association Scholarship",amount:25000,amountRange:"$25,000 one-time",deadline:"2025-10-25",source:"Horatio Alger Association",category:"Need + Merit",link:"https://scholars.horatioalger.org",description:"Students who have overcome adversity with GPA 2.0+ and community service.",match:"medium"},
  {name:"Gates Scholarship",amount:0,fullRide:true,amountRange:"Full Cost of Attendance × 4 years",deadline:"2025-09-15",source:"Bill & Melinda Gates Foundation",category:"Need + Merit",link:"https://www.thegatesscholarship.org",description:"Full cost for Pell-eligible minority students.",match:"medium"},
  {name:"QuestBridge National College Match",amount:0,fullRide:true,amountRange:"Full 4-Year Scholarship at elite partner schools",deadline:"2025-09-26",source:"QuestBridge",category:"Need + Merit",link:"https://www.questbridge.org",description:"Partners with elite universities to provide full scholarships to high-achieving low-income students.",match:"medium"},
];

const CATEGORY_COLORS={"Merit":{bg:"#1a1a1a",text:"#fff",border:"#333"},"Leadership":{bg:"#1a1a1a",text:"#e63c3c",border:"#333"},"Merit + Leadership":{bg:"#1a1a1a",text:"#e63c3c",border:"#333"},"Need + Merit":{bg:"#1a1a1a",text:"#aaa",border:"#333"},"Service":{bg:"#1a1a1a",text:"#fff",border:"#333"},"Merit + Athletics":{bg:"#1a1a1a",text:"#e63c3c",border:"#333"},"Athletics + Service":{bg:"#1a1a1a",text:"#fff",border:"#333"},"Merit + Service":{bg:"#1a1a1a",text:"#e63c3c",border:"#333"},"AP & Honors":{bg:"#1a1a1a",text:"#aaa",border:"#333"},"NHS / Merit":{bg:"#1a1a1a",text:"#aaa",border:"#333"}};
function catStyle(cat){return CATEGORY_COLORS[cat]||{bg:"#1a1a1a",text:"#aaa",border:"#333"};}
const STATUS_CONFIG={accepted:{color:"#4ade80",bg:"rgba(74,222,128,0.1)",label:"Accepted",icon:"✓"},waiting:{color:"#fbbf24",bg:"rgba(251,191,36,0.1)",label:"Pending",icon:"⏳"},rejected:{color:"#f87171",bg:"rgba(248,113,113,0.1)",label:"Rejected",icon:"✕"}};

function SplashScreen({profile,onNavigate,photoUrl}){
  const navItems=[{id:"overview",label:"Overview"},{id:"applications",label:"Applications"},{id:"school-awards",label:"Awards"},{id:"independent",label:"Independent Scholies"}];
  const firstName=profile?.firstName||"Jacob";
  return(<div style={{position:"relative",width:"100%",height:"100vh",overflow:"hidden",background:"#000",fontFamily:"'Arial Black','Arial Bold',sans-serif"}}>
    {photoUrl?<img src={photoUrl} alt="" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",filter:"grayscale(100%) brightness(0.45)",zIndex:0}}/>:<div style={{position:"absolute",inset:0,background:"linear-gradient(160deg,#111 0%,#222 50%,#0a0a0a 100%)",zIndex:0}}/>}
    <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,0.85) 0%,rgba(0,0,0,0.2) 60%,rgba(0,0,0,0.1) 100%)",zIndex:1}}/>
    <div style={{position:"relative",zIndex:2,height:"100%",display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:"0 0 48px 40px"}}>
      <div style={{marginBottom:40}}>
        <div style={{fontSize:"clamp(52px,10vw,96px)",fontWeight:900,color:"#fff",lineHeight:0.92,letterSpacing:"-2px",textTransform:"uppercase"}}>{firstName.toUpperCase()}'S</div>
        <div style={{fontSize:"clamp(52px,10vw,96px)",fontWeight:900,color:"#e63c3c",lineHeight:0.92,letterSpacing:"-2px",textTransform:"uppercase"}}>SCHOLARSHIP</div>
        <div style={{fontSize:"clamp(52px,10vw,96px)",fontWeight:900,color:"#fff",lineHeight:0.92,letterSpacing:"-2px",textTransform:"uppercase"}}>TRACKER</div>
      </div>
      <nav style={{display:"flex",flexDirection:"column",gap:0}}>
        {navItems.map((item,i)=>(<button key={item.id} onClick={()=>onNavigate(item.id)} style={{background:"none",border:"none",borderTop:i===0?"1px solid rgba(255,255,255,0.2)":"none",borderBottom:"1px solid rgba(255,255,255,0.2)",padding:"18px 0",textAlign:"left",color:"#fff",fontSize:"clamp(18px,3.5vw,26px)",fontWeight:400,fontFamily:"Georgia,serif",cursor:"pointer",letterSpacing:"0.5px",transition:"color 0.2s,padding-left 0.2s"}} onMouseEnter={e=>{e.currentTarget.style.color="#e63c3c";e.currentTarget.style.paddingLeft="12px";}} onMouseLeave={e=>{e.currentTarget.style.color="#fff";e.currentTarget.style.paddingLeft="0px";}}>{item.label}</button>))}
      </nav>
    </div>
  </div>);
}

function StatusDot({status}){const cfg=STATUS_CONFIG[status];return(<div style={{width:34,height:34,borderRadius:"50%",background:cfg.bg,border:`2px solid ${cfg.color}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,color:cfg.color,fontWeight:800,flexShrink:0}}>{cfg.icon}</div>);}

function ScholarshipCard({s}){
  const cat=catStyle(s.category);const days=daysUntil(s.deadline);const passed=days<0;
  const urgency=passed?"#555":days<=30?"#e63c3c":days<=90?"#fbbf24":"#888";
  const urgencyLabel=passed?"Deadline passed":days===0?"Due TODAY!":days<=30?`⚠️ ${days} days left`:`Due ${new Date(s.deadline).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}`;
  return(<a href={s.link} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none",opacity:passed?0.4:1}}>
    <div style={{background:"#111",border:"1px solid #222",borderRadius:10,padding:"14px 16px",display:"flex",alignItems:"flex-start",gap:14,transition:"all 0.18s"}} onMouseEnter={e=>{if(!passed){e.currentTarget.style.borderColor="#e63c3c";e.currentTarget.style.transform="translateY(-1px)";}}} onMouseLeave={e=>{e.currentTarget.style.borderColor="#222";e.currentTarget.style.transform="none";}}>
      <div style={{flex:1,minWidth:0}}>
        <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap",marginBottom:4}}>
          <span style={{fontSize:14,fontWeight:700,color:"#fff"}}>{s.name}</span>
          <span style={{fontSize:10,padding:"2px 7px",borderRadius:20,background:cat.bg,color:cat.text,border:`1px solid ${cat.border}`,fontWeight:600}}>{s.category}</span>
          {s.match==="high"&&<span style={{fontSize:10,padding:"2px 7px",borderRadius:20,background:"rgba(230,60,60,0.15)",color:"#e63c3c",fontWeight:700}}>⭐ Strong Match</span>}
        </div>
        {s.description&&<p style={{fontSize:12,color:"#888",margin:0,lineHeight:1.55}}>{s.description}</p>}
        {s.source&&<p style={{fontSize:11,color:"#555",margin:"4px 0 0",fontStyle:"italic"}}>{s.source}</p>}
      </div>
      <div style={{flexShrink:0,textAlign:"right",minWidth:110}}>
        <div style={{fontSize:18,fontWeight:800,color:passed?"#555":"#e63c3c"}}>{s.fullRide?"Full Ride 🎓":`$${s.amount.toLocaleString()}`}</div>
        {(s.amountRange||s.annualNote)&&<div style={{fontSize:10,color:"#555",lineHeight:1.3,marginTop:2}}>{s.amountRange||s.annualNote}</div>}
        <div style={{fontSize:11,color:urgency,fontWeight:600,marginTop:4}}>{urgencyLabel}</div>
      </div>
    </div>
  </a>);
}

function MultiSelectDropdown({label,options,selected,onChange,placeholder}){
  const[open,setOpen]=useState(false);const[search,setSearch]=useState("");
  const filtered=options.filter(o=>o.toLowerCase().includes(search.toLowerCase()));
  const toggle=(opt)=>{onChange(selected.includes(opt)?selected.filter(s=>s!==opt):[...selected,opt]);};
  return(<div style={{position:"relative"}}>
    {label&&<label style={{display:"block",fontSize:11,fontWeight:700,color:"#888",marginBottom:6,textTransform:"uppercase",letterSpacing:1}}>{label}</label>}
    <div onClick={()=>setOpen(!open)} style={{border:`1px solid ${open?"#e63c3c":"#333"}`,borderRadius:8,padding:"10px 14px",background:"#111",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between",minHeight:42}}>
      <span style={{fontSize:13,color:selected.length?"#fff":"#555"}}>{selected.length===0?placeholder:`${selected.length} selected`}</span>
      <span style={{fontSize:10,color:"#555",marginLeft:8,transform:open?"rotate(180deg)":"none",transition:"transform 0.2s"}}>▼</span>
    </div>
    {selected.length>0&&<div style={{display:"flex",flexWrap:"wrap",gap:5,marginTop:8}}>{selected.map(s=>(<span key={s} style={{fontSize:11,padding:"3px 10px",borderRadius:20,background:"rgba(230,60,60,0.15)",color:"#e63c3c",border:"1px solid rgba(230,60,60,0.3)",display:"flex",alignItems:"center",gap:5}}>{s}<span onClick={(e)=>{e.stopPropagation();toggle(s);}} style={{cursor:"pointer",color:"#888",fontWeight:700}}>×</span></span>))}</div>}
    {open&&<div style={{position:"absolute",top:"100%",left:0,right:0,zIndex:999,background:"#111",border:"1px solid #333",borderRadius:10,boxShadow:"0 10px 40px rgba(0,0,0,0.8)",marginTop:4,overflow:"hidden"}}>
      <div style={{padding:"10px 12px",borderBottom:"1px solid #222"}}><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search schools…" style={{width:"100%",border:"1px solid #333",borderRadius:6,padding:"7px 10px",fontSize:12,outline:"none",boxSizing:"border-box",background:"#0a0a0a",color:"#fff"}} onClick={e=>e.stopPropagation()}/></div>
      <div style={{maxHeight:220,overflowY:"auto"}}>{filtered.length===0?<div style={{padding:16,textAlign:"center",color:"#555",fontSize:13}}>No schools found</div>:filtered.map(opt=>(<div key={opt} onClick={()=>toggle(opt)} style={{padding:"9px 14px",display:"flex",alignItems:"center",gap:10,cursor:"pointer",background:selected.includes(opt)?"rgba(230,60,60,0.1)":"transparent",fontSize:13,color:selected.includes(opt)?"#e63c3c":"#ccc"}} onMouseEnter={e=>{if(!selected.includes(opt))e.currentTarget.style.background="#1a1a1a";}} onMouseLeave={e=>{if(!selected.includes(opt))e.currentTarget.style.background="transparent";}}>
        <div style={{width:15,height:15,borderRadius:3,border:`2px solid ${selected.includes(opt)?"#e63c3c":"#444"}`,background:selected.includes(opt)?"#e63c3c":"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{selected.includes(opt)&&<span style={{color:"#fff",fontSize:9,fontWeight:800}}>✓</span>}</div>{opt}</div>))}</div>
      <div style={{padding:"8px 12px",borderTop:"1px solid #222",display:"flex",justifyContent:"flex-end"}}><button onClick={()=>setOpen(false)} style={{fontSize:12,padding:"5px 14px",borderRadius:6,border:"none",background:"#e63c3c",color:"#fff",cursor:"pointer",fontWeight:700}}>Done</button></div>
    </div>}
  </div>);
}

function LoginPage({onLogin}){
  const[username,setUsername]=useState("");const[password,setPassword]=useState("");const[error,setError]=useState("");const[loading,setLoading]=useState(false);
  const handleSubmit=()=>{setLoading(true);setTimeout(()=>{const user=DEMO_USERS.find(u=>u.username===username&&u.password===password);if(user){onLogin(user);}else{setError("Invalid credentials.");setLoading(false);}},600);};
  return(<div style={{minHeight:"100vh",background:"#000",display:"flex",alignItems:"center",justifyContent:"center",padding:20,fontFamily:"'Arial Black',sans-serif"}}>
    <div style={{width:"100%",maxWidth:400}}>
      <div style={{marginBottom:40}}><div style={{fontSize:48,fontWeight:900,color:"#fff",lineHeight:0.9,textTransform:"uppercase",letterSpacing:"-2px"}}>SCHOLAR<span style={{color:"#e63c3c"}}>TRACK</span></div><div style={{fontSize:13,color:"#555",marginTop:10,fontFamily:"Georgia,serif",fontWeight:400,letterSpacing:"2px",textTransform:"uppercase"}}>Class of 2026</div></div>
      <div style={{background:"#0d0d0d",borderRadius:12,padding:28,border:"1px solid #1f1f1f"}}>
        {error&&<div style={{background:"rgba(230,60,60,0.1)",border:"1px solid rgba(230,60,60,0.3)",borderRadius:6,padding:"10px 14px",marginBottom:18,color:"#e63c3c",fontSize:13}}>{error}</div>}
        <div style={{marginBottom:16}}><label style={{display:"block",fontSize:11,fontWeight:700,color:"#555",marginBottom:8,textTransform:"uppercase",letterSpacing:1}}>Username</label><input value={username} onChange={e=>{setUsername(e.target.value);setError("");}} onKeyDown={e=>e.key==="Enter"&&handleSubmit()} placeholder="Enter username" style={{width:"100%",padding:"12px 14px",borderRadius:8,border:"1px solid #222",background:"#111",color:"#fff",fontSize:14,outline:"none",boxSizing:"border-box"}} onFocus={e=>e.target.style.borderColor="#e63c3c"} onBlur={e=>e.target.style.borderColor="#222"}/></div>
        <div style={{marginBottom:24}}><label style={{display:"block",fontSize:11,fontWeight:700,color:"#555",marginBottom:8,textTransform:"uppercase",letterSpacing:1}}>Password</label><input type="password" value={password} onChange={e=>{setPassword(e.target.value);setError("");}} onKeyDown={e=>e.key==="Enter"&&handleSubmit()} placeholder="Enter password" style={{width:"100%",padding:"12px 14px",borderRadius:8,border:"1px solid #222",background:"#111",color:"#fff",fontSize:14,outline:"none",boxSizing:"border-box"}} onFocus={e=>e.target.style.borderColor="#e63c3c"} onBlur={e=>e.target.style.borderColor="#222"}/></div>
        <button onClick={handleSubmit} disabled={loading||!username||!password} style={{width:"100%",padding:"13px",borderRadius:8,border:"none",background:loading||!username||!password?"#1a1a1a":"#e63c3c",color:loading||!username||!password?"#555":"#fff",fontSize:14,fontWeight:900,cursor:loading||!username||!password?"not-allowed":"pointer",textTransform:"uppercase",letterSpacing:"1px"}}>{loading?"SIGNING IN…":"SIGN IN →"}</button>
        <div style={{marginTop:20,padding:"12px 14px",background:"#111",borderRadius:8,border:"1px solid #1f1f1f"}}><p style={{margin:0,fontSize:11,color:"#444",lineHeight:1.9}}><span style={{color:"#666"}}>Admin:</span> <code style={{color:"#e63c3c"}}>admin</code> / <code style={{color:"#e63c3c"}}>scholar2026</code><br/><span style={{color:"#666"}}>Parent:</span> <code style={{color:"#e63c3c"}}>parent</code> / <code style={{color:"#e63c3c"}}>jacob2026</code></p></div>
      </div>
    </div>
  </div>);
}

function ProfileForm({profile,onSave,onCancel,photoUrl,onPhotoChange}){
  const[form,setForm]=useState(profile||{firstName:"",lastName:"",email:"",phone:"",appliedSchools:[],acceptedSchools:[],rejectedSchools:[],gpaUnweighted:"",gpaWeighted:"",sat:"",volunteerHours:"",honors:[],extracurriculars:""});
  const[saved,setSaved]=useState(false);
  const fileRef=useRef();
  const set=(key,val)=>setForm(f=>({...f,[key]:val}));
  const handleAcceptedChange=(vals)=>{const nr=form.rejectedSchools.filter(s=>!vals.includes(s));setForm(f=>({...f,acceptedSchools:vals,rejectedSchools:nr}));};
  const handleRejectedChange=(vals)=>{const na=form.acceptedSchools.filter(s=>!vals.includes(s));setForm(f=>({...f,rejectedSchools:vals,acceptedSchools:na}));};
  const honorOptions=["AP Scholar","AP Scholar with Honor","AP Scholar with Distinction","AP Capstone Diploma","National Honor Society","National Merit Semifinalist","National Merit Finalist","Valedictorian","Salutatorian","Boys/Girls State","Eagle Scout / Gold Award"];
  const handleSave=()=>{onSave(form);setSaved(true);setTimeout(()=>setSaved(false),2500);};
  const handlePhoto=(e)=>{const file=e.target.files[0];if(!file)return;const reader=new FileReader();reader.onload=(ev)=>onPhotoChange(ev.target.result);reader.readAsDataURL(file);};
  const inp={width:"100%",padding:"10px 13px",borderRadius:7,border:"1px solid #2a2a2a",fontSize:13,color:"#fff",outline:"none",boxSizing:"border-box",background:"#111"};
  const lbl={display:"block",fontSize:11,fontWeight:700,color:"#555",marginBottom:6,textTransform:"uppercase",letterSpacing:0.8};
  const sec={fontSize:13,fontWeight:700,color:"#e63c3c",margin:"0 0 14px",paddingBottom:8,borderBottom:"1px solid #1f1f1f",textTransform:"uppercase",letterSpacing:"2px"};
  return(<div style={{background:"#0d0d0d",borderRadius:14,border:"1px solid #1f1f1f",overflow:"hidden",fontFamily:"Arial,sans-serif"}}>
    <div style={{background:"#000",padding:"20px 28px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid #1f1f1f"}}>
      <div><div style={{fontSize:20,fontWeight:900,color:"#fff",textTransform:"uppercase",letterSpacing:"-0.5px"}}>{profile?"EDIT PROFILE":"NEW PROFILE"}</div><div style={{fontSize:12,color:"#555",marginTop:2}}>Scholarship Management System</div></div>
      {onCancel&&<button onClick={onCancel} style={{background:"#1a1a1a",border:"1px solid #333",borderRadius:7,color:"#aaa",padding:"7px 16px",cursor:"pointer",fontSize:12}}>Cancel</button>}
    </div>
    <div style={{padding:"28px"}}>
      <div style={{marginBottom:28,display:"flex",alignItems:"center",gap:20}}>
        <div style={{position:"relative",flexShrink:0}}>
          <div style={{width:80,height:80,borderRadius:"50%",overflow:"hidden",background:"#1a1a1a",border:"2px solid #333",display:"flex",alignItems:"center",justifyContent:"center"}}>
            {photoUrl?<img src={photoUrl} alt="Profile" style={{width:"100%",height:"100%",objectFit:"cover",filter:"grayscale(100%)"}}/>:<span style={{fontSize:28,color:"#444"}}>👤</span>}
          </div>
          <button onClick={()=>fileRef.current.click()} style={{position:"absolute",bottom:-2,right:-2,width:24,height:24,borderRadius:"50%",background:"#e63c3c",border:"none",color:"#fff",fontSize:12,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
        </div>
        <div>
          <div style={{fontSize:14,color:"#fff",fontWeight:700,marginBottom:4}}>{form.firstName||"Your"} {form.lastName||"Name"}</div>
          <button onClick={()=>fileRef.current.click()} style={{background:"#1a1a1a",border:"1px solid #333",borderRadius:6,color:"#aaa",padding:"6px 14px",cursor:"pointer",fontSize:12}}>📷 Upload Photo</button>
          <div style={{fontSize:11,color:"#444",marginTop:4}}>Used as splash screen background</div>
          <input ref={fileRef} type="file" accept="image/*" onChange={handlePhoto} style={{display:"none"}}/>
        </div>
      </div>
      <h3 style={sec}>👤 Personal Info</h3>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:28}}>
        {[["firstName","First Name","e.g. Jacob","text"],["lastName","Last Name","e.g. Smith","text"],["email","Email","student@email.com","email"],["phone","Phone","(555) 000-0000","tel"]].map(([key,label,ph,type])=>(<div key={key}><label style={lbl}>{label}</label><input style={inp} type={type} value={form[key]} onChange={e=>set(key,e.target.value)} placeholder={ph} onFocus={e=>e.target.style.borderColor="#e63c3c"} onBlur={e=>e.target.style.borderColor="#2a2a2a"}/></div>))}
      </div>
      <h3 style={sec}>📊 Academic Stats</h3>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:14,marginBottom:28}}>
        {[["gpaUnweighted","GPA (UW)","0.0–4.0"],["gpaWeighted","GPA (W)","0.0–5.0"],["sat","SAT","400–1600"],["volunteerHours","Vol. Hours","e.g. 200"]].map(([key,label,ph])=>(<div key={key}><label style={lbl}>{label}</label><input style={inp} value={form[key]} onChange={e=>set(key,e.target.value)} placeholder={ph} onFocus={e=>e.target.style.borderColor="#e63c3c"} onBlur={e=>e.target.style.borderColor="#2a2a2a"}/></div>))}
      </div>
      <h3 style={sec}>🎖️ Honors & Awards</h3>
      <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:28}}>
        {honorOptions.map(h=>(<button key={h} onClick={()=>set("honors",form.honors.includes(h)?form.honors.filter(x=>x!==h):[...form.honors,h])} style={{padding:"6px 14px",borderRadius:20,border:`1px solid ${form.honors.includes(h)?"#e63c3c":"#2a2a2a"}`,background:form.honors.includes(h)?"rgba(230,60,60,0.15)":"#111",color:form.honors.includes(h)?"#e63c3c":"#666",fontSize:12,cursor:"pointer"}}>{form.honors.includes(h)?"✓ ":""}{h}</button>))}
      </div>
      <h3 style={sec}>🌟 Activities</h3>
      <div style={{marginBottom:28}}><textarea style={{...inp,height:80,resize:"vertical",fontFamily:"inherit"}} value={form.extracurriculars} onChange={e=>set("extracurriculars",e.target.value)} placeholder="e.g. Varsity Baseball (3 yrs), VP of FBLA, Secretary of DECA..." onFocus={e=>e.target.style.borderColor="#e63c3c"} onBlur={e=>e.target.style.borderColor="#2a2a2a"}/></div>
      <h3 style={sec}>🏫 School Applications</h3>
      <div style={{display:"flex",flexDirection:"column",gap:14,marginBottom:28}}>
        <div style={{background:"#111",borderRadius:10,padding:"16px",border:"1px solid #1f1f1f"}}><div style={{fontSize:12,color:"#888",marginBottom:10,fontWeight:700}}>① APPLIED TO</div><MultiSelectDropdown label="" options={ALL_SCHOOLS} selected={form.appliedSchools} onChange={vals=>{const removed=form.appliedSchools.filter(s=>!vals.includes(s));setForm(f=>({...f,appliedSchools:vals,acceptedSchools:f.acceptedSchools.filter(s=>!removed.includes(s)),rejectedSchools:f.rejectedSchools.filter(s=>!removed.includes(s))}));}} placeholder="Select schools applied to…"/></div>
        {form.appliedSchools.length>0&&<div style={{background:"#111",borderRadius:10,padding:"16px",border:"1px solid rgba(74,222,128,0.15)"}}><div style={{fontSize:12,color:"#4ade80",marginBottom:10,fontWeight:700}}>② ACCEPTED</div><MultiSelectDropdown label="" options={["None",...form.appliedSchools.filter(s=>!form.rejectedSchools.includes(s))]} selected={form.acceptedSchools.length===0&&form._noneAccepted?["None"]:form.acceptedSchools} onChange={vals=>{if(vals.includes("None")){setForm(f=>({...f,acceptedSchools:[],_noneAccepted:true}));}else{handleAcceptedChange(vals);setForm(f=>({...f,_noneAccepted:false}));}}} placeholder="Select accepted schools…"/></div>}
        {form.appliedSchools.length>0&&<div style={{background:"#111",borderRadius:10,padding:"16px",border:"1px solid rgba(248,113,113,0.15)"}}><div style={{fontSize:12,color:"#f87171",marginBottom:10,fontWeight:700}}>③ REJECTED</div><MultiSelectDropdown label="" options={["None",...form.appliedSchools.filter(s=>!form.acceptedSchools.includes(s))]} selected={form.rejectedSchools.length===0&&form._noneRejected?["None"]:form.rejectedSchools} onChange={vals=>{if(vals.includes("None")){setForm(f=>({...f,rejectedSchools:[],_noneRejected:true}));}else{handleRejectedChange(vals);setForm(f=>({...f,_noneRejected:false}));}}} placeholder="Select rejected schools…"/></div>}
      </div>
      <div style={{display:"flex",justifyContent:"flex-end",gap:10}}>
        {onCancel&&<button onClick={onCancel} style={{padding:"12px 24px",borderRadius:8,border:"1px solid #2a2a2a",background:"transparent",color:"#888",fontSize:13,cursor:"pointer"}}>Cancel</button>}
        <button onClick={handleSave} style={{padding:"12px 32px",borderRadius:8,border:"none",background:saved?"#4ade80":"#e63c3c",color:"#fff",fontSize:13,fontWeight:900,cursor:"pointer",textTransform:"uppercase",letterSpacing:"1px"}}>{saved?"✓ SAVED!":"SAVE PROFILE"}</button>
      </div>
    </div>
  </div>);
}

function Dashboard({user,profile,onEditProfile,onHome,photoUrl}){
  const[tab,setTab]=useState("overview");const[schoolFilter,setSchoolFilter]=useState(null);const[indepCat,setIndepCat]=useState("All");const[showPassed,setShowPassed]=useState(false);
  const appliedSchools=profile?.appliedSchools||[];const acceptedSchools=profile?.acceptedSchools||[];const rejectedSchools=profile?.rejectedSchools||[];
  const pendingSchools=appliedSchools.filter(s=>!acceptedSchools.includes(s)&&!rejectedSchools.includes(s));
  const totalSchoolAwards=acceptedSchools.filter(s=>SCHOOL_SCHOLARSHIPS[s]).reduce((sum,s)=>sum+(SCHOOL_SCHOLARSHIPS[s]?.length||0),0);
  const indepCats=["All",...Array.from(new Set(INDEPENDENT_SCHOLARSHIPS.map(s=>s.category)))];
  const indepFiltered=INDEPENDENT_SCHOLARSHIPS.filter(s=>indepCat==="All"||s.category===indepCat).filter(s=>showPassed||daysUntil(s.deadline)>=0);
  const tabs=[{id:"overview",label:"Overview"},{id:"applications",label:"Applications"},{id:"school-awards",label:"Awards"},{id:"independent",label:"Independent"}];
  const fn=profile?.firstName||"";
  return(<div style={{minHeight:"100vh",background:"#000",color:"#fff",fontFamily:"Arial,sans-serif"}}>
    <div style={{background:"#000",borderBottom:"1px solid #1a1a1a",padding:"0 28px",position:"sticky",top:0,zIndex:100}}>
      <div style={{maxWidth:1100,margin:"0 auto",display:"flex",alignItems:"center",gap:0}}>
        <button onClick={onHome} style={{background:"none",border:"none",color:"#fff",fontSize:18,fontWeight:900,fontFamily:"'Arial Black',sans-serif",cursor:"pointer",padding:"16px 0",marginRight:32,letterSpacing:"-1px",textTransform:"uppercase"}}>{fn?`${fn.toUpperCase()}'S `:<span/>}<span style={{color:"#e63c3c"}}>ST</span></button>
        <div style={{display:"flex",gap:0,flex:1}}>{tabs.map(t=>(<button key={t.id} onClick={()=>setTab(t.id)} style={{padding:"18px 20px",background:"none",border:"none",borderBottom:`2px solid ${tab===t.id?"#e63c3c":"transparent"}`,color:tab===t.id?"#fff":"#555",fontSize:13,fontWeight:700,cursor:"pointer",textTransform:"uppercase",letterSpacing:"0.5px",transition:"all 0.15s"}}>{t.label}</button>))}</div>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          {photoUrl&&<img src={photoUrl} alt="" style={{width:32,height:32,borderRadius:"50%",objectFit:"cover",filter:"grayscale(100%)",border:"2px solid #333"}}/>}
          <button onClick={onEditProfile} style={{background:"#1a1a1a",border:"1px solid #2a2a2a",borderRadius:6,color:"#aaa",padding:"7px 14px",cursor:"pointer",fontSize:12,textTransform:"uppercase",letterSpacing:"0.5px"}}>Edit Profile</button>
        </div>
      </div>
    </div>
    <div style={{maxWidth:1100,margin:"0 auto",padding:"32px 28px"}}>
      {tab==="overview"&&(<div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:28}}>
          {[{label:"Applied",value:appliedSchools.length,color:"#fff"},{label:"Accepted",value:acceptedSchools.length,color:"#4ade80"},{label:"School Awards",value:totalSchoolAwards,color:"#e63c3c"},{label:"Open Scholarships",value:INDEPENDENT_SCHOLARSHIPS.filter(s=>daysUntil(s.deadline)>=0).length,color:"#fbbf24"}].map(s=>(<div key={s.label} style={{background:"#0d0d0d",border:"1px solid #1a1a1a",borderRadius:10,padding:"20px 18px"}}><div style={{fontSize:36,fontWeight:900,color:s.color,lineHeight:1,fontFamily:"'Arial Black',sans-serif"}}>{s.value}</div><div style={{fontSize:11,color:"#555",marginTop:4,textTransform:"uppercase",letterSpacing:"1px"}}>{s.label}</div></div>))}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16,marginBottom:28}}>
          <div style={{background:"#0d0d0d",borderRadius:10,padding:"20px",border:"1px solid #1a1a1a"}}><div style={{fontSize:11,color:"#e63c3c",fontWeight:700,textTransform:"uppercase",letterSpacing:"2px",marginBottom:14}}>Academic</div>{[{label:"GPA (UW)",val:profile?.gpaUnweighted||"—",sub:"/4.0",bar:(parseFloat(profile?.gpaUnweighted)||0)/4,color:"#e63c3c"},{label:"GPA (W)",val:profile?.gpaWeighted||"—",sub:"/5.0",bar:(parseFloat(profile?.gpaWeighted)||0)/5,color:"#e63c3c"},{label:"SAT",val:profile?.sat||"—",sub:"/1600",bar:(parseInt(profile?.sat)||0)/1600,color:"#fff"},{label:"Vol. Hrs",val:profile?.volunteerHours?`${profile.volunteerHours}+`:"—",sub:"hrs",bar:Math.min((parseInt(profile?.volunteerHours)||0)/300,1),color:"#4ade80"}].map(item=>(<div key={item.label} style={{marginBottom:10}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span style={{fontSize:11,color:"#555"}}>{item.label}</span><span style={{fontSize:13,fontWeight:800,color:item.color}}>{item.val} <span style={{fontSize:9,color:"#333",fontWeight:400}}>{item.sub}</span></span></div><div style={{height:2,background:"#1a1a1a",borderRadius:2}}><div style={{height:"100%",width:`${item.bar*100}%`,background:item.color,borderRadius:2}}/></div></div>))}</div>
          <div style={{background:"#0d0d0d",borderRadius:10,padding:"20px",border:"1px solid #1a1a1a"}}><div style={{fontSize:11,color:"#e63c3c",fontWeight:700,textTransform:"uppercase",letterSpacing:"2px",marginBottom:14}}>Honors</div>{(profile?.honors||[]).length===0?<p style={{fontSize:12,color:"#444",margin:0}}>No honors added yet.</p>:<div style={{display:"flex",flexWrap:"wrap",gap:6}}>{(profile?.honors||[]).map(h=>(<span key={h} style={{fontSize:11,padding:"4px 10px",borderRadius:20,background:"rgba(230,60,60,0.1)",color:"#e63c3c",border:"1px solid rgba(230,60,60,0.2)"}}>{h}</span>))}</div>}</div>
          <div style={{background:"#0d0d0d",borderRadius:10,padding:"20px",border:"1px solid #1a1a1a"}}><div style={{fontSize:11,color:"#e63c3c",fontWeight:700,textTransform:"uppercase",letterSpacing:"2px",marginBottom:14}}>Activities</div><p style={{fontSize:12,color:profile?.extracurriculars?"#aaa":"#444",margin:0,lineHeight:1.7}}>{profile?.extracurriculars||"No activities added yet."}</p></div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
          {[{id:"applications",label:"APPLICATIONS",sub:`${appliedSchools.length} schools · ${acceptedSchools.length} accepted`},{id:"school-awards",label:"SCHOOL AWARDS",sub:`${totalSchoolAwards} scholarships available`},{id:"independent",label:"INDEPENDENT",sub:`${INDEPENDENT_SCHOLARSHIPS.filter(s=>daysUntil(s.deadline)>=0).length} open scholarships`}].map(c=>(<button key={c.id} onClick={()=>setTab(c.id)} style={{background:"#0d0d0d",border:"1px solid #1a1a1a",borderRadius:10,padding:"22px",textAlign:"left",cursor:"pointer",transition:"border-color 0.15s"}} onMouseEnter={e=>e.currentTarget.style.borderColor="#e63c3c"} onMouseLeave={e=>e.currentTarget.style.borderColor="#1a1a1a"}><div style={{fontSize:13,fontWeight:900,color:"#fff",marginBottom:6,textTransform:"uppercase",letterSpacing:"1px"}}>{c.label}</div><div style={{fontSize:12,color:"#555"}}>{c.sub}</div><div style={{marginTop:12,fontSize:12,color:"#e63c3c",fontWeight:700}}>View →</div></button>))}
        </div>
      </div>)}
      {tab==="applications"&&(<div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:24}}>{[{label:"Accepted",count:acceptedSchools.length,color:"#4ade80"},{label:"Pending",count:pendingSchools.length,color:"#fbbf24"},{label:"Rejected",count:rejectedSchools.length,color:"#f87171"}].map(s=>(<div key={s.label} style={{background:"#0d0d0d",border:"1px solid #1a1a1a",borderRadius:10,padding:"18px 20px",display:"flex",alignItems:"center",gap:14}}><div style={{fontSize:32,fontWeight:900,color:s.color,fontFamily:"'Arial Black',sans-serif"}}>{s.count}</div><div style={{fontSize:12,color:"#555",textTransform:"uppercase",letterSpacing:"1px"}}>{s.label}</div></div>))}</div>
        {appliedSchools.length===0?<div style={{textAlign:"center",padding:60,color:"#444"}}><div style={{fontSize:32,marginBottom:12}}>🏫</div><p>No schools added yet.</p></div>:<div style={{display:"flex",flexDirection:"column",gap:8}}>{[...acceptedSchools.map(s=>({name:s,status:"accepted"})),...pendingSchools.map(s=>({name:s,status:"waiting"})),...rejectedSchools.map(s=>({name:s,status:"rejected"}))].map(school=>{const cfg=STATUS_CONFIG[school.status];const hasS=school.status==="accepted"&&SCHOOL_SCHOLARSHIPS[school.name];return(<div key={school.name} style={{background:"#0d0d0d",borderRadius:10,border:"1px solid #1a1a1a",padding:"14px 18px",display:"flex",alignItems:"center",gap:14,cursor:hasS?"pointer":"default",transition:"border-color 0.15s"}} onMouseEnter={e=>{if(hasS)e.currentTarget.style.borderColor="#e63c3c";}} onMouseLeave={e=>e.currentTarget.style.borderColor="#1a1a1a"} onClick={()=>{if(hasS){setSchoolFilter(school.name);setTab("school-awards");}}}><StatusDot status={school.status}/><div style={{flex:1,fontSize:14,fontWeight:700,color:"#fff"}}>{school.name}</div><div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:11,padding:"3px 12px",borderRadius:20,background:cfg.bg,color:cfg.color,fontWeight:700}}>{cfg.label}</span>{hasS&&<span style={{fontSize:11,padding:"3px 12px",borderRadius:20,background:"rgba(230,60,60,0.1)",color:"#e63c3c"}}>{SCHOOL_SCHOLARSHIPS[school.name].length} awards →</span>}</div></div>);})}</div>}
      </div>)}
      {tab==="school-awards"&&(<div>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:18,flexWrap:"wrap"}}><h2 style={{margin:0,fontSize:18,fontWeight:900,color:"#fff",textTransform:"uppercase",letterSpacing:"-0.5px"}}>{schoolFilter||"All School Awards"}</h2>{schoolFilter&&<button onClick={()=>setSchoolFilter(null)} style={{fontSize:11,padding:"3px 10px",borderRadius:20,border:"1px solid #333",background:"transparent",color:"#888",cursor:"pointer"}}>Show All ×</button>}</div>
        {acceptedSchools.length===0?<div style={{textAlign:"center",padding:60,color:"#444"}}><p>No accepted schools yet.</p></div>:<><div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:18}}><button onClick={()=>setSchoolFilter(null)} style={{padding:"5px 14px",borderRadius:20,border:"1px solid",fontSize:11,fontWeight:700,cursor:"pointer",borderColor:!schoolFilter?"#e63c3c":"#2a2a2a",background:!schoolFilter?"rgba(230,60,60,0.1)":"transparent",color:!schoolFilter?"#e63c3c":"#666"}}>All</button>{acceptedSchools.map(s=>(<button key={s} onClick={()=>setSchoolFilter(s)} style={{padding:"5px 14px",borderRadius:20,border:"1px solid",fontSize:11,fontWeight:700,cursor:"pointer",borderColor:schoolFilter===s?"#e63c3c":"#2a2a2a",background:schoolFilter===s?"rgba(230,60,60,0.1)":"transparent",color:schoolFilter===s?"#e63c3c":"#666"}}>{s}</button>))}</div>{(schoolFilter?[schoolFilter]:acceptedSchools).map(name=>(<div key={name} style={{marginBottom:28}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><div style={{width:6,height:6,borderRadius:"50%",background:"#e63c3c"}}/><h3 style={{margin:0,fontSize:14,fontWeight:900,color:"#fff",textTransform:"uppercase",letterSpacing:"0.5px"}}>{name}</h3><span style={{fontSize:11,color:"#555"}}>{SCHOOL_SCHOLARSHIPS[name]?.length||0} awards</span></div>{!SCHOOL_SCHOLARSHIPS[name]?<div style={{padding:16,background:"#0d0d0d",borderRadius:8,border:"1px dashed #1f1f1f",textAlign:"center",color:"#444",fontSize:12}}>Check {name}'s financial aid portal directly.</div>:<div style={{display:"flex",flexDirection:"column",gap:8}}>{SCHOOL_SCHOLARSHIPS[name].map((s,i)=><ScholarshipCard key={i} s={s}/>)}</div>}</div>))}</>}
      </div>)}
      {tab==="independent"&&(<div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10,marginBottom:14}}><h2 style={{margin:0,fontSize:18,fontWeight:900,color:"#fff",textTransform:"uppercase",letterSpacing:"-0.5px"}}>Independent Scholarships</h2><div style={{display:"flex",gap:6,flexWrap:"wrap"}}><button onClick={()=>setShowPassed(!showPassed)} style={{padding:"5px 13px",borderRadius:20,border:"1px solid",fontSize:11,fontWeight:700,cursor:"pointer",borderColor:showPassed?"#f87171":"#2a2a2a",background:showPassed?"rgba(248,113,113,0.1)":"transparent",color:showPassed?"#f87171":"#666"}}>{showPassed?"Hide Passed":"Show All"}</button>{indepCats.map(c=>(<button key={c} onClick={()=>setIndepCat(c)} style={{padding:"5px 13px",borderRadius:20,border:"1px solid",fontSize:11,fontWeight:700,cursor:"pointer",borderColor:indepCat===c?"#e63c3c":"#2a2a2a",background:indepCat===c?"rgba(230,60,60,0.1)":"transparent",color:indepCat===c?"#e63c3c":"#666"}}>{c}</button>))}</div></div>
        <div style={{marginBottom:14,padding:"10px 14px",background:"rgba(230,60,60,0.05)",borderRadius:8,border:"1px solid rgba(230,60,60,0.15)"}}><p style={{margin:0,fontSize:12,color:"#888"}}>🎯 <strong style={{color:"#e63c3c"}}>{indepFiltered.length} scholarships</strong> matched · ⭐ Strong Match = highest fit · sorted by deadline</p></div>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>{[...indepFiltered].sort((a,b)=>{const ap=daysUntil(a.deadline)<0,bp=daysUntil(b.deadline)<0;if(ap&&!bp)return 1;if(!ap&&bp)return -1;if(a.match==="high"&&b.match!=="high")return -1;if(b.match==="high"&&a.match!=="high")return 1;return new Date(a.deadline)-new Date(b.deadline);}).map((s,i)=><ScholarshipCard key={i} s={s}/>)}</div>
      </div>)}
    </div>
  </div>);
}

export default function App(){
  const[user,setUser]=useState(null);
  const[profile,setProfile]=useState(null);
  const[editing,setEditing]=useState(false);
  const[screen,setScreen]=useState("splash");
  const[photoUrl,setPhotoUrl]=useState(null);

  useEffect(()=>{(async()=>{
    try{const r=await window.storage.get("scholartrack:profile");if(r)setProfile(JSON.parse(r.value));}catch(_){}
    try{const r=await window.storage.get("scholartrack:photo");if(r)setPhotoUrl(r.value);}catch(_){}
  })();},[]);

  const saveProfile=useCallback(async(data)=>{setProfile(data);setEditing(false);try{await window.storage.set("scholartrack:profile",JSON.stringify(data));}catch(_){}}, []);
  const savePhoto=useCallback(async(url)=>{setPhotoUrl(url);try{await window.storage.set("scholartrack:photo",url);}catch(_){}}, []);

  if(!user)return<LoginPage onLogin={(u)=>{setUser(u);setScreen("splash");}}/>;
  if(editing||!profile)return(<div style={{minHeight:"100vh",background:"#000",padding:"32px"}}><div style={{maxWidth:860,margin:"0 auto"}}><ProfileForm profile={profile} onSave={saveProfile} onCancel={profile?()=>setEditing(false):null} photoUrl={photoUrl} onPhotoChange={savePhoto}/></div></div>);
  if(screen==="splash")return<SplashScreen profile={profile} photoUrl={photoUrl} onNavigate={()=>setScreen("dashboard")}/>;
  return<Dashboard user={user} profile={profile} onEditProfile={()=>setEditing(true)} onHome={()=>setScreen("splash")} photoUrl={photoUrl}/>;
}
