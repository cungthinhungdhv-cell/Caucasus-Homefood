import { useState, useMemo, useEffect } from 'react'

// Types
type Lang = 'ru' | 'vi'

interface ForecastItem {
  month: number
  revenue: number
  expenses: number
  netProfit: number
  investorShare: number
  cumulative: number
}

interface CalculatorProps {
  lang: Lang
  toggleLang: () => void
}

// Translations
const translations = {
  ru: {
    // Header
    appTitle: 'Финансовая модель',
    subtitle: 'Caucasus Homefood — Ваш кавказский дом во Вьетнаме',
    investorMonthlyIncome: 'Доход инвестора в месяц',
    yearlyPotential: 'Годовой потенциал',

    // Staff section
    staffTitle: 'Персонал',
    workers: 'Количество работников',
    hourlyRate: 'Ставка в час',
    hoursPerDay: 'Часов в день',
    workDaysPerWeek: 'Рабочих дней в неделю',
    accountant: 'Бухгалтер',
    managerSalary: 'Зарплата управляющего (Армен)',
    investorsSalary: 'Зарплата инвесторов (Влад+Ньунг)',

    // Operational section
    operationalTitle: 'Операционные расходы',
    rent: 'Аренда',
    marketing: 'Маркетинг',
    utilities: 'Коммунальные платежи',
    claudeAi: 'Claude AI',
    contingency: 'Непредвиденные расходы',

    // Tax section
    taxTitle: 'Налоги',
    vat: 'НДС',
    incomeTax: 'Налог на доходы',

    // Business section
    businessTitle: 'Параметры бизнеса',
    dailyRevenue: 'Средний приход в день (грязными)',
    grabBonus: 'Профит от Grab доставки',
    nhungChannelBonus: 'Реклама в канале Ньунг',
    priceIncrease: 'Повышение цен меню',
    ingredientOptimization: 'Сокращение расходов на сырьё',
    ingredientPercent: 'Текущий % сырья от выручки',
    monthlyGrowth: 'Рост выручки в месяц',

    // Results
    expenseBreakdown: 'Структура расходов',
    staffExpenses: 'ФОТ работников',
    staffExpensesTooltip: 'Зарплата работников = кол-во × ставка/час × часы × дни × 4.33 недели',
    managementExpenses: 'ФОТ управление',
    managementExpensesTooltip: 'Бухгалтер + Зарплата Армена + Зарплата Влад+Ньунг',
    operationalExpenses: 'Операционные',
    operationalExpensesTooltip: 'Аренда + Маркетинг + Коммунальные + Claude AI + Непредвиденные',
    ingredientExpenses: 'Сырьё',
    ingredientExpensesTooltip: 'Выручка × % сырья × (1 − оптимизация)',
    totalExpenses: 'Итого расходов',

    // Profit
    profitTitle: 'Прибыль и налоги',
    revenueWithPriceIncrease: 'Выручка (с ростом цен)',
    grossProfit: 'Валовая прибыль',
    vatAmount: 'НДС',
    incomeTaxAmount: 'Налог на прибыль',
    netProfit: 'Чистая прибыль',
    grossMargin: 'Валовая маржа',
    grossMarginTooltip: 'Процент прибыли от выручки ДО вычета налогов. Показывает эффективность операционной деятельности.',
    netMargin: 'Чистая маржа',
    netMarginTooltip: 'Процент прибыли от выручки ПОСЛЕ всех налогов. Показывает реальную доходность бизнеса.',
    investorShare: 'Доля инвестора (50%)',

    // ROI
    roiTitle: 'Окупаемость инвестиций',
    totalInvestment: 'Общие инвестиции',
    sharePurchase: 'Покупка доли 50%',
    rentDeposit: 'Депозит аренды',
    equipment: 'Оборудование',
    paybackPeriod: 'Срок окупаемости',
    months: 'мес.',
    annualRoi: 'Годовой ROI',

    // Forecast
    forecastTitle: 'Прогноз на 12 месяцев с учётом роста',
    month: 'Мес.',
    revenue: 'Выручка',
    profit: 'Прибыль',
    cumulative: 'Накопит.',
    paybackReached: 'Точка окупаемости!',

    // Footer
    saveSettings: 'Сохранить',
    saved: 'Сохранено!',
    resetSettings: 'Сбросить',
    disclaimer: 'Все расчёты приблизительные и зависят от рыночных условий',

    // Units
    perHour: '/час',
    perMonth: '/мес',
    usdPerYear: 'USD в год',
    rate: 'Курс:',
    loading: 'загрузка...',
    actual: 'актуальный',
    offline: 'оффлайн',
  },
  vi: {
    // Header
    appTitle: 'Mô hình tài chính',
    subtitle: 'Caucasus Homefood — Ngôi nhà Kavkaz của bạn tại Việt Nam',
    investorMonthlyIncome: 'Thu nhập nhà đầu tư/tháng',
    yearlyPotential: 'Tiềm năng hàng năm',

    // Staff section
    staffTitle: 'Nhân sự',
    workers: 'Số lượng nhân viên',
    hourlyRate: 'Lương theo giờ',
    hoursPerDay: 'Giờ làm/ngày',
    workDaysPerWeek: 'Ngày làm/tuần',
    accountant: 'Kế toán',
    managerSalary: 'Lương quản lý (Armen)',
    investorsSalary: 'Lương nhà đầu tư (Vlad+Nhung)',

    // Operational section
    operationalTitle: 'Chi phí vận hành',
    rent: 'Thuê mặt bằng',
    marketing: 'Marketing',
    utilities: 'Điện nước',
    claudeAi: 'Claude AI',
    contingency: 'Chi phí phát sinh',

    // Tax section
    taxTitle: 'Thuế',
    vat: 'VAT',
    incomeTax: 'Thuế thu nhập',

    // Business section
    businessTitle: 'Thông số kinh doanh',
    dailyRevenue: 'Doanh thu TB/ngày',
    grabBonus: 'Lợi nhuận từ Grab',
    nhungChannelBonus: 'QC kênh Nhung',
    priceIncrease: 'Tăng giá menu',
    ingredientOptimization: 'Giảm chi phí nguyên liệu',
    ingredientPercent: '% nguyên liệu/doanh thu',
    monthlyGrowth: 'Tăng trưởng/tháng',

    // Results
    expenseBreakdown: 'Cơ cấu chi phí',
    staffExpenses: 'Lương nhân viên',
    staffExpensesTooltip: 'Lương NV = số lượng × lương/giờ × giờ × ngày × 4.33 tuần',
    managementExpenses: 'Lương quản lý',
    managementExpensesTooltip: 'Kế toán + Lương Armen + Lương Vlad+Nhung',
    operationalExpenses: 'Vận hành',
    operationalExpensesTooltip: 'Thuê + Marketing + Điện nước + Claude AI + Chi phí phát sinh',
    ingredientExpenses: 'Nguyên liệu',
    ingredientExpensesTooltip: 'Doanh thu × % nguyên liệu × (1 − tối ưu hóa)',
    totalExpenses: 'Tổng chi phí',

    // Profit
    profitTitle: 'Lợi nhuận và thuế',
    revenueWithPriceIncrease: 'Doanh thu (sau tăng giá)',
    grossProfit: 'Lợi nhuận gộp',
    vatAmount: 'VAT',
    incomeTaxAmount: 'Thuế thu nhập',
    netProfit: 'Lợi nhuận ròng',
    grossMargin: 'Biên lợi nhuận gộp',
    grossMarginTooltip: 'Phần trăm lợi nhuận từ doanh thu TRƯỚC thuế. Cho thấy hiệu quả hoạt động.',
    netMargin: 'Biên lợi nhuận ròng',
    netMarginTooltip: 'Phần trăm lợi nhuận từ doanh thu SAU tất cả thuế. Cho thấy lợi nhuận thực tế.',
    investorShare: 'Phần NĐT (50%)',

    // ROI
    roiTitle: 'Hoàn vốn đầu tư',
    totalInvestment: 'Tổng đầu tư',
    sharePurchase: 'Mua 50% cổ phần',
    rentDeposit: 'Đặt cọc thuê',
    equipment: 'Thiết bị',
    paybackPeriod: 'Thời gian hoàn vốn',
    months: 'tháng',
    annualRoi: 'ROI hàng năm',

    // Forecast
    forecastTitle: 'Dự báo 12 tháng',
    month: 'Tháng',
    revenue: 'Doanh thu',
    profit: 'Lợi nhuận',
    cumulative: 'Tích lũy',
    paybackReached: 'Điểm hoàn vốn!',

    // Footer
    saveSettings: 'Lưu',
    saved: 'Đã lưu!',
    resetSettings: 'Đặt lại',
    disclaimer: 'Tất cả tính toán là ước tính và phụ thuộc vào điều kiện thị trường',

    // Units
    perHour: '/giờ',
    perMonth: '/tháng',
    usdPerYear: 'USD/năm',
    rate: 'Tỷ giá:',
    loading: 'đang tải...',
    actual: 'cập nhật',
    offline: 'ngoại tuyến',
  },
}

