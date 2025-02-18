import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X, Users, Calendar, Home } from "lucide-react";
import { useNavigate, useNavigation } from "react-router-dom";

const NAV_ITEMS = [
  { label: "Home", icon: Home, href: "/" },
  { label: "Events", icon: Calendar, href: "/Events" },
  { label: "Team", icon: Users, href: "/team" },
];

export default function Header({
  darkMode,
  setDarkMode,
  activeSection,
  setActiveSection,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (href) => {
    setActiveSection(href);
    window.location.href = href;
    nav.setIsMenuOpen(false);
    const sectionElement = document.querySelector(href);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-md dark:shadow-lg fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo with Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex items-center"
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Freelancing Club
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map(({ label, icon: Icon, href }) => (
              <motion.button
                key={label}
                onClick={() => handleNavigation(href)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                  activeSection === href
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
                whileHover={{ scale: 1.05 }}
              >
                <Icon size={18} />
                {label}
              </motion.button>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <motion.button
              onClick={() => setDarkMode((prev) => !prev)}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              whileHover={{ rotate: 15 }}
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? (
                <Sun size={20} className="text-gray-900 dark:text-yellow-400" />
              ) : (
                <Moon size={20} className="text-gray-500 dark:text-blue-500" />
              )}
            </motion.button>

            {/* Mobile Menu Toggle */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white dark:bg-gray-800 shadow-lg"
          >
            {NAV_ITEMS.map(({ label, icon: Icon, href }, index) => (
              <motion.div key={label}>
                <a
                  href={href}
                  className={`flex items-center gap-3 px-6 py-4 ${
                    activeSection === href
                      ? "bg-blue-50 dark:bg-gray-700"
                      : "hover:bg-gray-100 dark:hover:bg-gray-600"
                  }`}
                  onClick={() => handleNavigation(href)}
                >
                  <Icon size={18} />
                  {label}
                </a>
              </motion.div>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
