import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Play, Star, Clock, Award } from 'lucide-react'
import { ScrollReveal, TextReveal, Parallax } from './animations'

const FEATURED = {
  title: 'Echoes of Tomorrow',
  tagline: 'Where past and future collide',
  rating: 8.9,
  duration: '2h 18m',
  awards: '4 Academy Nominations',
  synopsis:
    'In a world where time folds upon itself, Dr. Mira Ashton discovers that the key to saving humanity lies not in the future, but in a forgotten past that was never supposed to exist. As the boundaries between eras dissolve, she must navigate a labyrinth of paradoxes — where every choice echoes across centuries.',
  image:
    'https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=1200&h=800&fit=crop',
  trailer: '#',
}

export default function FeaturedSection() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-white/[0.02] rounded-full blur-[120px]" />
      </div>

      <div className="px-4 sm:px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <ScrollReveal>
            <span className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-3 block">
              Editor's Choice
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-[-0.03em]">
              Featured Film
            </h2>
          </ScrollReveal>
        </div>

        {/* Featured Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Image */}
          <ScrollReveal direction="left" className="relative">
            <motion.div
              className="relative aspect-[16/10] rounded-3xl overflow-hidden group cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <motion.img
                src={FEATURED.image}
                alt={FEATURED.title}
                className="w-full h-full object-cover"
                style={{ y: imageY }}
                loading="lazy"
              />

              {/* Play overlay */}
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <motion.div
                  className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/20"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play size={32} className="fill-white text-white ml-1" />
                </motion.div>
              </div>

              {/* Cinematic bars */}
              <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/40 to-transparent" />
            </motion.div>
          </ScrollReveal>

          {/* Info */}
          <div className="space-y-6 md:space-y-8">
            <ScrollReveal delay={0.2}>
              <p className="text-gray-500 text-sm uppercase tracking-[0.2em]">
                {FEATURED.tagline}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-[-0.03em] leading-tight">
                {FEATURED.title}
              </h3>
            </ScrollReveal>

            {/* Metadata */}
            <ScrollReveal delay={0.4}>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1.5">
                  <Star size={16} className="fill-yellow-400 text-yellow-400" />
                  {FEATURED.rating}/10
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={16} />
                  {FEATURED.duration}
                </span>
                <span className="flex items-center gap-1.5">
                  <Award size={16} className="text-yellow-400" />
                  {FEATURED.awards}
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.5}>
              <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-xl">
                {FEATURED.synopsis}
              </p>
            </ScrollReveal>

            {/* CTA */}
            <ScrollReveal delay={0.6}>
              <div className="flex flex-wrap gap-4 pt-2">
                <motion.button
                  className="bg-white text-black rounded-full font-medium px-8 py-3 flex items-center gap-2 hover:bg-gray-200 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Play size={18} className="fill-black" />
                  Watch Trailer
                </motion.button>
                <motion.button
                  className="liquid-glass rounded-full font-medium px-8 py-3 text-white hover:bg-white/5 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  More Details
                </motion.button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
