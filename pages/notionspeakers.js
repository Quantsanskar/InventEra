// app/speakers/page.js
export const metadata = {
    title: "Nights S1 Speakers",
    description: 'Speaker lineup for Nights Season 1',
}

export default function SpeakersPage() {
    return (
        <div className="min-h-screen w-full bg-black">
            <main className="w-full min-h-screen bg-black text-white px-8 md:px-16 py-12">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-4xl font-bold mb-12">Nights S1 Speakers</h1>

                    <section className="mb-16">
                        <h2 className="text-2xl font-bold mb-6">1. Kicking Off with Vision</h2>
                        <p className="font-bold mb-2">Speaker: XYZ</p>
                        <p className="text-xl italic mb-4">"From Zero to One: Starting with Big Ideas"</p>
                        <ul className="list-disc pl-8 space-y-2">
                            <li>Focus on turning abstract ideas into actionable plans.</li>
                            <li>Insights and strategies for starting impactful projects.</li>
                        </ul>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-2xl font-bold mb-6">2. Storytelling for Builders</h2>
                        <p className="font-bold mb-2">Speaker: XYZ</p>
                        <p className="text-xl italic mb-4">"How to Tell Stories that Captivate and Convert"</p>
                        <ul className="list-disc pl-8 space-y-2">
                            <li>Learn the art of weaving a compelling narrative around projects.</li>
                            <li>Practical tips for storytelling that enhances personal and project impact.</li>
                        </ul>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-2xl font-bold mb-6">3. Creative Thinking Meets Execution</h2>
                        <p className="font-bold mb-2">Speaker: XYZ</p>
                        <p className="text-xl italic mb-4">"Creativity Beyond Limits: Building Projects with Heart"</p>
                        <ul className="list-disc pl-8 space-y-2">
                            <li>Explore how to infuse creativity into technical and artistic projects.</li>
                            <li>Bridging the gap between ideation and execution.</li>
                        </ul>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-2xl font-bold mb-6">4. Mastering Team Dynamics</h2>
                        <p className="font-bold mb-2">Speaker: XYZ</p>
                        <p className="text-xl italic mb-4">"Collaboration Hacks for Small Teams"</p>
                        <ul className="list-disc pl-8 space-y-2">
                            <li>Insights on effective team management for builders.</li>
                            <li>Strategies for resolving conflicts and maximizing team potential.</li>
                        </ul>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-2xl font-bold mb-6">5. Building for the Future</h2>
                        <p className="font-bold mb-2">Speaker: XYZ</p>
                        <p className="text-xl italic mb-4">"The Future of Tech and Creative Ecosystems"</p>
                        <ul className="list-disc pl-8 space-y-2">
                            <li>Understanding how emerging technologies are shaping industries.</li>
                            <li>Inspiration for integrating innovation into projects.</li>
                        </ul>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-2xl font-bold mb-6">6. Monetizing Creativity</h2>
                        <p className="font-bold mb-2">Speaker: XYZ</p>
                        <p className="text-xl italic mb-4">"How to Turn Passion into Profit"</p>
                        <ul className="list-disc pl-8 space-y-2">
                            <li>Practical steps to monetize your work in tech, art, or other creative fields.</li>
                            <li>Building a sustainable personal or project brand.</li>
                        </ul>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-2xl font-bold mb-6">7. Designing for Impact</h2>
                        <p className="font-bold mb-2">Speaker: XYZ</p>
                        <p className="text-xl italic mb-4">"Creating Experiences That Wow"</p>
                        <ul className="list-disc pl-8 space-y-2">
                            <li>Focus on UI/UX fundamentals for impactful designs.</li>
                            <li>Case studies of products that blend usability with beauty.</li>
                        </ul>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-2xl font-bold mb-6">8. Building in Public</h2>
                        <p className="font-bold mb-2">Speaker: XYZ</p>
                        <p className="text-xl italic mb-4">"Why Building in Public is the Future"</p>
                        <ul className="list-disc pl-8 space-y-2">
                            <li>Benefits of sharing your progress with a global audience.</li>
                            <li>Techniques for growing visibility and credibility.</li>
                        </ul>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-2xl font-bold mb-6">9. Resilience in Building</h2>
                        <p className="font-bold mb-2">Speaker: XYZ</p>
                        <p className="text-xl italic mb-4">"Overcoming Roadblocks in Building Great Projects"</p>
                        <ul className="list-disc pl-8 space-y-2">
                            <li>Insights from real-world challenges faced during scaling and pivoting.</li>
                            <li>How to stay resilient and adapt when things go wrong.</li>
                        </ul>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-2xl font-bold mb-6">10. Pitching Like a Pro</h2>
                        <p className="font-bold mb-2">Speaker: XYZ</p>
                        <p className="text-xl italic mb-4">"Crafting Pitches That Win Hearts (and Investors)"</p>
                        <ul className="list-disc pl-8 space-y-2">
                            <li>Tips for delivering impactful presentations and pitches.</li>
                            <li>How to tell a story that resonates with your audience.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-8">Speaker Domains & Expertise</h2>

                        <div className="space-y-8">
                            {/* Speaker domains list */}
                            <div>
                                <p className="font-bold mb-2">1. XYZ (Kicking Off with Vision)</p>
                                <ul className="list-disc pl-8 space-y-1">
                                    <li>Domain: Entrepreneurship & Strategy</li>
                                    <li>Background: Serial Entrepreneur, Startup Advisor</li>
                                </ul>
                            </div>

                            <div>
                                <p className="font-bold mb-2">2. XYZ (Storytelling for Builders)</p>
                                <ul className="list-disc pl-8 space-y-1">
                                    <li>Domain: Content Strategy & Brand Building</li>
                                    <li>Background: Brand Strategist, Content Creator</li>
                                </ul>
                            </div>

                            <div>
                                <p className="font-bold mb-2">3. XYZ (Creative Thinking)</p>
                                <ul className="list-disc pl-8 space-y-1">
                                    <li>Domain: Creative Technology</li>
                                    <li>Background: Creative Director, Innovation Lead</li>
                                </ul>
                            </div>

                            <div>
                                <p className="font-bold mb-2">4. XYZ (Team Dynamics)</p>
                                <ul className="list-disc pl-8 space-y-1">
                                    <li>Domain: People Operations & Leadership</li>
                                    <li>Background: Team Building Expert, Leadership Coach</li>
                                </ul>
                            </div>

                            <div>
                                <p className="font-bold mb-2">5. XYZ (Building for Future)</p>
                                <ul className="list-disc pl-8 space-y-1">
                                    <li>Domain: Future Technologies & Innovation</li>
                                    <li>Background: Technology Futurist, Innovation Consultant</li>
                                </ul>
                            </div>

                            <div>
                                <p className="font-bold mb-2">6. XYZ (Monetizing Creativity)</p>
                                <ul className="list-disc pl-8 space-y-1">
                                    <li>Domain: Business Development & Monetization</li>
                                    <li>Background: Business Strategist, Revenue Growth Expert</li>
                                </ul>
                            </div>

                            <div>
                                <p className="font-bold mb-2">7. XYZ (Designing for Impact)</p>
                                <ul className="list-disc pl-8 space-y-1">
                                    <li>Domain: Product Design & User Experience</li>
                                    <li>Background: UX Designer, Product Design Lead</li>
                                </ul>
                            </div>

                            <div>
                                <p className="font-bold mb-2">8. XYZ (Building in Public)</p>
                                <ul className="list-disc pl-8 space-y-1">
                                    <li>Domain: Community Building & Social Media</li>
                                    <li>Background: Community Manager, Social Media Strategist</li>
                                </ul>
                            </div>

                            <div>
                                <p className="font-bold mb-2">9. XYZ (Resilience in Building)</p>
                                <ul className="list-disc pl-8 space-y-1">
                                    <li>Domain: Project Management & Risk Mitigation</li>
                                    <li>Background: Project Manager, Risk Management Expert</li>
                                </ul>
                            </div>

                            <div>
                                <p className="font-bold mb-2">10. XYZ (Pitching Like a Pro)</p>
                                <ul className="list-disc pl-8 space-y-1">
                                    <li>Domain: Public Speaking & Pitch Development</li>
                                    <li>Background: Pitch Coach, Public Speaking Trainer</li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    )
}