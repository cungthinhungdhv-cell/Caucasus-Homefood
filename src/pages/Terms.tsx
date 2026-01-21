import { useState } from 'react'

type Lang = 'ru' | 'vi'

interface TermsProps {
  lang: Lang
  toggleLang: () => void
}

// Translations for Terms page
const translations = {
  ru: {
    pageTitle: 'Условия сотрудничества',
    pageSubtitle: 'Чек-лист для переговоров с Арменом',

    // Section 1: Ownership
    ownershipTitle: 'Владение компанией',
    ownershipLabel: 'Доля Влад+Ньунг и Армена в компании',
    ownershipTooltip: 'Процент владения компанией. 50% означает равные доли между Арменом и Влад+Ньунг.',

    // Section 2: Profit distribution
    profitTitle: 'Распределение прибыли',
    profitLabel: 'Доля прибыли Влад+Ньунг и Армена',
    profitTooltip: 'Какую долю чистой прибыли получают Влад+Ньунг после всех расходов и налогов.',

    // Section 3: Pre-payback distribution
    prePaybackTitle: 'До окупаемости вложений',
    investmentLabel: 'Вложения Влад+Ньунг',
    armenInvestmentLabel: 'Вложения Армена',
    armenShareLabel: 'Доля Армена до окупаемости',
    investorShareLabel: 'Влад+Ньунг',
    prePaybackTooltip: 'До момента окупаемости вложений Армен получает меньшую долю, остальное идёт на ускоренную окупаемость инвесторов.',
    totalInvestment: 'Общие вложения',
    newInvestmentsNote: 'Данные условия повторяются при новых вложениях в бизнес.',

    // Section 4: Death conditions
    deathTitle: 'В случае смерти инвесторов (Армен или Влад+Ньунг)',
    deathAgreed: 'Условие согласовано',
    deathConditions: [
      'У родственников умершего инвестора есть 3 месяца чтобы приехать в Дананг и принять на себя половину забот по управлению бизнесом.',
      'Если возможности или желания приехать нет:',
      '• Доля оставшегося инвестора становится 60%',
      '• Приоритетное право выкупа оставшихся 40% по цене как 50% доли',
    ],

    // Section 5: Negative profit
    negativeProfitTitle: 'При отрицательной прибыли',
    negativeProfitAgreed: 'Условие согласовано',
    negativeProfitConditions: [
      'В случае отрицательной прибыли убыток ложится на инвесторов в равной степени.',
      'Порядок покрытия убытка:',
      '• В первую очередь — вычитается из зарплаты инвесторов',
      '• Если зарплаты не хватает — из личного кармана',
    ],

    // Common
    armen: 'Армен',
    vladNhung: 'Влад+Ньунг',

    // Footer
    saveSettings: 'Сохранить',
    saved: 'Сохранено!',
    resetSettings: 'Сбросить',
  },
  vi: {
    pageTitle: 'Điều khoản hợp tác',
    pageSubtitle: 'Checklist đàm phán với Armen',

    // Section 1: Ownership
    ownershipTitle: 'Quyền sở hữu công ty',
    ownershipLabel: 'Phần của Vlad+Nhung trong công ty',
    ownershipTooltip: 'Phần trăm sở hữu công ty. 50% nghĩa là chia đều giữa Armen và Vlad+Nhung.',

    // Section 2: Profit distribution
    profitTitle: 'Phân chia lợi nhuận',
    profitLabel: 'Phần lợi nhuận của Vlad+Nhung',
    profitTooltip: 'Phần lợi nhuận ròng mà Vlad+Nhung nhận được sau tất cả chi phí và thuế.',

    // Section 3: Pre-payback distribution
    prePaybackTitle: 'Trước khi hoàn vốn',
    investmentLabel: 'Đầu tư của Vlad+Nhung',
    armenInvestmentLabel: 'Đầu tư của Armen',
    armenShareLabel: 'Phần của Armen trước hoàn vốn',
    investorShareLabel: 'Vlad+Nhung',
    prePaybackTooltip: 'Trước khi hoàn vốn, Armen nhận phần nhỏ hơn, phần còn lại để hoàn vốn nhanh hơn cho nhà đầu tư.',
    totalInvestment: 'Tổng đầu tư',
    newInvestmentsNote: 'Các điều khoản này áp dụng cho các khoản đầu tư mới.',

    // Section 4: Death conditions
    deathTitle: 'Trường hợp nhà đầu tư qua đời',
    deathAgreed: 'Điều khoản đã đồng ý',
    deathConditions: [
      'Người thân của nhà đầu tư qua đời có 3 tháng để đến Đà Nẵng và đảm nhận một nửa công việc quản lý.',
      'Nếu không có khả năng hoặc mong muốn đến:',
      '• Phần của nhà đầu tư còn lại tăng lên 60%',
      '• Quyền ưu tiên mua lại 40% còn lại với giá như 50% cổ phần',
    ],

    // Section 5: Negative profit
    negativeProfitTitle: 'Khi lợi nhuận âm',
    negativeProfitAgreed: 'Điều khoản đã đồng ý',
    negativeProfitConditions: [
      'Trong trường hợp lợi nhuận âm, thua lỗ được chia đều cho các nhà đầu tư.',
      'Thứ tự bù đắp thua lỗ:',
      '• Đầu tiên — trừ từ lương của nhà đầu tư',
      '• Nếu lương không đủ — từ tiền cá nhân',
    ],

    // Common
    armen: 'Armen',
    vladNhung: 'Vlad+Nhung',

    // Footer
    saveSettings: 'Lưu',
    saved: 'Đã lưu!',
    resetSettings: 'Đặt lại',
  },
}

