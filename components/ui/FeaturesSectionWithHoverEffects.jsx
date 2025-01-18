import { cn } from "@/lib/utils";
import {
  IconAdjustmentsBolt,
  IconCloud,
  IconCurrencyDollar,
  IconEaseInOut,
  IconHeart,
  IconHelp,
  IconRouteAltLeft,
  IconTerminal2,
} from "@tabler/icons-react";

export function FeaturesSectionWithHoverEffects() {
  const features = [
    {
      title: "Artist Vibing with developers",
      description: "Where creative minds and tech talents come together.",
      icon: <IconTerminal2 />,
    },
    {
      title: "Hackers teaming up with chefs",
      description: "Tech meets taste. Innovation in every bite.",
      icon: <IconEaseInOut />,
    },
    {
      title: "Gamers sharing tips with filmmakers",
      description: "Bringing storytelling and gaming to the next level.",
      icon: <IconCurrencyDollar />,
    },
    {
      title: "Writers Collaborating with Coders",
      description: "Crafting stories with code and creativity.",
      icon: <IconHeart />,
    },
    {
      title: "Passion > Prestige",
      description: "It's all about doing what you love, not the title.",
      icon: <IconCloud />,
    },
    {
      title: "Collaboration > Competition",
      description: "Together, we’re stronger. Let’s build, not compete.",
      icon: <IconRouteAltLeft />,
    },
    {
      title: "Building > Dreaming",
      description: "Dreams become reality when we start creating.",
      icon: <IconHelp />,
    },
    {
      title: "Creativity > Conformity",
      description: "Think outside the box, create beyond limits.",
      icon: <IconAdjustmentsBolt />,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({ title, description, icon, index }) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature border-neutral-800 cursor-pointer",
        (index === 0 || index === 4) && "lg:border-l border-neutral-800",
        index < 4 && "lg:border-b border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-400">{icon}</div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-300 max-w-xs relative z-10 px-10">{description}</p>
    </div>
  );
};
