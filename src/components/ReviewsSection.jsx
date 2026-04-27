import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { ScrollReveal, StaggerContainer, StaggerItem } from './animations'
import { REVIEWS } from '../data/movies'

function ReviewCard({ review }) {
  return (
    <motion.div
      className="group relative liquid-glass rounded-2xl p-6 sm:p-8 cursor-default"
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Quote icon */}
      <div className="mb-6 text-white/10">
        <Quote size={32} />
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1.5 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            className={
              i < Math.round(review.rating / 2)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-700'
            }
          />
        ))}
        <span className="text-sm text-gray-400 ml-2">{review.rating}/10</span>
      </div>

      {/* Text */}
      <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
        "{review.text}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <img
          src={review.avatar}
          alt={review.author}
          className="w-10 h-10 rounded-full object-cover"
          loading="lazy"
        />
        <div>
          <div className="text-sm font-medium">{review.author}</div>
          <div className="text-xs text-gray-500">{review.publication}</div>
        </div>
      </div>

      {/* Hover glow */}
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/[0.06] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm" />
    </motion.div>
  )
}

export default function ReviewsSection() {
  return (
    <section className="relative py-20 md:py-32">
      {/* Section Header */}
      <div className="px-4 sm:px-6 md:px-12 mb-10 md:mb-14">
        <ScrollReveal>
          <span className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-3 block">
            Voices
          </span>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-[-0.03em]">
            Critical Acclaim
          </h2>
        </ScrollReveal>
      </div>

      {/* Reviews Grid */}
      <div className="px-4 sm:px-6 md:px-12">
        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6"
          staggerDelay={0.15}
        >
          {REVIEWS.map((review) => (
            <StaggerItem key={review.author}>
              <ReviewCard review={review} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
