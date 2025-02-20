"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

export const PageShowcase = ({
  pages: propPages,
  containerClassName,
  activePageClassName,
  pageClassName,
  contentClassName
}) => {
  const [active, setActive] = useState(propPages[0]);
  const [pages, setPages] = useState(propPages);
  const [hovering, setHovering] = useState(false);

  const moveSelectedPageToTop = (idx) => {
    const newPages = [...propPages];
    const selectedPage = newPages.splice(idx, 1);
    newPages.unshift(selectedPage[0]);
    setPages(newPages);
    setActive(newPages[0]);
  };

  return (
    <>
      <div
        className={cn(
          "flex flex-row items-center justify-start [perspective:1000px] relative overflow-auto sm:overflow-visible no-visible-scrollbar max-w-full w-full",
          containerClassName
        )}
      >
        {propPages.map((page, idx) => (
          <button
            key={page.title}
            onClick={() => moveSelectedPageToTop(idx)}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className={cn(
              "relative px-4 py-2 rounded-full transition-colors",
              pageClassName
            )}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {active.value === page.value && (
              <motion.div
                layoutId="activebutton"
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                className={cn(
                  "absolute inset-0 bg-gray-800 rounded-full",
                  activePageClassName
                )}
              />
            )}
            <span className="relative block text-white">
              {page.title}
            </span>
          </button>
        ))}
      </div>
      <ContentCards
        pages={pages}
        active={active}
        key={active.value}
        hovering={hovering}
        className={cn("mt-32", contentClassName)}
      />
    </>
  );
};

const ContentCards = ({ className, pages, hovering }) => {
  const [hoveringCard, setHoveringCard] = useState(null);

  const isActive = (page) => {
    return page.value === pages[0].value;
  };

  return (
    <div className="relative w-full h-full">
      {pages.map((page, idx) => (
        <motion.div
          key={page.value}
          layoutId={page.value}
          style={{
            scale: 1 - idx * 0.1,
            top: hovering ? idx * -50 : 0,
            zIndex: -idx,
            opacity: idx < 3 ? 1 - idx * 0.1 : 0,
          }}
          animate={{
            y: isActive(page) ? [0, 40, 0] : 0,
          }}
          className={cn("w-full h-full absolute top-0 left-0", className)}
          onMouseEnter={() => setHoveringCard(page.value)}
          onMouseLeave={() => setHoveringCard(null)}
        >
          <a
            href={page.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full h-full"
          >
            <div className="w-full h-full overflow-hidden relative rounded-2xl p-8 text-white bg-[#0C0C0C] shadow-[-4px_-4px_30px_0px_rgba(162,210,255,0.15),4px_4px_30px_0px_rgba(162,210,255,0.15)] group transition-all duration-300">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4">{page.title}</h3>
                <p className="text-gray-300 text-lg">{page.description}</p>

                {hoveringCard === page.value && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 flex items-center justify-center w-full text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <div className="inline-flex items-center gap-2">
                      <span>Know More</span>
                      <ExternalLink size={40} />
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </a>
        </motion.div>
      ))}
    </div>
  );
};

export default PageShowcase;