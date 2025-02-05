// app/audience/page.js
export const metadata = {
    title: "Nights S1 Audience",
    description: "Target audience and community members for Nights Season One",
}

export default function AudiencePage() {
    return (
        <div className="min-h-screen w-full bg-black">
            <main className="w-full min-h-screen bg-black text-white px-8 md:px-16 py-12">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-4xl font-bold mb-12">Audience for Nights Season 1</h1>

                    {/* Audience Categories Grid */}
                    <section className="mb-16">
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Tech Enthusiasts */}
                            <div className="bg-zinc-900 p-6 rounded-lg">
                                <h2 className="text-2xl font-bold mb-4">1. Tech Enthusiasts</h2>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Individuals passionate about exploring and learning new technologies</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>College students, developers, and professionals eager to build projects</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>People looking to network with like-minded individuals</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Beginners in Tech */}
                            <div className="bg-zinc-900 p-6 rounded-lg">
                                <h2 className="text-2xl font-bold mb-4">2. Beginners in Tech</h2>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Those at the start of their tech journey, seeking guidance and mentorship</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Students looking for an entry point into the tech world with practical exposure</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Community Builders */}
                            <div className="bg-zinc-900 p-6 rounded-lg">
                                <h2 className="text-2xl font-bold mb-4">3. Community Builders</h2>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Individuals interested in building and managing communities</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>People looking to collaborate on initiatives that bring people together around tech</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Creatives and Artists */}
                            <div className="bg-zinc-900 p-6 rounded-lg">
                                <h2 className="text-2xl font-bold mb-4">4. Creatives and Artists</h2>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Designers, video creators, and UI/UX enthusiasts</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Artists who can collaborate with developers to create unique, impactful projects</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Entrepreneurs */}
                            <div className="bg-zinc-900 p-6 rounded-lg">
                                <h2 className="text-2xl font-bold mb-4">5. Entrepreneurs and Innovators</h2>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Start-up enthusiasts looking for co-founders or team members</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Innovators who want to test ideas and gather feedback</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Open Source Advocates */}
                            <div className="bg-zinc-900 p-6 rounded-lg">
                                <h2 className="text-2xl font-bold mb-4">6. Open Source Advocates</h2>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Developers and contributors interested in open-source projects</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Individuals who want to promote open collaboration in tech</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Problem Solvers to Ambitious Students */}
                            {/* Similar structure for categories 7-10 */}
                        </div>
                    </section>

                    {/* Purpose Section */}
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold mb-6">Purpose of Targeting This Audience</h2>
                        <div className="bg-zinc-900 p-6 rounded-lg">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-xl font-bold mb-3">Inspiration</h3>
                                    <p>Motivating people to learn, grow, and collaborate</p>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-3">Collaboration</h3>
                                    <p>Building a platform for cross-disciplinary projects</p>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-3">Networking</h3>
                                    <p>Establishing connections among individuals and organizations</p>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-3">Skill Development</h3>
                                    <p>Helping attendees enhance technical, creative, and leadership skills</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Engagement Section */}
                    <section>
                        <h2 className="text-3xl font-bold mb-6">How to Engage Them</h2>
                        <div className="bg-zinc-900 p-6 rounded-lg">
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span>Host diverse sessions: workshops, panel discussions, hackathons, and showcases</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span>Provide mentorship opportunities and networking spaces</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span>Share success stories, tips, and exclusive resources</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span>Create channels for continuous communication, such as Discord or Slack</span>
                                </li>
                            </ul>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    )
}