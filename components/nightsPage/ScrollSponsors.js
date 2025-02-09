import React, { useEffect } from "react";
import dynamic from "next/dynamic";

const DynamicMarqueeSponsComm = () => {
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
                                <h1 className="text-3xl font-bold" style={styles.heading}>OUR SPONSORS & COMMUNITIES</h1>
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
    heading: {
        fontFamily: "'Product Sans', sans-serif",
        fontWeight: "bold"
    }
};

export default dynamic(() => Promise.resolve(DynamicMarqueeSponsComm), { ssr: false });