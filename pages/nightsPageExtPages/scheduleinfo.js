// app/schedule/page.js
export const metadata = {
    title: "Nights S1 Schedule",
    description: 'Complete schedule for Nights Season 1',
}

export default function SchedulePage() {
    return (
        <div className="min-h-screen w-full bg-black">
            <main className="w-full min-h-screen bg-black text-white px-8 md:px-16 py-12">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-4xl font-bold mb-12">Nights S1 Schedule</h1>

                    {/* Week 1 */}
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold mb-6">Week 1: Ideation & Kickoff</h2>
                        <p className="text-xl mb-8"><strong>Goal</strong>: Introduce the community, align on goals, and start brainstorming ideas.</p>

                        <div className="space-y-12">
                            {/* Days 1-7 */}
                            <div>
                                <h3 className="text-2xl font-bold mb-4">Day 1: Kickoff Night</h3>
                                <div className="mb-4">
                                    <p className="font-bold mb-2">Activity:</p>
                                    <ul className="list-disc pl-8 space-y-2">
                                        <li>Welcome event: Intro to Nights S1 🎉</li>
                                        <li>Share the vision, goals, and structure of the season.</li>
                                        <li>Icebreaker: "What's your wildest idea?"</li>
                                    </ul>
                                </div>
                                <div>
                                    <p className="font-bold mb-2">Deliverables:</p>
                                    <ul className="list-disc pl-8 space-y-2">
                                        <li>Form teams or decide on solo projects.</li>
                                        <li>Brief about the project submission process.</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Continue with Days 2-7 */}
                            <div>
                                <h3 className="text-2xl font-bold mb-4">Day 2: Inspiration Night (Lab Session)</h3>
                                <div className="mb-4">
                                    <p className="font-bold mb-2">Activity:</p>
                                    <ul className="list-disc pl-8 space-y-2">
                                        <li>Speaker session with [Expert Name] on "The Art of Starting: Turning Ideas into Action"</li>
                                        <li>Interactive Q&A to dive deeper into their journey and insights</li>
                                    </ul>
                                </div>
                                <div>
                                    <p className="font-bold mb-2">Deliverables:</p>
                                    <ul className="list-disc pl-8 space-y-2">
                                        <li>Teams or individuals outline potential project ideas</li>
                                    </ul>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold mb-4">Day 3: Workshop - Tools of the Trade</h3>
                                <div className="mb-4">
                                    <p className="font-bold mb-2">Activity:</p>
                                    <ul className="list-disc pl-8 space-y-2">
                                        <li>Workshop: "Top Tools to Build Fast and Smart"</li>
                                        <li>Hands-on exercises to get familiar with these tools</li>
                                    </ul>
                                </div>
                                <div>
                                    <p className="font-bold mb-2">Deliverables:</p>
                                    <ul className="list-disc pl-8 space-y-2">
                                        <li>Teams set up collaborative tools and project repositories</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Continue with similar structure for Days 4-7 */}
                            // ...remaining days of Week 1...
                        </div>
                    </section>

                    {/* Week 2 */}
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold mb-6">Week 2: Build & Iterate</h2>
                        <p className="text-xl mb-8"><strong>Goal</strong>: Dive deeper into building projects, refining ideas, and collaborating.</p>

                        <div className="space-y-12">
                            {/* Days 8-14 */}
                            <div>
                                <h3 className="text-2xl font-bold mb-4">Day 8: Build Sprint 2</h3>
                                <div className="mb-4">
                                    <p className="font-bold mb-2">Activity:</p>
                                    <ul className="list-disc pl-8 space-y-2">
                                        <li>Heads-down work session</li>
                                        <li>Mentor check-ins to review progress</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Continue with similar structure for Days 9-14 */}
                            // ...remaining days of Week 2...
                        </div>
                    </section>

                    {/* Week 3 */}
                    <section>
                        <h2 className="text-3xl font-bold mb-6">Week 3: Final Stretch</h2>
                        <p className="text-xl mb-8"><strong>Goal</strong>: Wrap up projects, refine for presentation, and celebrate achievements.</p>

                        <div className="space-y-12">
                            {/* Days 15-21 */}
                            // ...Days 15-19...

                            <div>
                                <h3 className="text-2xl font-bold mb-4">Day 20: Demo Day 🎉</h3>
                                <div className="mb-4">
                                    <p className="font-bold mb-2">Activity:</p>
                                    <ul className="list-disc pl-8 space-y-2">
                                        <li>Grand finale! Teams present their projects to judges, mentors, and the community</li>
                                        <li>Celebrate with awards, shoutouts, and an afterparty</li>
                                    </ul>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold mb-4">Day 21: Wrap-Up & Reflection</h3>
                                <div>
                                    <p className="font-bold mb-2">Activity:</p>
                                    <ul className="list-disc pl-8 space-y-2">
                                        <li>Closing session: Celebrate wins, share learnings, and outline next steps for continuing projects</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    )
}