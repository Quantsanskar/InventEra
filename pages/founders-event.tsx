import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  MapPin,
  Mail,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  ArrowRight,
  Menu,
  X,
  Play,
} from 'lucide-react';

const FoundersEvent = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const polaroidVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  // Event data
  const upcomingEvents = [
    {
      id: 1,
      featured: true,
      title: 'AI & The Future of Work',
      description:
        'Join industry leaders for an intimate discussion on how artificial intelligence is reshaping the future of work, productivity, and human creativity.',
      categories: ['AI', 'Panel Discussion', 'Networking'],
      date: 'March 15, 2026',
      time: '6:00 PM - 9:00 PM',
      location: 'Fort Mason Campus, Building A',
    },
    {
      id: 2,
      featured: false,
      title: 'YC Founder Fireside Chat',
      description:
        'An intimate conversation with Y Combinator alumni about their journey from idea to exit, lessons learned, and advice for aspiring founders.',
      categories: ['Startups', 'Fireside Chat', 'Q&A'],
      date: 'March 22, 2026',
      time: '7:00 PM - 9:00 PM',
      location: 'Fort Mason Campus, Main Hall',
    },
    {
      id: 3,
      featured: false,
      title: 'Web3 Demo Day',
      description:
        'Watch the latest Web3 startups pitch their groundbreaking ideas. Network with founders, investors, and blockchain enthusiasts.',
      categories: ['Web3', 'Demo Day', 'Pitching'],
      date: 'April 5, 2026',
      time: '5:00 PM - 10:00 PM',
      location: 'Fort Mason Campus, Innovation Lab',
    },
  ];

  const pastEventsGallery = [
    {
      id: 1,
      title: 'Founder Networking Mixer',
      date: 'Feb 2, 2026',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=80',
      rotation: -3,
      delay: 0,
    },
    {
      id: 2,
      title: 'Winter Hackathon 2026',
      date: 'Jan 20-22, 2026',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80',
      rotation: 2,
      delay: 0.1,
    },
    {
      id: 3,
      title: 'Tech Leadership Panel',
      date: 'Jan 15, 2026',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',
      rotation: -2,
      delay: 0.2,
    },
    {
      id: 4,
      title: 'Startup Demo Day',
      date: 'Dec 10, 2025',
      image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80',
      rotation: 3,
      delay: 0.3,
    },
    {
      id: 5,
      title: 'Product Design Workshop',
      date: 'Nov 28, 2025',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80',
      rotation: -1,
      delay: 0.4,
    },
    {
      id: 6,
      title: 'Investor Fireside Chat',
      date: 'Nov 12, 2025',
      image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=600&q=80',
      rotation: 2,
      delay: 0.5,
    },
    {
      id: 7,
      title: 'AI Workshop Series',
      date: 'Oct 25, 2025',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80',
      rotation: -2,
      delay: 0.6,
    },
    {
      id: 8,
      title: 'Founder Stories Night',
      date: 'Oct 10, 2025',
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&q=80',
      rotation: 1,
      delay: 0.7,
    },
  ];

  const eventVideos = [
    {
      id: 1,
      title: 'AI & Future of Work - Full Panel Discussion',
      description: 'Watch the complete panel discussion with industry leaders discussing AI impact.',
      thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',
      duration: '45:30',
      date: 'March 15, 2026',
      views: '12.5K',
    },
    {
      id: 2,
      title: 'Hackathon 2026 Highlights',
      description: 'A recap of the most exciting moments from our 48-hour Winter Hackathon.',
      thumbnail: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
      duration: '8:45',
      date: 'January 22, 2026',
      views: '8.2K',
    },
    {
      id: 3,
      title: 'YC Founder Fireside Chat',
      description: 'An intimate conversation about the journey from idea to successful exit.',
      thumbnail: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&q=80',
      duration: '52:15',
      date: 'January 10, 2026',
      views: '15.3K',
    },
  ];

  const pastEventsDetailed = [
    {
      id: 1,
      title: 'Founder Networking Mixer',
      description:
        'Over 150 founders connected over craft cocktails and meaningful conversations. Featured lightning talks from three successful entrepreneurs who shared their journey from zero to Series A.',
      categories: ['Networking', 'Social', 'Founders'],
      date: 'February 2, 2026',
      time: '6:00 PM - 10:00 PM',
      location: 'Fort Mason Campus, Rooftop Terrace',
      attendees: '150+',
    },
    {
      id: 2,
      title: 'Winter Hackathon 2026',
      description:
        'A 48-hour coding marathon where 200+ developers built innovative solutions for climate tech challenges. Five winning teams received $50K in total prizes and mentorship from industry leaders.',
      categories: ['Hackathon', 'Competition', 'Climate Tech'],
      date: 'January 20-22, 2026',
      time: 'All Weekend',
      location: 'Fort Mason Campus, Full Facility',
      attendees: '200+',
    },
    {
      id: 3,
      title: 'Tech Leadership Panel',
      description:
        'CTOs and engineering leaders from top Bay Area companies shared insights on building high-performing teams, scaling infrastructure, and navigating technical challenges at hypergrowth startups.',
      categories: ['Leadership', 'Panel', 'Engineering'],
      date: 'January 15, 2026',
      time: '7:00 PM - 9:00 PM',
      location: 'Fort Mason Campus, Main Hall',
      attendees: '120+',
    },
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription logic
    console.log('Subscribing:', email);
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-finc-bg font-instrument-sans text-finc-fg">
      {/* Fixed Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-finc-bg/80 backdrop-blur-lg border-b border-finc-border shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="font-instrument-serif text-xl md:text-2xl font-normal">
              Founders, Inc.
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#upcoming"
                className="text-finc-fg hover:text-finc-accent transition-colors"
              >
                Upcoming
              </a>
              <a
                href="#past"
                className="text-finc-fg hover:text-finc-accent transition-colors"
              >
                Past Events
              </a>
              <a
                href="#campus"
                className="text-finc-fg hover:text-finc-accent transition-colors"
              >
                Campus
              </a>
              <a
                href="#about"
                className="text-finc-fg hover:text-finc-accent transition-colors"
              >
                About
              </a>
            </nav>

            {/* CTA Button */}
            <div className="flex items-center space-x-4">
              <button className="hidden sm:block px-4 md:px-6 py-2 border-2 border-finc-fg rounded-full hover:bg-finc-fg hover:text-finc-bg transition-all duration-300">
                Host Event
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2"
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
              className="md:hidden py-4 border-t border-finc-border"
            >
              <nav className="flex flex-col space-y-4">
                <a
                  href="#upcoming"
                  className="text-finc-fg hover:text-finc-accent transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Upcoming
                </a>
                <a
                  href="#past"
                  className="text-finc-fg hover:text-finc-accent transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Past Events
                </a>
                <a
                  href="#campus"
                  className="text-finc-fg hover:text-finc-accent transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Campus
                </a>
                <a
                  href="#about"
                  className="text-finc-fg hover:text-finc-accent transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </a>
              </nav>
            </motion.div>
          )}
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        {/* Background architectural illustration */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-b from-finc-bg/50 to-finc-bg"></div>
          <svg
            className="w-full h-full"
            viewBox="0 0 1200 800"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 400 L200 200 L300 400 M200 200 L200 600 M150 300 L250 300 M150 350 L250 350 M150 400 L250 400 M150 450 L250 450"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
              opacity="0.3"
            />
            <path
              d="M400 350 L500 150 L600 350 M500 150 L500 600 M450 250 L550 250 M450 300 L550 300 M450 350 L550 350 M450 400 L550 400"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
              opacity="0.3"
            />
            <path
              d="M800 300 L900 100 L1000 300 M900 100 L900 600 M850 200 L950 200 M850 250 L950 250 M850 300 L950 300 M850 350 L950 350"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
              opacity="0.3"
            />
          </svg>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.a
              variants={itemVariants}
              href="#upcoming"
              className="inline-flex items-center text-finc-accent hover:text-finc-accent/80 mb-6 md:mb-8 transition-colors"
            >
              View upcoming events <ArrowRight className="ml-2" size={18} />
            </motion.a>

            <motion.h1
              variants={itemVariants}
              className="heading-display font-normal mb-6 md:mb-8"
            >
              Where builders gather.
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-body-large text-finc-muted-fg mb-12 md:mb-16 max-w-2xl mx-auto"
            >
              Join us at our Fort Mason campus for inspiring talks, hands-on
              workshops, and meaningful connections with fellow founders and
              creators.
            </motion.p>

            {/* Stats Row */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-12"
            >
              <motion.div variants={itemVariants}>
                <div className="text-3xl md:text-4xl font-instrument-serif mb-2">
                  200+
                </div>
                <div className="text-finc-muted-fg">Events hosted</div>
              </motion.div>
              <motion.div variants={itemVariants}>
                <div className="text-3xl md:text-4xl font-instrument-serif mb-2">
                  15K+
                </div>
                <div className="text-finc-muted-fg">Attendees</div>
              </motion.div>
              <motion.div variants={itemVariants}>
                <div className="text-3xl md:text-4xl font-instrument-serif mb-2">
                  42K
                </div>
                <div className="text-finc-muted-fg">Sq ft campus</div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section id="upcoming" className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 md:mb-16">
              <div>
                <motion.div
                  variants={itemVariants}
                  className="inline-flex items-center mb-4"
                >
                  <div className="w-2 h-2 rounded-full bg-finc-accent mr-2"></div>
                  <span className="text-finc-accent font-medium">
                    Coming Soon
                  </span>
                </motion.div>
                <motion.h2
                  variants={itemVariants}
                  className="heading-section font-normal"
                >
                  Upcoming Events
                </motion.h2>
              </div>
              <motion.button
                variants={itemVariants}
                className="mt-4 sm:mt-0 text-finc-fg hover:text-finc-accent transition-colors inline-flex items-center"
              >
                View calendar <ArrowRight className="ml-2" size={18} />
              </motion.button>
            </div>

            <div className="space-y-6">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  variants={itemVariants}
                  custom={index}
                  className="bg-finc-card border-2 border-finc-border rounded-2xl p-6 md:p-8 hover:border-finc-accent/30 transition-all duration-300"
                >
                  {event.featured && (
                    <div className="inline-flex items-center mb-4">
                      <div className="w-2 h-2 rounded-full bg-finc-accent mr-2"></div>
                      <span className="text-finc-accent text-sm font-medium">
                        Featured
                      </span>
                    </div>
                  )}

                  <h3 className="heading-section text-2xl md:text-3xl font-normal mb-4">
                    {event.title}
                  </h3>

                  <p className="text-finc-muted-fg mb-6 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {event.categories.map((category) => (
                      <span
                        key={category}
                        className="px-3 py-1 bg-finc-bg rounded-full text-sm"
                      >
                        {category}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex flex-col sm:flex-row gap-4 text-sm text-finc-muted-fg">
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-2" />
                        {event.date}
                      </div>
                      <div className="flex items-center">
                        <Clock size={16} className="mr-2" />
                        {event.time}
                      </div>
                      <div className="flex items-center">
                        <MapPin size={16} className="mr-2" />
                        {event.location}
                      </div>
                    </div>

                    <button className="px-6 py-2 border-2 border-finc-fg rounded-full hover:bg-finc-accent hover:border-finc-accent hover:text-finc-bg transition-all duration-300 inline-flex items-center justify-center">
                      RSVP <ArrowRight className="ml-2" size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Past Events Section */}
      <section id="past" className="py-16 md:py-24 bg-finc-bg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className="text-center mb-12 md:mb-16"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center mb-4"
            >
              <div className="w-2 h-2 rounded-full bg-finc-accent mr-2"></div>
              <span className="text-finc-accent font-medium">
                Looking Back
              </span>
            </motion.div>
            <motion.h2
              variants={itemVariants}
              className="heading-section font-normal"
            >
              Event Gallery
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 mb-12"
          >
            {pastEventsGallery.map((event, index) => (
              <motion.div
                key={event.id}
                variants={polaroidVariants}
                custom={index}
                initial={{ opacity: 0, y: 30, rotate: event.rotation }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0, 
                  rotate: event.rotation,
                  transition: {
                    type: 'spring',
                    stiffness: 100,
                    damping: 15,
                    delay: event.delay,
                  }
                }}
                viewport={{ once: true, margin: '-50px' }}
                style={{ rotate: event.rotation }}
                className="polaroid-card cursor-pointer"
                whileHover={{
                  scale: 1.05,
                  rotate: 0,
                  y: -10,
                  transition: {
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                  },
                }}
                animate={{
                  y: [0, -8, 0],
                  transition: {
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: event.delay * 2,
                  },
                }}
              >
                <div className="relative aspect-[3/4] overflow-hidden mb-3 bg-finc-border group">
                  <div className="absolute inset-0 bg-gradient-to-t from-finc-fg/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-instrument-serif text-base mb-1">
                  {event.title}
                </h3>
                <p className="text-finc-muted-fg text-xs">{event.date}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={itemVariants}
            className="text-center"
          >
            <button className="px-6 py-3 border-2 border-finc-fg rounded-full hover:bg-finc-fg hover:text-finc-bg transition-all duration-300 inline-flex items-center">
              View all events <ArrowRight className="ml-2" size={18} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Detailed Past Events Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
          >
            <div className="flex flex-col items-start mb-12 md:mb-16">
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center mb-4"
              >
                <div className="w-2 h-2 rounded-full bg-finc-muted-fg mr-2"></div>
                <span className="text-finc-muted-fg font-medium">
                  Event Highlights
                </span>
              </motion.div>
              <motion.h2
                variants={itemVariants}
                className="heading-section font-normal"
              >
                Past Events
              </motion.h2>
            </div>

            <div className="space-y-6">
              {pastEventsDetailed.map((event, index) => (
                <motion.div
                  key={event.id}
                  variants={itemVariants}
                  custom={index}
                  className="bg-finc-card border-2 border-finc-border rounded-2xl p-6 md:p-8 hover:border-finc-accent/20 transition-all duration-300"
                >
                  <h3 className="heading-section text-2xl md:text-3xl font-normal mb-4">
                    {event.title}
                  </h3>

                  <p className="text-finc-muted-fg mb-6 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {event.categories.map((category) => (
                      <span
                        key={category}
                        className="px-3 py-1 bg-finc-bg rounded-full text-sm"
                      >
                        {category}
                      </span>
                    ))}
                    <span className="px-3 py-1 bg-finc-accent/10 text-finc-accent rounded-full text-sm font-medium">
                      {event.attendees} attendees
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 text-sm text-finc-muted-fg">
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-2" />
                      {event.date}
                    </div>
                    <div className="flex items-center">
                      <Clock size={16} className="mr-2" />
                      {event.time}
                    </div>
                    <div className="flex items-center">
                      <MapPin size={16} className="mr-2" />
                      {event.location}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Videos Section */}
      <section className="py-16 md:py-24 bg-finc-bg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 md:mb-16">
              <div>
                <motion.div
                  variants={itemVariants}
                  className="inline-flex items-center mb-4"
                >
                  <div className="w-2 h-2 rounded-full bg-finc-accent mr-2"></div>
                  <span className="text-finc-accent font-medium">
                    Watch & Learn
                  </span>
                </motion.div>
                <motion.h2
                  variants={itemVariants}
                  className="heading-section font-normal"
                >
                  Event Videos
                </motion.h2>
              </div>
              <motion.button
                variants={itemVariants}
                className="mt-4 sm:mt-0 text-finc-fg hover:text-finc-accent transition-colors inline-flex items-center"
              >
                View all videos <ArrowRight className="ml-2" size={18} />
              </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {eventVideos.map((video, index) => (
                <motion.div
                  key={video.id}
                  variants={itemVariants}
                  custom={index}
                  className="bg-finc-card border-2 border-finc-border rounded-2xl overflow-hidden hover:border-finc-accent/30 transition-all duration-300 group cursor-pointer"
                >
                  <div className="relative aspect-video overflow-hidden bg-finc-border">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-finc-fg/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 rounded-full bg-finc-card/90 flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-finc-fg ml-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-finc-fg/90 text-finc-bg px-2 py-1 rounded text-xs font-medium">
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-instrument-serif text-lg mb-2 line-clamp-2">
                      {video.title}
                    </h3>
                    <p className="text-finc-muted-fg text-sm mb-4 line-clamp-2">
                      {video.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-finc-muted-fg">
                      <span>{video.date}</span>
                      <span>{video.views} views</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className="max-w-2xl mx-auto"
          >
            <motion.h2
              variants={itemVariants}
              className="heading-section font-normal text-center mb-6"
            >
              Never miss an event.
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-finc-muted-fg text-center mb-8"
            >
              Subscribe to our newsletter for updates on upcoming events,
              workshops, and exclusive invitations.
            </motion.p>

            <motion.form
              variants={itemVariants}
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <div className="flex-1 relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-finc-muted-fg"
                  size={20}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-3 border-2 border-finc-border rounded-full focus:outline-none focus:border-finc-accent transition-colors bg-finc-card"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-8 py-3 bg-finc-fg text-finc-bg rounded-full hover:bg-finc-accent hover:text-finc-fg transition-all duration-300 inline-flex items-center justify-center whitespace-nowrap"
              >
                Subscribe <ArrowRight className="ml-2" size={18} />
              </button>
            </motion.form>

            <motion.div
              variants={itemVariants}
              className="border-t border-finc-border pt-12 text-center"
            >
              <p className="text-finc-muted-fg mb-4">
                Want to host an event at our campus?
              </p>
              <button className="px-6 py-3 border-2 border-finc-fg rounded-full hover:bg-finc-fg hover:text-finc-bg transition-all duration-300 inline-flex items-center">
                Get in touch <ArrowRight className="ml-2" size={18} />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-finc-border py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Logo and tagline */}
            <div>
              <div className="font-instrument-serif text-xl mb-2">
                Founders, Inc.
              </div>
              <p className="text-finc-muted-fg text-sm">
                Where builders gather.
              </p>
            </div>

            {/* Footer links */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <a
                  href="#about"
                  className="block text-finc-muted-fg hover:text-finc-fg transition-colors text-sm"
                >
                  About
                </a>
                <a
                  href="#campus"
                  className="block text-finc-muted-fg hover:text-finc-fg transition-colors text-sm"
                >
                  Campus
                </a>
                <a
                  href="#events"
                  className="block text-finc-muted-fg hover:text-finc-fg transition-colors text-sm"
                >
                  Events
                </a>
              </div>
              <div className="space-y-2">
                <a
                  href="#contact"
                  className="block text-finc-muted-fg hover:text-finc-fg transition-colors text-sm"
                >
                  Contact
                </a>
                <a
                  href="#careers"
                  className="block text-finc-muted-fg hover:text-finc-fg transition-colors text-sm"
                >
                  Careers
                </a>
                <a
                  href="#press"
                  className="block text-finc-muted-fg hover:text-finc-fg transition-colors text-sm"
                >
                  Press
                </a>
              </div>
            </div>

            {/* Social links */}
            <div className="flex items-start justify-start md:justify-end space-x-4">
              <a
                href="#twitter"
                className="text-finc-muted-fg hover:text-finc-fg transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#instagram"
                className="text-finc-muted-fg hover:text-finc-fg transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#linkedin"
                className="text-finc-muted-fg hover:text-finc-fg transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#youtube"
                className="text-finc-muted-fg hover:text-finc-fg transition-colors"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-finc-border text-center text-finc-muted-fg text-sm">
            © 2026 Founders, Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FoundersEvent;
