import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useRouter } from 'next/router';

const FoundersNavigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (path) => {
    router.push(path);
    setIsMobileMenuOpen(false);
  };

  // Detect if we're on the events page for styling
  const isEventsPage = router.pathname === '/events';
  const textColor = isEventsPage ? 'text-finc-fg' : 'text-white';
  const hoverColor = isEventsPage ? 'hover:text-finc-accent' : 'hover:text-finc-accent';
  const borderColor = isEventsPage ? 'border-finc-fg' : 'border-white';
  const hoverBg = isEventsPage ? 'hover:bg-finc-fg hover:text-finc-bg' : 'hover:bg-white hover:text-black';
  const bgColor = isEventsPage ? 'bg-finc-bg/80' : 'bg-black/80';
  const borderBottom = isEventsPage ? 'border-finc-border' : 'border-white/10';

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? `${bgColor} backdrop-blur-lg border-b ${borderBottom} shadow-sm`
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div 
            className={`font-instrument-serif text-xl md:text-2xl font-normal cursor-pointer ${textColor} ${hoverColor} transition-colors`}
            onClick={() => handleNavigation('/')}
          >
            Founders, Inc.
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handleNavigation('/events#upcoming')}
              className={`${textColor} ${hoverColor} transition-colors`}
            >
              Upcoming
            </button>
            <button
              onClick={() => handleNavigation('/events#past')}
              className={`${textColor} ${hoverColor} transition-colors`}
            >
              Past Events
            </button>
            <button
              onClick={() => handleNavigation('/campfire')}
              className={`${textColor} ${hoverColor} transition-colors`}
            >
              Campus
            </button>
            <button
              onClick={() => handleNavigation('/contactPage/contact')}
              className={`${textColor} ${hoverColor} transition-colors`}
            >
              About
            </button>
          </nav>

          {/* CTA Button */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => handleNavigation('/join-now')}
              className={`hidden sm:block px-4 md:px-6 py-2 border-2 ${borderColor} rounded-full ${hoverBg} transition-all duration-300 ${textColor}`}
            >
              Host Event
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 ${textColor}`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden py-4 border-t ${borderBottom}`}
          >
            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => handleNavigation('/events#upcoming')}
                className={`${textColor} ${hoverColor} transition-colors text-left`}
              >
                Upcoming
              </button>
              <button
                onClick={() => handleNavigation('/events#past')}
                className={`${textColor} ${hoverColor} transition-colors text-left`}
              >
                Past Events
              </button>
              <button
                onClick={() => handleNavigation('/campfire')}
                className={`${textColor} ${hoverColor} transition-colors text-left`}
              >
                Campus
              </button>
              <button
                onClick={() => handleNavigation('/contactPage/contact')}
                className={`${textColor} ${hoverColor} transition-colors text-left`}
              >
                About
              </button>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default FoundersNavigation;
