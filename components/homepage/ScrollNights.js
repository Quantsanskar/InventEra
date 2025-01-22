import React, { useEffect } from "react";
import dynamic from "next/dynamic";

const DynamicMarquee = () => {
    useEffect(() => {
        const loadGSAP = async () => {
            const { gsap } = await import("gsap");
            const { ScrollTrigger } = await import("gsap/ScrollTrigger");

            gsap.registerPlugin(ScrollTrigger);

            gsap.to(".marquee", {
                transform: "translateX(-100%)",
                ease: "none",
                duration: 4,
                repeat: -1,
            });

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
        <>
            <style jsx global>{`
                @font-face {
                    font-family: 'Product Sans';
                    src: url('/fonts/ProductSans-Regular.woff2') format('woff2');
                    font-weight: normal;
                    font-style: normal;
                    font-display: swap;
                }
                @font-face {
                    font-family: 'Product Sans';
                    src: url('/fonts/ProductSans-Bold.woff2') format('woff2');
                    font-weight: bold;
                    font-style: normal;
                    font-display: swap;
                }
            `}</style>
            <div>
                <div id="page1" style={styles.page}></div>
                <div id="page2" style={styles.page}>
                    <div id="move" style={styles.move}>
                        {Array.from({ length: 10 }).map((_, index) => (
                            <div key={index} className="marquee" style={styles.marquee}>
                                <h1 className="text-4xl font-bold" style={styles.heading}>THE NIGHTS</h1>
                                <img
                                    src="/reference/arrow.png"
                                    alt="Arrow"
                                    style={styles.image}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div id="page3" style={styles.page}></div>
            </div>
        </>
    );
};

const styles = {
    move: {
        backgroundColor: "#000000",
        display: "flex",
        color: "#FFFFFF",
        padding: "2vw 0",  // Reduced padding from 3vw to 2vw
        overflow: "hidden",
        width: "100%",      // Added width constraint
        margin: "0 auto",  // Center the container
    },
    marquee: {
        display: "flex",
        alignItems: "center",
        gap: "2vw",       // Reduced gap from 3vw to 2vw
        padding: "0 1vw", // Reduced padding from 1.5vw to 1vw
        flexShrink: 0,
    },
    image: {
        height: "2.5vw",  // Reduced height from 4vw to 2.5vw
    },
    heading: {
        fontFamily: "'Product Sans', sans-serif",
        fontWeight: "bold",
        fontSize: "2rem"  // Added explicit font size control
    }
};

export default dynamic(() => Promise.resolve(DynamicMarquee), { ssr: false });