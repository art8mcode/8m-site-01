'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, ArrowDown, Plus, Minus } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const services = [
  { title: 'Маркетингове просування', description: 'Допомагаємо бренду знайти свою аудиторію. Поєднуємо стратегію, контент і рекламні кампанії з чіткими цілями.', items: ['Маркетингова стратегія', 'Просування в соцмережах', 'Рекламні кампанії', 'Аналітика та оптимізація'] },
  { title: 'Reels-продакшн', description: 'Від ідеї та сценарію до зйомки й фінального монтажу. Створюємо короткі відео, які передають характер вашого бренду.', items: ['Концепція та сценарій', 'Професійна зйомка', 'Монтаж і колір', 'Звук та субтитри'] },
  { title: 'Просування + Reels', description: 'Поєднуємо професійний відеоконтент із маркетинговою стратегією. Єдина команда для виробництва та просування.', items: ['Стратегія просування', 'Серія Reels', 'Запуск кампаній', 'Аналіз результатів'] },
];
const projects = [
  {name:'Brand in motion',type:'Reels / Демо-концепт',className:'object-one',image:'/hero.png',text:'Візуальний напрям для іміджевого Reels: контрастне світло, макроплани та акцент на фактурі. Це демонстраційна обкладинка, а не клієнтський відеокейс.'},
  {name:'Make it seen',type:'Просування / Демо-концепт',className:'object-two',image:null,text:'Приклад візуального оформлення рекламної кампанії: коротке повідомлення, контраст і виразна типографіка. Демонстраційний концепт; результати кампанії не заявляються.'},
];
export default function Home() {
  const [menu,setMenu]=useState(false);
  const [active,setActive]=useState<number|null>(0);
  const [project,setProject]=useState<number|null>(null);
  const [service,setService]=useState('');
  const [status,setStatus]=useState('');
  function choose(value:string){setService(value);document.getElementById('contact')?.scrollIntoView({behavior:'smooth'});}
  return <main id="top">
    <header className="header">
      <a href="#top" className="brand" aria-label="8m — головна">8m<span>®</span></a>
      <nav aria-label="Головна навігація"><a href="#work">Портфоліо <sup>02</sup></a><a href="#services">Послуги</a><a href="#pricing">Ціни</a></nav>
      <a href="#contact" className="header-contact">Обговорити проєкт <ArrowUpRight size={17}/></a>
      <button className="menu-toggle" onClick={()=>setMenu(!menu)} aria-expanded={menu} aria-controls="mobile-menu" aria-label={menu?'Закрити меню':'Відкрити меню'}><span/><span/></button>
    </header>
    {menu&&<nav id="mobile-menu" className="mobile-menu" aria-label="Мобільна навігація">{[['Портфоліо','work'],['Послуги','services'],['Ціни','pricing'],['Контакт','contact']].map(([name,id])=><a key={id} href={`#${id}`} onClick={()=>setMenu(false)}>{name}<ArrowUpRight/></a>)}</nav>}
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-art"/>
      <div className="hero-top"><div className="hero-wordmark">8m<sup>®</sup><span>marketing & production</span></div><div className="hero-services">Маркетинг & Reels-продакшн<br/><br/>Маркетингове просування<br/>Професійний Reels-продакшн<br/>Від стратегії до кадру</div></div>
      <div className="registration" aria-hidden="true"><span>+</span><span>+</span><span>+</span><span>+</span></div>
      <div className="hero-bottom"><h1 id="hero-title">Перетворюємо увагу на дію.<br/><span>Маркетинг, що має стратегію.<br className="desktop-break"/> Reels, що мають характер.</span></h1><a href="#work" className="discover">Дивитися роботи <ArrowDown size={17}/></a><a href="#contact" className="hero-cta"><span>Є ідея?<br/><strong>Почнімо розмову.</strong></span><span className="circle"><ArrowUpRight size={26}/></span></a></div>
    </section>
    <div className="intro-strip"><span><i/>Від ідеї до реалізації</span><span>Стратегія. Дизайн. Результат.</span><span>8m studio © 2026</span></div>
    <section id="work" className="section works">
      <div className="section-top"><span className="eyebrow">01 / Портфоліо</span><span className="eyebrow">Візуальні концепти</span></div>
      <div className="section-heading"><h2>Вибрані роботи<span className="dot">.</span></h2><p>Контент, який хочеться дивитися.<br/>Кампанії, які допомагають бути помітними.</p></div>
      <div className="project-grid">{projects.map((p,i)=><button key={p.name} className="project" onClick={()=>setProject(i)}><div className={`project-image ${p.className}`}>{p.image&&<Image unoptimized width={1672} height={941} src={p.image} alt="Чорна скульптурна форма з чорнила" loading="lazy"/>}<span className="project-stamp">8m® / EXPERIMENT {String(i+1).padStart(2,'0')}</span><span className="project-art-type">{i===0?'motion.':'seen.'}<small>{i===0?'A NEW PERSPECTIVE':'MAKE YOUR BRAND SEEN'}</small></span><span className="project-open"><ArrowUpRight/></span></div><div className="project-meta"><h3>{p.name}</h3><span>{p.type}</span></div></button>)}</div>
      <p className="demo-note">Демонстраційні концепти. Реальні кейси 8m з’являться тут після додавання матеріалів.</p>
    </section>
    <section id="services" className="section services"><div className="section-top"><span className="eyebrow">02 / Що ми робимо</span><span className="eyebrow">Від цілого до деталей</span></div><div className="services-layout"><h2>Сильний зміст.<br/><span>Влучний кадр.</span></h2><div className="service-list">{services.map((s,i)=><div className="service" key={s.title}><button onClick={()=>setActive(active===i?null:i)} aria-expanded={active===i} aria-controls={`service-${i}`}><span className="service-number">0{i+1}</span><h3>{s.title}</h3>{active===i?<Minus size={20}/>:<Plus size={20}/>}</button>{active===i&&<div className="service-details" id={`service-${i}`}><p>{s.description}</p><div className="tags">{s.items.map(item=><span key={item}>{item}</span>)}</div></div>}</div>)}</div></div></section>
    <section id="pricing" className="section pricing"><div className="section-top"><span className="eyebrow">03 / Вартість</span><span className="eyebrow">Прозорий старт</span></div><div className="section-heading"><h2>Ваш масштаб<span className="dot">.</span></h2><p>Обсяг, терміни та вартість погоджуємо<br/>до початку роботи над проєктом.</p></div><div className="pricing-grid">{services.map((s,i)=><article className={`price-card ${i===1?'featured':''}`} key={s.title}><div className="price-card-top"><span>0{i+1} / {i===0?'MARKETING':i===1?'REELS':'FULL SERVICE'}</span><ArrowUpRight size={20}/></div><h3>{s.title}</h3><div className="price">За запитом</div><p>Індивідуальний розрахунок<br/>після знайомства з вашим завданням.</p><ul>{s.items.map(item=><li key={item}><Plus size={13}/>{item}</li>)}</ul><button className="pill" onClick={()=>choose(s.title)}>Обговорити вартість <ArrowUpRight size={17}/></button></article>)}</div></section>
    <section id="contact" className="contact-section"><div className="contact-copy"><span className="eyebrow">04 / Почнімо з розмови</span><h2>Є ідея?<br/>Давайте<br/><span>створимо.</span><ArrowUpRight className="contact-arrow"/></h2><p>Розкажіть, що задумали.<br/>Знайдемо форму, яка працюватиме для вас.</p></div><form className="contact-form" onSubmit={e=>{e.preventDefault();setStatus('Форма ще не підключена до отримувача. Заявку не надіслано.');}}><div className="form-caption">Кілька слів про ваш проєкт <span>↗</span></div><label htmlFor="name">Ваше ім’я *</label><Input id="name" name="name" autoComplete="name" placeholder="Як до вас звертатися?" required maxLength={100}/><label htmlFor="email">Email *</label><Input id="email" name="email" type="email" autoComplete="email" placeholder="you@company.com" required maxLength={254}/><label htmlFor="service">Що вас цікавить?</label><Input id="service" name="service" value={service} onChange={e=>setService(e.target.value)} placeholder="Просування, Reels або комплексна робота…" maxLength={150}/><label htmlFor="message">Про ваш проєкт *</label><Textarea id="message" name="message" required placeholder="Ідея, завдання, бажані терміни" maxLength={4000}/><button className="submit" type="submit">Надіслати заявку <ArrowUpRight size={21}/></button><p className="form-note">Демо-режим: надсилання буде доступне після підключення отримувача.</p>{status&&<output className="form-status">{status}</output>}</form></section>
    <footer><a href="#top" className="footer-logo" aria-label="На початок">8m<sup>®</sup></a><div><span>Маркетинг & продакшн</span><span>© 8m, 2026</span></div><a href="#top" className="back-top">Нагору <ArrowUpRight size={17}/></a></footer>
    <Dialog open={project!==null} onOpenChange={open=>{if(!open)setProject(null)}}><DialogContent className="project-dialog">{project!==null&&<><DialogTitle className="text-3xl">{projects[project].name}</DialogTitle><DialogDescription>{projects[project].text}</DialogDescription><p className="text-sm">{projects[project].type}</p><button className="pill" onClick={()=>{setProject(null);choose(services[project===0?0:1].title)}}>Хочу обговорити схожий проєкт <ArrowUpRight size={17}/></button></>}</DialogContent></Dialog>
  </main>;
}
