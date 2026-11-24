'use client'
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";


const ThemeToggle = () => {
    const { setTheme, resolvedTheme } = useTheme()
    return (
        <button
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
        >
            <Sun className="h-5 w-5 dark:hidden cursor-pointer" />
            <Moon className="hidden h-5 w-5 dark:block cursor-pointer" />
        </button>
    );
};

export default ThemeToggle;