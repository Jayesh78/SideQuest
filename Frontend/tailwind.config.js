import daisyui from "daisyui";
import themes from "daisyui/theme/object";

/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["light", "dark", "forest"],
  },
};
