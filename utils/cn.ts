import { type ClassValue, clsx } from "clsx"

export function cn(...inputs: ClassValue[]) {
    return clsx(inputs)
}

export function getAccentBg(color: string) {
    const colors: Record<string, string> = {
        blue: "bg-blue-600",
        purple: "bg-purple-600",
        green: "bg-green-600",
        red: "bg-red-600",
        orange: "bg-orange-600",
        pink: "bg-pink-600",
    }
    return colors[color] || "bg-blue-600"
}

export function getAccentClasses(color: string) {
    const colors: Record<string, string> = {
        blue: "border-blue-600 text-blue-600",
        purple: "border-purple-600 text-purple-600",
        green: "border-green-600 text-green-600",
        red: "border-red-600 text-red-600",
        orange: "border-orange-600 text-orange-600",
        pink: "border-pink-600 text-pink-600",
    }
    return colors[color] || "border-blue-600 text-blue-600"
}