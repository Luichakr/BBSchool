# BBSchool → BidBidders integration handoff

> **Покажи этот файл ИИ-ассистенту в проекте BIDDERS_2**, и он поймёт что есть в BBSchool и как это встроить.
>
> Project root **BBSchool**: `/Users/sergeybelskiy/School`
> Project root **BIDDERS_2**: `/Users/sergeybelskiy/Desktop/AI CENTR/BIDDERS_2`
> Live preview BBSchool: https://1234567890qwerty.vercel.app
> GitHub BBSchool: https://github.com/Luichakr/BBSchool

---

## 1. Что такое BBSchool

Маркетинговый сайт + образовательная программа для покупки авто с аукционов США/Канады/Европы. Построен на Next.js 16 как **отдельный** проект, но **должен быть встроен в основную платформу BidBidders** (BIDDERS_2/bidbiders-web), потому что у клиента должен быть один кабинет.

**Окончательное архитектурное решение** (после обсуждений):

```
bidbidders.com                ← публичная платформа (catalog, calculator, marketing)
school.bidbidders.com         ← маркетинг школы + продажа курса (контент из BBSchool)
client.bidbidders.com         ← ЕДИНЫЙ кабинет клиента (торги + курс + покупки)
crm.bidbidders.com            ← внутренний CRM для менеджеров
```

После интеграции:
- Курс становится **разделом внутри** `client.bidbidders.com` (одна авторизация, один UI)
- `school.bidbidders.com` — только лендинг / продажи / контент-маркетинг
- Старый домен `bbschool.vercel.app` после миграции редиректится на `school.bidbidders.com`

---

## 2. Tech stack BBSchool

| Что | Версия / название |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 (`@theme` в `globals.css`) |
| i18n | `next-intl` v4, 4 локали: **pl** (default) / **uk** / **ru** / **en** |
| State (mock) | Zustand v5 |
| Forms | React Hook Form + `libphonenumber-js` |
| Validation | Zod v4 |
| Font | Manrope 400-800 через `next/font/google` |
| Icons | lucide-react |
| Hosting | Vercel |

> BIDDERS_2 на Vite + React + react-router + Supabase + Cloudflare. **Это разные стеки**. Прямой копи-пейст невозможен — нужен порт.

---

## 3. Брендинг (уже синхронизирован с BIDDERS_2)

Дизайн-токены в `src/app/globals.css` уже совпадают с `BIDDERS_2/bidbiders-web/src/shared/styles/tokens.css`:

```css
--color-primary: #ff5c00;       /* BidBidders orange */
--color-primary-dark: #e54f00;
--color-accent: #ff7a2f;
--color-navy: #1b2a4a;          /* BidBidders navy */
--color-navy-2: #22345c;
--color-bg: #f5f6fa;
--color-cream: #fafbfd;
--color-text: #1a2236;
--color-muted: #5a6478;
--color-border: #e4e7ef;
--font-sans: "Manrope", ...;
```

При миграции эти токены не нужно копировать — они уже есть в BIDDERS_2.

---

## 4. Структура файлов BBSchool

