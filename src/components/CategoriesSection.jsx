import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { ScrollReveal, StaggerContainer, StaggerItem } from './animations'
import { CATEGORIES } from '../data/movies'

function CategoryCard({ category, index }) {
  return (
    <motion.div
      className="group relative cursor-pointer"
      whileHover={{ scale: 1.04, y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className={`relative rounded-2xl overflow-hidden p-6 sm:p-8 bg-gradient-to-br ${category.color} border border-white/[0.06] backdrop-blur-sm`}>
        {/* Animated background glow */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.06) 0%, transparent 70%)`,
          }}
        />

        {/* Icon */}
        <div className="text-3xl sm:text-4xl mb-4 relative z-10">
          {category.icon}
        </div>

        {/* Name */}
        <h3 className="text-lg sm:text-xl font-medium mb-1 relative z-10">
          {category.name}
        </h3>

        {/* Count */}
        <p className="text-sm text-gray-500 relative z-10">
          {category.count.toLocaleString()} titles
        </p>

        {/* Arrow */}
        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
          <ChevronRight size={18} className="text-gray-400" />
        </div>
      </div>
    </motion.div>
  )
}

export default function CategoriesSection() {
  return (
    <section className="relative py-20 md:py-32">
      {/* Section Header */}
      <div className="px-4 sm:px-6 md:px-12 mb-10 md:mb-14">
        <ScrollReveal>
          <span className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-3 block">
            Browse
          </span>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-[-0.03em]">
            Explore Categories
          </h2>
        </ScrollReveal>
      </div>

      {/* Category Grid */}
      <div className="px-4 sm:px-6 md:px-12">
        <StaggerContainer
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-5"
          staggerDelay={0.08}
        >
          {CATEGORIES.map((cat, i) => (
            <StaggerItem key={cat.name}>
              <CategoryCard category={cat} index={i} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
