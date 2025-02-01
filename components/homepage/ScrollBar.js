import React, { useEffect } from "react";
import dynamic from "next/dynamic";

const DynamicMarquee = () => {
  useEffect(() => {
    // Dynamically import gsap and its plugins
    const loadGSAP = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      // Scrolling animation setup
      gsap.to(".marquee", {
        transform: "translateX(-100%)",
        ease: "none",
        duration: 4,
        repeat: -1,
      });

      // Mouse scroll interaction
      const handleScroll = (event) => {
        if (event.deltaY > 0) {
          gsap.to(".marquee", {
            transform: "translateX(-200%)",
            duration: 4,
            ease: "none",
          });

          gsap.to(".marquee img", {
            rotate: 180,
            ease: "none",
          });
        } else {
          gsap.to(".marquee", {
            transform: "translateX(0%)",
            duration: 4,
            ease: "none",
          });

          gsap.to(".marquee img", {
            rotate: 0,
            ease: "none",
          });
        }
      };

      window.addEventListener("wheel", handleScroll);

      return () => {
        window.removeEventListener("wheel", handleScroll);
      };
    };

    loadGSAP();
  }, []);

  return (
    <div>
      <div id="page1" style={styles.page}></div>
      <div id="page2" style={styles.page}>
        <div id="move" style={styles.move}>
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="marquee" style={styles.marquee}>
              <h1 className="text-6xl text-black">BUILDER'S SPACE</h1>
              <img
                src="https://www.brandium.nl/wp-content/uploads/2023/07/arrow-br.svg"
                alt="Arrow"
                style={styles.image}
              />
            </div>
          ))}
        </div>
      </div>
      <div id="page3" style={styles.page}></div>
    </div>
  );
};

// Inline styles for simplicity
const styles = {
  move: {
    backgroundColor: "#FFFFFF",
    display: "flex",
    padding: "3vw 0",
    overflow: "hidden",
  },
  marquee: {
    display: "flex",
    alignItems: "center",
    gap: "3vw",
    padding: "0 1.5vw",
    flexShrink: 0,
  },
  image: {
    height: "4vw",
  },
};

export default dynamic(() => Promise.resolve(DynamicMarquee), { ssr: false });
