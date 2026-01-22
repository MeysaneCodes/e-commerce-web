/** @type {import('tailwindcss').Config} */

import withMT from "@material-tailwind/react/utils/withMT";
import { blackA, mauve, violet, indigo, purple } from "@radix-ui/colors";
import plugin from "tailwindcss/plugin";
const flowbiteReact = require("flowbite-react/plugin/tailwindcss");
//import type {} from '@mui/x-charts/themeAugmentation';


module.exports = withMT({
    darkMode: ["class", "class"],

    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
        ".flowbite-react/class-list.json"
    ],

    theme: {
    	extend: {
    		colors: {
                ...blackA,
                ...mauve,
                ...violet,
                ...purple,
                ...indigo,
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			border: 'hsl(var(--border))',
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
    		keyframes: {
    			enterFromRight: {
    				from: {
    					opacity: '0',
    					transform: 'translateX(200px)'
    				},
    				to: {
    					opacity: '1',
    					transform: 'translateX(0)'
    				}
    			},
    			enterFromLeft: {
    				from: {
    					opacity: '0',
    					transform: 'translateX(-200px)'
    				},
    				to: {
    					opacity: '1',
    					transform: 'translateX(0)'
    				}
    			},
    			exitToRight: {
    				from: {
    					opacity: '1',
    					transform: 'translateX(0)'
    				},
    				to: {
    					opacity: '0',
    					transform: 'translateX(200px)'
    				}
    			},
    			exitToLeft: {
    				from: {
    					opacity: '1',
    					transform: 'translateX(0)'
    				},
    				to: {
    					opacity: '0',
    					transform: 'translateX(-200px)'
    				}
    			},
    			scaleIn: {
    				from: {
    					opacity: '0',
    					transform: 'rotateX(-10deg) scale(0.9)'
    				},
    				to: {
    					opacity: '1',
    					transform: 'rotateX(0deg) scale(1)'
    				}
    			},
    			scaleOut: {
    				from: {
    					opacity: '1',
    					transform: 'rotateX(0deg) scale(1)'
    				},
    				to: {
    					opacity: '0',
    					transform: 'rotateX(-10deg) scale(0.95)'
    				}
    			},
    			fadeIn: {
    				from: {
    					opacity: '0'
    				},
    				to: {
    					opacity: '1'
    				}
    			},
    			fadeOut: {
    				from: {
    					opacity: '1'
    				},
    				to: {
    					opacity: '0'
    				}
    			}
    		},
    		animation: {
    			scaleIn: 'scaleIn 200ms ease',
    			scaleOut: 'scaleOut 200ms ease',
    			fadeIn: 'fadeIn 200ms ease',
    			fadeOut: 'fadeOut 200ms ease',
    			enterFromLeft: 'enterFromLeft 250ms ease',
    			enterFromRight: 'enterFromRight 250ms ease',
    			exitToLeft: 'exitToLeft 250ms ease',
    			exitToRight: 'exitToRight 250ms ease'
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		}
    	}
    },

    plugins: [

        require("tailwind-scrollbar-hide"),
        require("daisyui"),
        require("flowbite/plugin"),
        plugin(({ matchUtilities }) => {
        matchUtilities({
            perspective: (value) => ({
                perspective: value,
            }),
        });
    }), flowbiteReact,
        require("tailwindcss-animate")
    ],
});