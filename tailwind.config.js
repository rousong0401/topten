module.exports = {
  content: ['./**/*.html', './js/*.js'],
  theme: {
    extend: {
      colors: {
        primary: '#004A4F',
        secondary: '#00333E',
        danger: '#dc3545',
        warning: '#D6B686',
        green: {
          100: '#032729',
          200: '#00323D',
          300: '#BDCCCB',
          400: '#00333E',
        },
        yellow: {
          100: '#F9F3EA',
          200: '#D1A772',
        },
        gray: {
          100: '#949494',
        },
        black: '#000000',
        white: '#ffffff',
      },
      fontSize: {
        '0px': '0',           // 0px
        '12px': '0.75rem',    // 12px
        '14px': '0.875rem',   // 14px
        '16px': '1rem',       // 16px
        '18px': '1.125rem',   // 18px
        '20px': '1.25rem',    // 20px
        '24px': '1.5rem',     // 24px
        '28px': '1.75rem',    // 28px
        '32px': '2rem',       // 32px
        '36px': '2.25rem',    // 36px
      },
      screens: {
        'sm': '576px',
        'md': '768px',
        'lg': '992px',
        'xl': '1200px',
        'xxl': '1601px'
      },
      spacing: {
        '1.5': '0.375rem',
        '2.5': '0.625rem',
        '3.5': '0.875rem',
        '4.5': '1.125rem',
        '7.5': '1.875rem',
        '11': '2.75rem',
        '18': '4.5rem',
        '30': '7.5rem'
      },
      zIndex: {
        '999': '999',
      }
    },
  },
  plugins: [],
}
