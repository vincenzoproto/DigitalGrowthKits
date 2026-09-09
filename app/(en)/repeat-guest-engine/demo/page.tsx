import { createPageMetadata } from "@/lib/seo";
import Link from "next/link";
import styles from "../repeat-guest.module.css";
import DemoCsvAnalyzer from "./DemoCsvAnalyzer";

const segments = [
  {name:"Marketing eligible", count:1248, note:"Confirmed eligible for promotional campaigns"},
  {name:"Recent guests · 0–90d", count:386, note:"Good fit for post-stay and referral flows"},
  {name:"Dormant · 180d+", count:512, note:"Win-back audience"},
  {name:"Low-season visitors", count:274, note:"Past stays in off-peak months"},
  {name:"High-value stays", count:119, note:"Above configured booking-value threshold"},
  {name:"Suppressed / unsubscribed", count:163, note:"Excluded from marketing sends"},
];

const sampleRows = [
  ["guest-001@example.test","2026-05-18","€620","IT","Eligible"],
  ["guest-002@example.test","2025-11-03","€1,180","EN","Eligible"],
  ["guest-003@example.test","2025-02-21","€410","DE","Suppressed"],
  ["guest-004@example.test","2024-12-09","€760","IT","Eligible"],
];

export const metadata = createPageMetadata({"path": "/repeat-guest-engine/demo", "title": "Hotel guest reactivation workflow demo | GuestFlow", "description": "Explore how guest history becomes useful segments and repeat-guest campaigns, using illustrative data and a local CSV preview."});

export default function RepeatGuestDemo() {
  return (
    <main className={styles.shell}>
      <section className={styles.section}>
        <Link href="/repeat-guest-engine" className={styles.secondary}>← Repeat Guest Engine</Link>
        <div style={{marginTop:32}}><span className={styles.eyebrow}>Interactive sales walkthrough · synthetic data</span><h2 style={{maxWidth:900}}>From a guest export to a controlled repeat-booking workflow.</h2><p className={styles.leadSmall}>Everything on this page is fictional demo data. It illustrates the implementation process and does not represent a real hotel or guaranteed commercial results.</p></div>

        <DemoCsvAnalyzer />

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:14,margin:"34px 0"}}>
          {[['1,411','Synthetic imported contacts'],['1,248','Demo marketing eligible'],['3','Configured workflow examples'],['0','Real bookings claimed']].map(([value,label])=><div key={label} style={{background:'#172019',color:'white',padding:22,borderRadius:16}}><strong style={{fontSize:34}}>{value}</strong><div style={{color:'#b9c7b9',fontSize:13,marginTop:5}}>{label}</div></div>)}
        </div>

        <section style={{background:'#fffef9',border:'1px solid #dcd9cf',borderRadius:18,padding:24,marginBottom:18}}>
          <span className={styles.eyebrow}>Step 1 · Import</span><h3 style={{fontSize:28,margin:'10px 0'}}>Start from a clean PMS / CSV export.</h3><p style={{color:'#62685f'}}>We map only the fields needed for the agreed workflow. No live guest database is required during the initial sales conversation.</p>
          <div style={{overflowX:'auto',marginTop:18}}><table style={{width:'100%',borderCollapse:'collapse',minWidth:620}}><thead><tr>{['Email','Last stay','Past value','Language','Marketing status'].map(h=><th key={h} style={{textAlign:'left',padding:'10px 8px',borderBottom:'1px solid #dcd9cf',fontSize:12}}>{h}</th>)}</tr></thead><tbody>{sampleRows.map((row,i)=><tr key={i}>{row.map(cell=><td key={cell} style={{padding:'12px 8px',borderBottom:'1px solid #eeeae0',fontSize:13}}>{cell}</td>)}</tr>)}</tbody></table></div>
        </section>

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:18}}>
          <section style={{background:'#fffef9',border:'1px solid #dcd9cf',borderRadius:18,padding:24}}>
            <span className={styles.eyebrow}>Step 2 · Segment</span><h3 style={{fontSize:28,margin:'10px 0'}}>Separate useful audiences.</h3>
            {segments.map(s=><div key={s.name} style={{padding:'16px 0',borderBottom:'1px solid #e6e2d9',display:'grid',gridTemplateColumns:'1fr auto',gap:12}}><div><strong>{s.name}</strong><div style={{color:'#62685f',fontSize:13,marginTop:4}}>{s.note}</div></div><strong style={{fontSize:22}}>{s.count}</strong></div>)}
          </section>

          <section style={{background:'#fffef9',border:'1px solid #dcd9cf',borderRadius:18,padding:24}}>
            <span className={styles.eyebrow}>Step 3 · Automate</span><h3 style={{fontSize:28,margin:'10px 0'}}>Build three controlled flows.</h3>
            {[['Post-stay relationship','Active','Recent eligible guests receive a timed follow-up and preference path.'],['180-day win-back','Active','Dormant eligible guests enter a language-specific return campaign.'],['Low-season fill','Scheduled','Targets relevant past off-peak guests with a property-approved direct offer.']].map(([name,status,desc])=><div key={name} style={{padding:'18px 0',borderBottom:'1px solid #e6e2d9'}}><div style={{display:'flex',justifyContent:'space-between',gap:10}}><strong>{name}</strong><span style={{fontSize:11,background:'#eff3e4',padding:'5px 8px',borderRadius:999}}>{status}</span></div><p style={{color:'#62685f',fontSize:14}}>{desc}</p></div>)}
            <div style={{marginTop:22,padding:16,background:'#f2efe5',borderRadius:12,color:'#62685f',fontSize:13}}>Marketing sends are restricted to contacts the property confirms are eligible. Suppressed and unsubscribed contacts remain excluded.</div>
          </section>
        </div>

        <section style={{marginTop:18,background:'#172019',color:'white',borderRadius:18,padding:26}}>
          <span style={{fontSize:11,letterSpacing:'.12em',textTransform:'uppercase',color:'#b9c7b9'}}>Step 4 · Approve & launch</span><h3 style={{fontSize:30,margin:'10px 0'}}>Nothing promotional goes live before property approval.</h3><p style={{color:'#c5cec5',maxWidth:820}}>We test the workflow, confirm segments, sending rules, language and booking destination, then hand over the operating view. The hotel remains responsible for confirming its lawful basis and the accuracy of customer-facing offers.</p>
        </section>

        <section style={{marginTop:34,border:'1px solid #dcd9cf',borderRadius:18,padding:26,background:'#fffef9'}}>
          <span className={styles.eyebrow}>Founder launch · first 3 completed purchases</span><h3 style={{fontSize:32,margin:'10px 0'}}>€690 one-time setup</h3><p style={{color:'#62685f'}}>Includes one-property database mapping, segmentation, three core automations, reporting view and staff handover. Optional managed service remains separate. Founder pricing is limited by the live checkout to three completed purchases.</p>
          <div className={styles.actions} style={{marginTop:22}}><a className={styles.primary} href="/buy/repeat-guest-engine-founder">Secure a Founder slot</a><Link className={styles.secondary} href="/request-setup?product=repeat-guest-engine">Request a review first</Link></div>
        </section>
      </section>
    </main>
  );
}
