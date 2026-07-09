module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                cyan: { DEFAULT: '#00D4FF', 500: '#00D4FF' },
                amber: { DEFAULT: '#FF6B35', 500: '#FF6B35' },
                green: { DEFAULT: '#00FF88', 500: '#00FF88' },
                red: { DEFAULT: '#FF3366', 500: '#FF3366' },
                purple: { DEFAULT: '#A855F7', 500: '#A855F7' },
                yellow: { DEFAULT: '#FFD60A', 500: '#FFD60A' },
                bg: 'var(--bg)',
                bg2: 'var(--bg2)',
                card: 'var(--card)',
                card2: 'var(--card2)',
                border: 'var(--border)',
                border2: 'var(--border2)',
                text: 'var(--text)',
                text2: 'var(--text2)',
                text3: 'var(--text3)',
            },
            fontFamily: {
                inter: ['Inter', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            boxShadow: {
                card: 'var(--shadow)',
                card2: 'var(--shadow2)',
            },
            animation: {
                'fade-up': 'fadeUp 0.6s ease',
                'fade-in': 'fadeIn 0.3s ease',
                'pulse-2': 'pulse2 2s infinite',
                'flow': 'flow 1s linear infinite',
                'pump-spin': 'pumpSpin 2s linear infinite',
                'blink': 'blink 1.5s ease-in-out infinite',
                'pressure-wave': 'pressureWave 1.5s ease-out infinite',
            },
            keyframes: {
                fadeUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(6px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                pulse2: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.5' },
                },
                flow: {
                    '0%': { strokeDashoffset: '100' },
                    '100%': { strokeDashoffset: '0' },
                },
                pumpSpin: {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                },
                blink: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.3' },
                },
                pressureWave: {
                    '0%': { r: '4', opacity: '0.8' },
                    '100%': { r: '12', opacity: '0' },
                },
            },
        },
    },
    plugins: [],
}
