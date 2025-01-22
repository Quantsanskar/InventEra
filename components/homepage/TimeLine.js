import Image from "next/image";
import React from "react";
import { Timeline } from "@/components/ui/timeline";

export function TimeLine() {
  const data = [
    {
      title: "Week 1",
      content: (
        <div>
          
          <div className="flex flex-col space-y-6">
            <h2 className="text-2xl font-bold text-gray-100">Ideation & Kickoff</h2>
            <p className="text-lg text-gray-300">
              Introduce the community, align on goals, and start brainstorming ideas.
            </p>

            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-gray-200">Day 1: Kickoff Night</h4>
              <ul className="list-disc list-inside text-gray-300">
                <li>Welcome event: Intro to Nights S1 🎉</li>
                <li>Share the vision, goals, and structure of the season.</li>
                <li>Icebreaker: <span className="italic">"What's your wildest idea?"</span></li>
              </ul>
              <p className="text-gray-300">
                <span className="font-semibold">Deliverables:</span> Form teams or decide on solo projects. Brief about the project submission process.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-gray-200">Day 2: Inspiration Night (Lab Session)</h4>
              <ul className="list-disc list-inside text-gray-300">
                <li>Speaker session with <span className="italic">[Expert Name]</span> on <span className="italic">"The Art of Starting: Turning Ideas into Action"</span>.</li>
                <li>Interactive Q&A to dive deeper into their journey and insights.</li>
              </ul>
              <p className="text-gray-300">
                <span className="font-semibold">Deliverables:</span> Teams or individuals outline potential project ideas.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-gray-200">Day 3: Workshop - Tools of the Trade</h4>
              <ul className="list-disc list-inside text-gray-300">
                <li>Workshop: <span className="italic">"Top Tools to Build Fast and Smart"</span> (e.g., Figma for design, Notion for planning, GitHub for version control).</li>
                <li>Hands-on exercises to get familiar with these tools.</li>
              </ul>
              <p className="text-gray-300">
                <span className="font-semibold">Deliverables:</span> Teams set up collaborative tools and project repositories.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-gray-200">Day 4: Project Scope Night</h4>
              <ul className="list-disc list-inside text-gray-300">
                <li>Guided session on scoping projects and setting realistic goals.</li>
              </ul>
              <p className="text-gray-300">
                <span className="font-semibold">Deliverables:</span> Submit project briefs with objectives and milestones.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-gray-200">Day 5: Build Sprint 1</h4>
              <ul className="list-disc list-inside text-gray-300">
                <li>Begin building.</li>
                <li>Open co-working night for collaboration and problem-solving.</li>
              </ul>
              <p className="text-gray-300">
                <span className="font-semibold">Deliverables:</span> First drafts of features or designs.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-gray-200">Day 6: Lab Session - Storytelling for Builders</h4>
              <ul className="list-disc list-inside text-gray-300">
                <li>Speaker session with <span className="italic">[Expert Name]</span> on <span className="italic">"How to Tell Your Project's Story"</span>.</li>
                <li>Interactive exercises to help teams define their project narratives.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-gray-200">Day 7: Progress Check-In</h4>
              <ul className="list-disc list-inside text-gray-300">
                <li>Teams share their first week's progress in short demos.</li>
              </ul>
              <p className="text-gray-300">
                <span className="font-semibold">Deliverables:</span> Submit Week 1 updates.
              </p>
            </div>
          </div>

        </div>
      ),
    },
    {
      title: "Week 2",
      content: (
        <div>
          
          <div className="flex flex-col space-y-6">
            <h2 className="text-2xl font-bold text-gray-100">Build & Iterate</h2>
            <p className="text-lg text-gray-300">
              Dive deeper into building projects, refining ideas, and collaborating.
            </p>

            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-gray-200">Day 8: Build Sprint 2</h4>
              <ul className="list-disc list-inside text-gray-300">
                <li>Heads-down work session.</li>
                <li>Mentor check-ins to review progress.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-gray-200">Day 9: Lab Session - Collaboration & Team Dynamics</h4>
              <ul className="list-disc list-inside text-gray-300">
                <li>
                  Speaker session with <span className="italic">[Expert Name]</span> on
                  <span className="italic"> "Building Great Teams and Collaborations"</span>.
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-gray-200">Day 10: Workshop - MVP Building</h4>
              <ul className="list-disc list-inside text-gray-300">
                <li>
                  Workshop: <span className="italic">"From Vision to Prototype: Building an MVP in a Week"</span>.
                </li>
                <li>Hands-on activities to refine and implement key features.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-gray-200">Day 11: Midpoint Review</h4>
              <ul className="list-disc list-inside text-gray-300">
                <li>Celebrate halfway mark!</li>
                <li>Teams share highlights and major learnings so far.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-gray-200">Day 12: Build Sprint 3</h4>
              <ul className="list-disc list-inside text-gray-300">
                <li>Dedicated work session.</li>
                <li>Speed mentorship: Solve blockers with quick mentor advice.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-gray-200">Day 13: Lab Session - Monetizing Creativity</h4>
              <ul className="list-disc list-inside text-gray-300">
                <li>
                  Speaker session with <span className="italic">[Expert Name]</span> on
                  <span className="italic"> "Turning Projects into Profitable Ventures"</span>.
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-gray-200">Day 14: Recharge & Reflect</h4>
              <ul className="list-disc list-inside text-gray-300">
                <li>No building—focus on personal learning or a fun skill session (e.g., creative writing or painting).</li>
              </ul>
            </div>
          </div>

        </div>
      ),
    },
    {
      title: "Week 3",
      content: (
        <div>
          
          <div className="flex flex-col space-y-6">
            <h2 className="text-2xl font-bold text-gray-100">Final Stretch</h2>
            <p className="text-lg text-gray-300">
              Wrap up projects, refine for presentation, and celebrate achievements.
            </p>

            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-gray-200">Day 15: Build Sprint 4</h4>
              <ul className="list-disc list-inside text-gray-300">
                <li>Final building push.</li>
                <li>Open co-working and team sync-ups.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-gray-200">Day 16: Workshop - Design & Polish</h4>
              <ul className="list-disc list-inside text-gray-300">
                <li>
                  Workshop: <span className="italic">"UI/UX Tips to Make Your Project Shine"</span>.
                </li>
                <li>Peer reviews for visual and functional refinement.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-gray-200">Day 17: Demo Rehearsals</h4>
              <ul className="list-disc list-inside text-gray-300">
                <li>Practice presentations and demos.</li>
                <li>Mentor feedback on storytelling and showcasing impact.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-gray-200">Day 18: Lab Session - Pitch Perfect</h4>
              <ul className="list-disc list-inside text-gray-300">
                <li>
                  Speaker session with <span className="italic">[Expert Name]</span> on
                  <span className="italic"> "How to Pitch Like a Pro"</span>.
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-gray-200">Day 19: Final Submission Night</h4>
              <ul className="list-disc list-inside text-gray-300">
                <li>Teams submit final projects.</li>
                <li>Review of submission process and judging criteria.</li>
              </ul>
              <p className="text-gray-300">
                <span className="font-semibold">Deliverables:</span> Final presentation decks and project demos.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-gray-200">Day 20: Demo Day 🎉</h4>
              <ul className="list-disc list-inside text-gray-300">
                <li>Celebrate with awards, shoutouts, and an afterparty.</li>
                <li>
                  <span className="font-semibold">Activity:</span> Grand finale! Teams present their projects to judges, mentors, and the community.
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-gray-200">Day 21: Wrap-Up & Reflection</h4>
              <ul className="list-disc list-inside text-gray-300">
                <li>
                  Closing session: Celebrate wins, share learnings, and outline next steps for continuing projects.
                </li>
              </ul>
            </div>
          </div>

        </div>
      ),
    },
  ];
  return (
    <div className="h-full w-full relative text-white  z-30 flex flex-col items-center justify-center">
      <div className="relative top-0 left-0 w-full">
        <Timeline data={data} />
      </div>
    </div>
  );
}
