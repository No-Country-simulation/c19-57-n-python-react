/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif']
    },
    extend: {
      colors: {
        blue: {
          light: '#D6E4E8',
          default: '#435B71',
          darker: '#002140'
        },
        yellow: {
          default: '#F9E8BD',
          light: '#F9EFBD'
        },
        pink: {
          default: '#F9D7BD'
        },
        green: {
          default: '#D6E8D8',
          light: '#E4EDE5'
        }
      },
      fontSize: {
        '2xl': '26px',
        '2.5xl': '28px',
        '4xl': '38px',
        '5xl': '50px'
      },
      borderRadius: {
        '2xl': '14px'
      },
      width: {
        'w-4.5': '18px',
        'w-5.5': '22px',
        'w-6.5': '26px',
        'w-13': '50px'
      },
      dropShadow: {
        '2xl': '0 25px 25px rgb(0 0 0 / 0.10)'
      },
      borderWidth: {
        'border-8': '14px'
      },
      screens: {
        md: '745px'
      }
    }
  },
  plugins: []
}
