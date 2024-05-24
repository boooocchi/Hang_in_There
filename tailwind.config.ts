import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/hooks/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontSize: {
      '3xl': '32px',
      '2xl': '24px',
      xl: '20px',
      lg: '16px',
      base: '14px',
      sm: '12px',
      xs: '10px',
    },
    fontWeight: {
      normal: '300',
      bold: '500',
      bolder: '600',
      boldest: '700',
    },
    extend: {
      screens: {
        xs: '431px',
      },
      colors: {
        deepGreen: '#00423A',
        middleGreen: '#10645B',
        lighterGreen: '#13756B',
        accentOrange: '#E96C49',
        lighterOrange: '#FC8463',
        errorRed: '#FF3300',
        darkGray: '#F3F3F3',
        gray: '#FDFDFD',
      },
      gap: {
        '3xl': '60px',
        '2xl': '50px',
        xl: '40px',
        lg: '30px',
        md: '20px',
        sm: '10px',
        xs: '5px',
      },
      padding: {
        '4xl': '80px',
        '3xl': '70px',
        '2xl': '50px',
        xl: '40px',
        lg: '30px',
        md: '20px',
        sm: '10px',
        xs: '5px',
      },
      margin: {
        '2xl': '50px',
        xl: '40px',
        lg: '30px',
        md: '20px',
        sm: '10px',
        xs: '5px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],
};
export default config;
