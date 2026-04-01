/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--color-bg) / <alpha-value>)',
        elevated: 'rgb(var(--color-bg-elevated) / <alpha-value>)',
        subtle: 'rgb(var(--color-bg-subtle) / <alpha-value>)',
        muted: 'rgb(var(--color-bg-muted) / <alpha-value>)',
        
        foreground: 'rgb(var(--color-text) / <alpha-value>)',
        secondary: 'rgb(var(--color-text-secondary) / <alpha-value>)',
        'text-muted': 'rgb(var(--color-text-muted) / <alpha-value>)',
        
        green: {
          DEFAULT: 'rgb(var(--color-green) / <alpha-value>)',
          dim: 'rgb(var(--color-green-dim) / <alpha-value>)',
        },
        cyan: 'rgb(var(--color-cyan) / <alpha-value>)',
        
        border: {
          DEFAULT: 'rgb(var(--color-border) / <alpha-value>)',
          hover: 'rgb(var(--color-border-hover) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['Geist', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['Geist Mono', 'JetBrains Mono', 'Menlo', 'Monaco', 'monospace'],
      },
      fontSize: {
        'display': ['clamp(2rem, 5vw, 3.5rem)', { lineHeight: '1.1', fontWeight: '700', letterSpacing: '-0.02em' }],
        'h1': ['clamp(1.5rem, 4vw, 2.5rem)', { lineHeight: '1.2', fontWeight: '600', letterSpacing: '-0.01em' }],
        'h2': ['clamp(1.25rem, 3vw, 1.75rem)', { lineHeight: '1.3', fontWeight: '600' }],
        'h3': ['clamp(1rem, 2.5vw, 1.25rem)', { lineHeight: '1.4', fontWeight: '600' }],
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'small': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        'mono': ['0.875rem', { lineHeight: '1.6', fontWeight: '400' }],
      },
      maxWidth: {
        '7xl': '80rem',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      borderRadius: {
        'lg': '0.5rem',
        'md': '0.375rem',
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'slide-up': 'slide-up 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
};
