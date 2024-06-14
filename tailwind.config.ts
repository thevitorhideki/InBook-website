import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primariaClaro": '#ECEBE9',
        "secundariaClaro": '#D1A360',
        "primariaEscuro": '#232323',
        "secundariaEscuro": '#977645',
      },
    },
  },
  darkMode: 'selector',
  plugins: [],
};
export default config;
