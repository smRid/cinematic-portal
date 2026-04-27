import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

// Scroll-triggered reveal with blur + fade + translate
export function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  once = true,
  amount = 0.3,
  duration = 0.8,
  blur = 12,
  ...props
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount })

  const directions = {
    up: { y: 60, x: 0 },
    down: { y: -60, x: 0 },
    left: { x: 60, y: 0 },
    right: { x: -60, y: 0 },
  }

  const { x, y } = directions[direction] || directions.up

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y, x, filter: `blur(${blur}px)` }}
      animate={
        isInView
          ? { opacity: 1, y: 0, x: 0, filter: 'blur(0px)' }
          : { opacity: 0, y, x, filter: `blur(${blur}px)` }
      }
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Stagger container for children
export function StaggerContainer({
  children,
  className = '',
  staggerDelay = 0.1,
  once = true,
  amount = 0.2,
  ...props
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        visible: {
          transition: { staggerChildren: staggerDelay },
        },
        hidden: {},
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Stagger item (child of StaggerContainer)
export function StaggerItem({
  children,
  className = '',
  direction = 'up',
  ...props
}) {
  const directions = {
    up: { y: 50, x: 0 },
    down: { y: -50, x: 0 },
    left: { x: 50, y: 0 },
    right: { x: -50, y: 0 },
  }

  const { x, y } = directions[direction] || directions.up

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y, x, filter: 'blur(10px)' },
        visible: {
          opacity: 1,
          y: 0,
          x: 0,
          filter: 'blur(0px)',
          transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Parallax wrapper
export function Parallax({ children, className = '', speed = 0.5, ...props }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 200])

  return (
    <motion.div ref={ref} className={className} style={{ y }} {...props}>
      {children}
    </motion.div>
  )
}

// Scale on scroll
export function ScaleOnScroll({ children, className = '', ...props }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ scale, opacity }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Text reveal (character-by-character)
export function TextReveal({ text, className = '', once = true, delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: 0.5 })

  const words = text.split(' ')

  return (
    <span ref={ref} className={className}>
      {words.map((word, wIdx) => (
        <span key={wIdx} className="inline-block mr-[0.25em]">
          {word.split('').map((char, cIdx) => {
            const totalIdx = words
              .slice(0, wIdx)
              .reduce((acc, w) => acc + w.length, 0) + cIdx
            return (
              <motion.span
                key={cIdx}
                className="inline-block"
                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                    : { opacity: 0, y: 20, filter: 'blur(8px)' }
                }
                transition={{
                  duration: 0.4,
                  delay: delay + totalIdx * 0.03,
                  ease: 'easeOut',
                }}
              >
                {char}
              </motion.span>
            )
          })}
        </span>
      ))}
    </span>
  )
}

// Counter animation
export function AnimatedCounter({ target, duration = 2, className = '', suffix = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const count = useTransform(
    useScroll({ target: ref, offset: ['start end', 'center center'] }).scrollYProgress,
    [0, 1],
    [0, target]
  )

  return (
    <span ref={ref} className={className}>
      <motion.span>{isInView ? target : 0}</motion.span>
      {suffix}
    </span>
  )
}

// Magnetic hover effect wrapper
export function MagneticHover({ children, className = '', strength = 0.3 }) {
  const ref = useRef(null)

  const handleMouseMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * strength
    const y = (e.clientY - rect.top - rect.height / 2) * strength
    el.style.transform = `translate(${x}px, ${y}px)`
  }

  const handleMouseLeave = () => {
    if (ref.current) {
      ref.current.style.transform = 'translate(0, 0)'
      ref.current.style.transition = 'transform 0.4s ease-out'
    }
  }

  const handleMouseEnter = () => {
    if (ref.current) {
      ref.current.style.transition = 'none'
    }
  }

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {children}
    </div>
  )
}
