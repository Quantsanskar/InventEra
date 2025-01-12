"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { IconBrandGithub, IconBrandTwitter, IconBrandLinkedin, IconMail, IconBrandDiscord, IconMapPin } from '@tabler/icons-react';

const FooterLink = ({ href, children }) => (
  <Link 
    href={href} 
    className="group relative inline-block"
  >
    <motion.span 
      className="text-neutral-300 hover:text-cyan-400 transition-colors relative inline-block"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {children}
      <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-cyan-400 group-hover:w-full transition-all duration-300 ease-out" />
    </motion.span>
  </Link>
);

const SocialIcon = ({ href, icon: Icon, label }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    whileHover={{ scale: 1.1, y: -2 }}
    className="p-3 rounded-full bg-neutral-900 hover:bg-neutral-800 transition-colors text-neutral-400 hover:text-cyan-400 relative group"
  >
    <Icon className="w-5 h-5" strokeWidth={1.5} />
    <div className="absolute inset-0 -z-10 rounded-full bg-cyan-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
  </motion.a>
);

const ContactItem = ({ icon: Icon, children }) => (
  <div className="flex items-center space-x-2 text-neutral-400 group">
    <Icon className="w-5 h-5 text-neutral-500 group-hover:text-cyan-400 transition-colors" strokeWidth={1.5} />
    <span className="group-hover:text-neutral-300 transition-colors">{children}</span>
  </div>
);

export const Footer = () => {
  return (
    <footer className="relative w-full bg-black border-t border-neutral-800">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/5 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent opacity-50" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
              Builder's Space
            </h2>
            <p className="text-neutral-400 max-w-md">
              Join our community of creators, developers, and innovators. Build something amazing together.
            </p>
            <div className="flex space-x-4">
              <SocialIcon href="https://github.com" icon={IconBrandGithub} label="GitHub" />
              <SocialIcon href="https://twitter.com" icon={IconBrandTwitter} label="Twitter" />
              <SocialIcon href="https://linkedin.com" icon={IconBrandLinkedin} label="LinkedIn" />
              <SocialIcon href="https://discord.gg" icon={IconBrandDiscord} label="Discord" />
            </div>
          </div>

          {/* Quick Links */}
          <nav className="space-y-6">
            <h3 className="text-white font-semibold">Quick Links</h3>
            <ul className="space-y-3">
              <li><FooterLink href="/about">About Us</FooterLink></li>
              <li><FooterLink href="/events">Events</FooterLink></li>
              <li><FooterLink href="/blog">Blog</FooterLink></li>
              <li><FooterLink href="/careers">Careers</FooterLink></li>
            </ul>
          </nav>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-white font-semibold">Contact</h3>
            <div className="space-y-3">
              <ContactItem icon={IconMail}>
                buildersspace9@gmail.com
              </ContactItem>
              <ContactItem icon={IconMapPin}>
                New Delhi, India
              </ContactItem>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-neutral-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-neutral-400 text-sm">
              © {new Date().getFullYear()} Builder's Space. All rights reserved.
            </p>
            <nav className="flex space-x-6 text-sm">
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href="/terms">Terms of Service</FooterLink>
              <FooterLink href="/cookies">Cookie Policy</FooterLink>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};
