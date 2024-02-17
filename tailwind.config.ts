import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                mono: ['Fira Code', ...defaultTheme.fontFamily.mono],
            },
        },
    },
    plugins: [],
} satisfies Config;
