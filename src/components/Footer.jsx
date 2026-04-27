import { motion } from 'framer-motion'
import { ScrollReveal, StaggerContainer, StaggerItem } from './animations'
import { Github, Twitter, Instagram, Youtube } from 'lucide-react'

const FOOTER_LINKS = {
  Explore: ['Movies', 'TV Series', 'Documentaries', 'Shorts', 'Classics'],
  Company: ['About', 'Careers', 'Press', 'Blog', 'Contact'],
  Support: ['Help Center', 'Safety', 'Terms', 'Privacy', 'Accessibility'],
  Connect: ['Community', 'Events', 'Newsletter', 'Partnerships', 'Advertise'],
}

const SOCIALS = [
  { icon: Twitter, label: 'Twitter' },
  { icon: Instagram, label: 'Instagram' },
  { icon: Youtube, label: 'YouTube' },
  { icon: Github, label: 'GitHub' },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] pt-16 md:pt-24 pb-8 md:pb-12">
      <div className="px-4 sm:px-6 md:px-12">
        {/* Top section */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12 mb-16">
          {/* Brand column */}
          <ScrollReveal className="col-span-2 md:col-span-1">
            <div className="mb-6">
              <span className="text-xl font-semibold tracking-wider">CINEMATIC</span>
            </div>
            <p className="text-sm text-gray-500 mb-6 max-w-xs">
              The ultimate destination for film lovers. Discover, watch, and discuss the world's greatest cinema.
            </p>
            <div className="flex gap-3">
              {SOCIALS.map((social) => (
                <motion.a
                  key={social.label}
                  href="#"
                  className="liquid-glass w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/5 transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon size={15} />
                </motion.a>
              ))}
            </div>
          </ScrollReveal>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links], colIdx) => (
            <ScrollReveal key={title} delay={0.05 * (colIdx + 1)}>
              <h4 className="text-sm font-medium mb-4 text-gray-300">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-gray-600 hover:text-gray-300 transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom bar */}
        <ScrollReveal>
          <div className="border-t border-white/[0.06] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-600">
              &copy; {new Date().getFullYear()} CINEMATIC. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
                Privacy
              </a>
              <a href="#" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
                Terms
              </a>
              <a href="#" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  )
}
