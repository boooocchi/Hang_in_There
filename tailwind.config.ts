import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontSize: {
      '4xl': '48px',
      '3xl': '40px',
      '2xl': '32px',
      xl: '24px',
      lg: '20px',
      base: '16px',
      sm: '14px',
      xs: '12px',
    },

    extend: {
      fontFamily: {
        pageTitle: ['Alumni Sans', 'sans-serif'],
      },
      backgroundImage: {
        signinPage: 'url("/image/signinPage.jpg")',
      },
      colors: {
        deepGreen: '#11221F',
        richGreen: '#00483F',
        lighterGreen: '#11655b',
        accentOrangeRed: '#fF7B3C',
        errorRed: '#FF3300',
      },
      width: {
        pc_sideMenuWidth: '300px',
      },
      height: {
        pc_headerHeight: '100px',
        pc_mainLayoutHeight: '800px',
      },
      zIndex: {
        sideMenu: '100',
      },
      gap: {
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
      // absolute: {
      //   md: '20px',
      //   sm: '10px',
      //   xs: '5px',
      // },
    },
  },
  plugins: [],
};
export default config;
