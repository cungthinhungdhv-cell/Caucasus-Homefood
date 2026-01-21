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
    armenShareLabel: 'Доля прибыли Армена до окупаемости инвестиций',
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

    // Section 6: Exit from business
    exitTitle: 'Выход из бизнеса',
    exitConditions: [
      'Сторона, которая выходит из бизнеса, обязана уведомить другую сторону за 2 месяца до выхода.',
      'Вторая сторона имеет преимущественное право выкупа доли.',
      'Оценка стоимости доли — согласно пункту 9 (Оценка стоимости бизнеса).',
      'При уведомлении менее чем за 2 месяца:',
      '• Другая сторона получает право выкупа доли по цене как 38% от доли владения (вместо 50%).',
    ],

    // Section 7: Responsibilities
    responsibilitiesTitle: 'Распределение обязанностей',
    armenResponsibilities: [
      'Обучение персонала',
      'Контроль бизнеса на месте',
      'Приготовление заготовок',
      'Приём заказов',
      'Общение с клиентами',
    ],
    vladNhungResponsibilities: [
      'IT-поддержка',
      'Маркетинг',
      'Бизнес-стратегия',
      'Поиск сотрудников',
      'Поиск мест для аренды',
      'Работа с документами',
      'Поиск партнёров и поставщиков',
      'Работа с текущими партнёрами',
      'Оплата сотрудникам',
      'Оформление мед. страховки сотрудникам',
    ],

    // Section 8: Non-compete
    nonCompeteTitle: 'Запрет на индивидуальные рестораны',
    nonCompeteConditions: [
      'В течение 5 лет каждому из инвесторов запрещается открывать новый индивидуальный ресторан, чтобы сосредоточиться на развитии текущего бизнеса.',
      'Исключения:',
      '• Ресторан не кавказской кухни',
      '• Совместный ресторан тех же инвесторов (в том числе если будет новый добавочный инвестор)',
      '• Пункт можно нарушить за 250.000.000 ₫ в пользу другого инвестора',
    ],

    // Section 9: Business valuation
    valuationTitle: 'Оценка стоимости бизнеса',
    valuationFormula: 'Стоимость бизнеса = (Годовая чистая прибыль × 2) + Неокупившиеся вложения',
    valuationConditions: [
      'Годовая чистая прибыль — средняя за последние 12 месяцев.',
      'Неокупившиеся вложения — сумма инвестиций, которые ещё не вернулись инвестору.',
      'Стоимость доли = Стоимость бизнеса × % владения.',
    ],

    // Section 10: Business liquidation
    liquidationTitle: 'Закрытие бизнеса и продажа активов',
    liquidationConditions: [
      'Закрытие бизнеса требует согласия всех инвесторов.',
      'Порядок распределения средств от продажи активов (оборудование, инвентарь и т.д.):',
      '• Сначала — погашение всех долгов и обязательств',
      '• Затем — погашение неокупившихся инвестиций каждого инвестора',
      '• Остаток — делится пропорционально долям владения (50/50)',
      'Если средств не хватает — неокупившиеся инвестиции сгорают.',
      'Срок ликвидации — до 3 месяцев с момента решения.',
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
    armenShareLabel: 'Phần lợi nhuận của Armen trước khi hoàn vốn đầu tư',
    investorShareLabel: 'Vlad+Nhung',
    prePaybackTooltip: 'Trước khi hoàn vốn, Armen nhận phần nhỏ hơn, phần còn lại để hoàn vốn nhanh hơn cho nhà đầu tư.',
    totalInvestment: 'Tổng đầu tư',
    newInvestmentsNote: 'Các điều khoản này áp dụng cho các khoản đầu tư mới.',

    // Section 4: Death conditions
    deathTitle: 'Trường hợp nhà đầu tư qua đời (Armen hoặc Vlad+Nhung)',
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

    // Section 6: Exit from business
    exitTitle: 'Rút khỏi doanh nghiệp',
    exitConditions: [
      'Bên rút khỏi doanh nghiệp phải thông báo cho bên còn lại trước 2 tháng.',
      'Bên còn lại có quyền ưu tiên mua lại cổ phần.',
      'Giá trị cổ phần — theo điều 9 (Định giá doanh nghiệp).',
      'Nếu thông báo ít hơn 2 tháng:',
      '• Bên còn lại được quyền mua cổ phần với giá như 38% phần sở hữu (thay vì 50%).',
    ],

    // Section 7: Responsibilities
    responsibilitiesTitle: 'Phân chia trách nhiệm',
    armenResponsibilities: [
      'Đào tạo nhân viên',
      'Giám sát doanh nghiệp tại chỗ',
      'Chuẩn bị nguyên liệu',
      'Nhận đơn hàng',
      'Giao tiếp với khách hàng',
    ],
    vladNhungResponsibilities: [
      'Hỗ trợ IT',
      'Marketing',
      'Chiến lược kinh doanh',
      'Tìm kiếm nhân viên',
      'Tìm kiếm địa điểm thuê',
      'Làm việc với giấy tờ',
      'Tìm kiếm đối tác và nhà cung cấp',
      'Làm việc với đối tác hiện tại',
      'Trả lương cho nhân viên',
      'Làm bảo hiểm y tế cho nhân viên',
    ],

    // Section 8: Non-compete
    nonCompeteTitle: 'Cấm mở nhà hàng cá nhân',
    nonCompeteConditions: [
      'Trong vòng 5 năm, mỗi nhà đầu tư bị cấm mở nhà hàng cá nhân mới để tập trung phát triển doanh nghiệp hiện tại.',
      'Ngoại lệ:',
      '• Nhà hàng không phải ẩm thực Kavkaz',
      '• Nhà hàng chung của các nhà đầu tư hiện tại (kể cả nếu có thêm nhà đầu tư mới)',
      '• Có thể vi phạm điều khoản với 250.000.000 ₫ cho nhà đầu tư còn lại',
    ],

    // Section 9: Business valuation
    valuationTitle: 'Định giá doanh nghiệp',
    valuationFormula: 'Giá trị DN = (Lợi nhuận ròng năm × 2) + Vốn đầu tư chưa hoàn',
    valuationConditions: [
      'Lợi nhuận ròng năm — trung bình 12 tháng gần nhất.',
      'Vốn đầu tư chưa hoàn — số tiền đầu tư chưa được hoàn lại cho nhà đầu tư.',
      'Giá trị cổ phần = Giá trị doanh nghiệp × % sở hữu.',
    ],

    // Section 10: Business liquidation
    liquidationTitle: 'Đóng cửa doanh nghiệp và bán tài sản',
    liquidationConditions: [
      'Đóng cửa doanh nghiệp cần sự đồng ý của tất cả nhà đầu tư.',
      'Thứ tự phân chia tiền từ bán tài sản (thiết bị, hàng tồn kho, v.v.):',
      '• Đầu tiên — thanh toán tất cả nợ và nghĩa vụ',
      '• Sau đó — hoàn trả vốn đầu tư chưa hoàn cho mỗi nhà đầu tư',
      '• Phần còn lại — chia theo tỷ lệ sở hữu (50/50)',
      'Nếu không đủ tiền — vốn đầu tư chưa hoàn sẽ mất.',
      'Thời hạn thanh lý — tối đa 3 tháng từ ngày quyết định.',
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
  armenPrePaybackPercent: 10,
  prePaybackAgreed: false,
  deathConditionsAgreed: false,
  negativeProfitAgreed: false,
  exitAgreed: false,
  responsibilitiesAgreed: false,
  nonCompeteAgreed: false,
  valuationAgreed: false,
  liquidationAgreed: false,
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
  const [exitAgreed, setExitAgreed] = useState(() =>
    getSavedTermsValue('exitAgreed', DEFAULTS.exitAgreed)
  )
  const [responsibilitiesAgreed, setResponsibilitiesAgreed] = useState(() =>
    getSavedTermsValue('responsibilitiesAgreed', DEFAULTS.responsibilitiesAgreed)
  )
  const [nonCompeteAgreed, setNonCompeteAgreed] = useState(() =>
    getSavedTermsValue('nonCompeteAgreed', DEFAULTS.nonCompeteAgreed)
  )
  const [valuationAgreed, setValuationAgreed] = useState(() =>
    getSavedTermsValue('valuationAgreed', DEFAULTS.valuationAgreed)
  )
  const [liquidationAgreed, setLiquidationAgreed] = useState(() =>
    getSavedTermsValue('liquidationAgreed', DEFAULTS.liquidationAgreed)
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
      exitAgreed,
      responsibilitiesAgreed,
      nonCompeteAgreed,
      valuationAgreed,
      liquidationAgreed,
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
    setExitAgreed(DEFAULTS.exitAgreed)
    setResponsibilitiesAgreed(DEFAULTS.responsibilitiesAgreed)
    setNonCompeteAgreed(DEFAULTS.nonCompeteAgreed)
    setValuationAgreed(DEFAULTS.valuationAgreed)
    setLiquidationAgreed(DEFAULTS.liquidationAgreed)
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

          {/* Section 6: Exit from business */}
          <div className={`glass rounded-2xl p-6 animate-slide-up stagger-6 transition-all duration-300 ${exitAgreed ? 'border-green-500/50' : ''}`}>
            <h2 className="font-display text-xl text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold">
                6
              </span>
              <span className="flex-1">{t.exitTitle}</span>
              <button
                onClick={() => setExitAgreed(!exitAgreed)}
                className={`w-7 h-7 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                  exitAgreed
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'border-gray-500 hover:border-gray-400'
                }`}
              >
                {exitAgreed && (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            </h2>
            <div className="space-y-3 p-4 rounded-lg border bg-dark-800/30 border-white/10">
              {t.exitConditions.map((condition, index) => (
                <p key={index} className="text-sm text-gray-300">
                  {condition}
                </p>
              ))}
            </div>
          </div>

          {/* Section 7: Responsibilities */}
          <div className={`glass rounded-2xl p-6 animate-slide-up stagger-7 transition-all duration-300 ${responsibilitiesAgreed ? 'border-green-500/50' : ''}`}>
            <h2 className="font-display text-xl text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center text-pink-400 font-bold">
                7
              </span>
              <span className="flex-1">{t.responsibilitiesTitle}</span>
              <button
                onClick={() => setResponsibilitiesAgreed(!responsibilitiesAgreed)}
                className={`w-7 h-7 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                  responsibilitiesAgreed
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'border-gray-500 hover:border-gray-400'
                }`}
              >
                {responsibilitiesAgreed && (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border bg-dark-800/30 border-white/10">
                <h3 className="text-purple-400 font-medium mb-3">{t.armen}</h3>
                <ul className="space-y-2">
                  {t.armenResponsibilities.map((item, index) => (
                    <li key={index} className="text-sm text-gray-300 flex items-start gap-2">
                      <span className="text-purple-400 mt-0.5">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-lg border bg-dark-800/30 border-white/10">
                <h3 className="text-gold-400 font-medium mb-3">{t.vladNhung}</h3>
                <ul className="space-y-2">
                  {t.vladNhungResponsibilities.map((item, index) => (
                    <li key={index} className="text-sm text-gray-300 flex items-start gap-2">
                      <span className="text-gold-400 mt-0.5">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Section 8: Non-compete */}
          <div className={`glass rounded-2xl p-6 animate-slide-up stagger-8 transition-all duration-300 ${nonCompeteAgreed ? 'border-green-500/50' : ''}`}>
            <h2 className="font-display text-xl text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold">
                8
              </span>
              <span className="flex-1">{t.nonCompeteTitle}</span>
              <button
                onClick={() => setNonCompeteAgreed(!nonCompeteAgreed)}
                className={`w-7 h-7 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                  nonCompeteAgreed
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'border-gray-500 hover:border-gray-400'
                }`}
              >
                {nonCompeteAgreed && (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            </h2>
            <div className="space-y-3 p-4 rounded-lg border bg-dark-800/30 border-white/10">
              {t.nonCompeteConditions.map((condition, index) => (
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

          {/* Section 9: Business valuation */}
          <div className={`glass rounded-2xl p-6 animate-slide-up stagger-9 transition-all duration-300 ${valuationAgreed ? 'border-green-500/50' : ''}`}>
            <h2 className="font-display text-xl text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
                9
              </span>
              <span className="flex-1">{t.valuationTitle}</span>
              <button
                onClick={() => setValuationAgreed(!valuationAgreed)}
                className={`w-7 h-7 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                  valuationAgreed
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'border-gray-500 hover:border-gray-400'
                }`}
              >
                {valuationAgreed && (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            </h2>
            <div className="space-y-4 p-4 rounded-lg border bg-dark-800/30 border-white/10">
              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                <p className="text-emerald-400 font-mono text-sm text-center">{t.valuationFormula}</p>
              </div>
              {t.valuationConditions.map((condition, index) => (
                <p key={index} className="text-sm text-gray-300 flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">•</span>
                  {condition}
                </p>
              ))}
            </div>
          </div>

          {/* Section 10: Business liquidation */}
          <div className={`glass rounded-2xl p-6 animate-slide-up stagger-10 transition-all duration-300 ${liquidationAgreed ? 'border-green-500/50' : ''}`}>
            <h2 className="font-display text-xl text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-slate-500/20 flex items-center justify-center text-slate-400 font-bold text-sm">
                10
              </span>
              <span className="flex-1">{t.liquidationTitle}</span>
              <button
                onClick={() => setLiquidationAgreed(!liquidationAgreed)}
                className={`w-7 h-7 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                  liquidationAgreed
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'border-gray-500 hover:border-gray-400'
                }`}
              >
                {liquidationAgreed && (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            </h2>
            <div className="space-y-3 p-4 rounded-lg border bg-dark-800/30 border-white/10">
              {t.liquidationConditions.map((condition, index) => (
                <p
                  key={index}
                  className={`text-sm ${
                    index === 0 ? 'text-gray-300' :
                    index === 1 ? 'text-gray-400 mt-4' :
                    index === t.liquidationConditions.length - 1 ? 'text-gray-300 mt-4' :
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
