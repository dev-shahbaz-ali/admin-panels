export const ACCENT_COLORS = ["blue", "purple", "green", "red", "orange", "pink"] as const;
export type AccentColor = typeof ACCENT_COLORS[number];

export const getAccentClasses = (
  color: AccentColor,
  type: "text" | "bg" | "border" | "ring" | "hover:bg" | "hover:border" | "hover:text" | "accent"
): string => {
  const classMap: Record<AccentColor, Record<typeof type, string>> = {
    blue: { "text": "text-blue-400", "bg": "bg-blue-600", "border": "border-blue-500", "ring": "ring-blue-500/20", "hover:bg": "hover:bg-blue-700", "hover:border": "hover:border-blue-500", "hover:text": "hover:text-blue-400", "accent": "accent-blue-600" },
    purple: { "text": "text-purple-400", "bg": "bg-purple-600", "border": "border-purple-500", "ring": "ring-purple-500/20", "hover:bg": "hover:bg-purple-700", "hover:border": "hover:border-purple-500", "hover:text": "hover:text-purple-400", "accent": "accent-purple-600" },
    green: { "text": "text-green-400", "bg": "bg-green-600", "border": "border-green-500", "ring": "ring-green-500/20", "hover:bg": "hover:bg-green-700", "hover:border": "hover:border-green-500", "hover:text": "hover:text-green-400", "accent": "accent-green-600" },
    red: { "text": "text-red-400", "bg": "bg-red-600", "border": "border-red-500", "ring": "ring-red-500/20", "hover:bg": "hover:bg-red-700", "hover:border": "hover:border-red-500", "hover:text": "hover:text-red-400", "accent": "accent-red-600" },
    orange: { "text": "text-orange-400", "bg": "bg-orange-600", "border": "border-orange-500", "ring": "ring-orange-500/20", "hover:bg": "hover:bg-orange-700", "hover:border": "hover:border-orange-500", "hover:text": "hover:text-orange-400", "accent": "accent-orange-600" },
    pink: { "text": "text-pink-400", "bg": "bg-pink-600", "border": "border-pink-500", "ring": "ring-pink-500/20", "hover:bg": "hover:bg-pink-700", "hover:border": "hover:border-pink-500", "hover:text": "hover:text-pink-400", "accent": "accent-pink-600" },
  };

  return classMap[color][type];
};

export const getAccentBg = (color: AccentColor, opacity: number) => {
    const bgMap: Record<AccentColor, string> = {
        blue: `bg-blue-500/${opacity}`,
        purple: `bg-purple-500/${opacity}`,
        green: `bg-green-500/${opacity}`,
        red: `bg-red-500/${opacity}`,
        orange: `bg-orange-500/${opacity}`,
        pink: `bg-pink-500/${opacity}`,
    };
    return bgMap[color];
}