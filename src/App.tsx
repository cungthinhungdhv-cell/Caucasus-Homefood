import { useState, useEffect } from 'react'
import Calculator from './pages/Calculator'
import Terms from './pages/Terms'

// Types
type Lang = 'ru' | 'vi'
type Page = 'calculator' | 'terms'

// Navigation translations
const navTranslations = {
  ru: {
    calculator: 'Калькулятор',
    terms: 'Условия',
  },
  vi: {
    calculator: 'Máy tính',
    terms: 'Điều khoản',
  },
}

// Floating particles component
function Particles() {
  return (
    <div className="particles">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 15}s`,
            animationDuration: `${15 + Math.random() * 10}s`,
          }}
        />
      ))}
    </div>
  )
}

// Get current page from hash
function getPageFromHash(): Page {
  const hash = window.location.hash
  if (hash === '#/terms') return 'terms'
  return 'calculator'
}

// Navigation component
function Navigation({
  currentPage,
  onNavigate,
  lang,
}: {
  currentPage: Page
  onNavigate: (page: Page) => void
  lang: Lang
}) {
  const t = navTranslations[lang]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-3">
      <div className="max-w-6xl mx-auto flex justify-center">
        <div className="glass rounded-full p-1 flex gap-1">
          <button
            onClick={() => onNavigate('calculator')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              currentPage === 'calculator'
                ? 'bg-gold-500 text-dark-900'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              {t.calculator}
            </span>
          </button>
          <button
            onClick={() => onNavigate('terms')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              currentPage === 'terms'
                ? 'bg-gold-500 text-dark-900'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              {t.terms}
            </span>
          </button>
        </div>
      </div>
    </nav>
  )
}

// Main App component
function App() {
  // Language state
  const [lang, setLang] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem('caucasus-calculator-lang')
      return (saved === 'vi' || saved === 'ru') ? saved : 'ru'
    } catch {
      return 'ru'
    }
  })

  // Page state from hash
  const [currentPage, setCurrentPage] = useState<Page>(getPageFromHash)

  // Listen for hash changes
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(getPageFromHash())
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // Toggle language
  const toggleLang = () => {
    const newLang = lang === 'ru' ? 'vi' : 'ru'
    setLang(newLang)
    localStorage.setItem('caucasus-calculator-lang', newLang)
  }

  // Navigate to page
  const navigateTo = (page: Page) => {
    const hash = page === 'terms' ? '#/terms' : '#/'
    window.location.hash = hash
    setCurrentPage(page)
  }

  return (
    <div className="min-h-screen relative pt-16">
      <Particles />
      <Navigation currentPage={currentPage} onNavigate={navigateTo} lang={lang} />

      {currentPage === 'calculator' ? (
        <Calculator lang={lang} toggleLang={toggleLang} />
      ) : (
        <Terms lang={lang} toggleLang={toggleLang} />
      )}
    </div>
  )
}

export default App
