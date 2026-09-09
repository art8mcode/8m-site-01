'use client';
import { useRef, useState, type SyntheticEvent } from 'react';
import { ArrowUpRight, Check, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  contactServiceOptions,
  type ContactService,
} from '../contact-services';
import type { ContactFormCopy } from '../site-copy';
export function ContactForm({
  service,
  onServiceChange,
  copy,
}: {
  service: ContactService | '';
  onServiceChange: (value: ContactService | '') => void;
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
      [
        'name',
        'email',
        'phone',
        'social',
        'service',
        'message',
        'companyWebsite',
      ].map((key) => [
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
      !contactServiceOptions.some(
        (item) => item.label === String(data.service).trim(),
      )
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
        <label htmlFor="phone">{copy.phoneLabel}</label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder={copy.phonePlaceholder}
          autoComplete="tel"
          inputMode="tel"
          maxLength={80}
        />
      </div>
      <div className="field">
        <label htmlFor="social">{copy.socialLabel}</label>
        <Input
          id="social"
          name="social"
          type="text"
          placeholder={copy.socialPlaceholder}
          autoComplete="off"
          maxLength={200}
        />
      </div>
      <div className="field">
        <label htmlFor="service">{copy.serviceLabel}</label>
        <div className="select-control">
          <select
            id="service"
            name="service"
            value={service}
            onChange={(event) =>
              onServiceChange(event.target.value as ContactService | '')
            }
            aria-label={copy.servicesAria}
            aria-invalid={!!invalid.service}
            aria-describedby={invalid.service ? 'service-error' : undefined}
          >
            <option value="">{copy.servicePlaceholder}</option>
            {contactServiceOptions.map((option) => (
              <option key={option.id} value={option.label}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown aria-hidden="true" size={19} />
        </div>
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
