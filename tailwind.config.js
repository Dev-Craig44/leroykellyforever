/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'kelly-brown': '#3B2A18',
        'browns-orange': '#F26A1B',
        'sand': '#F8F5F0',
      },
      fontFamily: {
        display: ['Montserrat', 'sans-serif'],
        body: ['Inter', 'Open Sans', 'sans-serif'],
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in",
        marquee: "marquee 50s linear infinite",
        marqueeSoft: "marquee 70s cubic-bezier(0.25, 0.1, 0.25, 1) infinite",
        slideUp: "slideUp 0.4s ease-out",
        slideUpSoft: "slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        scaleIn: "scaleIn 0.3s ease-out",
        fadeInUp: "fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },

      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeInUp: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
