// TypeScript types for Sanity data

import type { PixelIconName } from "@/components/PixelIcon"

export interface SanityImage {
    _type: 'image'
    asset: {
        _ref: string
        _type: 'reference'
    }
}

export interface SanityHero {
    _id: string
    _type: 'hero'
    badge?: string
    title: string
    subtitle?: string
    ctaPrimary?: {
        text: string
        link: string
    }
    ctaSecondary?: {
        text: string
        link: string
    }
    heroImage?: SanityImage
    badges?: Array<{
        text: string
        position: 'left' | 'right' | 'bottom'
    }>
    stats?: Array<{
        name: string
        label: string
        value: number
        color: string
        desc: string
    }>
    socialProof?: Array<{
        value: string
        label: string
        icon: string
    }>
    about?: {
        name: string
        role: string
        level: string
        image?: SanityImage
        achievements?: string[]
        whyMe?: Array<{
            title: string
            desc: string
            icon: PixelIconName
        }>
        forWho?: string[]
    }
}

export interface SanityService {
    _id: string
    _type: 'service'
    name: string
    slug: {
        current: string
    }
    type: string
    metaphor?: string
    description: string
    includes: string[]
    results: string[] // Schema has 'results' as array
    result?: string   // Add optional 'result' for frontend compatibility if needed
    timeline: string
    price: string
    icon: PixelIconName
    color: string
    order: number
    stats?: {
        damage: number
        speed: number
        control: number
    }
    comparisonValues?: {
        duration: string
        price: string
        target: string
        format: string
        result: string
    }
    faqs?: Array<{
        question: string
        answer: string
    }>
}

export interface SanityBattleQuestion {
    _id: string
    _type: 'battleQuestion'
    text: string
    category: 'business' | 'marketing' | 'sales'
    priority: 'critical' | 'important' | 'basic'
    difficulty: string[]
    hint?: string
    options: Array<{
        text: string
        points: number
        explanation: {
            title: string
            why: string
            pros?: string[]
            risks?: string[]
            actionable?: string
        }
    }>
}

export interface SanityCase {
    _id: string
    _type: 'case'
    enemy?: string
    client: string
    slug: {
        current: string
    }
    niche: string
    shortDescription?: string
    icon?: PixelIconName
    iconColor?: string
    color?: string
    challenge: string
    solution: Array<{
        title: string
        steps: string[]
    }>
    results: Array<{
        label: string
        before: string
        after: string
        icon: string
        improvement?: string
    }>
    mainMetrics?: Array<{
        label: string
        value: string
        growth: string
    }>
    testimonial?: {
        text: string
        author: string
        position: string
    }
    numbers: string
    tools: string
    duration: string
    image?: SanityImage
    order: number
}

export interface SanityProcessStep {
    _id: string
    _type: 'processStep'
    order: number
    title: string
    subtitle: string
    metaphor: string
    icon: PixelIconName
    color: string
    details: string[]
    result: string
    xp: number
}

export interface SanityReview {
    _id: string
    _type: 'review'
    name: string
    position: string
    company: string
    text: string
    rating: number
    avatar?: SanityImage
    order: number
}

export interface SanitySettings {
    _id: string
    _type: 'settings'
    siteName: string
    siteDescription: string
    logo?: SanityImage
    primaryColor?: {
        hex: string
    }
    secondaryColor?: {
        hex: string
    }
    contactEmail: string
    contactPhone: string
    telegram: string
    socialLinks?: Array<{
        platform: 'telegram' | 'vk' | 'linkedin' | 'instagram'
        url: string
    }>
    seo?: {
        title: string
        description: string
        keywords: string[]
        ogImage?: SanityImage
    }
}

export interface SanityQuestOption {
    text: string
    subtext?: string
    value: string
    xp: number
    icon: PixelIconName
}

export interface SanityQuestStep {
    _id: string
    _type: 'quest'
    stepId: number
    type: 'choice' | 'form'
    title: string
    subtitle: string
    question: string
    icon: PixelIconName
    options?: SanityQuestOption[]
}
