import { ImageResponse } from "next/og";

export const alt = "GuestFlow Systems — automazioni per hotel e B&B";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"space-between",padding:"72px",background:"#101914",color:"white",fontFamily:"Arial, sans-serif"}}>
        <div style={{display:"flex",alignItems:"center",gap:"18px"}}>
          <div style={{width:"72px",height:"72px",borderRadius:"18px",display:"flex",alignItems:"center",justifyContent:"center",background:"#c9ff63",color:"#101914",fontWeight:900,fontSize:"24px"}}>GF</div>
          <div style={{display:"flex",flexDirection:"column"}}><span style={{fontSize:"32px",fontWeight:800}}>GuestFlow</span><span style={{fontSize:"15px",letterSpacing:"5px",textTransform:"uppercase",color:"#a8c395"}}>Systems</span></div>
        </div>
        <div style={{display:"flex",flexDirection:"column",maxWidth:"970px"}}>
          <span style={{fontSize:"18px",letterSpacing:"4px",textTransform:"uppercase",color:"#c9ff63",fontWeight:800}}>Automazioni per hotel e B&B</span>
          <div style={{fontSize:"72px",lineHeight:1.02,fontWeight:900,letterSpacing:"-3px",marginTop:"24px"}}>Automazioni per hotel, configurate per te.</div>
        </div>
        <div style={{display:"flex",gap:"22px",fontSize:"18px",color:"#c4d0c7"}}><span>Messaggi ospiti</span><span>•</span><span>Ospiti di ritorno</span><span>•</span><span>Concierge digitale</span><span>•</span><span>Prenotazioni dirette</span></div>
      </div>
    ),
    size
  );
}
