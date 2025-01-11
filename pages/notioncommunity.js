// app/community/page.js
export const metadata = {
    title: "Nights S1 Community",
    description: "Join the Nights Season One community of creators and innovators",
}

export default function CommunityPage() {
    return (
        <div className="min-h-screen w-full bg-black">
            <main className="w-full min-h-screen bg-black text-white px-8 md:px-16 py-12">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-4xl font-bold mb-4">Nights: Season One 🌙</h1>

                    {/* Welcome Section */}
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold mb-6">Welcome to Nights: Season One</h2>
                        <p className="text-xl mb-8">
                            Hey Builders! 👋 We're beyond excited to announce <em>Nights: Season One</em>,
                            a 3-week-long virtual and offline experience designed for creators, developers,
                            artists, and innovators of all kinds!
                        </p>
                    </section>

                    {/* Program Features */}
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold mb-6">What's Nights All About?</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-zinc-900 p-6 rounded-lg">
                                <h3 className="text-2xl font-bold mb-4">🌟 Workshops</h3>
                                <p className="text-lg">
                                    Interactive sessions led by experts to help participants upskill.
                                    From mastering new tech to perfecting design and storytelling,
                                    these workshops are hands-on and fun!
                                </p>
                            </div>

                            <div className="bg-zinc-900 p-6 rounded-lg">
                                <h3 className="text-2xl font-bold mb-4">🎙️ Speaker Sessions (Labs)</h3>
                                <p className="text-lg">
                                    Hear from leaders and experts across various fields sharing their
                                    journeys, challenges, and strategies for success.
                                </p>
                            </div>

                            <div className="bg-zinc-900 p-6 rounded-lg">
                                <h3 className="text-2xl font-bold mb-4">🚀 Build Challenges</h3>
                                <p className="text-lg">
                                    Over the course of three weeks, participants will work on their
                                    dream projects—whether it's an app, an artwork, a film concept,
                                    or any creative endeavor.
                                </p>
                            </div>

                            <div className="bg-zinc-900 p-6 rounded-lg">
                                <h3 className="text-2xl font-bold mb-4">🎉 Networking Nights</h3>
                                <p className="text-lg">
                                    Casual, fun sessions to connect with fellow builders, exchange
                                    ideas, and collaborate on cool projects.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Demo Day Section */}
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold mb-6">🏆 Offline Demo Day (Finale)</h2>
                        <div className="bg-zinc-900 p-8 rounded-lg">
                            <p className="text-xl mb-6">
                                An in-person showcase of brilliance! Participants will pitch their projects
                                in front of a live audience, including mentors, peers, and potential collaborators.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <span className="font-bold mr-2">•</span>
                                    <span className="text-lg">
                                        <strong>Pitch Your Ideas:</strong> Highlight your vision, process, and creation.
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <span className="font-bold mr-2">•</span>
                                    <span className="text-lg">
                                        <strong>Feedback & Networking:</strong> Gain insights from industry leaders and connect with like-minded creators.
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <span className="font-bold mr-2">•</span>
                                    <span className="text-lg">
                                        <strong>Celebrate Creativity:</strong> This event is all about showcasing YOU and your work in the coolest way possible.
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* Event Details */}
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold mb-6">When and Where?</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-zinc-900 p-6 rounded-lg">
                                <ul className="space-y-4">
                                    <li className="text-lg">
                                        <strong>Kickoff Date:</strong> 15th January
                                    </li>
                                    <li className="text-lg">
                                        <strong>Duration:</strong> 3 Weeks
                                    </li>
                                    <li className="text-lg">
                                        <strong>Main Event:</strong> Offline Demo Day (Venue TBD)
                                    </li>
                                    <li className="text-lg">
                                        <strong>Location:</strong> Virtual sessions + In-person Finale
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-zinc-900 p-6 rounded-lg">
                                <h3 className="text-2xl font-bold mb-4">Who Can Join?</h3>
                                <p className="text-lg">
                                    Anyone and everyone! Whether you're a developer, an artist, a chef,
                                    a filmmaker, or a racer—if you love creating, <em>Nights</em> is for you.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Collaboration Section */}
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold mb-6">How Can We Collaborate?</h2>
                        <div className="bg-zinc-900 p-6 rounded-lg">
                            <ul className="space-y-4">
                                <li className="text-lg">• Host a workshop</li>
                                <li className="text-lg">• Promote Nights within your community</li>
                                <li className="text-lg">• Co-organize a session</li>
                                <li className="text-lg">• Join us and make this the most epic event of the year!</li>
                            </ul>
                        </div>
                    </section>

                    {/* Contact Section */}
                    <section>
                        <h2 className="text-3xl font-bold mb-6">Reach Out to Us</h2>
                        <div className="bg-zinc-900 p-6 rounded-lg">
                            <ul className="space-y-4">
                                <li className="text-lg">
                                    <strong>Website:</strong> buildersspace.tech
                                </li>
                                <li className="text-lg">
                                    <strong>Email:</strong> buildersspace9@gmail.com
                                </li>
                                <li className="text-lg">
                                    <strong>DM Us:</strong> On any platform—we'd love to chat!
                                </li>
                            </ul>
                        </div>
                        <p className="text-xl font-bold text-center mt-8">
                            "Where builders create and creators build!"
                        </p>
                    </section>
                </div>
            </main>
        </div>
    )
}