import { Reveal } from './reveal';
import { SectionLabel } from './section-label';
import { ProductionExample } from './production-example';
import { works } from '../site-data';
export function ServiceNarratives() {
  return (
    <>
      <section id="marketing" className="section direction-section">
        <SectionLabel number="01" note="STRATEGY & DIRECTION">
          Marketing
        </SectionLabel>
        <div className="editorial-layout">
          <Reveal>
            <h2>
              Маркетинг
              <br />
              починається
              <br />з задачі.
            </h2>
          </Reveal>
          <div className="editorial-copy">
            <Reveal>
              <p className="lead-copy">
                Спочатку визначаємо, куди має рухатися бренд: кого залучаємо, що
                пропонуємо, яку дію очікуємо і як будемо оцінювати результат.
              </p>
            </Reveal>
            <Reveal delay={80}>
              <p>
                Далі поєднуємо позиціонування, контент, канали просування та
                рекламні кампанії в одну систему навколо конкретної
                бізнес-задачі.
              </p>
              <p>
                Працюємо як з окремими маркетинговими задачами, так і з напрямом
                на постійній основі — від стратегії до запуску, аналізу та
                наступної ітерації.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <div className="tags competency-tags">
                {[
                  'Strategy',
                  'Positioning',
                  'Social Media',
                  'Advertising',
                  'Analytics & Optimization',
                ].map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      <section id="reels" className="section reels-section">
        <SectionLabel number="02" note="REELS PRODUCTION">
          Reels Production
        </SectionLabel>
        <div className="editorial-layout reels-intro">
          <Reveal>
            <h2>
              Продакшн, який
              <br />
              працює на увагу.
            </h2>
          </Reveal>
          <div className="editorial-copy">
            <Reveal>
              <p className="lead-copy">
                Розробляємо короткий відеоконтент для брендів, продуктів і
                сервісів — від ідеї та зйомки до монтажу, ритму, звуку й
                фінальної подачі.
              </p>
            </Reveal>
            <Reveal delay={80}>
              <p>
                Працюємо з різними середовищами, форматами та типами руху, але
                завжди з однією задачею: зробити бренд помітнішим і створити
                кадр, який утримує увагу.
              </p>
            </Reveal>
          </div>
        </div>
        <div className="production-grid">
          {works.map((example, i) => (
            <Reveal key={example.id} delay={(i % 2) * 80}>
              <ProductionExample example={example} />
            </Reveal>
          ))}
        </div>
      </section>
      <section id="combined" className="section combined-section">
        <SectionLabel number="03" note="ONE SYSTEM">
          Marketing + Reels Production
        </SectionLabel>
        <div className="editorial-layout">
          <Reveal>
            <h2>
              Не окремі дії.
              <br />
              <span className="muted">Одна система.</span>
            </h2>
          </Reveal>
          <Reveal className="editorial-copy">
            <p className="lead-copy">
              Стратегія визначає, що говорити, кому і навіщо.
            </p>
            <p>Продакшн перетворює цю задачу на контент.</p>
            <p>Дистрибуція доставляє його потрібній аудиторії.</p>
            <p>
              Аналітика показує, що працює і що потрібно змінити в наступному
              циклі.
            </p>
          </Reveal>
        </div>
        <Reveal className="combined-note">
          <p>
            Такий формат підходить брендам, яким потрібні не окремі ролики або
            разові рекламні дії, а послідовна система роботи навколо
            маркетингової задачі.
          </p>
        </Reveal>
      </section>
    </>
  );
}
