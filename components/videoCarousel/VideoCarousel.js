import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";

const VideoCarousel = () => {
  useEffect(() => {
    // Dynamically import ScrollTrigger
    import("gsap/ScrollTrigger").then((ScrollTriggerModule) => {
      const ScrollTrigger = ScrollTriggerModule.default;
      gsap.registerPlugin(ScrollTrigger);

      // Animation logic
      gsap.from("#video_section_video", {
        height: "600px",
        duration: 2,
        scrollTrigger: {
          trigger: "#video_section",
          start: "top 70%",
          end: "top 0%",
          scrub: 2,
        },
      });
    });
  }, []);

  return (
    <div id="video_section" className="h-[120vh] flex justify-center overflow-hidden w-full">
      <video
        autoPlay
        muted
        loop
        id="video_section_video"
        src="/videos/builderspacevideo.mp4"
        className="relative h-full"
      ></video>
    </div>
  );
};

export default dynamic(() => Promise.resolve(VideoCarousel), { ssr: false });
