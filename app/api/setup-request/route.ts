import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type SetupRequest = {
  product?: string;
  referral?: string;
  propertyName?: string;
  propertyType?: string;
  contactName?: string;
  email?: string;
  website?: string;
  rooms?: string;
  currentStack?: string;
  databaseSize?: string;
  notes?: string;
  companyWebsite?: string;
};

function clean(value: unknown, max = 500) {
  return String(value ?? "").trim().slice(0, max);
}

function formatText(data: Required<Omit<SetupRequest, "companyWebsite">>) {
  return [
    `System: ${data.product}`,
    `Referral: ${data.referral || "direct"}`,
    `Property: ${data.propertyName}`,
    `Property type: ${data.propertyType}`,
    `Rooms / units: ${data.rooms || "-"}`,
    `Contact: ${data.contactName}`,
    `Email: ${data.email}`,
    `Website: ${data.website || "-"}`,
    `Current PMS / tools: ${data.currentStack || "-"}`,
    `Approx. past-guest database: ${data.databaseSize || "-"}`,
    "",
    "Main goal / notes:",
    data.notes || "-",
  ].join("\n");
}

export async function POST(request: NextRequest) {
  try {
    const raw = (await request.json()) as SetupRequest;
    if (clean(raw.companyWebsite, 100)) return NextResponse.json({ ok: true });

    const data = {
      product: clean(raw.product, 120),
      referral: clean(raw.referral, 40),
      propertyName: clean(raw.propertyName, 180),
      propertyType: clean(raw.propertyType, 80),
      contactName: clean(raw.contactName, 140),
      email: clean(raw.email, 180),
      website: clean(raw.website, 300),
      rooms: clean(raw.rooms, 40),
      currentStack: clean(raw.currentStack, 400),
      databaseSize: clean(raw.databaseSize, 120),
      notes: clean(raw.notes, 2500),
    };

    if (!data.product || !data.propertyName || !data.contactName || !data.email) return NextResponse.json({ ok: false, code: "MISSING_FIELDS" }, { status: 400 });
    if (!/^\S+@\S+\.\S+$/.test(data.email)) return NextResponse.json({ ok: false, code: "INVALID_EMAIL" }, { status: 400 });

    const subject = `GuestFlow Systems - ${data.product} setup request${data.referral ? ` [${data.referral}]` : ""}`;
    const text = formatText(data);
    const webhook = process.env.SETUP_REQUEST_WEBHOOK_URL;

    if (webhook) {
      const webhookResponse = await fetch(webhook, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ subject, text, ...data, source: "guestflowsystems.com" }), cache: "no-store" });
      if (webhookResponse.ok) return NextResponse.json({ ok: true, channel: "webhook" });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const resendFrom = process.env.RESEND_FROM;
    const recipient = process.env.SETUP_REQUEST_TO || "info@vincenzoproto.com";

    if (resendApiKey && resendFrom) {
      const resendResponse = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${resendApiKey}`, "Content-Type": "application/json" }, body: JSON.stringify({ from: resendFrom, to: [recipient], reply_to: data.email, subject, text }), cache: "no-store" });
      if (resendResponse.ok) return NextResponse.json({ ok: true, channel: "email" });
      return NextResponse.json({ ok: false, code: "DELIVERY_FAILED" }, { status: 502 });
    }

    return NextResponse.json({ ok: false, code: "DELIVERY_NOT_CONFIGURED" }, { status: 503 });
  } catch {
    return NextResponse.json({ ok: false, code: "INVALID_REQUEST" }, { status: 400 });
  }
}
