'use client';
import { useState } from 'react';
import Image from 'next/image';
import { ArrowDown, ArrowUpRight, Plus } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  services,
  pricing,
  principles,
  faqs,
  contact,
  type BillingMode,
  type Price,
} from './site-data';
import { Reveal } from './components/reveal';
import { ProjectMedia } from './components/media';
import { ContactForm } from './components/contact-form';
import { SectionLabel } from './components/section-label';
import { ServiceNarratives } from './components/service-narratives';
import { MobileBottomBlur, StartupIntro } from './components/site-motion';
const nav = [
  ['Marketing', 'marketing'],
  ['Reels Production', 'reels'],
  ['Marketing + Reels Production', 'combined'],
  ['Як ми працюємо', 'approach'],
  ['Послуги', 'services'],
  ['Ціни', 'pricing'],
  ['FAQ', 'faq'],
];
function Wordmark({
  className = '',
  registered = true,
}: {
  className?: string;
  registered?: boolean;
}) {
  return (
    <span className={`wordmark ${className}`}>
      8m{registered && <sup>®</sup>}
    </span>
  );
}
function PriceLabel({ price }: { price: Price }) {
  if (price.kind === 'request') return <>За запитом</>;
  return (
    <>
      <span>
        {price.kind === 'from' ? 'від ' : ''}
        {price.currency}
        {price.amount}
      </span>
      <small>/ {price.period}</small>
    </>
  );
}
export default function Home() {
  const [menu, setMenu] = useState(false);
  const [service, setService] = useState('');
  const [billingMode, setBillingMode] = useState<BillingMode>('monthly');
  function choose(value: string) {
    setService(value);
    document.getElementById('contact')?.scrollIntoView({
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'instant'
        : 'smooth',
    });
  }
  return (
    <main id="top">
      <StartupIntro />
      <a className="skip-link" href="#reels">
        До основного вмісту
      </a>
      <header className="header">
        <a href="#top" aria-label="8M Studio — головна">
          <Wordmark />
        </a>
        <nav aria-label="Головна навігація">
          {nav
            .filter(([, id]) => ['marketing', 'reels', 'pricing'].includes(id))
            .map(([name, id]) => (
              <a key={id} href={`#${id}`}>
                {name}
              </a>
            ))}
        </nav>
        <a href="#contact" className="header-contact">
          Обговорити проєкт
          <ArrowUpRight size={17} />
        </a>
        <button
          className={`menu-toggle ${menu ? 'is-open' : ''}`}
          onClick={() => setMenu(!menu)}
          aria-expanded={menu}
          aria-controls="mobile-menu"
          aria-label={menu ? 'Закрити меню' : 'Відкрити меню'}
        >
          <span />
          <span />
        </button>
      </header>
      <nav
        id="mobile-menu"
        className="mobile-menu"
        hidden={!menu}
        aria-label="Мобільна навігація"
      >
        {[...nav, ['Контакт', 'contact']].map(([name, id]) => (
          <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>
            {name}
            <ArrowUpRight size={22} />
          </a>
        ))}
      </nav>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-background">
          <ProjectMedia
            media={{
              type: 'video',
              src: '/media/clip-1.mp4',
              poster: '/media/clip-1.jpg',
              alt: 'Чорно-білий фрагмент руху та пластики',
            }}
          />
        </div>
        <div className="hero-top">
          <div className="hero-identity hero-enter">
            <Wordmark registered={false} />
            <span className="hero-subtitle">marketing & production</span>
          </div>
          <div className="hero-directions hero-enter">
            <span className="meta">ТРИ НАПРЯМИ. ОДНА КОМАНДА.</span>
            {services.map((s, i) => (
              <a key={s.id} href={`#${s.id}`}>
                <span>0{i + 1}</span>
                {s.name}
              </a>
            ))}
          </div>
        </div>
        <div className="registration" aria-hidden="true">
          <span>+</span>
          <span>+</span>
          <span>+</span>
          <span>+</span>
        </div>
        <div className="hero-bottom">
          <div className="hero-statement hero-enter">
            <h1 id="hero-title">
              Перетворюємо
              <br />
              увагу на дію.
            </h1>
            <p>
              Стратегія задає напрям.
              <br />
              Продакшн надає йому форму.
            </p>
            <a className="text-link" href="#reels">
              Дивитися роботи
              <ArrowDown size={16} />
            </a>
          </div>
          <div className="hero-note meta">
            ВІД ПЕРШОЇ ІДЕЇ
            <br />
            ДО ФІНАЛЬНОГО КАДРУ.
          </div>
          <a href="#contact" className="hero-person hero-enter">
            <div className="avatar-wrap">
              <Image
                src="/media/8m-avatar.jpg"
                alt="Аватар представника 8M Studio"
                width={695}
                height={734}
                priority
                unoptimized
              />
            </div>
            <div className="person-copy">
              <span className="meta">НА ЗВ’ЯЗКУ / 8M STUDIO</span>
              <strong>Ваш наступний проєкт починається з розмови.</strong>
              <span className="person-button">
                Є ідея?
                <span className="circle">
                  <ArrowUpRight size={17} />
                </span>
              </span>
            </div>
          </a>
        </div>
      </section>
      <div className="intro-strip">
        <span>Незалежна студія</span>
        <span>Стратегія · Контент · Просування</span>
        <span>8M STUDIO © 2026</span>
      </div>
      <ServiceNarratives />
      <section id="approach" className="section approach">
        <SectionLabel number="04" note="HOW WE WORK">
          Як ми працюємо
        </SectionLabel>
        <Reveal className="section-heading">
          <h2>Чіткий процес.</h2>
          <p>
            Від першого брифу до запуску — без хаосу, з ясним обсягом, ролями та
            наступними кроками.
          </p>
        </Reveal>
        <div className="principle-grid">
          {principles.map(([title, text], i) => (
            <Reveal delay={i * 80} key={title}>
              <article className="principle">
                <span className="meta">
                  0{i + 1}
                  <span className="progress-dots" aria-hidden="true">
                    {[0, 1, 2, 3].map((dot) => (
                      <i key={dot} className={dot <= i ? 'filled' : ''} />
                    ))}
                  </span>
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <section id="services" className="section services">
        <div className="services-background">
          <ProjectMedia
            media={{
              type: 'video',
              src: '/media/services-texture.mp4',
              poster: '/media/services-texture.jpg',
              alt: 'Темна рухома текстура',
            }}
          />
        </div>
        <SectionLabel number="05" note="WHAT WE DO">
          Послуги
        </SectionLabel>
        <div className="services-layout">
          <Reveal>
            <h2 className="services-intro-title">Формат під завдання.</h2>
          </Reveal>
          <Accordion defaultValue={['marketing']} className="service-list">
            {services.map((s, i) => (
              <Reveal key={s.id} delay={i * 80}>
                <AccordionItem value={s.id} className="service-item">
                  <AccordionTrigger className="service-trigger">
                    <span className="row-number">0{i + 1}</span>
                    <span className="service-name">{s.name}</span>
                    <span className="plus-icon" aria-hidden="true" />
                  </AccordionTrigger>
                  <AccordionContent className="service-answer">
                    <p>{s.description}</p>
                    <div className="tags">
                      {s.tags.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                    <button
                      className="text-link"
                      onClick={() => choose(s.name)}
                    >
                      {s.cta}
                      <ArrowUpRight size={16} />
                    </button>
                  </AccordionContent>
                </AccordionItem>
              </Reveal>
            ))}
          </Accordion>
        </div>
      </section>
      <section id="pricing" className="pricing section">
        <SectionLabel number="06" note="CHOOSE YOUR FORMAT">
          Формат співпраці
        </SectionLabel>
        <Reveal className="section-heading">
          <h2>
            Формат
            <br />
            співпраці.
          </h2>
          <p>
            Разовий проєкт або системна щомісячна робота.
            <br />
            <br />
            Обсяг, склад команди та фінальну вартість формуємо відповідно до
            задачі.
          </p>
        </Reveal>
        <Tabs
          value={billingMode}
          onValueChange={(value) => setBillingMode(value as BillingMode)}
          className="pricing-tabs"
        >
          <Reveal className="pricing-toolbar">
            <TabsList
              className="billing-toggle"
              aria-label="Формат співпраці"
              data-mode={billingMode}
            >
              <TabsTrigger value="monthly">Щомісяця</TabsTrigger>
              <TabsTrigger value="project">Проєктно</TabsTrigger>
            </TabsList>
            <span className="meta">
              ТРИ НАПРЯМИ · ІНДИВІДУАЛЬНИЙ РОЗРАХУНОК
            </span>
          </Reveal>
          {(['project', 'monthly'] as const).map((mode) => (
            <TabsContent value={mode} key={mode} className="pricing-panel">
              <div className="pricing-grid">
                {services.map((s, i) => {
                  const p = pricing[mode][i];
                  return (
                    <article key={s.id} className="pricing-package">
                      <div className="price-card-top">
                        <div className="price-card-title-row">
                          <div className="price-card-title">
                            <span className="meta">0{i + 1}</span>
                            <h3>{s.name}</h3>
                          </div>
                          <span className="price-brand" aria-label="8m">
                            8m<sup>®</sup>
                          </span>
                        </div>
                        <div className="price-value">
                          <PriceLabel price={p.price} />
                        </div>
                        <p className="price-description">{p.description}</p>
                        {p.supporting && (
                          <p className="pricing-support">{p.supporting}</p>
                        )}
                      </div>
                      <div className="price-card-details">
                        <p className="included-title">Що входить:</p>
                        <ul>
                          {p.deliverables.map((d) => (
                            <li key={d}>
                              <span
                                className="included-icon"
                                aria-hidden="true"
                              >
                                <Plus size={11} />
                              </span>
                              {d}
                            </li>
                          ))}
                        </ul>
                        <button
                          className="pricing-cta"
                          onClick={() => choose(s.name)}
                        >
                          {p.cta}
                          <ArrowUpRight size={18} />
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>
      <section id="faq" className="section faq">
        <SectionLabel number="07" note="GOOD TO KNOW">
          FAQ
        </SectionLabel>
        <div className="faq-layout">
          <Reveal>
            <h2>
              До початку
              <br />
              <span className="muted">розмови.</span>
            </h2>
            <p className="section-description">
              Кілька відповідей про процес,
              <br />
              формат і наступні кроки.
            </p>
          </Reveal>
          <Accordion className="faq-list">
            {faqs.map(([question, answer], i) => (
              <Reveal key={question} delay={(i % 3) * 70}>
                <AccordionItem value={String(i)} className="faq-item">
                  <AccordionTrigger className="faq-trigger">
                    <span>{question}</span>
                    <span className="plus-icon" aria-hidden="true" />
                  </AccordionTrigger>
                  <AccordionContent className="faq-answer">
                    <p>{answer}</p>
                  </AccordionContent>
                </AccordionItem>
              </Reveal>
            ))}
          </Accordion>
        </div>
      </section>
      <section id="contact" className="section contact-section">
        <SectionLabel number="08" note="LET’S MAKE IT HAPPEN">
          Контакт
        </SectionLabel>
        <div className="contact-layout">
          <Reveal className="contact-copy">
            <h2>
              Є ідея?
              <br />
              Давайте
              <br />
              <span>створимо.</span>
            </h2>
            <p>
              Розкажіть, що задумали.
              <br />
              Разом визначимо наступний крок.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <ContactForm service={service} onServiceChange={setService} />
          </Reveal>
        </div>
      </section>
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <Wordmark />
            <span>Marketing & Production</span>
          </div>
          <nav aria-label="Навігація в підвалі">
            {nav.map(([name, id]) => (
              <a key={id} href={`#${id}`}>
                {name}
              </a>
            ))}
          </nav>
          <div className="footer-contact">
            <span className="meta">ПОЧНІМО РОЗМОВУ</span>
            {contact.email ? (
              <a href={`mailto:${contact.email}`}>
                {contact.email}
                <ArrowUpRight size={16} />
              </a>
            ) : (
              <a href="#contact">
                Обговорити проєкт
                <ArrowUpRight size={16} />
              </a>
            )}
            {contact.socials.length > 0 && (
              <nav aria-label="Соціальні мережі">
                {contact.socials.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {s.label}
                    <ArrowUpRight size={15} />
                  </a>
                ))}
              </nav>
            )}
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 8M Studio</span>
          <span>Marketing & Production</span>
          <a href="#top">
            Нагору
            <ArrowUpRight size={16} />
          </a>
        </div>
      </footer>
      <MobileBottomBlur />
    </main>
  );
}
