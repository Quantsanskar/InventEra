import React, { useState } from "react";
import { Timeline } from "@/components/ui/timeline";

const DayContent = ({ title, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="space-y-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left flex items-center justify-between text-2xl font-semibold text-gray-400 hover:text-gray-200 transition-colors" // changed color
      >
        <span>{title}</span>
        <span className="transform transition-transform duration-200 text-xl text-gray-500">
          {" "}
          {/* changed color */}
          {isExpanded ? "−" : "+"}
        </span>
      </button>
      <div
        className={
          `transition-all duration-200 overflow-hidden text-lg text-gray-400` /* changed color */ +
          ` ${isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`
        }
      >
        {children}
      </div>
    </div>
  );
};

export function TimeLine() {
  const weeks = [
    {
      title: "Week 1",
      description: "Ideation & Kickoff",
      subtitle: "Introduce the community, align on goals, and start brainstorming ideas.",
      days: [
        {
          title: "Day 1: Kickoff Night",
          content: (
            <>
              <ul className="list-disc list-inside text-gray-300 space-y-3">
                {" "}
                {/* increased spacing */}
                <li className="text-lg">Welcome event: Intro to Nights S1 🎉</li>
                <li className="text-lg">Share the vision, goals, and structure of the season.</li>
                <li className="text-lg">
                  Icebreaker: <span className="italic">"What's your wildest idea?"</span>
                </li>
              </ul>
              <p className="text-lg text-gray-300 mt-4">
                <span className="font-semibold">Deliverables:</span> Form teams or decide on solo
                projects. Brief about the project submission process.
              </p>
            </>
          ),
        },
        {
          title: "Day 2: Inspiration Night (Lab Session)",
          content: (
            <>
              <ul className="list-disc list-inside text-gray-300 space-y-3">
                {" "}
                {/* increased spacing */}
                <li className="text-lg">
                  Speaker session with <span className="italic">[Expert Name]</span> on{" "}
                  <span className="italic">"The Art of Starting: Turning Ideas into Action"</span>.
                </li>
                <li className="text-lg">
                  Interactive Q&A to dive deeper into their journey and insights.
                </li>
              </ul>
              <p className="text-lg text-gray-300 mt-4">
                <span className="font-semibold">Deliverables:</span> Teams or individuals outline
                potential project ideas.
              </p>
            </>
          ),
        },
        {
          title: "Day 3: Workshop - Tools of the Trade",
          content: (
            <>
              <ul className="list-disc list-inside text-gray-300 space-y-3">
                {" "}
                {/* increased spacing */}
                <li className="text-lg">
                  Workshop: <span className="italic">"Top Tools to Build Fast and Smart"</span>{" "}
                  (e.g., Figma for design, Notion for planning, GitHub for version control).
                </li>
                <li className="text-lg">Hands-on exercises to get familiar with these tools.</li>
              </ul>
              <p className="text-lg text-gray-300 mt-4">
                <span className="font-semibold">Deliverables:</span> Teams set up collaborative
                tools and project repositories.
              </p>
            </>
          ),
        },
        {
          title: "Day 4: Project Scope Night",
          content: (
            <>
              <ul className="list-disc list-inside text-gray-300 space-y-3">
                {" "}
                {/* increased spacing */}
                <li className="text-lg">
                  Guided session on scoping projects and setting realistic goals.
                </li>
              </ul>
              <p className="text-lg text-gray-300 mt-4">
                <span className="font-semibold">Deliverables:</span> Submit project briefs with
                objectives and milestones.
              </p>
            </>
          ),
        },
        {
          title: "Day 5: Build Sprint 1",
          content: (
            <>
              <ul className="list-disc list-inside text-gray-300 space-y-3">
                {" "}
                {/* increased spacing */}
                <li className="text-lg">Begin building.</li>
                <li className="text-lg">
                  Open co-working night for collaboration and problem-solving.
                </li>
              </ul>
              <p className="text-lg text-gray-300 mt-4">
                <span className="font-semibold">Deliverables:</span> First drafts of features or
                designs.
              </p>
            </>
          ),
        },
        {
          title: "Day 6: Lab Session - Storytelling for Builders",
          content: (
            <>
              <ul className="list-disc list-inside text-gray-300 space-y-3">
                {" "}
                {/* increased spacing */}
                <li className="text-lg">
                  Speaker session with <span className="italic">[Expert Name]</span> on{" "}
                  <span className="italic">"How to Tell Your Project's Story"</span>.
                </li>
                <li className="text-lg">
                  Interactive exercises to help teams define their project narratives.
                </li>
              </ul>
            </>
          ),
        },
        {
          title: "Day 7: Progress Check-In",
          content: (
            <>
              <ul className="list-disc list-inside text-gray-300 space-y-3">
                {" "}
                {/* increased spacing */}
                <li className="text-lg">Teams share their first week's progress in short demos.</li>
              </ul>
              <p className="text-lg text-gray-300 mt-4">
                <span className="font-semibold">Deliverables:</span> Submit Week 1 updates.
              </p>
            </>
          ),
        },
      ],
    },
    {
      title: "Week 2",
      description: "Build & Iterate",
      subtitle: "Dive deeper into building projects, refining ideas, and collaborating.",
      days: [
        {
          title: "Day 8: Build Sprint 2",
          content: (
            <>
              <ul className="list-disc list-inside text-gray-300 space-y-3">
                {" "}
                {/* increased spacing */}
                <li className="text-lg">Heads-down work session.</li>
                <li className="text-lg">Mentor check-ins to review progress.</li>
              </ul>
            </>
          ),
        },
        {
          title: "Day 9: Lab Session - Collaboration & Team Dynamics",
          content: (
            <>
              <ul className="list-disc list-inside text-gray-300 space-y-3">
                {" "}
                {/* increased spacing */}
                <li className="text-lg">
                  Speaker session with <span className="italic">[Expert Name]</span> on{" "}
                  <span className="italic">"Building Great Teams and Collaborations"</span>.
                </li>
              </ul>
            </>
          ),
        },
        {
          title: "Day 10: Workshop - MVP Building",
          content: (
            <>
              <ul className="list-disc list-inside text-gray-300 space-y-3">
                {" "}
                {/* increased spacing */}
                <li className="text-lg">
                  Workshop:{" "}
                  <span className="italic">
                    "From Vision to Prototype: Building an MVP in a Week"
                  </span>
                  .
                </li>
                <li className="text-lg">
                  Hands-on activities to refine and implement key features.
                </li>
              </ul>
            </>
          ),
        },
        {
          title: "Day 11: Midpoint Review",
          content: (
            <>
              <ul className="list-disc list-inside text-gray-300 space-y-3">
                {" "}
                {/* increased spacing */}
                <li className="text-lg">Celebrate halfway mark!</li>
                <li className="text-lg">Teams share highlights and major learnings so far.</li>
              </ul>
            </>
          ),
        },
        {
          title: "Day 12: Build Sprint 3",
          content: (
            <>
              <ul className="list-disc list-inside text-gray-300 space-y-3">
                {" "}
                {/* increased spacing */}
                <li className="text-lg">Dedicated work session.</li>
                <li className="text-lg">
                  Speed mentorship: Solve blockers with quick mentor advice.
                </li>
              </ul>
            </>
          ),
        },
        {
          title: "Day 13: Lab Session - Monetizing Creativity",
          content: (
            <>
              <ul className="list-disc list-inside text-gray-300 space-y-3">
                {" "}
                {/* increased spacing */}
                <li className="text-lg">
                  Speaker session with <span className="italic">[Expert Name]</span> on{" "}
                  <span className="italic">"Turning Projects into Profitable Ventures"</span>.
                </li>
              </ul>
            </>
          ),
        },
        {
          title: "Day 14: Recharge & Reflect",
          content: (
            <>
              <ul className="list-disc list-inside text-gray-300 space-y-3">
                {" "}
                {/* increased spacing */}
                <li className="text-lg">
                  No building—focus on personal learning or a fun skill session (e.g., creative
                  writing or painting).
                </li>
              </ul>
            </>
          ),
        },
      ],
    },
    {
      title: "Week 3",
      description: "Final Stretch",
      subtitle: "Wrap up projects, refine for presentation, and celebrate achievements.",
      days: [
        {
          title: "Day 15: Build Sprint 4",
          content: (
            <>
              <ul className="list-disc list-inside text-gray-300 space-y-3">
                {" "}
                {/* increased spacing */}
                <li className="text-lg">Final building push.</li>
                <li className="text-lg">Open co-working and team sync-ups.</li>
              </ul>
            </>
          ),
        },
        {
          title: "Day 16: Workshop - Design & Polish",
          content: (
            <>
              <ul className="list-disc list-inside text-gray-300 space-y-3">
                {" "}
                {/* increased spacing */}
                <li className="text-lg">
                  Workshop: <span className="italic">"UI/UX Tips to Make Your Project Shine"</span>.
                </li>
                <li className="text-lg">Peer reviews for visual and functional refinement.</li>
              </ul>
            </>
          ),
        },
        {
          title: "Day 17: Demo Rehearsals",
          content: (
            <>
              <ul className="list-disc list-inside text-gray-300 space-y-3">
                {" "}
                {/* increased spacing */}
                <li className="text-lg">Practice presentations and demos.</li>
                <li className="text-lg">Mentor feedback on storytelling and showcasing impact.</li>
              </ul>
            </>
          ),
        },
        {
          title: "Day 18: Lab Session - Pitch Perfect",
          content: (
            <>
              <ul className="list-disc list-inside text-gray-300 space-y-3">
                {" "}
                {/* increased spacing */}
                <li className="text-lg">
                  Speaker session with <span className="italic">[Expert Name]</span> on{" "}
                  <span className="italic">"How to Pitch Like a Pro"</span>.
                </li>
              </ul>
            </>
          ),
        },
        {
          title: "Day 19: Final Submission Night",
          content: (
            <>
              <ul className="list-disc list-inside text-gray-300 space-y-3">
                {" "}
                {/* increased spacing */}
                <li className="text-lg">Teams submit final projects.</li>
                <li className="text-lg">Review of submission process and judging criteria.</li>
              </ul>
              <p className="text-lg text-gray-300 mt-4">
                <span className="font-semibold">Deliverables:</span> Final presentation decks and
                project demos.
              </p>
            </>
          ),
        },
        {
          title: "Day 20: Demo Day 🎉",
          content: (
            <>
              <ul className="list-disc list-inside text-gray-300 space-y-3">
                {" "}
                {/* increased spacing */}
                <li className="text-lg">Celebrate with awards, shoutouts, and an afterparty.</li>
                <li className="text-lg">
                  <span className="font-semibold">Activity:</span> Grand finale! Teams present their
                  projects to judges, mentors, and the community.
                </li>
              </ul>
            </>
          ),
        },
        {
          title: "Day 21: Wrap-Up & Reflection",
          content: (
            <>
              <ul className="list-disc list-inside text-gray-300 space-y-3">
                {" "}
                {/* increased spacing */}
                <li className="text-lg">
                  Closing session: Celebrate wins, share learnings, and outline next steps for
                  continuing projects.
                </li>
              </ul>
            </>
          ),
        },
      ],
    },
  ];

  const data = weeks.map((week) => ({
    title: week.title,
    content: (
      <div className="flex flex-col space-y-4">
        <div className="space-y-3 mb-8">
          <h2 className="text-4xl font-bold text-gray-300 tracking-tight">
            {" "}
            {/* changed color */}
            {week.description}
          </h2>
          <p className="text-xl text-gray-400">
            {" "}
            {/* changed color and removed opacity */}
            {week.subtitle}
          </p>
        </div>

        <div className="flex flex-col space-y-6">
          {week.days.map((day, index) => (
            <DayContent key={index} title={day.title}>
              {day.content}
            </DayContent>
          ))}
        </div>
      </div>
    ),
  }));

  return (
    <div className="h-full w-full relative text-white z-30 flex flex-col items-center justify-center">
      <div className="relative top-0 left-0 w-full">
        <Timeline data={data} />
      </div>
    </div>
  );
}
