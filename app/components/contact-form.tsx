'use client';
import { useRef, useState, type SyntheticEvent } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { ContactFormCopy, Service } from '../site-copy';
export function ContactForm({
  service,
  onServiceChange,
  services,
  copy,
}: {
  service: string;
  onServiceChange: (value: string) => void;
  services: Service[];
  copy: ContactFormCopy;
}) {
  const [status, setStatus] = useState<
    'idle' | 'sending' | 'success' | 'error'
  >('idle');
  const [error, setError] = useState('');
  const [invalid, setInvalid] = useState<Record<string, string>>({});
  const submitting = useRef(false);
  async function submit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting.current) return;
    const raw = new FormData(e.currentTarget);
    const data = Object.fromEntries(
      ['name', 'email', 'service', 'message', 'companyWebsite'].map((key) => [
        key,
        typeof raw.get(key) === 'string' ? (raw.get(key) as string) : '',
      ]),
    );
    const errors: Record<string, string> = {};
    if (!String(data.name).trim()) errors.name = copy.errors.name;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.email)))
      errors.email = copy.errors.email;
    if (
      String(data.service).trim() &&
      !services.some((item) => item.name === String(data.service).trim())
    )
      errors.service = copy.errors.service;
    if (!String(data.message).trim()) errors.message = copy.errors.message;
    setError('');
    setInvalid(errors);
    if (Object.keys(errors).length) {
      setStatus('idle');
      document.getElementById(Object.keys(errors)[0])?.focus();
      return;
    }
    submitting.current = true;
    setStatus('sending');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(copy.errors.send);
      }
      setStatus('success');
    } catch {
      setStatus('error');
      setError(copy.errors.send);
    } finally {
      submitting.current = false;
    }
  }
  if (status === 'success')
    return (
      <div className="contact-form success-card" aria-live="polite">
        <span className="success-icon">
          <Check />
        </span>
        <h3>{copy.successTitle}</h3>
        <p>{copy.successBody}</p>
        <button
          type="button"
          className="button button-dark"
          onClick={() => {
            setStatus('idle');
            onServiceChange('');
          }}
        >
          {copy.anotherIdea} <ArrowUpRight size={18} />
        </button>
      </div>
    );
  return (
    <form
      className="contact-form"
      onSubmit={submit}
      noValidate
      aria-busy={status === 'sending'}
    >
      <div className="form-honeypot" aria-hidden="true">
        <label htmlFor="companyWebsite">Company website</label>
        <input
          id="companyWebsite"
          name="companyWebsite"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <div className="form-heading">
        <span className="meta">{copy.eyebrow}</span>
        <h3>{copy.title}</h3>
      </div>
      <div className="field">
        <label htmlFor="name">{copy.nameLabel}</label>
        <Input
          id="name"
          name="name"
          placeholder={copy.namePlaceholder}
          autoComplete="name"
          required
          maxLength={100}
          aria-invalid={!!invalid.name}
          aria-describedby={invalid.name ? 'name-error' : undefined}
        />
        {invalid.name && (
          <span className="field-error" id="name-error">
            {invalid.name}
          </span>
        )}
      </div>
      <div className="field">
        <label htmlFor="email">{copy.emailLabel}</label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="you@company.com"
          autoComplete="email"
          required
          maxLength={254}
          aria-invalid={!!invalid.email}
          aria-describedby={invalid.email ? 'email-error' : undefined}
        />
        {invalid.email && (
          <span className="field-error" id="email-error">
            {invalid.email}
          </span>
        )}
      </div>
      <div className="field">
        <label htmlFor="service">{copy.serviceLabel}</label>
        <Input
          id="service"
          name="service"
          list="service-options"
          value={service}
          onChange={(e) => onServiceChange(e.target.value)}
          placeholder={copy.servicePlaceholder}
          maxLength={150}
          aria-invalid={!!invalid.service}
          aria-describedby={invalid.service ? 'service-error' : undefined}
        />
        <datalist id="service-options" aria-label={copy.servicesAria}>
          {services.map((s) => (
            <option key={s.id} value={s.name}>
              {s.name}
            </option>
          ))}
        </datalist>
        {invalid.service && (
          <span className="field-error" id="service-error">
            {invalid.service}
          </span>
        )}
      </div>
      <div className="field">
        <label htmlFor="message">{copy.messageLabel}</label>
        <Textarea
          id="message"
          name="message"
          placeholder={copy.messagePlaceholder}
          required
          maxLength={4000}
          aria-invalid={!!invalid.message}
          aria-describedby={invalid.message ? 'message-error' : undefined}
        />
        {invalid.message && (
          <span className="field-error" id="message-error">
            {invalid.message}
          </span>
        )}
      </div>
      <button
        type="submit"
        disabled={status === 'sending'}
        aria-disabled={status === 'sending'}
        className="button button-dark"
      >
        {status === 'sending' ? copy.sending : copy.submit}
        <ArrowUpRight size={20} />
      </button>
      <p className="form-note">{copy.privacy}</p>
      {status === 'error' && (
        <div className="form-error" role="alert" aria-live="assertive">
          <strong>{error}</strong>
          <span>{copy.errors.connection}</span>
        </div>
      )}
    </form>
  );
}
