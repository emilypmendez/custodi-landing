import { NextResponse } from "next/server";
import { isValidEmail } from "@/lib/validators";

/*
When ready:

    * replace inMemoryLeads.push(...) in app/api/early-access/route.ts with:

        - resend.contacts.create or resend.emails.send (whichever flow you prefer)

        - optional: store to Supabase / Postgres for analytics

No refactor needed — the frontend already POSTs clean JSON.
*/

type Payload = {
  email?: string;
  source?: string;
};

const inMemoryLeads: { email: string; source?: string; createdAt: string }[] = [];

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as Payload;

  const email = (body.email ?? "").trim().toLowerCase();
  const source = (body.source ?? "").trim() || undefined;

  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email." }, { status: 400 });
  }

  // Temporary storage (for local dev). Replace with Resend + your list later.
  inMemoryLeads.push({ email, source, createdAt: new Date().toISOString() });

  return NextResponse.json({ ok: true });
}