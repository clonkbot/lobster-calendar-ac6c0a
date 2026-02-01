import { useState, useEffect } from 'react'

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function LobsterIcon({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-block ${className}`} role="img" aria-label="lobster">
      🦞
    </span>
  )
}

function Bubble({ delay, left, size }: { delay: number; left: number; size: number }) {
  return (
    <div
      className="bubble"
      style={{
        left: `${left}%`,
        width: `${size}px`,
        height: `${size}px`,
        animationDelay: `${delay}s`,
      }}
    />
  )
}

function App() {
  const today = new Date()
  const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
  const [isAnimating, setIsAnimating] = useState(false)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDayOfMonth = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    )
  }

  const navigateMonth = (direction: number) => {
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentDate(new Date(year, month + direction, 1))
      setIsAnimating(false)
    }, 150)
  }

  const returnToToday = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1))
      setIsAnimating(false)
    }, 150)
  }

  const calendarDays = []
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null)
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }

  const weeks = []
  for (let i = 0; i < calendarDays.length; i += 7) {
    weeks.push(calendarDays.slice(i, i + 7))
  }

  const bubbles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    delay: i * 1.2,
    left: 10 + Math.random() * 80,
    size: 6 + Math.random() * 12,
  }))

  return (
    <div className="min-h-screen flex flex-col items-center justify-between px-4 py-8 relative overflow-hidden">
      {/* Ambient bubbles */}
      {bubbles.map((bubble) => (
        <Bubble key={bubble.id} delay={bubble.delay} left={bubble.left} size={bubble.size} />
      ))}

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md">
        {/* Header */}
        <header className="text-center mb-8 fade-in">
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-coral tracking-wide mb-2">
            Lobster Calendar
          </h1>
          <p className="text-seafoam text-sm tracking-[0.3em] uppercase font-medium">
            Navigate the Tides of Time
          </p>
        </header>

        {/* Calendar Card */}
        <div className="w-full bg-card calendar-border rounded-3xl p-6 sm:p-8 fade-in" style={{ animationDelay: '0.2s' }}>
          {/* Navigation */}
          <div className="text-center mb-6">
            <button
              onClick={() => navigateMonth(-1)}
              className="nav-btn flex items-center justify-center gap-2 mx-auto text-pearl hover:text-coral-light mb-4"
            >
              <LobsterIcon className="text-coral text-lg" />
              <span className="font-medium">Previous</span>
            </button>

            <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'}`}>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-pearl mb-2">
                {MONTHS[month]} {year}
              </h2>
              <button
                onClick={returnToToday}
                className="text-seafoam text-sm hover:text-coral-light transition-colors flex items-center justify-center gap-1 mx-auto"
              >
                <span className="text-xs">↻</span>
                <span>Return to today</span>
              </button>
            </div>

            <button
              onClick={() => navigateMonth(1)}
              className="nav-btn flex items-center justify-center gap-2 mx-auto text-pearl hover:text-coral-light mt-4"
            >
              <span className="font-medium">Next</span>
              <LobsterIcon className="text-coral text-lg" />
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="bg-card calendar-border rounded-2xl p-4 sm:p-6">
            {/* Day headers */}
            <div className="grid grid-cols-7 gap-1 mb-3">
              {DAYS.map((day) => (
                <div key={day} className="text-center text-muted text-xs sm:text-sm font-medium py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Date grid */}
            <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="grid grid-cols-7 gap-1">
                  {week.map((day, dayIndex) => (
                    <div
                      key={dayIndex}
                      className={`
                        day-cell aspect-square flex items-center justify-center text-sm sm:text-base
                        ${day ? 'text-pearl cursor-pointer' : ''}
                        ${day && isToday(day) ? 'today-highlight relative' : ''}
                      `}
                    >
                      {day && isToday(day) && (
                        <LobsterIcon className="absolute -top-1 -right-1 text-xs text-coral" />
                      )}
                      {day}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative lobsters */}
        <div className="flex items-center justify-center gap-4 mt-8 fade-in" style={{ animationDelay: '0.4s' }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <LobsterIcon key={i} className="lobster-float text-2xl text-coral" />
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="wave-border mt-8 pt-4 text-center fade-in" style={{ animationDelay: '0.6s' }}>
        <p className="text-muted text-xs tracking-wide">
          Requested by <span className="text-coral-light">@Frosty_Icy_</span> · Built by <span className="text-seafoam">@clonkbot</span>
        </p>
      </footer>
    </div>
  )
}

export default App