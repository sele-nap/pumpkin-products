/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        pumpkin: {
          50: '#fff6ed',
          100: '#ffe9d5',
          200: '#ffd1aa',
          300: '#ffb877',
          400: '#ff9a45',
          500: '#f47f1f', // primary accent
          600: '#d76811',
          700: '#b3530f',
          800: '#8c4211',
          900: '#6e3611'
        },
        sage: {
          50: '#f3f7f4',
          100: '#e6efe9',
          200: '#cfe0d4',
          300: '#b6cfbd',
          400: '#94b69d',
          500: '#769c81', // secondary
          600: '#5f826a',
          700: '#4b6754',
          800: '#3c5244',
          900: '#33453b'
        },
        dusk: {
          50: '#f4f2f6',
          100: '#e9e3ef',
          200: '#d4c7df',
          300: '#b7a3ca',
          400: '#9b81b5',
          500: '#7f639a',
        }
      },
      boxShadow: {
        cozy: '0 10px 20px rgba(17, 24, 39, 0.08)',
      },
      borderRadius: {
        xl2: '1.25rem'
      }
    }
  },
  plugins: []
}