// Default values
const DEFAULTS = {
  ownershipPercent: 50,
  ownershipAgreed: false,
  profitPercent: 50,
  profitAgreed: false,
  investment: 320000000,
  armenInvestment: 80000000,
  armenPrePaybackPercent: 40,
  prePaybackAgreed: false,
  deathConditionsAgreed: false,
  negativeProfitAgreed: false,
}

// Load saved values from localStorage
const getSavedTermsValue = <T,>(key: string, defaultValue: T): T => {
  try {
    const saved = localStorage.getItem('caucasus-terms')
    if (saved) {
      const parsed = JSON.parse(saved)
      return parsed[key] ?? defaultValue
    }
  } catch {}
  return defaultValue
}

// Slider input component
function SliderInput({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit = '',
  formatValue,
  tooltip,
}: {
  label: string
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step?: number
  unit?: string
  formatValue?: (value: number) => string
  tooltip?: string
}) {
  const displayValue = formatValue ? formatValue(value) : `${value.toLocaleString('ru-RU')}${unit}`

  return (
    <div className="group">
      <div className="flex justify-between items-center mb-3">
        <label className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors flex items-center gap-1">
          {label}
          {tooltip && (
            <span
              className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-gray-700 text-gray-400 text-xs cursor-help hover:bg-gray-600 hover:text-white transition-colors"
              title={tooltip}
            >
              ?
            </span>
          )}
        </label>
        <span className="font-mono text-gold-500 font-medium text-sm bg-dark-800/50 px-3 py-1 rounded-full">
          {displayValue}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
    </div>
  )
}

// Number input component
function NumberInput({
  label,
  value,
  onChange,
  min,
  max,
  step = 1000000,
  tooltip,
}: {
  label: string
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step?: number
  tooltip?: string
}) {
  return (
    <div className="group">
      <div className="flex justify-between items-center mb-3">
        <label className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors flex items-center gap-1">
          {label}
          {tooltip && (
            <span
              className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-gray-700 text-gray-400 text-xs cursor-help hover:bg-gray-600 hover:text-white transition-colors"
              title={tooltip}
            >
              ?
            </span>
          )}
        </label>
      </div>
      <div className="relative">
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full bg-dark-800/50 border border-white/10 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-gold-500/50 transition-colors"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">₫</span>
      </div>
    </div>
  )
}

