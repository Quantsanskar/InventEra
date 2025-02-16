/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Enable dark mode
  theme: {
    extend: {
      transitionTimingFunction: {
        "in-out-cubic": "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      colors: {
        // Base colors - always dark
        background: {
          DEFAULT: "#171717",
          dark: "#171717",
          light: "#171717", // Keep dark even in light mode
        },
        // Text colors
        primary: {
          DEFAULT: "#ffffff",
          dark: "#ffffff",
          light: "#ffffff",
        },
        secondary: {
          DEFAULT: "#9ca3af",
          dark: "#9ca3af",
          light: "#9ca3af",
        },
        // Accent colors remain the same for visual hierarchy
        accent: {
          DEFAULT: "#8b5cf6",
          dark: "#a78bfa",
          light: "#8b5cf6",
        },
        // Border colors
        border: {
          DEFAULT: "#374151",
          dark: "#374151",
          light: "#374151",
        },
      },
      fontFamily: {
        manrope: ["var(--font-manrope)", "sans-serif"],
        caveat: ["Caveat", "cursive"],
        sans: ["Plus Jakarta Sans", "sans-serif"],
        inconsolata: ["Inconsolata", "monospace"],
      },

      animation: {
        "wave-pulse": "wave-pulse 4s ease-in-out infinite",
        "fade-in": "fadeIn 1s ease-out",
        "fade-in-delay": "fadeIn 1s ease-out 0.5s forwards",
        gradient: "gradient 15s ease infinite",
        "float-slow": "float-slow 8s ease-in-out infinite",
        "float-medium": "float-medium 6s ease-in-out infinite",
        "float-fast": "float-fast 4s ease-in-out infinite",
        "rotate": "rotate 15s linear infinite",
      },
      keyframes: {
        gradient: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
          "float-slow": {
            "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
            "50%": { transform: "translateY(-10px) translateX(5px)" },
          },
          "float-medium": {
            "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
            "50%": { transform: "translateY(-15px) translateX(-5px)" },
          },
          "float-fast": {
            "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
            "50%": { transform: "translateY(-20px) translateX(10px)" },
          },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        keyframes: {
          "wave-pulse": {
            "0%, 100%": { opacity: 0.4 },
            "50%": { opacity: 0.7 },
          },
        },

        rotate: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },

        animation: {
          float: "float 6s ease-in-out infinite",
        },
        keyframes: {
          float: {
            "0%, 100%": { transform: "translateY(0)" },
            "50%": { transform: "translateY(-20px)" },
          },
        },
        colors: {
          border: "hsl(var(--border))",
          input: "hsl(var(--input))",
          ring: "hsl(var(--ring))",
          background: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))",
          primary: {
            DEFAULT: "hsl(var(--primary))",
            foreground: "hsl(var(--primary-foreground))",
          },
          secondary: {
            DEFAULT: "hsl(var(--secondary))",
            foreground: "hsl(var(--secondary-foreground))",
          },
          destructive: {
            DEFAULT: "hsl(var(--destructive))",
            foreground: "hsl(var(--destructive-foreground))",
          },
          muted: {
            DEFAULT: "hsl(var(--muted))",
            foreground: "hsl(var(--muted-foreground))",
          },
          accent: {
            DEFAULT: "hsl(var(--accent))",
            foreground: "hsl(var(--accent-foreground))",
          },
          popover: {
            DEFAULT: "hsl(var(--popover))",
            foreground: "hsl(var(--popover-foreground))",
          },
          card: {
            DEFAULT: "hsl(var(--card))",
            foreground: "hsl(var(--card-foreground))",
          },
        },
        borderRadius: {
          lg: "var(--radius)",
          md: "calc(var(--radius) - 2px)",
          sm: "calc(var(--radius) - 4px)",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
