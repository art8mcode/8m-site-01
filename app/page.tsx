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
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  services,
  pricing,
  works,
  principles,
  faqs,
  contact,
  type Price,
} from './site-data';
import { Reveal } from './components/reveal';
import { ProjectMedia } from './components/media';
import { ContactForm } from './components/contact-form';
const nav = [
  ['Портфоліо', 'work'],
  ['Підхід', 'approach'],
  ['Послуги', 'services'],
  ['Ціни', 'pricing'],
  ['FAQ', 'faq'],
];
function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`wordmark ${className}`}>
      8m<sup>®</sup>
    </span>
  );
}
function SectionLabel({
  number,
  children,
  note,
}: {
  number: string;
  children: React.ReactNode;
  note?: string;
}) {
  return (
    <Reveal className="section-label">
      <span>
        {number} / {children}
      </span>
      {note && <span>{note}</span>}
    </Reveal>
  );
}
function PriceLabel({ price }: { price: Price }) {
  return (
    <>
      {price.kind === 'request'
        ? 'За запитом'
        : `${price.kind === 'from' ? 'від ' : ''}${price.amount} ${price.currency}`}
    </>
  );
}
export default function Home() {
  const [menu, setMenu] = useState(false);
  const [service, setService] = useState('');
  const [selected, setSelected] = useState<number | null>(null);
  function choose(value: string) {
    setService(value);
    setSelected(null);
    document.getElementById('contact')?.scrollIntoView({
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'instant'
        : 'smooth',
    });
  }
  return (
    <main id="top">
      <a className="skip-link" href="#work">
        До основного вмісту
      </a>
      <header className="header">
        <a href="#top" aria-label="8M Studio — головна">
          <Wordmark />
        </a>
        <nav aria-label="Головна навігація">
          {nav
            .filter(([, id]) => id !== 'approach' && id !== 'faq')
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
            <Wordmark />
            <span className="hero-subtitle">marketing & production</span>
          </div>
          <div className="hero-directions hero-enter">
            <span className="meta">ТРИ НАПРЯМИ. ОДНА КОМАНДА.</span>
            {services.map((s, i) => (
              <a key={s.id} href="#services">
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
            <a className="text-link" href="#work">
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
              <strong>
                Ваш наступний
                <br />
                проєкт починається
                <br />з розмови.
              </strong>
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
      <section id="work" className="section">
        <SectionLabel number="01" note="SELECTED WORK">
          Портфоліо
        </SectionLabel>
        <Reveal className="section-heading">
          <h2>
            Робота, що
            <br />
            привертає увагу.
          </h2>
          <p>
            Від ідеї в кадрі до присутності бренду.
            <br />
            Кожне рішення має свою мету.
          </p>
        </Reveal>
        <div className="work-grid">
          {works.map((w, i) => (
            <Reveal key={w.id} delay={i * 80}>
              <article className="work-card">
                <div className={`work-media work-${w.id}`}>
                  {w.media ? (
                    <ProjectMedia media={w.media} />
                  ) : (
                    <>
                      <span className="work-stamp meta">
                        8M / VISUAL CONCEPT / 0{i + 1}
                      </span>
                      <span className="concept-type">
                        {i === 0 ? 'motion.' : 'seen.'}
                      </span>
                      <span className="concept-caption meta">
                        {i === 0
                          ? 'THE IDEA TAKES SHAPE'
                          : 'MAKE YOUR BRAND SEEN'}
                      </span>
                    </>
                  )}
                  {w.href ? (
                    <a
                      href={w.href}
                      className="work-arrow"
                      aria-label={`Відкрити ${w.title}`}
                    >
                      <ArrowUpRight />
                    </a>
                  ) : (
                    <button
                      onClick={() => setSelected(i)}
                      className="work-arrow"
                      aria-label={`Докладніше про ${w.title}`}
                    >
                      <ArrowUpRight />
                    </button>
                  )}
                </div>
                <div className="work-description">
                  <h3>{w.title}</h3>
                  <span>{w.category}</span>
                </div>
                <p className="work-note">{w.note}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <section id="approach" className="section approach">
        <SectionLabel number="02" note="WHY 8M">
          Наш підхід
        </SectionLabel>
        <Reveal className="section-heading">
          <h2>
            Не окремі дії.
            <br />
            <span className="muted">Спільний напрям.</span>
          </h2>
          <p>
            Поєднуємо мислення маркетологів
            <br />і увагу продакшну до деталей.
          </p>
        </Reveal>
        <div className="principle-grid">
          {principles.map(([title, text], i) => (
            <Reveal delay={i * 80} key={title}>
              <article className="principle">
                <span className="meta">
                  0{i + 1} <Plus size={17} />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <section id="services" className="section services">
        <SectionLabel number="03" note="WHAT WE DO">
          Послуги
        </SectionLabel>
        <div className="services-layout">
          <Reveal>
            <h2>
              Стратегія.
              <br />
              Кадр.
              <br />
              <span className="muted">Система.</span>
            </h2>
            <p className="section-description">
              Окремий напрям або повний цикл.
              <br />
              Обираємо формат під ваше завдання.
            </p>
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
                      Обговорити {s.name}
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
        <SectionLabel number="04" note="CHOOSE YOUR FORMAT">
          Вартість
        </SectionLabel>
        <Reveal className="section-heading">
          <h2>
            Ваші цілі.
            <br />
            <span>Ваш формат.</span>
          </h2>
          <p>
            Обсяг і вартість погоджуємо до старту.
            <br />
            Проєктно або в ритмі щомісячної роботи.
          </p>
        </Reveal>
        <Tabs defaultValue="project" className="pricing-tabs">
          <Reveal className="pricing-toolbar">
            <TabsList className="billing-toggle" aria-label="Формат співпраці">
              <TabsTrigger value="project">Проєктно</TabsTrigger>
              <TabsTrigger value="monthly">Щомісяця</TabsTrigger>
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
                    <article
                      key={s.id}
                      className={`price-card ${i === 2 ? 'featured' : ''}`}
                    >
                      <div className="price-card-label meta">
                        <span>
                          0{i + 1} /{' '}
                          {mode === 'project' ? 'PROJECT' : 'MONTHLY'}
                        </span>
                        {i === 2 && (
                          <span className="package-label">ПОВНИЙ ЦИКЛ</span>
                        )}
                      </div>
                      <h3>{s.name}</h3>
                      <div className="price-value">
                        <PriceLabel price={p.price} />
                      </div>
                      <p className="price-description">{p.description}</p>
                      <ul>
                        {p.deliverables.map((d) => (
                          <li key={d}>
                            <Plus size={13} />
                            {d}
                          </li>
                        ))}
                      </ul>
                      <p className="timeline">{p.timeline}</p>
                      <button
                        className={`button ${i === 2 ? 'button-dark' : 'button-light'}`}
                        onClick={() => choose(s.name)}
                      >
                        Обговорити вартість
                        <ArrowUpRight size={18} />
                      </button>
                    </article>
                  );
                })}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>
      <section id="faq" className="section faq">
        <SectionLabel number="05" note="GOOD TO KNOW">
          Питання та відповіді
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
        <SectionLabel number="06" note="LET’S MAKE IT HAPPEN">
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
            <div className="contact-directions">
              {services.map((s) => (
                <button key={s.id} onClick={() => choose(s.name)}>
                  {s.name}
                  <ArrowUpRight size={15} />
                </button>
              ))}
            </div>
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
      <Dialog
        open={selected !== null}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        <DialogContent className="work-dialog">
          {selected !== null && (
            <>
              <DialogTitle>{works[selected].title}</DialogTitle>
              <DialogDescription>
                {works[selected].note}. Назва клієнта, завдання та опис
                результатів будуть додані після уточнення деталей проєкту.
              </DialogDescription>
              <button
                className="button button-dark"
                onClick={() => choose(works[selected].category)}
              >
                Обговорити проєкт
                <ArrowUpRight size={18} />
              </button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}
