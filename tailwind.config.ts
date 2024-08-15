import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                lightBg: "#ffffff",
                darkBg: "#283A4B",
            },
            screens: {
                "1080px": "1080px",
                "560px": "560px",
            },
        },
    },
    darkMode: "class",
    plugins: [
        nextui({
            prefix: "nextui",
            addCommonColors: false,
            defaultTheme: "dark",
            defaultExtendTheme: "dark",
            layout: {},
            themes: {
                light: {
                    layout: {},
                    colors: {
                        background: "#FFFDEF",
                    },
                },
                dark: {
                    layout: {},
                    colors: {
                        background: "#121A2F",
                    },
                },
            },
        }),
    ],
};
export default config;
