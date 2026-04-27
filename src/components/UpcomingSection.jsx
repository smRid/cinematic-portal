import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Calendar, Bell } from 'lucide-react'
import { ScrollReveal, StaggerContainer, StaggerItem } from './animations'
import { UPCOMING_MOVIES } from '../data/movies'

function UpcomingCard({ movie, index }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <motion.div
      ref={ref}
      className="group relative rounded-2xl overflow-hidden cursor-pointer"
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      {/* Image */}
      <div className="relative aspect-[2/1] overflow-hidden">
        <motion.img
          src={movie.image}
          alt={movie.title}
          className="w-full h-full object-cover"
          style={{ y }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
            <Calendar size={12} />
            <span>{movie.date}</span>
            <span className="liquid-glass rounded-full px-2 py-0.5 text-[10px]">
              {movie.genre}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-medium mb-3">{movie.title}</h3>

          {/* Notify button */}
          <motion.button
            className="liquid-glass rounded-full px-4 py-2 flex items-center gap-2 text-xs opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell size={12} />
            Notify Me
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default function UpcomingSection() {
  return (
    <section className="relative py-20 md:py-32">
      {/* Section Header */}
      <div className="px-4 sm:px-6 md:px-12 mb-10 md:mb-14">
        <ScrollReveal>
          <span className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-3 block">
            Coming Soon
          </span>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-[-0.03em]">
            Upcoming Releases
          </h2>
        </ScrollReveal>
      </div>

      {/* Upcoming Grid */}
      <div className="px-4 sm:px-6 md:px-12">
        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6"
          staggerDelay={0.15}
        >
          {UPCOMING_MOVIES.map((movie, i) => (
            <StaggerItem key={movie.title}>
              <UpcomingCard movie={movie} index={i} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
