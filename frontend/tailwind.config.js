/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'theme-bg-dark': '#101014',
                'theme-modal-bg-light': '#FFFFFF',
                'theme-color-blue': '#396CE4',
                'theme-color-aqua': '#59C2E2',
                'theme-color-purple': '#4F3F97',
                'theme-color-orange': '#ED7B46',
            },
        },
    },
    plugins: [],
}
