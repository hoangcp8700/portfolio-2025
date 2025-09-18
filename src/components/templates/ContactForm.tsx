'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { profile } from '@/shared/constants/data';

import { Section } from '../atoms/Section';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [loading, setLoading] = useState(false);
  const [hidden, setHidden] = useState(false);

  async function onSubmit(formData: FormData) {
    console.log('🚀 ~  ~ formData:', formData);
    setLoading(true);
    try {
      // const res = await fetch("/api/contact", { method: "POST", body: formData });
      // setStatus(res.ok ? "success" : "error");
      setStatus('success');
      setHidden(true);
    } catch {
      setStatus('error');
      setHidden(true);
    } finally {
      setLoading(false);
    }
  }

  const spring = {
    type: 'spring',
    stiffness: 400,
    damping: 30,
    mass: 0.7,
  } as const;

  return (
    <Section id="contact" title="Contact">
      <div className="relative">
        <AnimatePresence mode="wait">
          {!hidden ? (
            <motion.form
              key="form"
              action={onSubmit}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="grid gap-4 md:max-w-xl"
            >
              <Input required name="name" placeholder="Your name" />
              <Input required type="email" name="email" placeholder="Email" />
              <Input name="phone" placeholder="Phone" />
              <Textarea
                required
                name="message"
                placeholder="Hi, I'm interested in..."
                className="min-h-[120px]"
              />
              <Button type="submit" disabled={loading}>
                {loading ? 'Sending…' : 'Send'}
              </Button>
              <p className="text-muted-foreground text-xs">
                Email: <a href={`mailto:${profile.email}`}>{profile.email}</a>{' '}
                <br /> Phone: {profile.phone} <br />
                Address: {profile.location}
              </p>
            </motion.form>
          ) : (
            <motion.div
              key="message"
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={spring}
              className="bg-card rounded-xl border p-6 md:max-w-xl"
            >
              {status === 'success' ? (
                <div className="flex items-start gap-4">
                  <SuccessIcon />
                  <div>
                    <h3 className="font-display text-lg font-semibold">
                      Thanks! Message sent.
                    </h3>
                    <p className="text-muted-foreground mt-1 text-sm">
                      I’ll get back to you soon.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-4">
                  <ErrorIcon />
                  <div>
                    <h3 className="font-display text-lg font-semibold">
                      Something went wrong.
                    </h3>
                    <p className="text-muted-foreground mt-1 text-sm">
                      Please try again in a moment.
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-5 flex gap-3">
                <Button
                  onClick={() => {
                    setHidden(false);
                    setStatus('idle');
                  }}
                  variant="outline"
                >
                  Send another
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Section>
  );
}

function SuccessIcon() {
  return (
    <motion.svg
      width="44"
      height="44"
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="text-emerald-dot"
    >
      <motion.circle
        cx="24"
        cy="24"
        r="20"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />
      <motion.path
        d="M15 24l6 6 12-12"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.2 }}
      />
    </motion.svg>
  );
}

function ErrorIcon() {
  return (
    <motion.svg
      width="44"
      height="44"
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="text-destructive"
    >
      <motion.circle
        cx="24"
        cy="24"
        r="20"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />
      <motion.path
        d="M18 18l12 12M30 18L18 30"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.2 }}
      />
    </motion.svg>
  );
}
