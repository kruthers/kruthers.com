import type { Config } from 'tailwindcss';
import daisyui from "daisyui"

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {}
  },

  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#2f3c4f",
          "secondary": "#43528f",
          "accent": "#76a6ea",
          "neutral": "#7c8ca1",
          "base-100": "#e5e7eb",
          "info": "#6d28d9",
          "success": "#00ff00",
          "warning": "#f59e0b",
          "error": "#ff0001",
        },
      },
    ],
  },

  plugins: [
    daisyui
  ]
} satisfies Config;
