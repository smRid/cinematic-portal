import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import {
  Search,
  User,
  Menu,
  X,
  Star,
  Clock,
  Calendar,
  Play,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from 'lucide-react'
import TrendingSection from './components/TrendingSection'
import StatsSection from './components/StatsSection'
import CategoriesSection from './components/CategoriesSection'
import FeaturedSection from './components/FeaturedSection'
import CastSection from './components/CastSection'
import ReviewsSection from './components/ReviewsSection'
import UpcomingSection from './components/UpcomingSection'
import CTASection from './components/CTASection'
import Footer from './components/Footer'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_094145_4a271a6c-3869-4f1c-8aa7-aeb0cb227994.mp4'

const NAV_LINKS = [
  'Movies',
  'TV Series',
  "Editor's Pick",
  'Interviews',
  'User Reviews',
]

function BlurFadeUp({ delay = 0, className = '', children, ...props }) {
  return (
    <div
      className={`animate-blur-fade-up ${className}`}
      style={{ animationDelay: `${delay}ms` }}
      {...props}
    >
      {children}
    </div>
  )
}

// Scroll-to-top button
function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 liquid-glass w-12 h-12 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors shadow-2xl"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

// Scroll-aware navbar
function Navbar({ menuOpen, setMenuOpen }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 flex items-center justify-between px-4 sm:px-6 md:px-12 py-4 md:py-6 transition-all duration-500 ${
          scrolled
            ? 'bg-black/70 backdrop-blur-2xl border-b border-white/[0.06] py-3 md:py-4'
            : ''
        }`}
        style={{ zIndex: 50 }}
      >
        {/* Logo */}
        <BlurFadeUp delay={0}>
          <span className="text-xl md:text-2xl font-semibold tracking-wider h-8 md:h-10 flex items-center">
            CINEMATIC
          </span>
        </BlurFadeUp>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link, i) => (
            <BlurFadeUp key={link} delay={100 + i * 50}>
              <a
                href="#"
                className="text-sm hover:text-gray-300 transition-colors relative group"
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300" />
              </a>
            </BlurFadeUp>
          ))}
        </div>

        {/* Right Buttons */}
        <div className="flex items-center gap-3">
          <BlurFadeUp delay={350} className="hidden sm:block">
            <button className="liquid-glass rounded-full px-4 md:px-6 py-2 flex items-center gap-2 text-sm hover:bg-white/5 transition-colors">
              <Search size={18} />
              <span>Search</span>
            </button>
          </BlurFadeUp>

          <BlurFadeUp delay={400} className="hidden sm:block">
            <button className="liquid-glass w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/5 transition-colors">
              <User size={18} />
            </button>
          </BlurFadeUp>

          <BlurFadeUp delay={350} className="lg:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="liquid-glass w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/5 transition-colors"
            >
              <div className="relative w-[18px] h-[18px]">
                <Menu
                  size={18}
                  className={`absolute inset-0 transition-all duration-500 ease-out ${
                    menuOpen
                      ? 'rotate-180 opacity-0 scale-50'
                      : 'rotate-0 opacity-100 scale-100'
                  }`}
                />
                <X
                  size={18}
                  className={`absolute inset-0 transition-all duration-500 ease-out ${
                    menuOpen
                      ? 'rotate-0 opacity-100 scale-100'
                      : '-rotate-180 opacity-0 scale-50'
                  }`}
                />
              </div>
            </button>
          </BlurFadeUp>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed top-[72px] left-0 right-0 bg-gray-900/95 backdrop-blur-lg border-t border-b border-gray-800 shadow-2xl transition-all duration-500 ease-out ${
          menuOpen
            ? 'translate-y-0 opacity-100'
            : '-translate-y-4 opacity-0 pointer-events-none'
        }`}
        style={{ zIndex: 40 }}
      >
        <div className="px-4 py-2">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link}
              href="#"
              className={`block py-3 px-3 rounded-lg hover:bg-gray-800/50 text-sm transition-all duration-500 ease-out ${
                menuOpen
                  ? 'translate-x-0 opacity-100'
                  : '-translate-x-4 opacity-0'
              }`}
              style={{
                transitionDelay: menuOpen ? `${i * 50}ms` : '0ms',
              }}
            >
              {link}
            </a>
          ))}
        </div>

        <div className="sm:hidden border-t border-gray-800 px-4 py-4 flex items-center gap-3">
          <button className="liquid-glass rounded-full px-4 py-2 flex items-center gap-2 text-sm flex-1 justify-center hover:bg-white/5 transition-colors">
            <Search size={18} />
            <span>Search</span>
          </button>
          <button className="liquid-glass w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/5 transition-colors">
            <User size={18} />
          </button>
        </div>
      </div>
    </>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <div className="relative bg-black text-white">
      {/* Fixed Navbar */}
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {/* Scroll to top */}
      <ScrollToTop />

      {/* ─── HERO SECTION ─── */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
        {/* Background Video with parallax */}
        <motion.div
          className="absolute inset-0"
          style={{ scale: heroScale, y: heroY }}
        >
          <video
            className="w-full h-full object-cover"
            src={VIDEO_URL}
            autoPlay
            loop
            muted
            playsInline
          />
        </motion.div>

        {/* Bottom Blur Overlay */}
        <div className="absolute inset-0 backdrop-blur-xl blur-overlay pointer-events-none" style={{ zIndex: 1 }} />

        {/* Hero Content */}
        <motion.div
          className="relative flex flex-col h-full pt-20"
          style={{ zIndex: 10, opacity: heroOpacity }}
        >
          <div className="flex-1 flex flex-col justify-end px-4 sm:px-6 md:px-12 pb-8 md:pb-16">
            <div className="flex flex-col md:flex-row items-end gap-8">
              {/* Left Side */}
              <div className="flex-1">
                {/* Metadata Row */}
                <BlurFadeUp delay={300}>
                  <div className="flex flex-wrap items-center gap-3 sm:gap-6 mb-6 md:mb-8 text-xs sm:text-sm">
                    <span className="flex items-center gap-1.5">
                      <Star size={16} className="fill-white sm:w-5 sm:h-5" />
                      <span className="font-medium">8.7/10 IMDB</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={16} className="sm:w-5 sm:h-5" />
                      <span>132 min</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar size={16} className="sm:w-5 sm:h-5" />
                      <span>April, 2025</span>
                    </span>
                  </div>
                </BlurFadeUp>

                {/* Title */}
                <BlurFadeUp delay={400}>
                  <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-[-0.04em] mb-4 md:mb-6">
                    Step Through. Work Smarter.
                  </h1>
                </BlurFadeUp>

                {/* Description */}
                <BlurFadeUp delay={500}>
                  <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-6 md:mb-12 max-w-2xl">
                    A voyage through forgotten realms, where past and future
                    intertwine.
                  </p>
                </BlurFadeUp>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  <BlurFadeUp delay={600}>
                    <button className="bg-white text-black rounded-full font-medium px-6 sm:px-8 py-2.5 sm:py-3 flex items-center gap-2 hover:bg-gray-200 transition-colors">
                      <Play size={18} className="fill-black" />
                      Watch Now
                    </button>
                  </BlurFadeUp>
                  <BlurFadeUp delay={700}>
                    <button className="liquid-glass rounded-full font-medium px-6 sm:px-8 py-2.5 sm:py-3 text-white hover:bg-white/5 transition-colors">
                      Learn More
                    </button>
                  </BlurFadeUp>
                </div>
              </div>

              {/* Right Side - Navigation Arrows */}
              <div className="flex gap-3 md:w-auto w-full md:justify-end justify-start">
                <BlurFadeUp delay={800}>
                  <button className="liquid-glass rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex items-center gap-2 hover:bg-white/5 transition-colors">
                    <ChevronLeft size={18} />
                    <span className="text-sm">Previous</span>
                  </button>
                </BlurFadeUp>
                <BlurFadeUp delay={900}>
                  <button className="liquid-glass rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex items-center gap-2 hover:bg-white/5 transition-colors">
                    <span className="text-sm">Next</span>
                    <ChevronRight size={18} />
                  </button>
                </BlurFadeUp>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <BlurFadeUp delay={1100}>
            <div className="flex justify-center pb-6">
              <motion.div
                className="flex flex-col items-center gap-2 text-gray-500 cursor-pointer"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                onClick={() =>
                  window.scrollTo({
                    top: window.innerHeight,
                    behavior: 'smooth',
                  })
                }
              >
                <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
                <div className="w-px h-8 bg-gradient-to-b from-gray-500 to-transparent" />
              </motion.div>
            </div>
          </BlurFadeUp>
        </motion.div>
      </section>

      {/* ─── SCROLLABLE SECTIONS ─── */}
      <div className="relative z-10 bg-black">
        {/* Divider gradient */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <TrendingSection />

        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mx-12" />

        <StatsSection />

        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mx-12" />

        <CategoriesSection />

        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mx-12" />

        <FeaturedSection />

        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mx-12" />

        <CastSection />

        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mx-12" />

        <ReviewsSection />

        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mx-12" />

        <UpcomingSection />

        <CTASection />

        <Footer />
      </div>
    </div>
  )
}
