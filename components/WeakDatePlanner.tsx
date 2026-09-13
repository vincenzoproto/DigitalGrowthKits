"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import styles from "./WeakDatePlanner.module.css";

type Locale = "it" | "en";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function WeakDatePlanner({ locale }: { locale: Locale }) {
  const it = locale === "it";
  const [rooms, setRooms] = useState(20);
  const [sold, setSold] = useState(8);
  const [adr, setAdr] = useState(120);
  const [target, setTarget] = useState(80);
  const [weakDate, setWeakDate] = useState("");
  const [copied, setCopied] = useState(false);

  const plan = useMemo(() => {
    const totalRooms = Math.max(1, Number.isFinite(rooms) ? rooms : 1);
    const soldRooms = clamp(Number.isFinite(sold) ? sold : 0, 0, totalRooms);
    const targetOccupancy = clamp(Number.isFinite(target) ? target : 80, 1, 100);
    const roomRate = Math.max(0, Number.isFinite(adr) ? adr : 0);
    const targetSold = Math.ceil(totalRooms * (targetOccupancy / 100));
    const roomsToSell = Math.max(0, targetSold - soldRooms);
    const currentOccupancy = Math.round((soldRooms / totalRooms) * 100);
    const revenueOpportunity = roomsToSell * roomRate;

    const formatter = new Intl.NumberFormat(it ? "it-IT" : "en-IE", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    });

    let dateLabel = it ? "la data selezionata" : "your weak date";
    let daysAway: number | null = null;
    if (weakDate) {
      const parsed = new Date(`${weakDate}T12:00:00`);
      if (!Number.isNaN(parsed.getTime())) {
        dateLabel = new Intl.DateTimeFormat(it ? "it-IT" : "en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }).format(parsed);
        daysAway = Math.ceil((parsed.getTime() - Date.now()) / 86_400_000);
      }
    }

    const timing = daysAway === null
      ? (it ? "Mini-campagna di 7 giorni" : "7-day mini campaign")
      : daysAway <= 3
        ? (it ? "Sprint last minute: 72 ore" : "Last-minute sprint: 72 hours")
        : daysAway <= 7
          ? (it ? "Push concentrato di 7 giorni" : "Focused 7-day push")
          : daysAway <= 21
            ? (it ? "Mini-campagna di 2 settimane" : "2-week mini campaign")
            : (it ? "Campagna anticipata sulla domanda debole" : "Early low-demand campaign");

    const offer = roomRate >= 180
      ? (it
        ? "Mantieni la tariffa e aggiungi un vantaggio diretto percepibile: late check-out + welcome drink o credito esperienza."
        : "Protect the rate and add a visible direct-booking benefit: late checkout plus a welcome drink or experience credit.")
      : roomRate >= 100
        ? (it
          ? "Evita di partire dallo sconto: crea un pacchetto diretto con colazione, parcheggio o late check-out, con disponibilità limitata."
          : "Do not lead with a discount: build a direct package with breakfast, parking or late checkout and limit availability.")
        : (it
          ? "Mantieni semplice l’offerta: vantaggio diretto, cancellazione più flessibile o late check-out prima di ridurre la tariffa."
          : "Keep the offer simple: use a direct-booking perk, more flexible cancellation or late checkout before cutting the rate.");

    const status = roomsToSell === 0
      ? (it
        ? `Obiettivo già coperto: sei al ${currentOccupancy}% rispetto al target del ${targetOccupancy}%.`
        : `Target already covered: you are at ${currentOccupancy}% against a ${targetOccupancy}% target.`)
      : (it
        ? `Ti mancano ${roomsToSell} ${roomsToSell === 1 ? "camera" : "camere"} per arrivare al ${targetOccupancy}% su ${dateLabel}.`
        : `You need ${roomsToSell} more ${roomsToSell === 1 ? "room" : "rooms"} to reach ${targetOccupancy}% for ${dateLabel}.`);

    const subject = it
      ? `${dateLabel}: un motivo in più per tornare da noi`
      : `${dateLabel}: one more reason to stay with us`;

    const email = it
      ? `Abbiamo aperto una disponibilità limitata per ${dateLabel}. Prenotando direttamente trovi il vantaggio dedicato alla data, senza passaggi intermedi. Se stavi pensando a un soggiorno, questa è la finestra giusta per verificarlo.`
      : `We have opened limited availability for ${dateLabel}. Book direct to access the date-specific benefit with no extra steps. If you were considering a stay, this is a good window to check availability.`;

    const reel = it
      ? `Hook: “Una data che non vogliamo lasciare vuota.” Mostra 3 scene reali della struttura, il vantaggio incluso e chiudi con “Disponibilità limitata per ${dateLabel} — prenota diretto”.`
      : `Hook: “One date we do not want to leave empty.” Show three real property moments, reveal the included benefit, then close with “Limited availability for ${dateLabel} — book direct”.`;

    const actions = roomsToSell === 0
      ? (it
        ? ["Non aumentare lo sconto: proteggi ADR e margine.", "Sposta il budget sulla prossima data sotto target.", "Usa la data coperta come benchmark per il prossimo test."]
        : ["Do not deepen the discount: protect ADR and margin.", "Move the effort to the next below-target date.", "Use this filled date as a benchmark for the next test."])
      : (it
        ? [
            `Giorno 1: pubblica il contenuto e invia l’email al segmento più pertinente.`,
            `Giorno 2–3: retargeting organico via Stories/WhatsApp solo sui contatti idonei.`,
            `Ultime 48 ore: aggiorna disponibilità e urgenza senza inventare scarsità.`,
          ]
        : [
            `Day 1: publish the content and email the most relevant eligible segment.`,
            `Day 2–3: organic retargeting through Stories/WhatsApp for eligible contacts only.`,
            `Final 48 hours: update availability and urgency without manufacturing scarcity.`,
          ]);

    return {
      currentOccupancy,
      roomsToSell,
      revenueOpportunity,
      targetOccupancy,
      status,
      timing,
      offer,
      subject,
      email,
      reel,
      actions,
      revenueLabel: formatter.format(revenueOpportunity),
      dateLabel,
    };
  }, [adr, it, rooms, sold, target, weakDate]);

  const copyPlan = async () => {
    const text = it
      ? `PIANO DATA DEBOLE — ${plan.dateLabel}\n\n${plan.status}\nValore del gap al tuo ADR: ${plan.revenueLabel}\nTiming: ${plan.timing}\n\nOFFERTA\n${plan.offer}\n\nEMAIL\nOggetto: ${plan.subject}\n${plan.email}\n\nREEL / SOCIAL\n${plan.reel}\n\nAZIONI\n${plan.actions.map((item, index) => `${index + 1}. ${item}`).join("\n")}`
      : `WEAK-DATE PLAN — ${plan.dateLabel}\n\n${plan.status}\nGap value at your ADR: ${plan.revenueLabel}\nTiming: ${plan.timing}\n\nOFFER\n${plan.offer}\n\nEMAIL\nSubject: ${plan.subject}\n${plan.email}\n\nREEL / SOCIAL\n${plan.reel}\n\nACTIONS\n${plan.actions.map((item, index) => `${index + 1}. ${item}`).join("\n")}`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className={styles.shell}>
      <div className={styles.intro}>
        <div>
          <span className="eyebrow">{it ? "Strumento gratuito · GuestFlow" : "Free tool · GuestFlow"}</span>
          <h1>{it ? "Trasforma una data debole in un piano d’azione." : "Turn a weak date into an action plan."}</h1>
          <p className={styles.lead}>
            {it
              ? "Inserisci cinque numeri. GuestFlow calcola il gap di occupazione e prepara una mini-campagna concreta per quella data, senza partire automaticamente dallo sconto."
              : "Enter five inputs. GuestFlow calculates the occupancy gap and prepares a practical mini campaign for that date without automatically leading with a discount."}
          </p>
        </div>
        <aside className={styles.introCard}>
          <b>{it ? "Nessun dato ospite richiesto" : "No guest data required"}</b>
          <span>{it ? "Usa solo numeri aggregati e una data." : "Use only aggregate numbers and a date."}</span>
          <span>{it ? "Il risultato è una stima operativa, non una previsione di ricavo." : "The result is an operating estimate, not a revenue forecast."}</span>
        </aside>
      </div>

      <div className={styles.grid}>
        <div className={styles.panel}>
          <div className={styles.panelHead}>
            <span>01</span>
            <div><b>{it ? "Dati della data" : "Date inputs"}</b><small>{it ? "Modifica i valori e il piano si aggiorna subito." : "Change the values and the plan updates instantly."}</small></div>
          </div>
          <div className={styles.formGrid}>
            <label className={styles.field}>
              <span>{it ? "Camere disponibili" : "Rooms available"}</span>
              <input type="number" min="1" max="1000" inputMode="numeric" value={rooms} onChange={(e) => setRooms(Number(e.target.value))} />
            </label>
            <label className={styles.field}>
              <span>{it ? "Camere già vendute" : "Rooms already sold"}</span>
              <input type="number" min="0" max={Math.max(rooms, 0)} inputMode="numeric" value={sold} onChange={(e) => setSold(Number(e.target.value))} />
            </label>
            <label className={styles.field}>
              <span>{it ? "ADR medio (€)" : "Average ADR (€)"}</span>
              <input type="number" min="0" max="10000" inputMode="decimal" value={adr} onChange={(e) => setAdr(Number(e.target.value))} />
            </label>
            <label className={styles.field}>
              <span>{it ? "Occupazione obiettivo (%)" : "Target occupancy (%)"}</span>
              <input type="number" min="1" max="100" inputMode="numeric" value={target} onChange={(e) => setTarget(Number(e.target.value))} />
            </label>
            <label className={`${styles.field} ${styles.fieldWide}`}>
              <span>{it ? "Data debole" : "Weak date"}</span>
              <input type="date" value={weakDate} onChange={(e) => setWeakDate(e.target.value)} />
            </label>
          </div>
          <p className={styles.note}>{it ? "Suggerimento: usa l’inventario realmente vendibile su quella notte, non il numero totale teorico della struttura." : "Tip: use the inventory you can actually sell that night, not the property's theoretical room count."}</p>
        </div>

        <div className={`${styles.panel} ${styles.resultPanel}`}>
          <div className={styles.panelHead}>
            <span>02</span>
            <div><b>{it ? "Piano generato" : "Generated plan"}</b><small>{plan.timing}</small></div>
          </div>

          <div className={styles.metrics}>
            <div><small>{it ? "Occupazione ora" : "Occupancy now"}</small><strong>{plan.currentOccupancy}%</strong></div>
            <div><small>{it ? "Camere al target" : "Rooms to target"}</small><strong>{plan.roomsToSell}</strong></div>
            <div><small>{it ? "Valore del gap" : "Gap value"}</small><strong>{plan.revenueLabel}</strong></div>
          </div>

          <div className={styles.status}>{plan.status}</div>

          <div className={styles.planBlock}>
            <article>
              <span>{it ? "Offerta" : "Offer"}</span>
              <p>{plan.offer}</p>
            </article>
            <article>
              <span>Email</span>
              <h3>{plan.subject}</h3>
              <p>{plan.email}</p>
            </article>
            <article>
              <span>Reel / Social</span>
              <p>{plan.reel}</p>
            </article>
            <article>
              <span>{it ? "Sequenza" : "Sequence"}</span>
              <ol>{plan.actions.map((item) => <li key={item}>{item}</li>)}</ol>
            </article>
          </div>

          <button type="button" className={styles.copyButton} onClick={copyPlan}>{copied ? (it ? "Copiato ✓" : "Copied ✓") : (it ? "Copia il piano" : "Copy plan")}</button>
        </div>
      </div>

      <div className={styles.cta}>
        <div>
          <span className="eyebrow">{it ? "Dal piano all’automazione" : "From plan to automation"}</span>
          <h2>{it ? "Vuoi riattivare le date deboli in modo ripetibile?" : "Want a repeatable way to reactivate weak dates?"}</h2>
          <p>{it ? "Repeat Guest Engine organizza segmenti e flussi di riattivazione sui contatti marketing idonei, con setup e consegna al team." : "Repeat Guest Engine organises eligible marketing segments and reactivation flows, with setup and team handover."}</p>
        </div>
        <div className={styles.ctaActions}>
          <Link className="primary" href={it ? "/it/repeat-guest-engine" : "/repeat-guest-engine"}>{it ? "Vedi Repeat Guest Engine" : "See Repeat Guest Engine"}</Link>
          <Link className={styles.textLink} href={it ? "/it/audit" : "/audit"}>{it ? "Oppure fai l’audit gratuito →" : "Or take the free audit →"}</Link>
        </div>
      </div>
    </section>
  );
}
