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
      '4xl': '40px',
      '3xl': '32px',
      '2xl': '24px',
      xl: '20px',
      lg: '16',
      base: '14px',
      sm: '12px',
      xs: '10px',
    },
    fontWeight: {
      normal: '300',
      bold: '500',
      extraBold: '600',
      boldest: '700',
    },

    extend: {
      backgroundImage: {
        signinPage: 'url("/image/signinPage.jpg")',
      },
      colors: {
        deepGreen: '#00423A',
        richGreen: '#11655b',
        middleGreen: '#178275',
        lightGreen: '#DEF1EF',
        accentOrange: '#E96C49',
        lighterOrange: '#FC8463',
        lightOrange: '#ffc4aa',
        errorRed: '#FF3300',
        gray: '#F5F5F5',
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
      borderColor: {
        deepGreen: '#11221F',
        richGreen: '#00483F',
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
