"use client";
import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Navigation from "../components/homepage/Navigation";
import { Footer } from "../components/footer";
import { ArrowRight } from "lucide-react";

export default function Campfire() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen bg-[hsl(142,76%,11%)] text-white">
      {/* Fixed Background */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url('/images/hero-camp.png')" }}
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Scrollable Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
          <div className="max-w-[1152px] mx-auto px-6 py-6 flex justify-between items-center">
            <Link href="/" className="text-xl font-medium hover:opacity-80 transition-opacity">
              Builder's Space
            </Link>
            <Link 
              href="/campfire-register" 
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              Register <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-20">
          <div className="max-w-[896px] w-full space-y-8 text-center">
            {/* Small Link */}
            <div 
              className="animate-fade-in-up-campfire"
              style={{ animationDelay: "0ms" }}
            >
              <Link 
                href="#who" 
                className="inline-flex items-center gap-2 text-sm opacity-70 hover:opacity-100 transition-opacity"
              >
                Meet the builders of Campfire <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Massive Title */}
            <h1 
              className="hero-title font-['League_Spartan'] font-bold animate-fade-in-up-campfire"
              style={{ animationDelay: "100ms" }}
            >
              Campfire
            </h1>

            {/* Label */}
            <div 
              className="label-mono animate-fade-in-up-campfire"
              style={{ animationDelay: "200ms" }}
            >
              BUILDERS • 22 FEB • LODHI GARDEN
            </div>

            {/* Tagline */}
            <p 
              className="text-3xl md:text-4xl lg:text-5xl font-light animate-fade-in-up-campfire"
              style={{ animationDelay: "300ms" }}
            >
              Picnic. People. Projects.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="px-6 md:px-12 lg:px-20 py-32">
          <div className="max-w-[896px] mx-auto space-y-32">
            {/* Intro Paragraphs */}
            <div className="space-y-8">
              <p className="prose-camp">
                Before there were startups, there were campfires.
              </p>
              <p className="prose-camp">
                Before pitch decks, term sheets, and LinkedIn posts—there were just people, sitting around a fire, sharing ideas, stories, and dreams.
              </p>
              <p className="prose-camp">
                Most meetups feel transactional. Campfire is designed to feel human.
              </p>
            </div>

            {/* What is Campfire */}
            <div className="space-y-8">
              <div className="label-mono">WHAT IS CAMPFIRE?</div>
              <p className="prose-camp">
                Builder's Space Campfire Series is an open, casual meetup for people building things—whether it's a startup, a side project, or just an idea in your head.
              </p>
              <ul className="prose-camp space-y-4 list-none">
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">→</span>
                  <span>Talk about ideas & projects</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">→</span>
                  <span>Play games & do fun activities</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">→</span>
                  <span>Meet people without networking pressure</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">→</span>
                  <span>Share stories around a "campfire vibe"</span>
                </li>
              </ul>
              <p className="prose-camp">
                It's about community before clout, conversations before pitches, and connection before content.
              </p>
            </div>

            {/* Lodhi Garden Edition */}
            <div className="space-y-8">
              <div className="label-mono">CAMPFIRE #1 — LODHI GARDEN</div>
              <p className="prose-camp">
                This is the first edition of Campfire. We're meeting at Lodhi Garden on a Saturday afternoon. Bring a mat, bring your energy, and let's just vibe.
              </p>
              <p className="prose-camp">
                No stage. No mic. No pressure.
              </p>
              <p className="prose-camp">
                Just people, ideas, and good energy.
              </p>
            </div>

            {/* Who Should Come */}
            <div id="who" className="space-y-8">
              <div className="label-mono">WHO SHOULD COME?</div>
              <ul className="prose-camp space-y-4 list-none">
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">→</span>
                  <span>Builders & developers</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">→</span>
                  <span>Startup founders & solopreneurs</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">→</span>
                  <span>Designers, creators & community people</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">→</span>
                  <span>Anyone with an idea — or curiosity</span>
                </li>
              </ul>
              <p className="prose-camp">
                Whether you're building something or just thinking about it — you belong here.
              </p>
            </div>

            {/* Flow of the Meetup */}
            <div className="space-y-8">
              <div className="label-mono">FLOW OF THE MEETUP</div>
              <div className="space-y-6">
                <div className="flex gap-8 items-start">
                  <span className="text-sm font-mono text-gray-400 min-w-[100px]">12:00 PM</span>
                  <span className="prose-camp-sm">Arrival & casual intros</span>
                </div>
                <div className="flex gap-8 items-start">
                  <span className="text-sm font-mono text-gray-400 min-w-[100px]">12:20 PM</span>
                  <span className="prose-camp-sm">Icebreakers + fun games</span>
                </div>
                <div className="flex gap-8 items-start">
                  <span className="text-sm font-mono text-gray-400 min-w-[100px]">12:50 PM</span>
                  <span className="prose-camp-sm">Builder circle — ideas, stories, projects</span>
                </div>
                <div className="flex gap-8 items-start">
                  <span className="text-sm font-mono text-gray-400 min-w-[100px]">1:30 PM</span>
                  <span className="prose-camp-sm">Free networking, photos, chill</span>
                </div>
              </div>
              <p className="text-sm text-gray-400 italic">
                (Flexible, vibe-based — not rigid.)
              </p>
            </div>

            {/* What to Bring */}
            <div className="space-y-8">
              <div className="label-mono">WHAT TO BRING</div>
              <ul className="prose-camp space-y-4 list-none">
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">→</span>
                  <span>A mat / cloth to sit on</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">→</span>
                  <span>Water bottle</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">→</span>
                  <span>Snacks (optional, sharing welcome)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">→</span>
                  <span>Your ideas, curiosity, and good energy</span>
                </li>
              </ul>
            </div>

            {/* Why We're Doing This */}
            <div className="space-y-8">
              <div className="label-mono">WHY WE'RE DOING THIS</div>
              <p className="prose-camp">
                Most meetups feel transactional.
              </p>
              <p className="prose-camp">
                Campfire is designed to feel human.
              </p>
              <div className="space-y-4 prose-camp">
                <p>We want builders to feel seen.</p>
                <p>Feel relaxed.</p>
                <p>Feel part of something.</p>
              </div>
              <p className="prose-camp">
                This isn't about pitching. It's about belonging.
              </p>
            </div>

            {/* Event Details */}
            <div className="space-y-8 border-t border-[hsl(142,40%,22%)] pt-16">
              <div className="label-mono">EVENT DETAILS</div>
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:gap-8">
                  <span className="text-sm text-gray-400 min-w-[120px] uppercase tracking-wider">NAME</span>
                  <span className="prose-camp-sm">Builder's Space — Campfire Series #1</span>
                </div>
                <div className="flex flex-col md:flex-row md:gap-8">
                  <span className="text-sm text-gray-400 min-w-[120px] uppercase tracking-wider">LOCATION</span>
                  <span className="prose-camp-sm">Lodhi Garden, Delhi</span>
                </div>
                <div className="flex flex-col md:flex-row md:gap-8">
                  <span className="text-sm text-gray-400 min-w-[120px] uppercase tracking-wider">DATE</span>
                  <span className="prose-camp-sm">22 February</span>
                </div>
                <div className="flex flex-col md:flex-row md:gap-8">
                  <span className="text-sm text-gray-400 min-w-[120px] uppercase tracking-wider">TIME</span>
                  <span className="prose-camp-sm">12:00 PM – 2:00 PM</span>
                </div>
              </div>
              <button
                onClick={() => router.push('/campfire-register')}
                className="mt-8 px-8 py-4 bg-white text-[hsl(142,76%,11%)] font-medium hover:opacity-90 transition-opacity flex items-center gap-2 group"
              >
                Register Now 
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-[hsl(142,40%,22%)] px-6 md:px-12 lg:px-20 py-12">
          <div className="max-w-[1152px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
              <div>
                <h3 className="text-2xl font-['League_Spartan'] font-bold mb-2">Campfire</h3>
                <p className="text-sm text-gray-400">by Builder's Space</p>
              </div>
              <div className="text-sm text-gray-400">
                <p>Lodhi Garden, Delhi</p>
                <p>22 February, 12:00 PM – 2:00 PM</p>
              </div>
            </div>
            <div className="text-sm text-gray-400 text-center md:text-left">
              © 2025 Builder's Space
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
