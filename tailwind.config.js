/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        greenAFS: {
          100: "#5c9a78",
          200: "#086632"
        }
      },
      colors: {
        greenAFS: {
          100: "#5c9a78",
          200: "#086632"
        }
      },
      backgroundImage: {
        'bgLogin': "url('src/assets/bg-estoque.jpg')"
      },
      height: {
        'customHeight': 'calc(100% - 90px)'
      }
    }
  },
  plugins: [],
}