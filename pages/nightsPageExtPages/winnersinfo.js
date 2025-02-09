// app/winner-selection/page.js
export const metadata = {
    title: "Nights S1 Winner Selection",
    description: "Winner selection process and criteria for Nights Season One",
}

export default function WinnerSelectionPage() {
    return (
        <div className="min-h-screen w-full bg-black">
            <main className="w-full min-h-screen bg-black text-white px-8 md:px-16 py-12">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-4xl font-bold mb-6">Nights S1 - Winner Selection Process</h1>
                    <p className="text-xl mb-12">
                        Welcome to the <em>Nights S1</em> winner selection page! This document will guide you through
                        how we'll select the winners of the event. Our goal is to ensure a fair, transparent,
                        and engaging process that celebrates creativity, innovation, and excellence.
                    </p>

                    {/* Selection Criteria */}
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold mb-6">Selection Criteria</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-zinc-900 p-6 rounded-lg">
                                <h3 className="text-2xl font-bold mb-4 text-blue-400">Innovation (40%)</h3>
                                <p className="text-lg">
                                    How unique or creative is the solution or idea presented?
                                    Is it solving a real-world problem?
                                </p>
                            </div>
                            <div className="bg-zinc-900 p-6 rounded-lg">
                                <h3 className="text-2xl font-bold mb-4 text-blue-400">Technical Complexity (30%)</h3>
                                <p className="text-lg">
                                    Does the project demonstrate high technical skill, intricate solutions,
                                    or advanced concepts?
                                </p>
                            </div>
                            <div className="bg-zinc-900 p-6 rounded-lg">
                                <h3 className="text-2xl font-bold mb-4 text-blue-400">Execution (20%)</h3>
                                <p className="text-lg">
                                    How well is the project developed and executed? Is it functional,
                                    and does it deliver the promised experience?
                                </p>
                            </div>
                            <div className="bg-zinc-900 p-6 rounded-lg">
                                <h3 className="text-2xl font-bold mb-4 text-blue-400">Presentation (10%)</h3>
                                <p className="text-lg">
                                    How clearly and effectively was the project communicated to the
                                    audience and judges? Was the presentation engaging?
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Scoring System */}
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold mb-6">Scoring System</h2>
                        <div className="bg-zinc-900 p-8 rounded-lg">
                            <h3 className="text-2xl font-bold mb-4">How Scores Are Assigned</h3>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-xl font-bold mb-2">Point-Based Scoring</h4>
                                    <p className="text-lg">Each judge will assign a score between <strong>1 to 10</strong> for each criterion.</p>
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold mb-2">Average Scoring</h4>
                                    <p className="text-lg">The final score for each participant will be the <strong>average</strong> of all judges' scores.</p>
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold mb-2">Tie Breaker</h4>
                                    <p className="text-lg">In case of a tie between two or more participants, a panel discussion will be held to determine the final winner.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Audience Voting */}
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold mb-6">Audience Voting</h2>
                        <div className="bg-zinc-900 p-8 rounded-lg">
                            <p className="text-xl mb-6">To add an interactive element, the audience will have a chance to vote for their favorite participant.</p>
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span className="text-lg"><strong>Audience Favorite Award:</strong> A separate prize given to the project with the highest number of audience votes.</span>
                                </div>
                                <div className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span className="text-lg"><strong>Voting Mechanism:</strong> Voting will be open during the live presentations and will be done via the event platform.</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Award Distribution */}
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold mb-6">Award Distribution</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-zinc-900 p-6 rounded-lg">
                                <h3 className="text-2xl font-bold mb-4">Prizes</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Monetary rewards</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Mentorship opportunities</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Certificates</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Event tickets or merchandise</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-zinc-900 p-6 rounded-lg">
                                <h3 className="text-2xl font-bold mb-4">Recognition</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>1st, 2nd, and 3rd place winners in each category</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Audience Favorite winner based on public voting</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Important Dates */}
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold mb-6">Important Dates</h2>
                        <div className="bg-zinc-900 p-6 rounded-lg">
                            <div className="space-y-4">
                                <p className="text-lg"><strong>Event Date:</strong> March</p>
                                <p className="text-lg"><strong>Voting Period:</strong> TBD</p>
                                <p className="text-lg"><strong>Announcement of Winners:</strong> TBD</p>
                            </div>
                        </div>
                    </section>

                    {/* Contact Section */}
                    <section>
                        <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
                        <div className="bg-zinc-900 p-6 rounded-lg">
                            <p className="text-lg">
                                If you have any questions or need clarifications regarding the selection process,
                                feel free to reach out to us at [Insert Contact Information].
                            </p>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    )
}