```
src/
├── app/
│   ├── globals.css                       ← дизайн-токены
│   ├── sitemap.ts, robots.ts
│   ├── api/
│   │   └── lead/route.ts                 ← POST приём заявок (Zod, env-ready для Telegram/CRM/Sheets)
│   └── [locale]/
│       ├── layout.tsx                    ← Header + Footer + ContactWidget + Manrope font
│       ├── page.tsx                      ← главная (14 секций)
│       ├── about/page.tsx
│       ├── basic/page.tsx
│       ├── pro/page.tsx
│       ├── concierge/page.tsx
│       ├── partner/page.tsx              ← LeadForm для B2B
│       ├── pricing/page.tsx              ← decision-by-goal + 4 packages + compare table + FAQ
│       ├── course/page.tsx               ← 7 модулей × 23 урока
│       ├── what-inside/page.tsx          ← что внутри курса
│       ├── how-it-works/page.tsx         ← 11-секционная глубокая страница процесса
│       ├── car-auctions/page.tsx         ← аукционы + склады + порты + директория
│       ├── calculator/page.tsx           ← ОРИЕНТИРОВОЧНЫЙ калькулятор (НЕ канонический — у BIDDERS_2 свой настоящий калькулятор)
│       ├── faq/page.tsx
│       ├── risk/page.tsx                 ← страница ризиков
│       ├── auto-w-drodze/page.tsx        ← Auto in transit publicly
│       ├── bidders-power/page.tsx        ← реферальная программа
│       ├── contact/page.tsx              ← LeadForm + real contacts из BIDDERS_2
│       ├── contact/thank-you/page.tsx
│       ├── partner/thank-you/page.tsx
│       ├── checkout/page.tsx             ← 4-step mock checkout
│       ├── checkout/success/page.tsx
│       ├── login/page.tsx, register/page.tsx
│       ├── legal/{terms,privacy,cookies,risk-disclaimer,referral-rules,payment-terms,service-rules}/
│       ├── dashboard/                    ← MOCK CABINET (для демо/превью)
│       │   ├── layout.tsx                ← sidebar + mobile bottom nav
│       │   ├── page.tsx                  ← home (welcome, progress, active requests)
│       │   ├── course/page.tsx           ← модули + прогресс
│       │   ├── course/[lessonId]/page.tsx
│       │   ├── package/page.tsx
│       │   ├── cars/page.tsx
│       │   ├── cars/new/page.tsx
│       │   ├── cars/[carId]/page.tsx
│       │   ├── calculator/page.tsx
│       │   ├── bid-requests/page.tsx
│       │   ├── bid-requests/new/page.tsx
│       │   ├── purchase-tracking/page.tsx ← 16-step Stepper
│       │   ├── auto-w-drodze/page.tsx
│       │   ├── bidders-power/page.tsx
│       │   ├── upgrade/page.tsx
│       │   ├── profile/page.tsx
│       │   └── support/page.tsx
│       └── manager/                      ← MOCK CRM
│           ├── layout.tsx
│           ├── page.tsx
│           ├── bid-requests/page.tsx + [id]/
│           ├── purchases/page.tsx + [id]/
│           ├── auto-w-drodze/page.tsx
│           └── users/page.tsx
├── components/
│   ├── layout/
│   │   ├── Header.tsx                    ← nav, lang switcher, logo
│   │   ├── Footer.tsx                    ← 5 columns, real contacts
│   │   ├── LanguageSwitcher.tsx
│   │   ├── ContactWidget.tsx             ← floating FAB + quick questions
│   │   └── DashboardSidebar.tsx
│   ├── ui/                               ← primitives
│   │   ├── Button.tsx (cva variants)
│   │   ├── Card.tsx, Badge.tsx, Input.tsx
│   │   ├── Accordion.tsx, Progress.tsx, Stepper.tsx
│   │   └── Container.tsx
│   ├── sections/
│   │   ├── PageHeader.tsx
│   │   ├── PackageCard.tsx
│   │   └── LegalPage.tsx
│   └── forms/
│       └── LeadForm.tsx                  ← полная форма с phone validation, UTM, lotUrl, etc.
├── data/
│   ├── packages.ts                       ← Basic / Pro / Concierge / Partner (СТАРАЯ модель — будет переписано)
│   ├── course.ts                         ← 7 модулей × 23 урока
│   ├── mock.ts                           ← MOCK_USER, MOCK_CARS, MOCK_BID_REQUESTS, MOCK_PURCHASE, MOCK_AUTO_W_DRODZE, MOCK_BIDDERS_POWER
│   └── contacts.ts                       ← реальные контакты (BidBidders + Car Auctions Poland)
├── lib/
│   ├── cn.ts                             ← tailwind class merger
│   ├── calculator.ts                     ← MOCK formula (НЕ продакшен; у BIDDERS_2 свой)
│   └── format.ts                         ← детерм. fmt() для чисел (избегает hydration mismatch)
├── store/
│   └── dashboard.ts                      ← Zustand store с mock data
├── messages/
│   ├── pl.json                           ← ~1500 ключей; default
│   ├── uk.json                           ← полный перевод
│   ├── ru.json                           ← полный перевод
│   └── en.json                           ← полный перевод
├── i18n/
│   ├── routing.ts                        ← locales, defaultLocale, prefix
│   ├── navigation.ts                     ← Link, useRouter wrappers
│   └── request.ts                        ← getRequestConfig для server components
├── types/
│   └── index.ts                          ← Locale, PackageId, User, Car, BidRequest, PurchaseTracking, BiddersPower, AutoWDrodzeCar, ...
└── middleware.ts                         ← next-intl middleware

CLAUDE.md                                 ← правила проекта (для AI-ассистентов)
.claude/skills/                           ← 9 skill-файлов под каждый домен
README.md                                 ← публичный
```

