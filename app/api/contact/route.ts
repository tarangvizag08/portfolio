import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactSchema } from '@/lib/contact-schema';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Malformed request body.' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed.', issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { name, email, message, website } = parsed.data;

  // Honeypot tripped. Answer 200 so the bot doesn't learn anything, but do nothing.
  if (website) return NextResponse.json({ ok: true });

  try {
    await prisma.contactSubmission.create({
      data: {
        name,
        email,
        message,
        userAgent: request.headers.get('user-agent')?.slice(0, 512) ?? null,
      },
    });
  } catch (error) {
    console.error('[contact] database write failed:', error);
    return NextResponse.json(
      { error: 'Could not save your message. Please email me directly.' },
      { status: 500 }
    );
  }

  // The message is already saved; a failed email must not fail the request.
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_NOTIFY_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (apiKey && to && from) {
    try {
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: `Portfolio contact <${from}>`,
        to,
        replyTo: email,
        subject: `Portfolio message from ${name}`,
        text: [`Name:  ${name}`, `Email: ${email}`, '', message].join('\n'),
      });
    } catch (error) {
      console.error('[contact] email notification failed:', error);
    }
  } else {
    console.warn('[contact] RESEND_API_KEY / CONTACT_NOTIFY_EMAIL / CONTACT_FROM_EMAIL not set — message saved, no email sent.');
  }

  return NextResponse.json({ ok: true });
}
