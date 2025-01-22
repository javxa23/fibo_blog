import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        grotesk: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        wavy: {
          '0%': { transform: 'scale(0.8)' },
          '50%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(0.8)' },
        },
      },
      animation: {
        wavy: 'wavy 3s ease-in-out infinite',
      },
      typography: {
        DEFAULT: {
          css: {
            lineHeight: '0.25',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
} satisfies Config;
