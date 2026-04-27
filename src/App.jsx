import { useState } from 'react'
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
} from 'lucide-react'

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

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="relative h-screen w-screen bg-black text-white overflow-hidden">
      {/* Background Video */}
      <video
        className="fixed inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
        src={VIDEO_URL}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Bottom Blur Overlay */}
      <div
        className="fixed inset-0 backdrop-blur-xl blur-overlay pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Main Content */}
      <div className="relative flex flex-col h-full" style={{ zIndex: 10 }}>
        {/* Navbar */}
        <nav
          className="relative flex items-center justify-between px-4 sm:px-6 md:px-12 py-4 md:py-6"
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
                  className="text-sm hover:text-gray-300 transition-colors"
                >
                  {link}
                </a>
              </BlurFadeUp>
            ))}
          </div>

          {/* Right Buttons */}
          <div className="flex items-center gap-3">
            {/* Search Button */}
            <BlurFadeUp delay={350} className="hidden sm:block">
              <button className="liquid-glass rounded-full px-4 md:px-6 py-2 flex items-center gap-2 text-sm hover:bg-white/5 transition-colors">
                <Search size={18} />
                <span>Search</span>
              </button>
            </BlurFadeUp>

            {/* User Button */}
            <BlurFadeUp delay={400} className="hidden sm:block">
              <button className="liquid-glass w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/5 transition-colors">
                <User size={18} />
              </button>
            </BlurFadeUp>

            {/* Hamburger Menu (mobile) */}
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
          className={`lg:hidden absolute top-[72px] left-0 right-0 bg-gray-900/95 backdrop-blur-lg border-t border-b border-gray-800 shadow-2xl transition-all duration-500 ease-out ${
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

          {/* Search & Profile for small screens */}
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

        {/* Hero Content */}
        <div className="flex-1 flex flex-col justify-end px-4 sm:px-6 md:px-12 pb-8 md:pb-16">
          <div className="flex flex-col md:flex-row items-end gap-8">
            {/* Left Side */}
            <div className="flex-1">
              {/* Metadata Row */}
              <BlurFadeUp delay={300}>
                <div className="flex flex-wrap items-center gap-3 sm:gap-6 mb-6 md:mb-8 text-xs sm:text-sm">
                  <span className="flex items-center gap-1.5">
                    <Star
                      size={16}
                      className="fill-white sm:w-5 sm:h-5"
                    />
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
      </div>
    </div>
  )
}
