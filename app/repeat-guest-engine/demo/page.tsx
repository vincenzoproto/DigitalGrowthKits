import Link from "next/link";
import styles from "../repeat-guest.module.css";

const segments = [
  {name:"Marketing eligible", count:1248, note:"Confirmed eligible for promotional campaigns"},
  {name:"Recent guests · 0–90d", count:386, note:"Good fit for post-stay and referral flows"},
  {name:"Dormant · 180d+", count:512, note:"Win-back audience"},
  {name:"Low-season visitors", count:274, note:"Past stays in off-peak months"},
  {name:"High-value stays", count:119, note:"Above configured booking-value threshold"},
  {name:"Suppressed / unsubscribed", count:163, note:"Excluded from marketing sends"},
];

export default function RepeatGuestDemo() {
  return (
    <main className={styles.shell}>
      <section className={styles.section}>
        <Link href="/repeat-guest-engine" className={styles.secondary}>← Repeat Guest Engine</Link>
        <div style={{marginTop:32}}><span className={styles.eyebrow}>Demo data only</span><h2 style={{maxWidth:900}}>Guest Retention Dashboard</h2><p className={styles.leadSmall}>Example of the operating view after a guest database has been mapped, cleaned and segmented.</p></div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:14,margin:"34px 0"}}>
          {[['1,411','Imported contacts'],['1,248','Marketing eligible'],['3','Active automations'],['8.7%','Demo direct-booking conversion']].map(([value,label])=><div key={label} style={{background:'#172019',color:'white',padding:22,borderRadius:16}}><strong style={{fontSize:34}}>{value}</strong><div style={{color:'#b9c7b9',fontSize:13,marginTop:5}}>{label}</div></div>)}
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18}}>
          <section style={{background:'#fffef9',border:'1px solid #dcd9cf',borderRadius:18,padding:24}}>
            <span className={styles.eyebrow}>Segments</span>
            {segments.map(s=><div key={s.name} style={{padding:'16px 0',borderBottom:'1px solid #e6e2d9',display:'grid',gridTemplateColumns:'1fr auto',gap:12}}><div><strong>{s.name}</strong><div style={{color:'#62685f',fontSize:13,marginTop:4}}>{s.note}</div></div><strong style={{fontSize:22}}>{s.count}</strong></div>)}
          </section>

          <section style={{background:'#fffef9',border:'1px solid #dcd9cf',borderRadius:18,padding:24}}>
            <span className={styles.eyebrow}>Automations</span>
            {[['Post-stay relationship','Active','Recent eligible guests receive a timed follow-up and preference path.'],['180-day win-back','Active','Dormant eligible guests enter a language-specific return campaign.'],['Low-season fill','Scheduled','Targets past off-peak guests with a property-defined direct offer.']].map(([name,status,desc])=><div key={name} style={{padding:'18px 0',borderBottom:'1px solid #e6e2d9'}}><div style={{display:'flex',justifyContent:'space-between',gap:10}}><strong>{name}</strong><span style={{fontSize:11,background:'#eff3e4',padding:'5px 8px',borderRadius:999}}>{status}</span></div><p style={{color:'#62685f',fontSize:14}}>{desc}</p></div>)}
            <div style={{marginTop:22,padding:16,background:'#f2efe5',borderRadius:12,color:'#62685f',fontSize:13}}>Marketing sends are restricted to eligible contacts. Suppressed and unsubscribed contacts remain excluded.</div>
          </section>
        </div>

        <div className={styles.actions} style={{marginTop:34}}><a className={styles.primary} href="mailto:info@vincenzoproto.com?subject=Repeat%20Guest%20Engine%20Setup">Request this setup</a><Link className={styles.secondary} href="/repeat-guest-engine">View package</Link></div>
      </section>
    </main>
  );
}
