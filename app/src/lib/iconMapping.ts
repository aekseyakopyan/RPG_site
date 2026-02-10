import {
    TrendingUp,
    TrendingDown,
    Target,
    Lightbulb,
    Rocket,
    BarChart,
    BarChart3,
    Star,
    ShoppingBag,
    GraduationCap,
    Building2,
    Heart,
    Sword,
    Search,
    BookOpen,
    FlaskConical,
    Percent,
    Users,
    type LucideIcon,
} from 'lucide-react'

export const iconMap: Record<string, LucideIcon> = {
    TrendingUp,
    TrendingDown,
    Target,
    Lightbulb,
    Rocket,
    BarChart,
    BarChart3,
    Star,
    ShoppingBag,
    GraduationCap,
    Building2,
    Heart,
    Sword,
    Search,
    BookOpen,
    FlaskConical,
    Percent,
    Users,
}

export function getIcon(iconName: string): LucideIcon {
    return iconMap[iconName] || Star
}
