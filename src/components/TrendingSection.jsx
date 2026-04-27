import { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Star, Play, Clock, ChevronRight } from 'lucide-react'
import { ScrollReveal, StaggerContainer, StaggerItem, MagneticHover } from './animations'
import { TRENDING_MOVIES } from '../data/movies'

function MovieCard({ movie, index }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 })

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    rotateX.set(((e.clientY - centerY) / rect.height) * -10)
    rotateY.set(((e.clientX - centerX) / rect.width) * 10)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className="group relative flex-shrink-0 w-[260px] sm:w-[280px] cursor-pointer"
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Card Image */}
      <div className="relative aspect-[2/3] rounded-2xl overflow-hidden mb-4">
        <img
          src={movie.image}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
          <motion.div
            className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play size={22} className="fill-white text-white ml-1" />
          </motion.div>
        </div>

        {/* Rating badge */}
        <div className="absolute top-3 right-3 liquid-glass rounded-full px-3 py-1 flex items-center gap-1.5">
          <Star size={12} className="fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-medium">{movie.rating}</span>
        </div>

        {/* Bottom info (on hover) */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <p className="text-sm text-gray-300 line-clamp-2">{movie.description}</p>
        </div>
      </div>

      {/* Card Info */}
      <div className="space-y-1.5 px-1">
        <h3 className="text-base font-medium truncate group-hover:text-white/90 transition-colors">
          {movie.title}
        </h3>
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span>{movie.genre}</span>
          <span className="flex items-center gap-1">
            <Clock size={11} />
            {movie.duration}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default function TrendingSection() {
  const scrollRef = useRef(null)

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 320, behavior: 'smooth' })
    }
  }

  return (
    <section className="relative py-20 md:py-32">
      {/* Section Header */}
      <div className="px-4 sm:px-6 md:px-12 mb-10 md:mb-14">
        <div className="flex items-end justify-between">
          <div>
            <ScrollReveal>
              <span className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-3 block">
                What's Hot
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-[-0.03em]">
                Trending Now
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={0.2} className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => scroll(-1)}
              className="liquid-glass w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/5 transition-colors"
            >
              <ChevronRight size={18} className="rotate-180" />
            </button>
            <button
              onClick={() => scroll(1)}
              className="liquid-glass w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/5 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </ScrollReveal>
        </div>
      </div>

      {/* Movie Cards - Horizontal Scroll */}
      <StaggerContainer
        className="flex gap-5 md:gap-6 overflow-x-auto scrollbar-hide px-4 sm:px-6 md:px-12 pb-4"
        ref={scrollRef}
        staggerDelay={0.1}
      >
        {TRENDING_MOVIES.map((movie, i) => (
          <StaggerItem key={movie.id}>
            <MovieCard movie={movie} index={i} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  )
}
