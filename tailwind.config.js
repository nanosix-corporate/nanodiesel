/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      borderRadius: {
        xl: '8px',
        '2xl': '12px',
      },
      screens: {
        sm: '641px',
        md: '769px',
        nav: '921px',
        lg: '1025px'
      },
      fontSize: {
        'fs-xs': '0.75rem',
        'fs-sm': '0.875rem',
        'fs-nav': '0.92rem',
        'fs-base': '1rem',
        'fs-md': '1.125rem',
        'fs-lg': '1.5rem',
        'fs-xl': '2rem',
        'fs-xxl': '3rem',
        'fs-xxxl': '4rem',
      },
      fontFamily: {
        sans: ['var(--font-nunito-sans)', 'sans-serif'],
        secondary: ['var(--font-nunito-sans)', 'sans-serif'],
        headline: ['var(--font-nunito-sans)', 'sans-serif'],
        body: ['var(--font-nunito-sans)', 'sans-serif'],
        manrope: ['var(--font-nunito-sans)', 'sans-serif'] // keeping manrope mapping for backwards compatibility just in case
      },
      fontWeight: {
        thin: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
      colors: {
        brand: {
          primary: '#528247',   // CTA buttons, icons, accents
          secondary: '#7D9D3A',
          accent: '#2E6514',   // hover darkening
          white: '#ffffff',
          dark: '#1a2b17',   // card buttons, page header BG, footer BG
          darkest: '#092105',
          neutral: '#121212',
          light: '#F5F9FA',
          copy: '#121212'
        },
        emerald: {
          50: '#f2f7ef',
          100: '#e0edda',
          200: '#c3dcb7',
          300: '#9fc58e',
          400: '#7aad66',
          500: '#609650',
          600: '#528247', // ← Brand Primary
          700: '#2E6514',
          800: '#15570B',
          900: '#092105'
        },
        olive: {
          50: '#f7f8f5',
          100: '#eef0ea',
          200: '#dde1d5',
          300: '#c3cbb9',
          400: '#97a88a',
          500: '#6e8763',
          600: '#528247',
          700: '#3d6134',
          800: '#2a4324',
          900: '#1a2b17'
        }
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
};
