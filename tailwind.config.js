/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
        sans: ['"Host Grotesk"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        // Signature accent — a restrained terminal cyan, used sparingly.
        accent: {
          DEFAULT: "#22d3ee",
          soft: "#0e7490",
        },
      },
    },
  },
  plugins: [],
}
