import React from "react";

export default function BuildersSpace() {
  return (
    <div className="min-h-screen w-full bg-black">
      <main className="w-full min-h-screen bg-black text-white px-8 md:px-16 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Builder&apos;s Space</h1>
          <p className="text-xl italic mb-12">Build cool stuff. With cooler people.</p>

          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Okay, so...what is this?</h2>
            <p className="mb-6">We&apos;re <strong>Builder&apos;s Space</strong>—a platform where anyone from <strong>tech wizards</strong> to <strong>paintbrush-wielding maniacs</strong> can build, showcase, and share their wildest ideas. It&apos;s like Hogwarts for creators but with fewer owls and more memes.</p>
            <p className="mb-6">Whether you&apos;re coding a groundbreaking app, directing a short film, crafting a new Michelin-star recipe, or creating the next viral dance trend—this is where you belong.</p>
            <p className="mb-6 font-bold">Oh, and did we mention? No degrees. No boring lectures. Just you, your passion, and a gang of equally ambitious misfits.</p>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">What&apos;s the vibe?</h2>
            <p className="mb-6">Imagine a place where:</p>
            <div className="space-y-4 mb-6">
              <p>🎨 Artists vibe with developers.</p>
              <p>🛠 Hackers team up with chefs.</p>
              <p>🎮 Gamers share tips with filmmakers.</p>
            </div>
            <p>You bring the spark, we bring the fuel (and the pizza 🍕). It&apos;s all about collaboration, creativity, and a little bit of chaos.</p>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">What&apos;s the point of all this?</h2>
            <p className="mb-6">Good question. We&apos;re building a <strong>new system for creators</strong>, one that&apos;s not stuck in the hamster wheel of &quot;get a degree → grind at a job you hate → repeat.&quot;</p>
            <p className="mb-4">Here&apos;s what we think:</p>
            <ul className="list-disc pl-8 mb-6 space-y-2">
              <li>Passion {'>'} Prestige</li>
              <li>Collaboration {'>'} Competition</li>
              <li>Building {'>'} Dreaming (but dreaming&apos;s cool too)</li>
            </ul>
            <p>Our goal? To help you create what you love and turn it into something real—whether that&apos;s your next paycheck, a viral hit, or just a killer portfolio piece.</p>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">What do you get?</h2>
            <div className="space-y-8">
              <div>
                <p className="font-bold mb-2">🚀 A Launchpad for Your Ideas</p>
                <p>Start with a sketch, end with something you can actually show off (or sell, no pressure).</p>
              </div>
              <div>
                <p className="font-bold mb-2">🤝 A Community of Builders</p>
                <p>Find your tribe. Collaborate, get feedback, and maybe even find your next business partner.</p>
              </div>
              <div>
                <p className="font-bold mb-2">🎉 Events That Slap</p>
                <p>Think hackathons, art expos, film screenings, and probably some karaoke (we&apos;re serious about this one).</p>
              </div>
              <div>
                <p className="font-bold mb-2">🌐 Global Recognition</p>
                <p>Your work deserves the spotlight. We&apos;ll help you share it with the world.</p>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Wait, can I join?</h2>
            <p className="italic mb-4">Can you build stuff?</p>
            <div className="mb-6">
              <p className="mb-2">No?</p>
              <p>Cool. We&apos;ll teach you.</p>
            </div>
            <div className="mb-6">
              <p className="mb-2">Yes?</p>
              <p>Cool. Come show off.</p>
            </div>
            <p>Basically, if you&apos;ve got ideas and a desire to create, you&apos;re in. Doesn&apos;t matter if you&apos;re a noob or a pro—<strong>we&apos;ve got room for everyone.</strong></p>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">2025 is BIG.</h2>
            <p className="mb-4">We&apos;ve got plans, and they&apos;re spicy 🌶️:</p>
            <ul className="list-disc pl-8 space-y-2">
              <li>Launching Builder&apos;s Space (<em>bigger, better, shinier</em>).</li>
              <li>More events. More chaos. More memes.</li>
              <li>Building a product that makes this whole thing <em>even easier</em> for you.</li>
              <li>Oh, and <em>we&apos;re hiring</em>!</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">Ready to build?</h2>
            <p className="mb-4">We&apos;re here to help you turn your ideas into reality. It&apos;s time to stop thinking, start creating, and maybe even change the world. (Or at least impress your friends.)</p>
            <p className="mb-4">👉 Join Builder&apos;s Space</p>
            <p>Let&apos;s build something awesome together.</p>
          </section>
        </div>
      </main>
    </div>
  )
}