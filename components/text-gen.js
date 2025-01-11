import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";

export const TextGenerateEffect = ({
  words = "",
  className = "",
  filter = true,
  duration = 0.5
}) => {
  const [scope, animate] = useAnimate();
  const text = typeof words === 'string' ? words : String(words || '');
  const wordsArray = text.split(" ").filter(Boolean);

  useEffect(() => {
    if (wordsArray.length > 0) {
      animate(
        "span.word",
        {
          opacity: 1,
          filter: filter ? "blur(0px)" : "none",
        },
        {
          duration: duration,
          delay: stagger(0.2),
        }
      );
    }
  }, [scope.current, animate, duration, filter, wordsArray.length]);

  if (wordsArray.length === 0) {
    return null;
  }

  return (
    <div className={`min-h-screen flex items-center justify-center bg-black ${className}`}>
      <div className="max-w-3xl p-8 rounded-xl bg-[#111]/80 backdrop-blur-lg shadow-2xl border border-gray-800">
        <motion.div 
          ref={scope}
          className="text-3xl md:text-4xl font-bold leading-relaxed tracking-wide"
        >
          {wordsArray.map((word, idx) => (
            <motion.span
              key={`${word}-${idx}`}
              className="word text-gray-100 opacity-0 inline-block relative mr-4"
              style={{
                filter: filter ? "blur(8px)" : "none",
              }}
              onAnimationComplete={() => {}}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TextGenerateEffect;