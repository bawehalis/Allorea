import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ALLOREA Premium Palette
        allorea: {
          50:  '#faf7f4',
          100: '#f4ede4',
          200: '#e8d8c6',
          300: '#d8bc9c',
          400: '#c49972',
          500: '#b5804f',
          600: '#a06a3e',
          700: '#855535',
          800: '#6d4630',
          900: '#5a3c2c',
          950: '#2e1d14',
        },
        obsidian: '#0f0e0c',
        ivory:    '#faf8f5',
        champagne:'#f2e8d9',
        mist:     '#e8e3dc',
        sand:     '#c8b89a',
        umber:    '#8b6e52',
        sage:     '#7a8c74',
        blush:    '#d4a5a0',
      },
      fontFamily: {
        display:  ['var(--font-cormorant)', 'Georgia', 'serif'],
        body:     ['var(--font-jost)', 'system-ui', 'sans-serif'],
        mono:     ['var(--font-mono)', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem' }],
        '10xl':['10rem', { lineHeight: '1' }],
      },
      spacing: {
        '13':  '3.25rem',
        '15':  '3.75rem',
        '18':  '4.5rem',
        '22':  '5.5rem',
        '26':  '6.5rem',
        '30':  '7.5rem',
        '88':  '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
        '192': '48rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'luxury':      '0 8px 32px -4px rgba(15,14,12,0.12), 0 2px 8px -2px rgba(15,14,12,0.08)',
        'luxury-lg':   '0 20px 60px -8px rgba(15,14,12,0.18), 0 4px 16px -4px rgba(15,14,12,0.10)',
        'luxury-xl':   '0 40px 80px -16px rgba(15,14,12,0.24), 0 8px 24px -8px rgba(15,14,12,0.12)',
        'glow-gold':   '0 0 40px rgba(181,128,79,0.2)',
        'glow-soft':   '0 4px 24px rgba(181,128,79,0.15)',
        'inner-luxury':'inset 0 1px 0 rgba(255,255,255,0.1)',
      },
      backgroundImage: {
        'gradient-luxury':     'linear-gradient(135deg, #faf7f4 0%, #f2e8d9 50%, #e8d8c6 100%)',
        'gradient-obsidian':   'linear-gradient(180deg, #1a1916 0%, #0f0e0c 100%)',
        'gradient-gold':       'linear-gradient(135deg, #d4a472 0%, #b5804f 50%, #a06a3e 100%)',
        'gradient-champagne':  'linear-gradient(180deg, #faf8f5 0%, #f2e8d9 100%)',
        'gradient-shimmer':    'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
        'noise':               "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      animation: {
        'fade-up':       'fadeUp 0.6s ease-out forwards',
        'fade-in':       'fadeIn 0.4s ease-out forwards',
        'slide-left':    'slideLeft 0.5s ease-out forwards',
        'slide-right':   'slideRight 0.5s ease-out forwards',
        'scale-in':      'scaleIn 0.3s ease-out forwards',
        'shimmer':       'shimmer 2s infinite linear',
        'float':         'float 6s ease-in-out infinite',
        'pulse-gold':    'pulseGold 2s ease-in-out infinite',
        'marquee':       'marquee 30s linear infinite',
        'drawer-in':     'drawerIn 0.35s cubic-bezier(0.32,0.72,0,1) forwards',
        'drawer-out':    'drawerOut 0.3s ease-in forwards',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideLeft: {
          '0%':   { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideRight: {
          '0%':   { opacity: '0', transform: 'translateX(-24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%':   { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(181,128,79,0.3)' },
          '50%':      { boxShadow: '0 0 0 12px rgba(181,128,79,0)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        drawerIn: {
          '0%':   { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        drawerOut: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
}

export default config