// Investment constants
const INVESTMENTS = {
  sharePurchase: 120000000,
  rentDeposit: 150000000,
  equipment: 50000000,
  total: 320000000,
}

// Default values
const DEFAULTS = {
  // Staff
  workers: 4,
  hourlyRate: 40000,
  hoursPerDay: 10,
  workDaysPerWeek: 6,
  accountantSalary: 10000000,
  armenSalary: 15000000,
  investorsSalary: 15000000,
  // Operational
  rent: 20000000,
  marketing: 5000000,
  utilities: 5000000,
  claudeAi: 1313000,
  contingency: 4000000,
  // Taxes
  vat: 7,
  incomeTax: 15,
  // Business
  dailyRevenue: 6000000, // 6M грязными в день
  grabBonus: 0, // % прибавки от Grab
  nhungChannelBonus: 0, // % прибавки от канала Ньунг
  priceIncrease: 30,
  ingredientOptimization: 20,
  ingredientPercent: 50,
  monthlyGrowth: 15,
}

// Animated counter component
function AnimatedNumber({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const duration = 800
    const startTime = Date.now()
    const startValue = displayValue

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const current = startValue + (value - startValue) * easeOut

      setDisplayValue(current)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [value])

  return (
    <span className="font-mono tabular-nums">
      {prefix}{Math.round(displayValue).toLocaleString('ru-RU')}{suffix}
    </span>
  )
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
}: {
  label: string
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step?: number
  unit?: string
  formatValue?: (value: number) => string
}) {
  const displayValue = formatValue ? formatValue(value) : `${value.toLocaleString('ru-RU')}${unit}`

  return (
    <div className="group">
      <div className="flex justify-between items-center mb-3">
        <label className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
          {label}
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

// Income breakdown bar
function IncomeBar({ label, value, maxValue, color, tooltip }: { label: string; value: number; maxValue: number; color: string; tooltip?: string }) {
  const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-400 flex items-center gap-1">
          {label}
          {tooltip && (
            <span
              className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-gray-700 text-gray-400 text-xs cursor-help hover:bg-gray-600 hover:text-white transition-colors"
              title={tooltip}
            >
              ?
            </span>
          )}
        </span>
        <span className="font-mono text-white font-medium text-sm">
          <AnimatedNumber value={value} suffix=" ₫" />
        </span>
      </div>
      <div className="progress-bar h-3">
        <div
          className="progress-fill"
          style={{
            width: `${percentage}%`,
            background: color,
          }}
        />
      </div>
    </div>
  )
}

// Load saved values from localStorage
const getSavedValue = <T,>(key: string, defaultValue: T): T => {
  try {
    const saved = localStorage.getItem('caucasus-calculator')
    if (saved) {
      const parsed = JSON.parse(saved)
      return parsed[key] ?? defaultValue
    }
  } catch {}
  return defaultValue
}

// Main calculator component
export default function Calculator({ lang, toggleLang }: CalculatorProps) {
  const t = translations[lang]

  // Staff state
  const [workers, setWorkers] = useState(() => getSavedValue('workers', DEFAULTS.workers))
  const [hourlyRate, setHourlyRate] = useState(() => getSavedValue('hourlyRate', DEFAULTS.hourlyRate))
  const [hoursPerDay, setHoursPerDay] = useState(() => getSavedValue('hoursPerDay', DEFAULTS.hoursPerDay))
  const [workDaysPerWeek, setWorkDaysPerWeek] = useState(() => getSavedValue('workDaysPerWeek', DEFAULTS.workDaysPerWeek))
  const [accountantSalary, setAccountantSalary] = useState(() => getSavedValue('accountantSalary', DEFAULTS.accountantSalary))
  const [armenSalary, setArmenSalary] = useState(() => getSavedValue('armenSalary', DEFAULTS.armenSalary))
  const [investorsSalary, setInvestorsSalary] = useState(() => getSavedValue('investorsSalary', DEFAULTS.investorsSalary))

  // Operational state
  const [rent, setRent] = useState(() => getSavedValue('rent', DEFAULTS.rent))
  const [marketing, setMarketing] = useState(() => getSavedValue('marketing', DEFAULTS.marketing))
  const [utilities, setUtilities] = useState(() => getSavedValue('utilities', DEFAULTS.utilities))
  const [claudeAi, setClaudeAi] = useState(() => getSavedValue('claudeAi', DEFAULTS.claudeAi))
  const [contingency, setContingency] = useState(() => getSavedValue('contingency', DEFAULTS.contingency))

  // Tax state
  const [vat, setVat] = useState(() => getSavedValue('vat', DEFAULTS.vat))
  const [incomeTax, setIncomeTax] = useState(() => getSavedValue('incomeTax', DEFAULTS.incomeTax))

  // Business state
  const [dailyRevenue, setDailyRevenue] = useState(() => getSavedValue('dailyRevenue', DEFAULTS.dailyRevenue))
  const [grabBonus, setGrabBonus] = useState(() => getSavedValue('grabBonus', DEFAULTS.grabBonus))
  const [nhungChannelBonus, setNhungChannelBonus] = useState(() => getSavedValue('nhungChannelBonus', DEFAULTS.nhungChannelBonus))
  const [priceIncrease, setPriceIncrease] = useState(() => getSavedValue('priceIncrease', DEFAULTS.priceIncrease))
  const [ingredientOptimization, setIngredientOptimization] = useState(() => getSavedValue('ingredientOptimization', DEFAULTS.ingredientOptimization))
  const [ingredientPercent, setIngredientPercent] = useState(() => getSavedValue('ingredientPercent', DEFAULTS.ingredientPercent))
  const [monthlyGrowth, setMonthlyGrowth] = useState(() => getSavedValue('monthlyGrowth', DEFAULTS.monthlyGrowth))

  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved'>('idle')

  // Exchange rate state
  const FALLBACK_RATE = 25500
  const [exchangeRate, setExchangeRate] = useState(FALLBACK_RATE)
  const [rateSource, setRateSource] = useState<'loading' | 'api' | 'fallback'>('loading')

  // Fetch exchange rate on mount
  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch('https://open.er-api.com/v6/latest/USD')
        if (response.ok) {
          const data = await response.json()
          setExchangeRate(data.rates.VND)
          setRateSource('api')
        } else {
          setRateSource('fallback')
        }
      } catch {
        setRateSource('fallback')
      }
    }
    fetchExchangeRate()
  }, [])

  // Save values
  const saveValues = () => {
    const values = {
      workers, hourlyRate, hoursPerDay, workDaysPerWeek,
      accountantSalary, armenSalary, investorsSalary,
      rent, marketing, utilities, claudeAi, contingency,
      vat, incomeTax,
      dailyRevenue, grabBonus, nhungChannelBonus, priceIncrease, ingredientOptimization, ingredientPercent, monthlyGrowth,
    }
    localStorage.setItem('caucasus-calculator', JSON.stringify(values))
    setSaveStatus('saved')
    setTimeout(() => setSaveStatus('idle'), 2000)
  }

  // Reset values
  const resetValues = () => {
    localStorage.removeItem('caucasus-calculator')
    setWorkers(DEFAULTS.workers)
    setHourlyRate(DEFAULTS.hourlyRate)
    setHoursPerDay(DEFAULTS.hoursPerDay)
    setWorkDaysPerWeek(DEFAULTS.workDaysPerWeek)
    setAccountantSalary(DEFAULTS.accountantSalary)
    setArmenSalary(DEFAULTS.armenSalary)
    setInvestorsSalary(DEFAULTS.investorsSalary)
    setRent(DEFAULTS.rent)
    setMarketing(DEFAULTS.marketing)
    setUtilities(DEFAULTS.utilities)
    setClaudeAi(DEFAULTS.claudeAi)
    setContingency(DEFAULTS.contingency)
    setVat(DEFAULTS.vat)
    setIncomeTax(DEFAULTS.incomeTax)
    setDailyRevenue(DEFAULTS.dailyRevenue)
    setGrabBonus(DEFAULTS.grabBonus)
    setNhungChannelBonus(DEFAULTS.nhungChannelBonus)
    setPriceIncrease(DEFAULTS.priceIncrease)
    setIngredientOptimization(DEFAULTS.ingredientOptimization)
    setIngredientPercent(DEFAULTS.ingredientPercent)
    setMonthlyGrowth(DEFAULTS.monthlyGrowth)
  }

  // Calculate all derived values
  const calculations = useMemo(() => {
    const weeksPerMonth = 4.33

    // Staff payroll
    const staffPayroll = workers * hourlyRate * hoursPerDay * workDaysPerWeek * weeksPerMonth

    // Management payroll
    const managementPayroll = accountantSalary + armenSalary + investorsSalary

    // Operational costs
    const operationalTotal = rent + marketing + utilities + claudeAi + contingency

    // Monthly revenue = daily revenue × work days × weeks × hours multiplier × bonuses
    // dailyRevenue is base revenue for 10-hour day, scales with hours
    const hoursMultiplier = hoursPerDay / 10
    const actualDailyRevenue = dailyRevenue * hoursMultiplier
    const monthlyRevenue = actualDailyRevenue * workDaysPerWeek * weeksPerMonth
    const adjustedRevenue = monthlyRevenue * (1 + priceIncrease / 100) * (1 + grabBonus / 100) * (1 + nhungChannelBonus / 100)

    // Ingredient costs with optimization
    const ingredientCost = adjustedRevenue * (ingredientPercent / 100) * (1 - ingredientOptimization / 100)

    // Total expenses
    const totalExpenses = staffPayroll + managementPayroll + operationalTotal + ingredientCost

    // Gross profit
    const grossProfit = adjustedRevenue - totalExpenses

    // Taxes
    const vatAmount = adjustedRevenue * (vat / 100)
    const incomeTaxAmount = Math.max(0, grossProfit * (incomeTax / 100))
    const totalTaxes = vatAmount + incomeTaxAmount

    // Net profit
    const netProfit = grossProfit - totalTaxes

    // Investor share (50%)
    const investorShare = netProfit / 2

    // Margins
    const grossMargin = adjustedRevenue > 0 ? (grossProfit / adjustedRevenue) * 100 : 0
    const netMargin = adjustedRevenue > 0 ? (netProfit / adjustedRevenue) * 100 : 0

    // ROI calculations
    const paybackMonths = investorShare > 0 ? INVESTMENTS.total / investorShare : Infinity
    const annualRoi = investorShare > 0 ? (investorShare * 12 / INVESTMENTS.total) * 100 : 0

    // 12-month forecast with decaying growth
    const forecast: ForecastItem[] = []
    let cumulativeProfit = 0

    for (let month = 0; month < 12; month++) {
      // Growth rate decays by 1% each month, minimum 2%
      const decayedGrowthRate = Math.max(2, monthlyGrowth - month * 1)
      const growthMultiplier = Math.pow(1 + decayedGrowthRate / 100, month)
      const monthRevenue = adjustedRevenue * growthMultiplier

      // Recalculate for this month's revenue
      const monthIngredients = monthRevenue * (ingredientPercent / 100) * (1 - ingredientOptimization / 100)
      const monthExpenses = staffPayroll + managementPayroll + operationalTotal + monthIngredients
      const monthGrossProfit = monthRevenue - monthExpenses
      const monthVat = monthRevenue * (vat / 100)
      const monthIncomeTax = Math.max(0, monthGrossProfit * (incomeTax / 100))
      const monthNetProfit = monthGrossProfit - monthVat - monthIncomeTax
      const monthInvestorShare = monthNetProfit / 2

      cumulativeProfit += monthInvestorShare

      forecast.push({
        month: month + 1,
        revenue: monthRevenue,
        expenses: monthExpenses,
        netProfit: monthNetProfit,
        investorShare: monthInvestorShare,
        cumulative: cumulativeProfit,
      })
    }

    return {
      staffPayroll,
      managementPayroll,
      operationalTotal,
      ingredientCost,
      totalExpenses,
      adjustedRevenue,
      grossProfit,
      vatAmount,
      incomeTaxAmount,
      totalTaxes,
      netProfit,
      grossMargin,
      netMargin,
      investorShare,
      paybackMonths,
      annualRoi,
      forecast,
    }
  }, [
    workers, hourlyRate, hoursPerDay, workDaysPerWeek,
    accountantSalary, armenSalary, investorsSalary,
    rent, marketing, utilities, claudeAi, contingency,
    vat, incomeTax,
    dailyRevenue, grabBonus, nhungChannelBonus, priceIncrease, ingredientOptimization, ingredientPercent, monthlyGrowth,
  ])

  // Find payback month
  const paybackMonth = calculations.forecast.findIndex(f => f.cumulative >= INVESTMENTS.total) + 1

  return (
    <>
      {/* Header */}
      <header className="relative z-10 pt-12 pb-8 px-6">
        <div className="max-w-6xl mx-auto text-center">
          {/* Language toggle */}
          <button
            onClick={toggleLang}
            className="absolute top-4 right-4 md:top-6 md:right-6 px-3 py-1.5 rounded-lg bg-dark-800/50 border border-white/10 text-sm text-gray-400 hover:text-white hover:border-white/20 transition-all"
          >
            {lang === 'ru' ? '🇻🇳 Tiếng Việt' : '🇷🇺 Русский'}
          </button>
          <div className="inline-block mb-4">
            <span className="text-xs uppercase tracking-[0.3em] text-gold-500 font-medium">
              {t.appTitle}
            </span>
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-white mb-4 animate-fade-in">
            Caucasus Homefood
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto animate-slide-up">
            {t.subtitle}
          </p>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 px-6 pb-20">
        <div className="max-w-6xl mx-auto">

          {/* Hero income display */}
          <div className="glass rounded-3xl p-8 md:p-12 mb-8 gold-glow animate-slide-up stagger-1">
            <div className="text-center">
              <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">{t.investorMonthlyIncome}</p>
              <div className={`font-display text-3xl sm:text-5xl md:text-7xl font-bold mb-4 ${calculations.investorShare >= 0 ? 'text-transparent bg-clip-text bg-gold-gradient' : 'text-red-400'}`}>
                <AnimatedNumber value={calculations.investorShare} suffix=" ₫" />
              </div>
              <div className="text-gold-500 text-sm">
                {calculations.investorShare >= 0 ? (
                  <span>≈ ${Math.round(calculations.investorShare / exchangeRate).toLocaleString('ru-RU')} {t.perMonth}</span>
                ) : (
                  <span className="text-red-400">Убыток</span>
                )}
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/10 text-center">
              <p className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-gold-400">
                <AnimatedNumber value={calculations.investorShare * 12} suffix=" ₫" />
              </p>
              <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">{t.yearlyPotential}</p>
              <p className="text-xs text-gray-600 mt-2">
                ≈ ${Math.round(calculations.investorShare * 12 / exchangeRate).toLocaleString('ru-RU')} {t.usdPerYear}
                <span className="ml-2">
                  ({t.rate} 1 USD = {exchangeRate.toLocaleString('ru-RU')} ₫
                  {rateSource === 'loading' && ` - ${t.loading}`}
                  {rateSource === 'api' && ` - ${t.actual}`}
                  {rateSource === 'fallback' && ` - ${t.offline}`})
                </span>
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">

            {/* Parameters panel */}
            <div className="space-y-6 animate-slide-up stagger-2">

              {/* Staff */}
              <div className="glass rounded-2xl p-6">
                <h2 className="font-display text-xl text-white mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-gold-500/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </span>
                  {t.staffTitle}
                </h2>
                <div className="space-y-6">
                  <SliderInput
                    label={t.workers}
                    value={workers}
                    onChange={setWorkers}
                    min={1}
                    max={10}
                  />
                  <SliderInput
                    label={t.hourlyRate}
                    value={hourlyRate}
                    onChange={setHourlyRate}
                    min={20000}
                    max={100000}
                    step={5000}
                    formatValue={(v) => `${(v / 1000).toFixed(0)}k ₫${t.perHour}`}
                  />
                  <SliderInput
                    label={t.hoursPerDay}
                    value={hoursPerDay}
                    onChange={setHoursPerDay}
                    min={6}
                    max={14}
                  />
                  <SliderInput
                    label={t.workDaysPerWeek}
                    value={workDaysPerWeek}
                    onChange={setWorkDaysPerWeek}
                    min={5}
                    max={7}
                  />
                  <SliderInput
                    label={t.accountant}
                    value={accountantSalary}
                    onChange={setAccountantSalary}
                    min={5000000}
                    max={20000000}
                    step={1000000}
                    formatValue={(v) => `${(v / 1000000).toFixed(0)}M ₫`}
                  />
                  <SliderInput
                    label={t.managerSalary}
                    value={armenSalary}
                    onChange={setArmenSalary}
                    min={10000000}
                    max={30000000}
                    step={1000000}
                    formatValue={(v) => `${(v / 1000000).toFixed(0)}M ₫`}
                  />
                  <SliderInput
                    label={t.investorsSalary}
                    value={investorsSalary}
                    onChange={setInvestorsSalary}
                    min={0}
                    max={30000000}
                    step={1000000}
                    formatValue={(v) => `${(v / 1000000).toFixed(0)}M ₫`}
                  />
                </div>
              </div>

              {/* Operational */}
              <div className="glass rounded-2xl p-6">
                <h2 className="font-display text-xl text-white mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </span>
                  {t.operationalTitle}
                </h2>
                <div className="space-y-6">
                  <SliderInput
                    label={t.rent}
                    value={rent}
                    onChange={setRent}
                    min={8000000}
                    max={40000000}
                    step={1000000}
                    formatValue={(v) => `${(v / 1000000).toFixed(0)}M ₫`}
                  />
                  <SliderInput
                    label={t.marketing}
                    value={marketing}
                    onChange={setMarketing}
                    min={0}
                    max={15000000}
                    step={1000000}
                    formatValue={(v) => `${(v / 1000000).toFixed(0)}M ₫`}
                  />
                  <SliderInput
                    label={t.utilities}
                    value={utilities}
                    onChange={setUtilities}
                    min={2000000}
                    max={15000000}
                    step={1000000}
                    formatValue={(v) => `${(v / 1000000).toFixed(0)}M ₫`}
                  />
                  <SliderInput
                    label={t.claudeAi}
                    value={claudeAi}
                    onChange={setClaudeAi}
                    min={0}
                    max={5000000}
                    step={100000}
                    formatValue={(v) => `${(v / 1000000).toFixed(2)}M ₫`}
                  />
                  <SliderInput
                    label={t.contingency}
                    value={contingency}
                    onChange={setContingency}
                    min={0}
                    max={10000000}
                    step={1000000}
                    formatValue={(v) => `${(v / 1000000).toFixed(0)}M ₫`}
                  />
                </div>
              </div>

              {/* Taxes */}
              <div className="glass rounded-2xl p-6">
                <h2 className="font-display text-xl text-white mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z" />
                    </svg>
                  </span>
                  {t.taxTitle}
                </h2>
                <div className="space-y-6">
                  <SliderInput
                    label={t.vat}
                    value={vat}
                    onChange={setVat}
                    min={5}
                    max={10}
                    unit="%"
                  />
                  <SliderInput
                    label={t.incomeTax}
                    value={incomeTax}
                    onChange={setIncomeTax}
                    min={10}
                    max={20}
                    unit="%"
                  />
                </div>
              </div>

              {/* Business parameters */}
              <div className="glass rounded-2xl p-6 border border-gold-500/30">
                <h2 className="font-display text-xl text-white mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-gold-500/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </span>
                  {t.businessTitle}
                </h2>
                <div className="space-y-6">
                  <SliderInput
                    label={t.dailyRevenue}
                    value={dailyRevenue}
                    onChange={setDailyRevenue}
                    min={6000000}
                    max={50000000}
                    step={1000000}
                    formatValue={(v) => `${(v / 1000000).toFixed(0)}M ₫`}
                  />
                  <SliderInput
                    label={t.grabBonus}
                    value={grabBonus}
                    onChange={setGrabBonus}
                    min={0}
                    max={50}
                    formatValue={(v) => `+${v}%`}
                  />
                  <SliderInput
                    label={t.nhungChannelBonus}
                    value={nhungChannelBonus}
                    onChange={setNhungChannelBonus}
                    min={0}
                    max={5}
                    formatValue={(v) => `+${v}%`}
                  />
                  <SliderInput
                    label={t.priceIncrease}
                    value={priceIncrease}
                    onChange={setPriceIncrease}
                    min={0}
                    max={50}
                    unit="%"
                  />
                  <SliderInput
                    label={t.ingredientOptimization}
                    value={ingredientOptimization}
                    onChange={setIngredientOptimization}
                    min={0}
                    max={30}
                    unit="%"
                  />
                  <SliderInput
                    label={t.ingredientPercent}
                    value={ingredientPercent}
                    onChange={setIngredientPercent}
                    min={30}
                    max={70}
                    unit="%"
                  />
                  <SliderInput
                    label={t.monthlyGrowth}
                    value={monthlyGrowth}
                    onChange={setMonthlyGrowth}
                    min={5}
                    max={30}
                    unit="%"
                  />
                </div>
              </div>
            </div>

            {/* Results panel */}
            <div className="space-y-6 animate-slide-up stagger-3">

              {/* Expense breakdown */}
              <div className="glass rounded-2xl p-6">
                <h2 className="font-display text-xl text-white mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-gold-500/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </span>
                  {t.expenseBreakdown}
                </h2>
                <div className="space-y-4">
                  <IncomeBar
                    label={t.staffExpenses}
                    value={calculations.staffPayroll}
                    maxValue={calculations.totalExpenses}
                    color="linear-gradient(90deg, #ffd700 0%, #ffed4a 100%)"
                    tooltip={t.staffExpensesTooltip}
                  />
                  <IncomeBar
                    label={t.managementExpenses}
                    value={calculations.managementPayroll}
                    maxValue={calculations.totalExpenses}
                    color="linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%)"
                    tooltip={t.managementExpensesTooltip}
                  />
                  <IncomeBar
                    label={t.operationalExpenses}
                    value={calculations.operationalTotal}
                    maxValue={calculations.totalExpenses}
                    color="linear-gradient(90deg, #a78bfa 0%, #c4b5fd 100%)"
                    tooltip={t.operationalExpensesTooltip}
                  />
                  <IncomeBar
                    label={t.ingredientExpenses}
                    value={calculations.ingredientCost}
                    maxValue={calculations.totalExpenses}
                    color="linear-gradient(90deg, #f87171 0%, #fca5a5 100%)"
                    tooltip={t.ingredientExpensesTooltip}
                  />
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex justify-between items-center">
                      <span className="font-display text-white font-bold">{t.totalExpenses}</span>
                      <span className="font-mono text-lg text-gold-400 font-bold">
                        <AnimatedNumber value={calculations.totalExpenses} suffix=" ₫" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profit breakdown */}
              <div className="glass rounded-2xl p-6">
                <h2 className="font-display text-xl text-white mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  {t.profitTitle}
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">{t.revenueWithPriceIncrease}</span>
                    <span className="font-mono text-white">
                      <AnimatedNumber value={calculations.adjustedRevenue} suffix=" ₫" />
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">{t.grossProfit}</span>
                    <span className={`font-mono ${calculations.grossProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      <AnimatedNumber value={calculations.grossProfit} suffix=" ₫" />
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">{t.vatAmount}</span>
                    <span className="font-mono text-red-400">
                      -<AnimatedNumber value={calculations.vatAmount} suffix=" ₫" />
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">{t.incomeTaxAmount}</span>
                    <span className="font-mono text-red-400">
                      -<AnimatedNumber value={calculations.incomeTaxAmount} suffix=" ₫" />
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-white/10">
                    <span className="text-sm text-gray-400">{t.netProfit}</span>
                    <span className={`font-mono font-bold ${calculations.netProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      <AnimatedNumber value={calculations.netProfit} suffix=" ₫" />
                    </span>
                  </div>

                  {/* Margins */}
                  <div className="flex justify-between items-center pt-3 border-t border-white/10">
                    <span className="text-sm text-gray-400 flex items-center gap-1">
                      {t.grossMargin}
                      <span
                        className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-gray-700 text-gray-400 text-xs cursor-help hover:bg-gray-600 hover:text-white transition-colors"
                        title={t.grossMarginTooltip}
                      >
                        ?
                      </span>
                    </span>
                    <span className={`font-mono text-sm ${calculations.grossMargin >= 15 ? 'text-green-400' : calculations.grossMargin >= 0 ? 'text-yellow-400' : 'text-red-400'}`}>
                      <AnimatedNumber value={calculations.grossMargin} suffix="%" />
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400 flex items-center gap-1">
                      {t.netMargin}
                      <span
                        className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-gray-700 text-gray-400 text-xs cursor-help hover:bg-gray-600 hover:text-white transition-colors"
                        title={t.netMarginTooltip}
                      >
                        ?
                      </span>
                    </span>
                    <span className={`font-mono text-sm ${calculations.netMargin >= 10 ? 'text-green-400' : calculations.netMargin >= 0 ? 'text-yellow-400' : 'text-red-400'}`}>
                      <AnimatedNumber value={calculations.netMargin} suffix="%" />
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-gold-500/30">
                    <span className="font-display text-white font-bold">{t.investorShare}</span>
                    <span className={`font-mono text-xl font-bold ${calculations.investorShare >= 0 ? 'text-gold-400' : 'text-red-400'}`}>
                      <AnimatedNumber value={calculations.investorShare} suffix=" ₫" />
                    </span>
                  </div>
                </div>
              </div>

              {/* ROI Card */}
              <div className="glass rounded-2xl p-6 border border-gold-500/30 gold-glow">
                <h2 className="font-display text-xl text-white mb-6">{t.roiTitle}</h2>

                {/* Investment breakdown */}
                <div className="space-y-2 mb-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">{t.sharePurchase}</span>
                    <span className="font-mono">{INVESTMENTS.sharePurchase.toLocaleString('ru-RU')} ₫</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">{t.rentDeposit}</span>
                    <span className="font-mono">{INVESTMENTS.rentDeposit.toLocaleString('ru-RU')} ₫</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">{t.equipment}</span>
                    <span className="font-mono">{INVESTMENTS.equipment.toLocaleString('ru-RU')} ₫</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-white/10 font-bold">
                    <span>{t.totalInvestment}</span>
                    <span className="text-gold-400 font-mono">{INVESTMENTS.total.toLocaleString('ru-RU')} ₫</span>
                  </div>
                </div>

                {/* Payback period */}
                <div className="text-center py-6 border-t border-b border-white/10">
                  <div className="font-display text-4xl font-bold text-gold-400">
                    {calculations.paybackMonths === Infinity ? '∞' : (
                      <AnimatedNumber value={Math.ceil(calculations.paybackMonths)} suffix={` ${t.months}`} />
                    )}
                  </div>
                  <div className="text-sm text-gray-400 mt-2">{t.paybackPeriod}</div>
                  <div className="text-xs text-gray-500 mt-1">(без учёта роста)</div>
                </div>

                {/* Annual ROI */}
                <div className="text-center pt-4">
                  <div className={`font-display text-2xl font-bold ${calculations.annualRoi >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    <AnimatedNumber value={calculations.annualRoi} suffix="%" />
                  </div>
                  <div className="text-sm text-gray-400 mt-1">{t.annualRoi}</div>
                </div>
              </div>

              {/* 12-month Forecast */}
              <div className="glass rounded-2xl p-6">
                <h2 className="font-display text-xl text-white mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </span>
                  {t.forecastTitle}
                </h2>
                <div className="overflow-x-auto">
                  <table className="forecast-table text-sm">
                    <thead>
                      <tr className="text-gray-400 border-b border-white/10">
                        <th className="py-2 text-left">{t.month}</th>
                        <th className="py-2">{t.revenue}</th>
                        <th className="py-2">{t.profit}</th>
                        <th className="py-2">{t.cumulative}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {calculations.forecast.map((row) => {
                        const isPaybackMonth = paybackMonth === row.month && paybackMonth > 0
                        const isPastPayback = paybackMonth > 0 && row.month > paybackMonth
                        return (
                          <tr
                            key={row.month}
                            className={isPaybackMonth ? 'payback-row' : ''}
                          >
                            <td className="py-2">
                              {row.month}
                              {isPaybackMonth && <span className="ml-2">🎉</span>}
                            </td>
                            <td className="py-2 font-mono text-xs">
                              {(row.revenue / 1000000).toFixed(0)}M
                            </td>
                            <td className={`py-2 font-mono text-xs ${row.investorShare >= 0 ? 'text-gold-400' : 'text-red-400'}`}>
                              {(row.investorShare / 1000000).toFixed(1)}M
                            </td>
                            <td className={`py-2 font-mono text-xs ${isPastPayback || isPaybackMonth ? 'text-green-400' : ''}`}>
                              {(row.cumulative / 1000000).toFixed(0)}M
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
                {paybackMonth > 0 && paybackMonth <= 12 && (
                  <div className="mt-4 text-center text-sm text-gold-400">
                    {t.paybackReached} {t.month} {paybackMonth}
                    <div className="text-xs text-gray-500 mt-1">(с учётом роста)</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-4">
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
          <p className="text-gray-600 text-sm">
            {t.disclaimer}
          </p>
        </div>
      </footer>
    </>
  )
}
