/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        neon: {
          green: "#00F5A0",
          cyan: "#00D9F5",
          lime: "#DEF54F",
          orange: "#FA7328",
          blue: "#6AC9FF",
        }
      },
      fontFamily: {
        editorial: ["Gloock", "serif"],
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      letterSpacing: {
        widestx2: "0.35em",
        superwide: "0.5em",
      }
    },
  },
  plugins: [],
};
