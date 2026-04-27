import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { ScrollReveal, TextReveal } from './animations'

export default function CTASection() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1])

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32 px-4 sm:px-6 md:px-12">
      <motion.div
        className="relative rounded-3xl overflow-hidden py-16 sm:py-24 md:py-32 px-6 sm:px-12 md:px-20"
        style={{ scale }}
      >
        {/* Animated gradient background */}
        <div className="absolute inset-0 cta-gradient" />

        {/* Floating orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white/[0.03] blur-3xl"
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-white/[0.04] blur-3xl"
            animate={{
              x: [0, -20, 0],
              y: [0, 30, 0],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 liquid-glass rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em] text-gray-300 mb-8">
              <Sparkles size={14} />
              Join the Experience
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-[-0.03em] mb-6 leading-tight">
              Your Cinema Journey
              <br />
              <span className="text-gray-400">Starts Here</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.25}>
            <p className="text-gray-400 text-base sm:text-lg md:text-xl mb-10 max-w-xl mx-auto">
              Unlimited access to thousands of films, exclusive behind-the-scenes content, and a community of cinephiles.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.35}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                className="bg-white text-black rounded-full font-medium px-8 py-3.5 flex items-center gap-2 hover:bg-gray-200 transition-colors w-full sm:w-auto justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                Get Started Free
                <ArrowRight size={18} />
              </motion.button>
              <motion.button
                className="liquid-glass rounded-full font-medium px-8 py-3.5 text-white hover:bg-white/5 transition-colors w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                View Plans
              </motion.button>
            </div>
          </ScrollReveal>
        </div>
      </motion.div>
    </section>
  )
}
