import React from "react";
import { FeaturesSectionWithHoverEffects } from "../ui/FeaturesSectionWithHoverEffects";
import { SparklesText } from "../ui/sparkles-text";

function FeaturesSectionWithHoverEffectsDemo() {
  return (
    <div className="min-h-screen w-full relative text-white  z-50 flex flex-col items-center justify-center">
      <div className="mb-8 text-center">
        <p className=" text-neutral-300 text-bold py-4 text-lg rounded-md ">
          <span className="bg-white text-black p-1 rounded-lg px-4">Every</span>
        </p>
        <h2 className="text-6xl text-gray-400 font-bold">
          Builder's Core <SparklesText text="Values" className="inline-flex text-white" />
        </h2>
      </div>
      <div className="w-full">
        <FeaturesSectionWithHoverEffects />
      </div>
      <p className="text-lg text-gray-400 tracking-wide text-muted-foreground mt-8">
        We bring the fuel (and the pizza 🍕). You bring the spark.
      </p>
    </div>
  );
}

export { FeaturesSectionWithHoverEffectsDemo };
