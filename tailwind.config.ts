import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /* Deep space backgrounds */
        'void': '#0a0a0f',
        'hull': '#0d0d18',
        'panel': '#111122',
        'card': '#141428',

        /* LCARS Signature */
        'lcars-amber': '#f1a33c',
        'lcars-gold': '#cc9933',
        'lcars-orange': '#e67e22',

        /* Warp Core Blues */
        'warp-blue': '#3d8bfd',
        'warp-cyan': '#22d3ee',
        'warp-teal': '#00c4b4',

        /* Shield Purples */
        'shield-purple': '#9b59b6',
        'shield-violet': '#7c3aed',

        /* Status */
        'alert-red': '#ef4444',
        'status-green': '#22c55e',

        /* Text */
        'text-primary': '#e8e8f0',
        'text-secondary': '#9ca3af',
        'text-muted': '#6b7280',

        /* Legacy aliases for compatibility */
        foreground: '#e8e8f0',
        background: '#0a0a0f',
        foregroundHover: '#22d3ee',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        rajdhani: ['Rajdhani', 'sans-serif'],
        mono: ['Share Tech Mono', 'monospace'],
        poppins: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'warp-gradient': 'linear-gradient(135deg, #22d3ee, #3d8bfd)',
        'lcars-gradient': 'linear-gradient(135deg, #f1a33c, #cc9933)',
        'void-gradient': 'linear-gradient(180deg, #0a0a0f, #111122)',
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(61, 139, 253, 0.3), 0 0 40px rgba(61, 139, 253, 0.1)',
        'glow-cyan': '0 0 20px rgba(34, 211, 238, 0.3), 0 0 40px rgba(34, 211, 238, 0.1)',
        'glow-amber': '0 0 20px rgba(241, 163, 60, 0.3), 0 0 40px rgba(241, 163, 60, 0.1)',
        'glow-purple': '0 0 20px rgba(124, 58, 237, 0.3), 0 0 40px rgba(124, 58, 237, 0.1)',
      },
      borderColor: {
        'dim': 'rgba(61, 139, 253, 0.1)',
        'subtle': 'rgba(61, 139, 253, 0.2)',
        'active': 'rgba(34, 211, 238, 0.5)',
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'warp-pulse': 'warpPulse 3s ease-in-out infinite',
        'glow-border': 'glowBorder 3s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
      },
    },
  },
  plugins: [],
}
export default config
