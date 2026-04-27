import { motion } from 'framer-motion'
import { ScrollReveal, StaggerContainer, StaggerItem } from './animations'
import { FEATURED_CAST } from '../data/movies'

function CastCard({ person }) {
  return (
    <motion.div
      className="group relative text-center cursor-pointer"
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Image */}
      <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto mb-5 rounded-full overflow-hidden">
        <img
          src={person.image}
          alt={person.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />

        {/* Ring glow on hover */}
        <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-white/20 transition-colors duration-500" />

        {/* Radial glow */}
        <div className="absolute -inset-4 rounded-full bg-white/[0.03] opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700" />
      </div>

      {/* Info */}
      <h3 className="text-base sm:text-lg font-medium mb-1">{person.name}</h3>
      <p className="text-sm text-gray-500 mb-3">{person.role}</p>

      {/* Bio on hover */}
      <motion.p
        className="text-xs text-gray-500 max-w-[200px] mx-auto opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500"
      >
        {person.bio}
      </motion.p>
    </motion.div>
  )
}

export default function CastSection() {
  return (
    <section className="relative py-20 md:py-32">
      {/* Section Header */}
      <div className="px-4 sm:px-6 md:px-12 mb-12 md:mb-16">
        <ScrollReveal>
          <span className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-3 block">
            Behind The Magic
          </span>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-[-0.03em]">
            Cast & Crew
          </h2>
        </ScrollReveal>
      </div>

      {/* Cast Grid */}
      <div className="px-4 sm:px-6 md:px-12">
        <StaggerContainer
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
          staggerDelay={0.12}
        >
          {FEATURED_CAST.map((person) => (
            <StaggerItem key={person.name}>
              <CastCard person={person} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