---

## 5. Переводы — что и где

В `src/messages/*.json` примерно **1500 ключей × 4 локали = 6000 строк копирайта**. Полный premium-copy уже написан. Это **то самое ценное, что нужно перенести в BIDDERS_2**.

Основные namespace:
- `meta` — title/tagline
- `nav` — навигация
- `cta` — кнопки
- `home.*` — секции главной (hero, audience, pain, tools, auctions, titleGuide, outcomes, howItWorks, notIncluded, about, cases, preview, finalCta)
- `packages.{basic,pro,concierge,partner}` — пакеты (4 шт, СТАРАЯ модель)
- `pricing.*` — страница цен + сравнение
- `course.*` — программа курса (7 модулей × 3-5 уроков)
- `calculator.*` + `calculatorPage.*` — две версии (mock + новая)
- `bidRequest.*` — форма заявки на ставку
- `purchase.*` — 16-step harmonogram
- `autoWDrodze.*` — auto in transit
- `biddersPower.*` — реферальная программа
- `carAuctions.*` + `carAuctionsDeep.*` + `carAuctionsExtras.*` — три уровня глубины контента про аукционы
- `whatInsidePage.*` — что внутри курса
- `howItWorksDeep.*` — глубокая страница процесса (11 этапов)
- `courseDeep.*` — пример урока, чек-лист, финальное задание
- `aboutPage.*`, `contactPage.*`
- `leadForm.*` — все поля + ошибки + контактные времена + цели клиента + страны
- `thankYou.*` — варианты contact / partner / concierge
- `risk.*` — страница ризиков
- `pricingExtras.*` — decision-by-goal + "почему не 150 zł"
- `contactWidget.*` — варианты быстрых вопросов
- `faq.*` — 16 вопросов
- `dashboard.*`, `checkout.*`, `legal.*`, `footer.*`, `common.*`

**В BIDDERS_2 уже есть i18n** (своя система с sync-overrides скриптами в `scripts/i18n/`). При миграции нужно:
1. Прочитать структуру BIDDERS_2 i18n (где у них хранятся ключи)
2. Адаптировать ключи под их соглашение
3. Запустить их `npm run i18n:check-missing-keys` чтобы убедиться нет пропусков

---

## 6. Реальные контакты (из BIDDERS_2 docs, уже в коде BBSchool)

В `src/data/contacts.ts`:

```ts
{
  bidbidders: {
    email: "hello@bidbidders.com",
    telegram: "https://t.me/bidbidders",
    telegramLabel: "@bidbidders",
  },
  carAuctionsPoland: {
    name: "Car Auctions Poland",
    addressLine1: "Jawczyce, ul. Poznańska 56",
    addressLine2: "05-850, Polska",
    email: "Sales@carauctions.pl",
    phones: ["+48 784 890 644", "+48 571 660 242"],
  },
  ports: {
    europe: ["Rotterdam", "Bremerhaven", "Gdynia", "Kłajpeda"],
  },
  warehousesUS: ["Savannah", "Los Angeles", "Houston", "New Jersey", "Tacoma", "Norfolk", "New York"],
}
```

---

## 7. Что mock, а что готово к продакшену

| Что | Статус |
|---|---|
| Маркетинговые тексты (4 локали) | ✅ Готовы, нужна синхронизация с фактическими цифрами BIDDERS_2 |
| Дизайн (цвета + Manrope + spacing) | ✅ Уже совпадают с BIDDERS_2 |
| `/api/lead` Zod schema | ✅ Готова, нужно подключить реальный Telegram/CRM webhook |
| LeadForm с phone validation | ✅ Готова |
| Dashboard (`/dashboard/*`) | ⚠️ Mock через Zustand — нужно заменить на Supabase queries в client.bidbidders.com |
| Manager (`/manager/*`) | ⚠️ Mock — перенести в crm.bidbidders.com если такой раздел нужен |
| Calculator (`/calculator`) | ❌ Формула ОРИЕНТИРОВОЧНАЯ. **Использовать настоящий калькулятор BIDDERS_2** (`bidbiders-web/src/pages/calculator/`) |
| Checkout (`/checkout`) | ❌ Mock без оплаты. Подключить Przelewy24 (планировалось — есть ТЗ выше в чате) |
| Pricing структура | ❌ Текущая 4-pack модель (Basic/Pro/Concierge/Partner) **должна быть заменена** на 1 школьный продукт + 3 депозитных уровня платформы (Basic 4k zł / Professional 10k / Enterprise 20k). См. секцию 9 ниже. |

