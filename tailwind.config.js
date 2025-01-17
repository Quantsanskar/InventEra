/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', "class"], // Enable dark mode
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				dark: '#ffffff',
  				light: '#ffffff',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				dark: '#9ca3af',
  				light: '#9ca3af',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				dark: '#a78bfa',
  				light: '#8b5cf6',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			manrope: [
  				'var(--font-manrope)',
  				'sans-serif'
  			],
  			caveat: [
  				'Caveat',
  				'cursive'
  			],
  			sans: [
  				'Plus Jakarta Sans',
  				'sans-serif'
  			]
  		},
  		animation: {
  			'fade-in': 'fadeIn 1s ease-out',
  			'fade-in-delay': 'fadeIn 1s ease-out 0.5s forwards',
  			gradient: 'gradient 15s ease infinite',
  			'float-slow': 'float-slow 8s ease-in-out infinite',
  			'float-medium': 'float-medium 6s ease-in-out infinite',
  			'float-fast': 'float-fast 4s ease-in-out infinite'
  		},
  		keyframes: {
  			gradient: {
  				'0%, 100%': {
  					'background-size': '200% 200%',
  					'background-position': 'left center'
  				},
  				'50%': {
  					'background-size': '200% 200%',
  					'background-position': 'right center'
  				},
  				'float-slow': {
  					'0%, 100%': {
  						transform: 'translateY(0px) translateX(0px)'
  					},
  					'50%': {
  						transform: 'translateY(-10px) translateX(5px)'
  					}
  				},
  				'float-medium': {
  					'0%, 100%': {
  						transform: 'translateY(0px) translateX(0px)'
  					},
  					'50%': {
  						transform: 'translateY(-15px) translateX(-5px)'
  					}
  				},
  				'float-fast': {
  					'0%, 100%': {
  						transform: 'translateY(0px) translateX(0px)'
  					},
  					'50%': {
  						transform: 'translateY(-20px) translateX(10px)'
  					}
  				}
  			},
  			fadeIn: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(20px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}