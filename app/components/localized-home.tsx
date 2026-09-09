'use client';
import { Fragment, useEffect, useState } from 'react';
import { ArrowDown, ArrowUpRight, Plus } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { contact, type BillingMode, type Price } from '../site-data';
import {
  contactServiceOptions,
  type ContactService,
} from '../contact-services';
import {
  localeOptions,
  localePaths,
  siteCopy,
  type Locale,
  type Service,
  type SiteCopy,
} from '../site-copy';
import { Reveal } from './reveal';
import { ProjectMedia } from './media';
import { ContactForm } from './contact-form';
import { SectionLabel } from './section-label';
import { ServiceNarratives } from './service-narratives';
import { MobileBottomBlur, StartupIntro } from './site-motion';
import { TeamSection } from './team-section';

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
function TextLines({
  lines,
  mutedLine,
}: {
  lines: string[];
  mutedLine?: number;
}) {
  return lines.map((line, index) => (
    <Fragment key={line}>
      <span className={index === mutedLine ? 'muted' : undefined}>{line}</span>
      {index < lines.length - 1 && <br />}
    </Fragment>
  ));
}

function PriceLabel({
  price,
  copy,
}: {
  price: Price;
  copy: SiteCopy['pricingSection'];
}) {
  if (price.kind === 'request') return <>{copy.request}</>;
  return (
    <>
      <span>
        {price.kind === 'from' ? copy.from : ''}
        {price.currency}
        {price.amount}
      </span>
      <small>/ {copy.period[price.period]}</small>
    </>
  );
}

function LanguageSwitcher({
  locale,
  label,
  onChange,
}: {
  locale: Locale;
  label: string;
  onChange: (locale: Locale) => void;
}) {
  return (
    <fieldset className="language-switcher" aria-label={label}>
      {localeOptions.map((option) => (
        <a
          key={option.id}
          href={localePaths[option.id]}
          hrefLang={option.id}
          lang={option.id}
          aria-label={option.language}
          aria-current={locale === option.id ? 'page' : undefined}
          onClick={(event) => {
            event.preventDefault();
            onChange(option.id);
          }}
        >
          {option.label}
        </a>
      ))}
    </fieldset>
  );
}

