import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  MapPin,
  Mail,
  ArrowRight,
} from 'lucide-react';
import Navigation from '../components/homepage/Navigation';
import { Footer } from '../components/footer';

const FoundersEvent = () => {
  const [email, setEmail] = useState('');

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
      title: 'Chainlink 101',
      description:
        'Chainlink 101 is a beginner-friendly meetup designed to introduce students and early-stage developers to blockchain infrastructure and how smart contracts connect to real-world data using oracles.',
      categories: ['web3', 'Panel Discussion', 'Networking'],
      date: 'Feb 21, 2026',
      time: '11:00 AM - 4:00 PM',
      location: ' UrbanWrk, Sector 43, Gurugram',
      poster: '/images/events/chainlink.png',
      rsvpLink: 'https://www.commudle.com/fill-form/4439', // Add your registration link here
    },
    {
      id: 2,
      featured: false,
      title: 'Campfire',
      description:
        "Builder's Space Campfire Series is an open, casual meetup for people building things—whether it's a startup, a side project, or just an idea in your head.",
      categories: ['Startups', 'Fireside Chat', 'Q&A'],
      date: 'Feb 22, 2026',
      time: '12:00 PM - 2:00 PM',
      location: 'Lodhi Garden,Delhi',
      poster: '/images/events/Campfire (2).png',
      rsvpLink: 'https://www.builders-space.tech/campfire', // Add your registration link here
    }
  ];

  const pastEventsGallery = [
    {
      id: 1,
      title: 'Founder Networking Mixer',
      date: 'Feb 2, 2026',
      image: '/images/events/2.jpg',
      rotation: -3,
      delay: 0,
    },
    {
      id: 2,
      title: 'Winter Hackathon 2026',
      date: 'Jan 20-22, 2026',
      image: '/images/events/8.jpg',
      rotation: 2,
      delay: 0.1,
    },
    {
      id: 3,
      title: 'Tech Leadership Panel',
      date: 'Jan 15, 2026',
      image: '/images/events/1.jpg',
      rotation: -2,
      delay: 0.2,
    },
    {
      id: 4,
      title: 'Startup Demo Day',
      date: 'Dec 10, 2025',
      image: '/images/events/9.jpg',
      rotation: 3,
      delay: 0.3,
    },
    {
      id: 5,
      title: 'Product Design Workshop',
      date: 'Nov 28, 2025',
      image: '/images/events/3.jpg',
      rotation: -1,
      delay: 0.4,
    },
    {
      id: 6,
      title: 'Investor Fireside Chat',
      date: 'Nov 12, 2025',
      image: '/images/events/7.jpg',
      rotation: 2,
      delay: 0.5,
    },
    {
      id: 7,
      title: 'AI Workshop Series',
      date: 'Oct 25, 2025',
      image: '/images/events/4.JPG',
      rotation: -2,
      delay: 0.6,
    },
    {
      id: 8,
      title: 'Founder Stories Night',
      date: 'Oct 10, 2025',
      image: '/images/events/6.jpg',
      rotation: 1,
      delay: 0.7,
    },
  ];

  const eventVideos = [
    {
      id: 1,
      title: 'Builders Space Event Highlights',
      description: 'Watch highlights from our latest community events and builder showcases.',
      thumbnail: 'https://img.youtube.com/vi/sKlYxVrZyxA/maxresdefault.jpg',
      duration: '10:30',
      date: 'February 1, 2026',
      views: '2.5K',
      youtubeUrl: 'https://youtu.be/sKlYxVrZyxA?si=UoRzoJoznXdOO88x',
    },
    {
      id: 2,
      title: 'Nights S1 Recap',
      description: 'A recap of the most exciting moments from Nights Season 1 hackathon.',
      thumbnail: 'https://img.youtube.com/vi/J4j_TETFS_k/maxresdefault.jpg',
      duration: '15:45',
      date: 'August 20, 2025',
      views: '5.2K',
      youtubeUrl: 'https://youtu.be/J4j_TETFS_k?si=i-1Up-M_H-CBwCj8',
    },
    {
      id: 3,
      title: 'IRL Meetup Experience',
      description: 'Experience the energy and collaboration from our IRL community meetup.',
      thumbnail: 'https://img.youtube.com/vi/Pyd0yAo_feM/maxresdefault.jpg',
      duration: '8:15',
      date: 'June 22, 2025',
      views: '3.8K',
      youtubeUrl: 'https://youtu.be/Pyd0yAo_feM?si=Fm54R-DlgSYYiYOe',
    },
    {
      id: 4,
      title: 'Community Showcase',
      description: 'Discover amazing projects and innovations from our builder community.',
      thumbnail: 'https://img.youtube.com/vi/Ef0eN9Ts9hE/maxresdefault.jpg',
      duration: '12:20',
      date: 'December 15, 2025',
      views: '4.1K',
      youtubeUrl: 'https://youtu.be/Ef0eN9Ts9hE?si=h39FFKDMvaWD73qJ',
    },
  ];

  const pastEventsDetailed = [
    {
      id: 1,
      title: "Found'd",
      description:
        "Found’d is a meetup for the doers — the people who built something real.Whether it’s a startup, a small business, an app, a YouTube channel, a product, a club, a brand, or even a side project — if you made it happen, you belong here.",
      categories: ['Networking', 'Social', 'Founders'],
      date: 'Jan 18, 2026',
      time: '11:00 AM - 4:00 PM',
      location: "Master's Union,Gurugram",
      attendees: '400+ Intrested',
      poster: '/images/events/found.png',
    },
    {
      id: 2,
      title: 'IRL Meetup',
      description:"The Builder’s Space IRL Meetup is more than just an event—it’s a celebration of creativity, innovation, and collaboration. Designed for builders of all backgrounds, this day-long gathering brings together developers, designers, founders, product enthusiasts, and tech lovers to connect, share, and grow.",
      categories: ['Meetup','IRL','Gathering'],
      date: 'June 22, 2025',
      time: '10:00 AM - 4:00 PM',
      location: 'IIIT,Delhi',
      attendees: '300+ Intrested',
      poster: '/images/events/IRL Meetup.png',
    },
    {
      id: 3,
      title: 'Nights S1',
      description:"Nights Season 1 is an exciting event where people from all fields come together to work on their ideas and create amazing projects. Whether you're into tech, design, business, entertainment, or robotics, there's a theme (or house) for everyone",
      categories: ['Cohort','Hackathon','Flagship'],
      date: 'Aug 17,2025',
      time: '3 weeks + Demo Day',
      location: 'Discord',
      attendees: '900+ Intrested',
      poster: '/images/events/nights s1.png',
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
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-finc-bg/60 z-10"></div>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/videos/event-hero-bg.mp4" type="video/mp4" />
          </video>
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
              className="inline-flex items-center text-finc-accent hover:text-finc-accent/80 mb-6 md:mb-8 transition-colors drop-shadow-lg"
            >
              View upcoming events <ArrowRight className="ml-2" size={18} />
            </motion.a>

            <motion.h1
              variants={itemVariants}
              className="heading-display font-normal mb-6 md:mb-8 drop-shadow-lg"
            >
              Where builders gather.
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-body-large text-finc-muted-fg mb-12 md:mb-16 max-w-2xl mx-auto drop-shadow-lg"
            >
              Join Builder’s Space — a school for ideas — where we host campfires, cohorts, events, and hackathons to spark learning, build real projects, and connect with founders, builders, and creators.

            </motion.p>

            {/* Stats Row */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-12 mb-16"
            >
              <motion.div variants={itemVariants} className="backdrop-blur-sm bg-finc-card/80 rounded-2xl p-4">
                <div className="text-3xl md:text-4xl font-instrument-serif mb-2">
                  6+
                </div>
                <div className="text-finc-muted-fg">Events hosted</div>
              </motion.div>
              <motion.div variants={itemVariants} className="backdrop-blur-sm bg-finc-card/80 rounded-2xl p-4">
                <div className="text-3xl md:text-4xl font-instrument-serif mb-2">
                  4k+
                </div>
                <div className="text-finc-muted-fg">Builders</div>
              </motion.div>
              <motion.div variants={itemVariants} className="backdrop-blur-sm bg-finc-card/80 rounded-2xl p-4">
                <div className="text-3xl md:text-4xl font-instrument-serif mb-2">
                  100+
                </div>
                <div className="text-finc-muted-fg">Builders</div>
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
                  className="bg-finc-card border-2 border-finc-border rounded-2xl overflow-hidden hover:border-finc-accent/30 transition-all duration-300"
                >
                  {/* Event Poster */}
                  <div className="relative w-full aspect-[21/8] overflow-hidden bg-finc-border group">
                    <img
                      src={event.poster}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-finc-fg/50 to-transparent"></div>
                    {event.featured && (
                      <div className="absolute top-4 left-4 inline-flex items-center bg-finc-accent px-3 py-1.5 rounded-full">
                        <div className="w-2 h-2 rounded-full bg-finc-fg mr-2"></div>
                        <span className="text-finc-fg text-sm font-medium">
                          Featured
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Event Content */}
                  <div className="p-6 md:p-8">
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

                      <a 
                        href={event.rsvpLink} 
                        className="px-6 py-2 border-2 border-finc-fg rounded-full hover:bg-finc-accent hover:border-finc-accent hover:text-finc-bg transition-all duration-300 inline-flex items-center justify-center"
                      >
                        RSVP <ArrowRight className="ml-2" size={16} />
                      </a>
                    </div>
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
                    style={{
                      filter: 'sepia(40%) contrast(85%) brightness(95%) saturate(70%)'
                    }}
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
                  className="bg-finc-card border-2 border-finc-border rounded-2xl overflow-hidden hover:border-finc-accent/20 transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row gap-6 p-6 md:p-8">
                    {/* Small Event Poster Thumbnail */}
                    <div className="relative w-full sm:w-48 sm:flex-shrink-0 aspect-[4/3] overflow-hidden rounded-xl bg-finc-border group">
                      <img
                        src={event.poster}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-finc-fg/40 to-transparent"></div>
                    </div>

                    {/* Event Content */}
                    <div className="flex-1 min-w-0">
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
                <motion.a
                  key={video.id}
                  href={video.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={itemVariants}
                  custom={index}
                  className="bg-finc-card border-2 border-finc-border rounded-2xl overflow-hidden hover:border-finc-accent/30 transition-all duration-300 group cursor-pointer block"
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
                </motion.a>
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
      <Footer />
    </div>
  );
};

export default FoundersEvent;
