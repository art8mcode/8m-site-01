'use client';
import { useState, type SyntheticEvent } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { services } from '../site-data';
export function ContactForm({
  service,
  onServiceChange,
}: {
  service: string;
  onServiceChange: (value: string) => void;
}) {
  const [status, setStatus] = useState<
    'idle' | 'sending' | 'success' | 'error'
  >('idle');
  const [error, setError] = useState('');
  const [invalid, setInvalid] = useState<Record<string, string>>({});
  async function submit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'sending') return;
    const raw = new FormData(e.currentTarget);
    const data = Object.fromEntries(
      ['name', 'email', 'service', 'message'].map((key) => [
        key,
        typeof raw.get(key) === 'string' ? (raw.get(key) as string) : '',
      ]),
    );
    const errors: Record<string, string> = {};
    if (!String(data.name).trim()) errors.name = 'Вкажіть ваше ім’я.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.email)))
      errors.email = 'Вкажіть коректну email-адресу.';
    if (!String(data.message).trim())
      errors.message = 'Розкажіть кілька слів про проєкт.';
    setInvalid(errors);
    if (Object.keys(errors).length) {
      document.getElementById(Object.keys(errors)[0])?.focus();
      return;
    }
    setStatus('sending');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const body = (await response.json()) as { error?: string };
        throw new Error(
          body.error || 'Не вдалося надіслати заявку. Спробуйте пізніше.',
        );
      }
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setError(
        err instanceof Error
          ? err.message
          : 'Помилка з’єднання. Спробуйте ще раз.',
      );
    }
  }
  if (status === 'success')
    return (
      <div className="contact-form success-card">
        <span className="success-icon">
          <Check />
        </span>
        <h3>Дякуємо за заявку.</h3>
        <p>
          Ваше повідомлення отримано. Повернемося до вас, щоб обговорити
          наступні кроки.
        </p>
        <button
          className="button button-dark"
          onClick={() => {
            setStatus('idle');
            onServiceChange('');
          }}
        >
          Ще одна ідея <ArrowUpRight size={18} />
        </button>
      </div>
    );
  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <div className="form-heading">
        <span className="meta">ПОЧНІМО З ВАШОГО ЗАВДАННЯ</span>
        <h3>Кілька слів про проєкт.</h3>
      </div>
      <div className="field">
        <label htmlFor="name">Ваше ім’я *</label>
        <Input
          id="name"
          name="name"
          placeholder="Як до вас звертатися?"
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
        <label htmlFor="email">Email *</label>
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
        <label htmlFor="service">Що вас цікавить?</label>
        <Input
          id="service"
          name="service"
          list="service-options"
          value={service}
          onChange={(e) => onServiceChange(e.target.value)}
          placeholder="Оберіть напрям або опишіть завдання"
          maxLength={150}
        />
        <datalist id="service-options" aria-label="Послуги 8M">
          {services.map((s) => (
            <option key={s.id} value={s.name}>
              {s.name}
            </option>
          ))}
        </datalist>
      </div>
      <div className="field">
        <label htmlFor="message">Про ваш проєкт *</label>
        <Textarea
          id="message"
          name="message"
          placeholder="Ідея, завдання, бажані терміни…"
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
        className="button button-dark"
      >
        {status === 'sending' ? 'Надсилаємо…' : 'Надіслати заявку'}
        <ArrowUpRight size={20} />
      </button>
      <p className="form-note">
        Використаємо ваші дані лише для відповіді на цю заявку.
      </p>
      {status === 'error' && (
        <div className="form-error" role="alert">
          {error}
        </div>
      )}
    </form>
  );
}
