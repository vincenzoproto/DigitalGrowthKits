"use client";

import { useMemo, useState } from "react";

type GuestRow = Record<string, string>;

type Summary = {
  imported: number;
  eligible: number;
  recent: number;
  dormant: number;
  lowSeason: number;
  highValue: number;
  suppressed: number;
  invalid: number;
};

const REQUIRED = ["email", "last_stay_date", "last_booking_value", "stay_season", "marketing_eligible", "unsubscribed"];

function parseCsv(text: string): GuestRow[] {
  const lines = text.replace(/\r/g, "").split("\n").filter(Boolean);
  if (lines.length < 2) return [];

  const parseLine = (line: string) => {
    const out: string[] = [];
    let current = "";
    let quoted = false;
    for (let i = 0; i < line.length; i += 1) {
      const char = line[i];
      if (char === '"') {
        if (quoted && line[i + 1] === '"') {
          current += '"';
          i += 1;
        } else {
          quoted = !quoted;
        }
      } else if (char === "," && !quoted) {
        out.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
    out.push(current.trim());
    return out;
  };

  const headers = parseLine(lines[0]).map((h) => h.trim().toLowerCase());
  return lines.slice(1).map((line) => {
    const values = parseLine(line);
    return headers.reduce<GuestRow>((row, header, index) => {
      row[header] = values[index] ?? "";
      return row;
    }, {});
  });
}

function truthy(value?: string) {
  return ["true", "1", "yes", "y", "si", "sì"].includes((value ?? "").trim().toLowerCase());
}

function daysSince(value?: string) {
  if (!value) return Number.NaN;
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return Number.NaN;
  return Math.floor((Date.now() - date.getTime()) / 86400000);
}

export default function DemoCsvAnalyzer() {
  const [rows, setRows] = useState<GuestRow[]>([]);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");

  const summary = useMemo<Summary>(() => {
    let eligible = 0;
    let recent = 0;
    let dormant = 0;
    let lowSeason = 0;
    let highValue = 0;
    let suppressed = 0;
    let invalid = 0;

    rows.forEach((row) => {
      const emailValid = /.+@.+\..+/.test(row.email ?? "");
      const days = daysSince(row.last_stay_date);
      const bookingValue = Number.parseFloat((row.last_booking_value ?? "").replace(",", "."));
      const optedOut = truthy(row.unsubscribed);
      const marketingEligible = truthy(row.marketing_eligible) && !optedOut;

      if (!emailValid || Number.isNaN(days) || Number.isNaN(bookingValue)) invalid += 1;
      if (marketingEligible) eligible += 1;
      if (!marketingEligible || optedOut) suppressed += 1;
      if (marketingEligible && days >= 0 && days <= 90) recent += 1;
      if (marketingEligible && days >= 180) dormant += 1;
      if (marketingEligible && (row.stay_season ?? "").toLowerCase() === "low") lowSeason += 1;
      if (marketingEligible && bookingValue >= 500) highValue += 1;
    });

    return { imported: rows.length, eligible, recent, dormant, lowSeason, highValue, suppressed, invalid };
  }, [rows]);

  async function handleFile(file?: File) {
    if (!file) return;
    setError("");
    setRows([]);
    setFileName(file.name);

    if (!file.name.toLowerCase().endsWith(".csv")) {
      setError("Use a CSV file for this demo.");
      return;
    }

    const text = await file.text();
    const firstLine = text.replace(/\r/g, "").split("\n")[0] ?? "";
    const headers = firstLine.split(",").map((h) => h.replaceAll('"', "").trim().toLowerCase());
    const missing = REQUIRED.filter((field) => !headers.includes(field));
    if (missing.length) {
      setError(`Missing required columns: ${missing.join(", ")}`);
      return;
    }

    const parsed = parseCsv(text);
    if (!parsed.length) {
      setError("No guest rows were found in the CSV.");
      return;
    }
    setRows(parsed);
  }

  const cards: Array<[string, number]> = [
    ["Imported rows", summary.imported],
    ["Marketing eligible", summary.eligible],
    ["Recent · 0–90d", summary.recent],
    ["Dormant · 180d+", summary.dormant],
    ["Low-season visitors", summary.lowSeason],
    ["High-value · €500+", summary.highValue],
    ["Suppressed / ineligible", summary.suppressed],
    ["Rows needing review", summary.invalid],
  ];

  const campaigns = [
    {
      name: "Post-stay relationship",
      audience: summary.recent,
      trigger: "Recent eligible guests · 0–90 days",
      purpose: "Bring recent guests back into a direct relationship while the stay is still fresh.",
      subject: "Thanks for staying with us — one thing before your next visit",
      body: "Hi {{first_name}}, thank you for staying with us. If you plan to return, booking directly gives you the clearest route to our current offers and availability. {{direct_booking_link}}",
    },
    {
      name: "180-day win-back",
      audience: summary.dormant,
      trigger: "Eligible guests · last stay 180+ days ago",
      purpose: "Re-engage past guests with a property-approved reason to return.",
      subject: "It may be time to come back",
      body: "Hi {{first_name}}, it has been a while since your last stay. We would be glad to welcome you back. Here is the direct booking page for current dates and any approved returning-guest offer: {{direct_booking_link}}",
    },
    {
      name: "Low-season fill",
      audience: summary.lowSeason,
      trigger: "Eligible guests with previous low-season stays",
      purpose: "Target guests already familiar with quieter travel periods instead of broadcasting to the whole database.",
      subject: "A quieter stay, directly with us",
      body: "Hi {{first_name}}, you previously stayed with us outside peak season. We are opening selected quieter dates and wanted to share the direct booking route with you first: {{direct_booking_link}}",
    },
  ];

  return (
    <section style={{ marginTop: 18, background: "#fffef9", border: "1px solid #dcd9cf", borderRadius: 18, padding: 24 }}>
      <span style={{ fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase" }}>Live local test · no upload</span>
      <h3 style={{ fontSize: 30, margin: "10px 0" }}>Test a CSV and see the segments immediately.</h3>
      <p style={{ color: "#62685f", maxWidth: 850 }}>
        The file is processed only in your browser for this walkthrough. Nothing is sent to a server and this demo does not send guest communications.
      </p>

      <label style={{ display: "inline-block", marginTop: 12, padding: "12px 16px", borderRadius: 999, border: "1px solid #172019", cursor: "pointer", fontWeight: 700 }}>
        Choose CSV
        <input type="file" accept=".csv,text/csv" onChange={(event) => handleFile(event.target.files?.[0])} style={{ display: "none" }} />
      </label>
      {fileName ? <span style={{ marginLeft: 12, fontSize: 13, color: "#62685f" }}>{fileName}</span> : null}
      {error ? <div style={{ marginTop: 16, padding: 14, borderRadius: 12, background: "#f7e9e7" }}>{error}</div> : null}

      {rows.length ? (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))", gap: 12, marginTop: 22 }}>
            {cards.map(([label, value]) => (
              <div key={label} style={{ border: "1px solid #e2ded4", borderRadius: 14, padding: 16 }}>
                <strong style={{ fontSize: 28 }}>{value}</strong>
                <div style={{ fontSize: 12, color: "#62685f", marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 28 }}>
            <span style={{ fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase" }}>Campaign simulator · preview only</span>
            <h3 style={{ fontSize: 28, margin: "8px 0 6px" }}>This is what the hotel would approve before launch.</h3>
            <p style={{ color: "#62685f", maxWidth: 850, marginTop: 0 }}>
              Audience counts are calculated from the CSV you selected. The examples below are draft structures only: no campaign is created or sent from this demo.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 14, marginTop: 18 }}>
              {campaigns.map((campaign) => (
                <article key={campaign.name} style={{ border: "1px solid #dcd9cf", borderRadius: 16, padding: 18, background: "white" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                    <strong style={{ fontSize: 18 }}>{campaign.name}</strong>
                    <span style={{ borderRadius: 999, padding: "5px 9px", fontSize: 11, background: campaign.audience > 0 ? "#eff3e4" : "#f1efea" }}>
                      {campaign.audience > 0 ? "Ready to review" : "No matching audience"}
                    </span>
                  </div>
                  <div style={{ marginTop: 14, padding: 14, borderRadius: 12, background: "#172019", color: "white" }}>
                    <strong style={{ fontSize: 30 }}>{campaign.audience}</strong>
                    <div style={{ color: "#c5cec5", fontSize: 12, marginTop: 3 }}>contacts in this preview audience</div>
                  </div>
                  <p style={{ fontSize: 13, color: "#62685f" }}><strong>Rule:</strong> {campaign.trigger}</p>
                  <p style={{ fontSize: 13, color: "#62685f" }}>{campaign.purpose}</p>
                  <div style={{ marginTop: 16, borderTop: "1px solid #ece8df", paddingTop: 14 }}>
                    <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: ".08em", color: "#7a8078" }}>Example message</div>
                    <div style={{ fontWeight: 700, marginTop: 7, fontSize: 14 }}>{campaign.subject}</div>
                    <p style={{ fontSize: 13, lineHeight: 1.55, color: "#51584f", marginBottom: 0 }}>{campaign.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 20, padding: 16, borderRadius: 12, background: "#f2efe5", color: "#51584f", fontSize: 13 }}>
            Safety rule in this demo: only rows marked marketing_eligible=true and unsubscribed=false can enter promotional segments. Final production rules, offers, timing, language and lawful basis still require property approval before any live send.
          </div>
        </>
      ) : null}
    </section>
  );
}
