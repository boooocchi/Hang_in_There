import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontSize: {
      '4xl': '48px',
      '3xl': '40px',
      '2xl': [
        '32px',
        {
          fontWeight: 'lighter',
          letterSpacing: '-0.5px',
        },
      ],
      xl: '24px',
      lg: '20px',
      base: '16px',
      sm: '14px',
      xs: '12px',
    },
    padding: {
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
    extend: {
      fontFamily: {
        pageTitle: ['Alumni Sans', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        deepGreen: '#11221F',
        richGreen: '#00483F',
        lighterGreen: '#11655b',
        accentOrangeRed: '#EF8B3C',
      },
      width: {
        pc_sideMenuWidth: '300px',
      },
      height: {
        pc_headerHeight: '100px',
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
        richGreen: '#00483F',
      },
    },
  },
  plugins: [],
};
export default config;
