import { useEffect, useState } from 'react'
import './ThemeToggle.css'

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark'
  })

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.body.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  return (
    <div className="theme-toggle-wrapper">
      <label className="switch">
        <input
          type="checkbox"
          checked={isDark}
          onChange={() => {
            setIsDark(!isDark)
            document.body.classList.toggle('dark')
          }}
        />
        <span className="slider round"></span>
      </label>
    </div>
  )
}

export default ThemeToggle