export default function Terms({ lang, toggleLang }: TermsProps) {
  const t = translations[lang]

  // State
  const [ownershipPercent, setOwnershipPercent] = useState(() =>
    getSavedTermsValue('ownershipPercent', DEFAULTS.ownershipPercent)
  )
  const [ownershipAgreed, setOwnershipAgreed] = useState(() =>
    getSavedTermsValue('ownershipAgreed', DEFAULTS.ownershipAgreed)
  )
  const [profitPercent, setProfitPercent] = useState(() =>
    getSavedTermsValue('profitPercent', DEFAULTS.profitPercent)
  )
  const [profitAgreed, setProfitAgreed] = useState(() =>
    getSavedTermsValue('profitAgreed', DEFAULTS.profitAgreed)
  )
  const [investment, setInvestment] = useState(() =>
    getSavedTermsValue('investment', DEFAULTS.investment)
  )
  const [armenInvestment, setArmenInvestment] = useState(() =>
    getSavedTermsValue('armenInvestment', DEFAULTS.armenInvestment)
  )
  const [armenPrePaybackPercent, setArmenPrePaybackPercent] = useState(() =>
    getSavedTermsValue('armenPrePaybackPercent', DEFAULTS.armenPrePaybackPercent)
  )
  const [prePaybackAgreed, setPrePaybackAgreed] = useState(() =>
    getSavedTermsValue('prePaybackAgreed', DEFAULTS.prePaybackAgreed)
  )
  const [deathConditionsAgreed, setDeathConditionsAgreed] = useState(() =>
    getSavedTermsValue('deathConditionsAgreed', DEFAULTS.deathConditionsAgreed)
  )
  const [negativeProfitAgreed, setNegativeProfitAgreed] = useState(() =>
    getSavedTermsValue('negativeProfitAgreed', DEFAULTS.negativeProfitAgreed)
  )

  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved'>('idle')

  // Calculated values
  const armenOwnership = 100 - ownershipPercent
  const armenProfit = 100 - profitPercent
  const investorPrePaybackPercent = 100 - armenPrePaybackPercent

  // Save values
  const saveValues = () => {
    const values = {
      ownershipPercent,
      ownershipAgreed,
      profitPercent,
      profitAgreed,
      investment,
      armenInvestment,
      armenPrePaybackPercent,
      prePaybackAgreed,
      deathConditionsAgreed,
      negativeProfitAgreed,
    }
    localStorage.setItem('caucasus-terms', JSON.stringify(values))
    setSaveStatus('saved')
    setTimeout(() => setSaveStatus('idle'), 2000)
  }

  // Reset values
  const resetValues = () => {
    localStorage.removeItem('caucasus-terms')
    setOwnershipPercent(DEFAULTS.ownershipPercent)
    setOwnershipAgreed(DEFAULTS.ownershipAgreed)
    setProfitPercent(DEFAULTS.profitPercent)
    setProfitAgreed(DEFAULTS.profitAgreed)
    setInvestment(DEFAULTS.investment)
    setArmenInvestment(DEFAULTS.armenInvestment)
    setArmenPrePaybackPercent(DEFAULTS.armenPrePaybackPercent)
    setPrePaybackAgreed(DEFAULTS.prePaybackAgreed)
    setDeathConditionsAgreed(DEFAULTS.deathConditionsAgreed)
    setNegativeProfitAgreed(DEFAULTS.negativeProfitAgreed)
  }

  return (
    <>
      {/* Header */}
      <header className="relative z-10 pt-12 pb-8 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Language toggle */}
          <button
            onClick={toggleLang}
            className="absolute top-4 right-4 md:top-6 md:right-6 px-3 py-1.5 rounded-lg bg-dark-800/50 border border-white/10 text-sm text-gray-400 hover:text-white hover:border-white/20 transition-all"
          >
            {lang === 'ru' ? '🇻🇳 Tiếng Việt' : '🇷🇺 Русский'}
          </button>
          <div className="inline-block mb-4">
            <span className="text-4xl">📋</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 animate-fade-in">
            {t.pageTitle}
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto animate-slide-up">
            {t.pageSubtitle}
          </p>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 px-6 pb-20">
        <div className="max-w-4xl mx-auto space-y-6">

          {/* Section 1: Ownership */}
          <div className={`glass rounded-2xl p-6 animate-slide-up stagger-1 transition-all duration-300 ${ownershipAgreed ? 'border-green-500/50' : ''}`}>
            <h2 className="font-display text-xl text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-gold-500/20 flex items-center justify-center text-gold-500 font-bold">
                1
              </span>
              <span className="flex-1">{t.ownershipTitle}</span>
              <button
                onClick={() => setOwnershipAgreed(!ownershipAgreed)}
                className={`w-7 h-7 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                  ownershipAgreed
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'border-gray-500 hover:border-gray-400'
                }`}
              >
                {ownershipAgreed && (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            </h2>
            <div className="space-y-6">
              <SliderInput
                label={t.ownershipLabel}
                value={ownershipPercent}
                onChange={setOwnershipPercent}
                min={0}
                max={100}
                unit="%"
                tooltip={t.ownershipTooltip}
              />
              <div className="flex justify-between items-center pt-4 border-t border-white/10">
                <div className="text-center flex-1">
                  <div className="text-2xl font-bold text-purple-400">{armenOwnership}%</div>
                  <div className="text-xs text-gray-500 mt-1">{t.armen}</div>
                </div>
                <div className="text-gray-600 text-2xl">/</div>
                <div className="text-center flex-1">
                  <div className="text-2xl font-bold text-gold-400">{ownershipPercent}%</div>
                  <div className="text-xs text-gray-500 mt-1">{t.vladNhung}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Profit distribution */}
          <div className={`glass rounded-2xl p-6 animate-slide-up stagger-2 transition-all duration-300 ${profitAgreed ? 'border-green-500/50' : ''}`}>
            <h2 className="font-display text-xl text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center text-green-400 font-bold">
                2
              </span>
              <span className="flex-1">{t.profitTitle}</span>
              <button
                onClick={() => setProfitAgreed(!profitAgreed)}
                className={`w-7 h-7 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                  profitAgreed
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'border-gray-500 hover:border-gray-400'
                }`}
              >
                {profitAgreed && (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            </h2>
            <div className="space-y-6">
              <SliderInput
                label={t.profitLabel}
                value={profitPercent}
                onChange={setProfitPercent}
                min={0}
                max={100}
                unit="%"
                tooltip={t.profitTooltip}
              />
              <div className="flex justify-between items-center pt-4 border-t border-white/10">
                <div className="text-center flex-1">
                  <div className="text-2xl font-bold text-purple-400">{armenProfit}%</div>
                  <div className="text-xs text-gray-500 mt-1">{t.armen}</div>
                </div>
                <div className="text-gray-600 text-2xl">/</div>
                <div className="text-center flex-1">
                  <div className="text-2xl font-bold text-gold-400">{profitPercent}%</div>
                  <div className="text-xs text-gray-500 mt-1">{t.vladNhung}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Pre-payback distribution */}
          <div className={`glass rounded-2xl p-6 animate-slide-up stagger-3 transition-all duration-300 ${prePaybackAgreed ? 'border-green-500/50' : ''}`}>
            <h2 className="font-display text-xl text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold">
                3
              </span>
              <span className="flex-1">{t.prePaybackTitle}</span>
              <button
                onClick={() => setPrePaybackAgreed(!prePaybackAgreed)}
                className={`w-7 h-7 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                  prePaybackAgreed
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'border-gray-500 hover:border-gray-400'
                }`}
              >
                {prePaybackAgreed && (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            </h2>
            <div className="space-y-6">
              <NumberInput
                label={t.investmentLabel}
                value={investment}
                onChange={setInvestment}
                min={0}
                max={1000000000}
                step={10000000}
              />
              <NumberInput
                label={t.armenInvestmentLabel}
                value={armenInvestment}
                onChange={setArmenInvestment}
                min={0}
                max={1000000000}
                step={10000000}
              />
              <SliderInput
                label={t.armenShareLabel}
                value={armenPrePaybackPercent}
                onChange={setArmenPrePaybackPercent}
                min={0}
                max={100}
                unit="%"
                tooltip={t.prePaybackTooltip}
              />
              <div className="flex justify-between items-center pt-4 border-t border-white/10">
                <div className="text-center flex-1">
                  <div className="text-2xl font-bold text-purple-400">{armenPrePaybackPercent}%</div>
                  <div className="text-xs text-gray-500 mt-1">{t.armen}</div>
                </div>
                <div className="text-gray-600 text-2xl">/</div>
                <div className="text-center flex-1">
                  <div className="text-2xl font-bold text-gold-400">{investorPrePaybackPercent}%</div>
                  <div className="text-xs text-gray-500 mt-1">{t.investorShareLabel}</div>
                </div>
              </div>
              <div className="space-y-1 text-center text-sm text-gray-500">
                <div>{t.vladNhung}: {investment.toLocaleString('ru-RU')} ₫</div>
                <div>{t.armen}: {armenInvestment.toLocaleString('ru-RU')} ₫</div>
                <div className="font-medium text-gray-400">
                  {t.totalInvestment}: {(investment + armenInvestment).toLocaleString('ru-RU')} ₫
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/10 text-center text-sm text-gray-400 italic">
                {t.newInvestmentsNote}
              </div>
            </div>
          </div>

          {/* Section 4: Death conditions */}
          <div className={`glass rounded-2xl p-6 animate-slide-up stagger-4 transition-all duration-300 ${deathConditionsAgreed ? 'border-green-500/50' : ''}`}>
            <h2 className="font-display text-xl text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center text-red-400 font-bold">
                4
              </span>
              <span className="flex-1">{t.deathTitle}</span>
              <button
                onClick={() => setDeathConditionsAgreed(!deathConditionsAgreed)}
                className={`w-7 h-7 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                  deathConditionsAgreed
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'border-gray-500 hover:border-gray-400'
                }`}
              >
                {deathConditionsAgreed && (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            </h2>
            <div className="space-y-3 p-4 rounded-lg border bg-dark-800/30 border-white/10">
              {t.deathConditions.map((condition, index) => (
                <p
                  key={index}
                  className={`text-sm ${
                    index === 0 ? 'text-gray-300' :
                    index === 1 ? 'text-gray-400 mt-4' :
                    'text-gray-400 pl-2'
                  }`}
                >
                  {condition}
                </p>
              ))}
            </div>
          </div>

          {/* Section 5: Negative profit */}
          <div className={`glass rounded-2xl p-6 animate-slide-up stagger-5 transition-all duration-300 ${negativeProfitAgreed ? 'border-green-500/50' : ''}`}>
            <h2 className="font-display text-xl text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold">
                5
              </span>
              <span className="flex-1">{t.negativeProfitTitle}</span>
              <button
                onClick={() => setNegativeProfitAgreed(!negativeProfitAgreed)}
                className={`w-7 h-7 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                  negativeProfitAgreed
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'border-gray-500 hover:border-gray-400'
                }`}
              >
                {negativeProfitAgreed && (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            </h2>
            <div className="space-y-3 p-4 rounded-lg border bg-dark-800/30 border-white/10">
              {t.negativeProfitConditions.map((condition, index) => (
                <p
                  key={index}
                  className={`text-sm ${
                    index === 0 ? 'text-gray-300' :
                    index === 1 ? 'text-gray-400 mt-4' :
                    'text-gray-400 pl-2'
                  }`}
                >
                  {condition}
                </p>
              ))}
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8 px-6">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
          <div className="flex gap-3">
            <button
              onClick={saveValues}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                saveStatus === 'saved'
                  ? 'bg-green-600 text-white'
                  : 'bg-gold-500 hover:bg-gold-400 text-dark-900'
              }`}
            >
              {saveStatus === 'saved' ? t.saved : t.saveSettings}
            </button>
            <button
              onClick={resetValues}
              className="px-6 py-2 rounded-lg font-medium transition-all duration-300 bg-gray-600 hover:bg-gray-500 text-white"
            >
              {t.resetSettings}
            </button>
          </div>
        </div>
      </footer>
    </>
  )
}
