import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts,tsx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        nobel: "#B8B4B4",
        codgray: "#0c0c0c",
        red: "#FB0404",
      },
    },
  },
  plugins: [],
};
export default config;
