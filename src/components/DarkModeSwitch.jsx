
"use client"
import { useState, useEffect } from 'react'
import { MdLightMode, MdDarkMode } from 'react-icons/md'
import { useTheme } from 'next-themes'

export default function DarkModeSwitch() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme, systemTheme } = useTheme()

    // useEffect is only needed for hydration
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        )
    }

    const currentTheme = theme === 'system' ? systemTheme : theme

    return (
        <button
            onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title={currentTheme === 'dark' ? 'Light mode' : 'Dark mode'}
        >
            {currentTheme === 'dark' ? (
                <MdLightMode className="text-xl" />
            ) : (
                <MdDarkMode className="text-xl" />
            )}
        </button>
    )
}
