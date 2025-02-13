import type { Config } from "tailwindcss";

export const theme = {
  colors: {
    primary: "#5D5FEF",
    secondary: "#A5A6F6",
    accent: "#7879F1",
    highlight: "#F17300",
    background: "#110D17",
    foreground: "#FFFFFF",
    muted: "#98949E",
    danger: "#8F0A13",
    muteddark: "#D1D0D3",
    action: "#FAFAFA",
    redcustom: "#8F0A13",
    black: "#000000",

    sunset: "#F46B45",
    ocean: "#2F80ED",
    mint: "#11998E",
    purple: "#7F00FF",
  },
};

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontSize: {
        "xs-custom": "10px",
        "sm-custom": "12px",
        "base-custom": "14px",
        "md-custom": "20px",
        "lg-custom": "24px",
        "xl-custom": "28px",
      },
      colors: theme.colors,
      backgroundImage: {
        sunset: "linear-gradient(to right, #EEA849, #F46B45)",
        ocean: "linear-gradient(to right, #56CCF2, #2F80ED)",
        mint: "linear-gradient(to right, #38EF7D, #11998E)",
        purple: "linear-gradient(to right, #E100FF, #7F00FF)",
      },
      fontFamily: {
        Quicksand: ["Quicksand", "serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
