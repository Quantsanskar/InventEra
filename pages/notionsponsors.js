// app/sponsors/page.js
export const metadata = {
    title: "Nights S1 Sponsors",
    description: "Sponsorship opportunities for Nights Season 1",
}

export default function SponsorsPage() {
    return (
        <div className="min-h-screen w-full bg-black">
            <main className="w-full min-h-screen bg-black text-white px-8 md:px-16 py-12">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-4xl font-bold mb-12">Builder's Space</h1>
                    <p className="text-2xl mb-2">Empowering Innovators, Creators, and Visionaries</p>
                    <p className="text-xl italic mb-8">Where Ideas Take Shape and Dreams Become Reality</p>

                    {/* About Section */}
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold mb-6">About Nights S1</h2>
                        <div className="space-y-4">
                            <p className="text-lg">
                                Nights S1 is more than an event; it's a movement. It's a place where dreamers meet doers,
                                where artists and technologists collaborate, and where creators across all fields come
                                together to inspire and innovate.
                            </p>
                            <div>
                                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                                <p className="text-lg">
                                    To provide a platform that nurtures creativity, fosters collaboration, and empowers
                                    individuals from diverse domains to turn ideas into impactful projects.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                                <p className="text-lg">
                                    A world where every creator has the tools, community, and opportunities to bring
                                    their vision to life.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Sponsorship Tiers Section */}
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold mb-6">Sponsorship Tiers</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Platinum Tier */}
                            <div className="bg-zinc-900 p-6 rounded-lg">
                                <h3 className="text-2xl font-bold mb-4">Platinum Sponsor</h3>
                                <p className="text-3xl font-bold mb-4">₹60,000</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Everything from Gold and Silver tiers</li>
                                    <li>Largest custom booth at the event</li>
                                    <li>Logo on attendee badges and conference materials</li>
                                    <li>Speaking slot in all tracks</li>
                                    <li>VIP networking access</li>
                                </ul>
                            </div>

                            {/* Gold Tier */}
                            <div className="bg-zinc-900 p-6 rounded-lg">
                                <h3 className="text-2xl font-bold mb-4">Gold Sponsor</h3>
                                <p className="text-3xl font-bold mb-4">₹35,000</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Custom booth in prime location</li>
                                    <li>Pre-event email and social media shoutouts</li>
                                    <li>Dedicated spotlight in event sessions</li>
                                    <li>10 free event passes</li>
                                </ul>
                            </div>

                            {/* Silver Tier */}
                            <div className="bg-zinc-900 p-6 rounded-lg">
                                <h3 className="text-2xl font-bold mb-4">Silver Sponsor</h3>
                                <p className="text-3xl font-bold mb-4">₹20,000</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Booth space in event area</li>
                                    <li>Logo on event website and promotional materials</li>
                                    <li>5 free event passes</li>
                                    <li>Social media mentions</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Why Sponsor Section */}
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold mb-6">Why Sponsor Builder's Space?</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-2xl font-bold mb-4">Brand Visibility</h3>
                                <p className="text-lg">
                                    Showcase your brand to a diverse audience of students, professionals, and innovators.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-4">Talent Engagement</h3>
                                <p className="text-lg">
                                    Access a pool of skilled individuals for recruitment and collaboration.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-4">Community Impact</h3>
                                <p className="text-lg">
                                    Strengthen your brand's presence by supporting creativity and innovation.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-4">Networking</h3>
                                <p className="text-lg">
                                    Connect with industry leaders, creators, and visionaries.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Contact Section */}
                    <section>
                        <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
                        <div className="space-y-4">
                            <p className="text-lg">
                                <strong>Email:</strong> buildersspace9@gmail.com
                            </p>
                            <p className="text-lg">
                                <strong>Phone:</strong> +91 7088963373
                            </p>
                            <div className="mt-8">
                                <h3 className="text-2xl font-bold mb-4">Follow Us</h3>
                                <div className="space-y-2">
                                    <p className="text-lg">Instagram: @builders.space</p>
                                    <p className="text-lg">Twitter: @Builders_space9</p>
                                    <p className="text-lg">LinkedIn: Builder's Space</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    )
}