export function LocalizedHome({ initialLocale }: { initialLocale: Locale }) {
  const [locale, setLocale] = useState(initialLocale);
  const [menu, setMenu] = useState(false);
  const [service, setService] = useState<ContactService | ''>('');
  const [billingMode, setBillingMode] = useState<BillingMode>('monthly');
  const copy = siteCopy[locale];
  const { services, pricing, principles, faqs } = copy;

  useEffect(() => {
    document.documentElement.lang = copy.lang;
    document.title = copy.meta.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', copy.meta.description);
  }, [copy]);

  useEffect(() => {
    const syncLocale = () => {
      const next = location.pathname.startsWith('/en')
        ? 'en'
        : location.pathname.startsWith('/pl')
          ? 'pl'
          : 'uk';
      setLocale(next);
      setService('');
    };
    addEventListener('popstate', syncLocale);
    return () => removeEventListener('popstate', syncLocale);
  }, []);

  function changeLocale(next: Locale) {
    if (next === locale) return;
    setLocale(next);
    setMenu(false);
    const hash = location.hash;
    history.pushState({}, '', `${localePaths[next]}${hash}`);
  }

  function choose(id: Service['id']) {
    const option = contactServiceOptions.find((item) => item.id === id);
    setService(option?.label ?? '');
    document.getElementById('contact')?.scrollIntoView({
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'instant'
        : 'smooth',
    });
  }
  return (
    <main id="top" lang={copy.lang}>
      <StartupIntro />
      <a className="skip-link" href="#reels">
        {copy.a11y.skip}
      </a>
      <header className="header">
        <a href="#top" aria-label={copy.a11y.home}>
          <Wordmark />
        </a>
        <nav aria-label={copy.a11y.mainNav}>
          {copy.nav
            .filter(({ id }) => ['marketing', 'reels', 'pricing'].includes(id))
            .map(({ name, id }) => (
              <a key={id} href={`#${id}`}>
                {name}
              </a>
            ))}
        </nav>
        <div className="header-actions">
          <a href="#contact" className="header-contact">
            {copy.headerCta}
            <ArrowUpRight size={17} />
          </a>
          <LanguageSwitcher
            locale={locale}
            label={copy.a11y.language}
            onChange={changeLocale}
          />
          <button
            className={`menu-toggle ${menu ? 'is-open' : ''}`}
            onClick={() => setMenu(!menu)}
            aria-expanded={menu}
            aria-controls="mobile-menu"
            aria-label={menu ? copy.a11y.closeMenu : copy.a11y.openMenu}
          >
            <span />
            <span />
          </button>
        </div>
      </header>
      <nav
        id="mobile-menu"
        className="mobile-menu"
        hidden={!menu}
        aria-label={copy.a11y.mobileNav}
      >
        {[...copy.nav, { name: copy.contactSection.label, id: 'contact' }].map(
          ({ name, id }) => (
            <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>
              {name}
              <ArrowUpRight size={22} />
            </a>
          ),
        )}
      </nav>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-background">
          <ProjectMedia
            media={{
              type: 'video',
              src: '/media/clip-1.mp4',
              poster: '/media/clip-1.jpg',
              alt: copy.hero.mediaAlt,
            }}
          />
        </div>
        <div className="hero-top">
          <div className="hero-identity hero-enter">
            <Wordmark registered={false} />
            <span className="hero-subtitle">{copy.hero.subtitle}</span>
          </div>
          <div className="hero-directions hero-enter">
            <span className="meta">{copy.hero.directions}</span>
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
              <TextLines lines={copy.hero.title} />
            </h1>
            <p>
              <TextLines lines={copy.hero.description} />
            </p>
            <a className="text-link" href="#reels">
              {copy.hero.workCta}
              <ArrowDown size={16} />
            </a>
          </div>
          <div className="hero-note meta">
            <TextLines lines={copy.hero.note} />
          </div>
          <a href="#contact" className="hero-person hero-enter">
            <div className="avatar-wrap">
              <ProjectMedia
                media={{
                  type: 'video',
                  src: '/media/hero-avatar.mp4',
                  poster: '/media/hero-avatar.jpg',
                  alt: copy.hero.avatarAlt,
                }}
              />
            </div>
            <div className="person-copy">
              <span className="meta">{copy.hero.contactEyebrow}</span>
              <strong>{copy.hero.contactTitle}</strong>
              <span className="person-button">
                {copy.hero.contactCta}
                <span className="circle">
                  <ArrowUpRight size={17} />
                </span>
              </span>
            </div>
          </a>
        </div>
      </section>
      <div className="intro-strip">
        {copy.hero.strip.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <ServiceNarratives copy={copy} />
      <section id="approach" className="section approach">
        <SectionLabel number="04" note={copy.approach.note}>
          {copy.approach.label}
        </SectionLabel>
        <Reveal className="section-heading">
          <h2>{copy.approach.title}</h2>
          <p>{copy.approach.description}</p>
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
              alt: copy.servicesSection.mediaAlt,
            }}
          />
        </div>
        <SectionLabel number="05" note={copy.servicesSection.note}>
          {copy.servicesSection.label}
        </SectionLabel>
        <div className="services-layout">
          <Reveal>
            <h2 className="services-intro-title">
              {copy.servicesSection.title}
            </h2>
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
                    <button className="text-link" onClick={() => choose(s.id)}>
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
        <SectionLabel number="06" note={copy.pricingSection.note}>
          {copy.pricingSection.label}
        </SectionLabel>
        <Reveal className="section-heading">
          <h2>
            <TextLines lines={copy.pricingSection.title} />
          </h2>
          <p>
            {copy.pricingSection.description.map((paragraph, index) => (
              <Fragment key={paragraph}>
                {paragraph}
                {index < copy.pricingSection.description.length - 1 && (
                  <>
                    <br />
                    <br />
                  </>
                )}
              </Fragment>
            ))}
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
              aria-label={copy.pricingSection.aria}
              data-mode={billingMode}
            >
              <TabsTrigger value="monthly">
                {copy.pricingSection.monthly}
              </TabsTrigger>
              <TabsTrigger value="project">
                {copy.pricingSection.project}
              </TabsTrigger>
            </TabsList>
            <span className="meta">{copy.pricingSection.meta}</span>
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
                          <h3>{s.name}</h3>
                          <div className="price-card-marks">
                            <span className="price-brand" aria-label="8m">
                              8m<sup>®</sup>
                            </span>
                            <span className="meta">0{i + 1}</span>
                          </div>
                        </div>
                        <div className="price-value">
                          <PriceLabel
                            price={p.price}
                            copy={copy.pricingSection}
                          />
                        </div>
                        <p className="price-description">{p.description}</p>
                        {p.supporting && (
                          <p className="pricing-support">{p.supporting}</p>
                        )}
                      </div>
                      <div className="price-card-details">
                        <p className="included-title">
                          {copy.pricingSection.included}
                        </p>
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
                          onClick={() => choose(s.id)}
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
      <TeamSection copy={copy} />
      <section id="faq" className="section faq">
        <SectionLabel number="08" note={copy.faqSection.note}>
          {copy.faqSection.label}
        </SectionLabel>
        <div className="faq-layout">
          <Reveal>
            <h2>
              <TextLines lines={copy.faqSection.title} mutedLine={1} />
            </h2>
            <p className="section-description">
              <TextLines lines={copy.faqSection.description} />
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
        <SectionLabel number="09" note={copy.contactSection.note}>
          {copy.contactSection.label}
        </SectionLabel>
        <div className="contact-layout">
          <Reveal className="contact-copy">
            <h2>
              <TextLines lines={copy.contactSection.title} />
            </h2>
            <p>
              <TextLines lines={copy.contactSection.description} />
            </p>
          </Reveal>
          <Reveal delay={100}>
            <ContactForm
              service={service}
              onServiceChange={setService}
              copy={copy.form}
            />
          </Reveal>
        </div>
      </section>
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <Wordmark />
            <span>Marketing & Production</span>
          </div>
          <nav aria-label={copy.a11y.footerNav}>
            {copy.nav.map(({ name, id }) => (
              <a key={id} href={`#${id}`}>
                {name}
              </a>
            ))}
          </nav>
          <div className="footer-contact">
            <span className="meta">{copy.footer.eyebrow}</span>
            {contact.email ? (
              <a href={`mailto:${contact.email}`}>
                {contact.email}
                <ArrowUpRight size={16} />
              </a>
            ) : (
              <a href="#contact">
                {copy.headerCta}
                <ArrowUpRight size={16} />
              </a>
            )}
            <nav aria-label={copy.a11y.socialNav}>
              {contact.socials.map((social) =>
                social.href ? (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.label}
                    <ArrowUpRight size={15} />
                  </a>
                ) : (
                  <span
                    key={social.label}
                    className="footer-contact-placeholder"
                    aria-disabled="true"
                  >
                    {social.label}
                  </span>
                ),
              )}
            </nav>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 8M Studio</span>
          <span>Marketing & Production</span>
          <a href="#top">
            {copy.footer.backToTop}
            <ArrowUpRight size={16} />
          </a>
        </div>
      </footer>
      <MobileBottomBlur />
    </main>
  );
}
