import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db";
import { contactMessages } from "@/db/schema";

const schema = z.object({
  name: z.string().trim().min(2).max(160),
  email: z.string().trim().email().max(200),
  subject: z.string().trim().min(2).max(200),
  message: z.string().trim().min(10).max(5000),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Ungültige Anfrage." },
      { status: 400 },
    );
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error:
          parsed.error.issues[0]?.message ?? "Bitte prüfe deine Eingaben.",
      },
      { status: 400 },
    );
  }

  try {
    await db.insert(contactMessages).values({
      name: parsed.data.name,
      email: parsed.data.email.toLowerCase(),
      subject: parsed.data.subject,
      message: parsed.data.message,
    });
  } catch (error) {
    console.error("Kontaktnachricht konnte nicht gespeichert werden:", error);
    return NextResponse.json(
      { ok: false, error: "Nachricht konnte nicht gesendet werden." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
