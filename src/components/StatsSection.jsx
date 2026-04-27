import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ScrollReveal } from './animations'
import { STATS } from '../data/movies'

function AnimatedNumber({ value, isInView }) {
  const [display, setDisplay] = useState('0')
  const numericValue = parseInt(value.replace(/[^0-9.]/g, ''))
  const suffix = value.replace(/[0-9.]/g, '')

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const end = numericValue
    const duration = 2000
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(eased * end)

      if (value.includes('.')) {
        setDisplay((eased * parseFloat(value)).toFixed(1))
      } else {
        setDisplay(current.toString())
      }

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setDisplay(numericValue.toString().includes('.') ? numericValue.toFixed(1) : numericValue.toString())
      }
    }
    animate()
  }, [isInView, numericValue, value])

  return (
    <span>
      {display}
      {suffix}
    </span>
  )
}

export default function StatsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <section className="relative py-16 md:py-24" ref={ref}>
      {/* Decorative line */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-px h-20 bg-gradient-to-b from-transparent via-white/20 to-transparent" />

      <div className="px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {STATS.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.15} className="text-center">
              <motion.div
                className="relative group"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight mb-2">
                  <AnimatedNumber value={stat.value} isInView={isInView} />
                </div>
                <div className="text-sm text-gray-500 uppercase tracking-[0.2em]">
                  {stat.label}
                </div>
                {/* Glow effect on hover */}
                <div className="absolute inset-0 -z-10 rounded-3xl bg-white/[0.02] opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700" />
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
