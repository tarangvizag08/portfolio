'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/ui/reveal';
import { usePrefersReducedMotion } from '@/components/ui/use-reduced-motion';
import { WhenVisible } from '@/components/ui/when-visible';
import { contactSchema } from '@/lib/contact-schema';
import { identity } from '@/lib/content';

const SpecularButton = dynamic(() => import('@/components/reactbits/SpecularButton'), { ssr: false });

type FieldErrors = Partial<Record<'name' | 'email' | 'message', string[]>>;
type Status = 'idle' | 'sending' | 'sent' | 'error';

export function Contact() {
  const reduced = usePrefersReducedMotion();
  const [values, setValues] = useState({ name: '', email: '', message: '', website: '' });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [formError, setFormError] = useState('');

  const set = (key: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues(v => ({ ...v, [key]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setFormError('');

    // Same schema the route handler runs — fail fast without a round trip.
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      setErrors(parsed.error.flatten().fieldErrors as FieldErrors);
      setStatus('error');
      return;
    }

    setErrors({});
    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrors((data.issues as FieldErrors) ?? {});
        setFormError(data.error ?? 'Something went wrong. Please email me directly.');
        setStatus('error');
        return;
      }

      setStatus('sent');
      setValues({ name: '', email: '', message: '', website: '' });
    } catch {
      setFormError('Network error. Please email me directly.');
      setStatus('error');
    }
  }

  const fieldClass =
    'w-full rounded-md border border-border bg-surface px-3.5 py-3 text-foreground placeholder:text-muted-foreground/60 transition-colors duration-200 focus:border-accent';

  return (
    <section id="contact" aria-labelledby="contact-heading" className="section-shell py-20 md:py-28">
      <SectionHeading
        index="09"
        id="contact-heading"
        title="Contact"
        lede="Research, internships, or something you are building — send it over."
      />

      <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_18rem] md:gap-14">
        <Reveal variant="left">
          <form onSubmit={submit} noValidate className="max-w-xl space-y-5">
            <div>
              <label htmlFor="name" className="mb-1.5 block font-mono text-sm text-foreground">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={values.name}
                onChange={set('name')}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
                className={fieldClass}
                placeholder="Your name"
              />
              {errors.name ? (
                <p id="name-error" role="alert" className="mt-1.5 text-sm text-destructive">
                  {errors.name[0]}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor="email" className="mb-1.5 block font-mono text-sm text-foreground">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={set('email')}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className={fieldClass}
                placeholder="you@example.com"
              />
              {errors.email ? (
                <p id="email-error" role="alert" className="mt-1.5 text-sm text-destructive">
                  {errors.email[0]}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor="message" className="mb-1.5 block font-mono text-sm text-foreground">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={values.message}
                onChange={set('message')}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
                className={`${fieldClass} resize-y`}
                placeholder="What are you working on?"
              />
              {errors.message ? (
                <p id="message-error" role="alert" className="mt-1.5 text-sm text-destructive">
                  {errors.message[0]}
                </p>
              ) : null}
            </div>

            {/* Honeypot — hidden from people and from screen readers, visible to bots. */}
            <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={values.website}
                onChange={set('website')}
              />
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-1">
              {reduced ? (
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="inline-flex min-h-11 items-center rounded-md bg-accent px-6 font-mono text-sm font-medium text-accent-foreground disabled:opacity-60"
                >
                  {status === 'sending' ? 'Sending...' : 'Send message'}
                </button>
              ) : (
                <WhenVisible minHeight="2.9rem">
                <SpecularButton
                  type="submit"
                  size="md"
                  radius={8}
                  disabled={status === 'sending'}
                  textColor="#F4F4F2"
                  lineColor="#F5A524"
                  baseColor="#2A2E35"
                  proximity={220}
                >
                  {status === 'sending' ? 'Sending...' : 'Send message'}
                </SpecularButton>
                </WhenVisible>
              )}

              <p aria-live="polite" className="text-sm">
                {status === 'sent' ? (
                  <span className="text-accent-secondary">Thanks — I will get back to you.</span>
                ) : formError ? (
                  <span className="text-destructive">{formError}</span>
                ) : null}
              </p>
            </div>
          </form>
        </Reveal>

        <Reveal index={1} variant="right">
          <h3 className="font-mono text-sm tracking-[0.15em] text-accent uppercase">Elsewhere</h3>
          <ul className="mt-4 space-y-1">
            <li>
              <a
                href={`mailto:${identity.email}`}
                className="inline-flex min-h-11 items-center gap-2.5 text-muted-foreground transition-colors duration-200 hover:text-accent"
              >
                <Mail size={17} strokeWidth={1.75} aria-hidden="true" />
                {identity.email}
              </a>
            </li>
            <li>
              <a
                href={identity.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-2.5 text-muted-foreground transition-colors duration-200 hover:text-accent"
              >
                <Linkedin size={17} strokeWidth={1.75} aria-hidden="true" />
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href={identity.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-2.5 text-muted-foreground transition-colors duration-200 hover:text-accent"
              >
                <Github size={17} strokeWidth={1.75} aria-hidden="true" />
                GitHub
              </a>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