---

## 8. Финальная бизнес-модель (это решено, но НЕ реализовано)

После анализа docs `harmonogram_bid_bidders.docx` + `proces_zakupu_bid_bidders.docx`:

**BBSchool продукт:**
- Один уровень школы: **BBSchool курс** — ~2000 zł
- Содержит: 7 модулей × 23 урока, чек-листы, шаблоны, личный калькулятор max bid, доступ к кабинету

**Платформа BidBidders (3 депозитных уровня):**
| Tier | Депозит (возвратный) | Max bid |
|---|---|---|
| Basic | 4 000 zł | до $10 000 |
| Professional | 10 000 zł | до $50 000 |
| Enterprise | 20 000 zł | до $200 000 (+ managed service / персональный менеджер) |

Концепции `Concierge` и `Partner` из старой модели **абсорбируются** в Enterprise tier.

**Bundle:** "Купи курс — получи скидку на депозит" или "Внеси депозит — курс в подарок".

**Логика воронки:**
1. Клиент заходит на `school.bidbidders.com`
2. Покупает курс (2000 zł)
3. Получает доступ в `client.bidbidders.com` с вкладкой "Курс"
4. Проходит обязательные базовые уроки
5. Выбирает депозитный tier (Basic/Pro/Enterprise) — переводит депозит
6. Открывает вкладку "Платформа", начинает торги
7. После выигрыша — voronka 16 шагов до получения авто

---

## 9. План интеграции в BIDDERS_2 (что нужно сделать ИИ-ассистенту в проекте `bidbiders-web`)

### A. На `school.bidbidders.com` (это БЫЛО BBSchool, теперь подраздел)

Создать новые роуты в `BIDDERS_2/bidbiders-web/src/pages/school/`:
- `/school` — главная (порт `BBSchool/src/app/[locale]/page.tsx`)
- `/school/course` — программа курса
- `/school/what-inside` — что внутри
- `/school/how-it-works` — глубокая страница процесса
- `/school/pricing` — два продукта (BBSchool курс + 3 платформ-tier) + bundle
- `/school/risk` — ризики
- `/school/faq`, `/school/about`, `/school/contact`

**Что взять из BBSchool:**
- HTML/JSX структуру и копирайт из соответствующих `page.tsx` файлов
- Переводы из `src/messages/*.json` (адаптировать под формат i18n в BIDDERS_2)
- LeadForm компонент (`src/components/forms/LeadForm.tsx`)
- API логику из `src/app/api/lead/route.ts` (адаптировать под Cloudflare Worker / Supabase function)

### B. На `client.bidbidders.com` (единый кабинет)

Существующий кабинет BIDDERS_2 (catalog, calculator, watchlist) **дополнить** разделом "Навчання":
- `/client/learn` — модули курса (7 модулей)
- `/client/learn/lesson/[id]` — индивидуальный урок
- `/client/learn/certificate` — сертификат после завершения
- `/client/learn/tokens` — BIDDERS Power токены (заработанные за уроки + рефералов)

Хранение прогресса курса:
- Таблица в Supabase: `user_course_progress (user_id, lesson_id, completed_at, watched_seconds)`
- Таблица: `user_tokens (user_id, balance, earned_total, spent_total)`
- Таблица: `user_referrals (user_id, ref_code, invited_user_id, status, bonus_applied)`

### C. Кросс-функциональность курса × платформы (главная фишка)

- На странице конкретного лота — кнопка "Перевірити по чек-листу" → открывает чек-лист урока 3 (как читати лот)
- При попытке `submit bid request` без обязательных уроков → soft-warning "Пройди M5 (max bid) перед першою заявкою"
- Калькулятор по VIN из конкретного лота (а не абстрактный)
- BIDDERS токены → скидка на сервисную комиссию при покупке

### D. CRM (`crm.bidbidders.com`)

Mock из `BBSchool/src/app/[locale]/manager/*` показывает:
- Список заявок на ставки
- Детальная страница заявки + actions (approve/reject/need-info)
- Список покупок + 16-step timeline с возможностью редактировать
- Список auto-w-drodze с action кнопками (approve/reserve/sold)

Если у BIDDERS_2 нет CRM сейчас — это **прототип** для будущего внутреннего инструмента менеджеров.

---

## 10. Что НЕ делать

1. ❌ **Не копировать BBSchool как есть** — это Next.js, BIDDERS_2 это Vite/React. Прямой копи-пейст невозможен.
2. ❌ **Не дублировать кабинет** — у клиента должен быть один логин на `client.bidbidders.com`.
3. ❌ **Не использовать BBSchool calculator** для производства — у BIDDERS_2 есть свой настоящий калькулятор с реальными ставками. Наш калькулятор — это **демо** на маркетинговой странице.
4. ❌ **Не реализовывать `/api/lead` как у нас** — у BIDDERS_2 свой backend через Supabase, надо использовать его.
5. ❌ **Не строить отдельный auth для BBSchool** — единая авторизация через BIDDERS_2/Supabase.

## 11. Что точно нужно сделать

1. ✅ Перенести **тексты** (1500 ключей × 4 локали) — это самая ценная часть работы BBSchool
2. ✅ Перенести **структуру страниц** (какие секции, в каком порядке, какие CTA)
3. ✅ Перенести **LeadForm** — адаптировать под Supabase
4. ✅ Реализовать **бизнес-модель** (1 курс + 3 депозитных tier + bundle) на странице `/school/pricing` в BIDDERS_2
5. ✅ Добавить раздел **`Навчання`** в существующий кабинет BIDDERS_2
6. ✅ Реализовать **прогресс курса** через Supabase
7. ✅ Подключить **BIDDERS Power токены** к существующей реферальной системе BIDDERS_2 (если её нет — создать)
8. ✅ Реализовать **cross-functional connections** (см. секцию 9.C)
9. ✅ Настроить **redirects** `bbschool.vercel.app/*` → `school.bidbidders.com/*`

---

## 12. Команды для верификации BBSchool локально

```bash
cd /Users/sergeybelskiy/School
npm install
npm run dev        # http://localhost:3000 (или другой свободный порт)
npm run typecheck  # tsc --noEmit
npm run lint
npm run build      # 200+ статических страниц × 4 локали
```

GitHub: `https://github.com/Luichakr/BBSchool`
Vercel: `https://1234567890qwerty.vercel.app`

---

## 13. Контакты для вопросов

- Проект BBSchool автор: Sergey (`leechansb@gmail.com`)
- BBSchool GitHub: https://github.com/Luichakr/BBSchool
- Path BIDDERS_2 (production): `/Users/sergeybelskiy/Desktop/AI CENTR/BIDDERS_2/bidbiders-web`
- Path BBSchool: `/Users/sergeybelskiy/School`

---

## 14. Чек-лист для AI-ассистента в BIDDERS_2

Когда зайдёшь в `BIDDERS_2/bidbiders-web`:

1. [ ] Прочитай `README.md` и `PROJECT_MAP.md` BIDDERS_2 — пойми текущую структуру
2. [ ] Прочитай `src/shared/i18n/` — пойми как работает их i18n
3. [ ] Прочитай `supabase/migrations/` — какие таблицы есть
4. [ ] Прочитай `src/pages/` — текущие роуты
5. [ ] Прочитай этот файл (`/Users/sergeybelskiy/School/HANDOFF.md`) до конца
6. [ ] Прочитай `/Users/sergeybelskiy/School/src/messages/uk.json` (этот файл — основной источник текстов)
7. [ ] Спроси у пользователя:
   - Какой subdomain используем для школы? (`school.bidbidders.com`?)
   - Реализуем bundle (курс + tier депозита) или они продаются раздельно?
   - Когда переезжаем с `bbschool.vercel.app` на `school.bidbidders.com`?
8. [ ] Создай миграционный план: какие BBSchool-страницы → в какие BIDDERS_2 роуты
9. [ ] Стартуй с одной страницы (рекомендую `/school/about` — самая простая, без форм)
10. [ ] Проверь что `npm run build` BIDDERS_2 проходит после каждого добавления

---

## Конец handoff

Этот файл — самодостаточный. Все детали выше. Если что-то не понятно — `cd /Users/sergeybelskiy/School && cat <файл>`. Все исходники открыты и закоммичены.
