import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Получите Project ID из Sanity Studio
// Откройте http://localhost:3333 и найдите Project ID в настройках
// Или выполните: cd sanity-studio && npx sanity manage

export const client = createClient({
    projectId: '21das8f4', // Project ID из Sanity
    dataset: 'production',
    useCdn: true, // Используйте false для dev режима
    apiVersion: '2024-01-01',
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
    return builder.image(source)
}

// Запросы для получения данных

export async function getHero() {
    return await client.fetch(`*[_type == "hero"][0]`)
}

export async function getServices() {
    return await client.fetch(`*[_type == "service"] | order(order asc)`)
}

export async function getCases() {
    return await client.fetch(`*[_type == "case"] | order(order asc)`)
}

export async function getReviews() {
    return await client.fetch(`*[_type == "review"] | order(order asc)`)
}

export async function getSettings() {
    return await client.fetch(`*[_type == "settings"][0]`)
}

// Запрос конкретного кейса по ID
export async function getCaseById(id: string) {
    return await client.fetch(`*[_type == "case" && _id == $id][0]`, { id })
}

export const getQuests = () => client.fetch(`*[_type == "quest"] | order(stepId asc)`);

export const getBattleQuestions = () => client.fetch(`*[_type == "battleQuestion"]`);

export const getProcessSteps = () => client.fetch(`*[_type == "processStep"] | order(order asc)`);

export const getFaqs = () => client.fetch(`*[_type == "faq"] | order(order asc)`);

// Blog
export const getPosts = () => client.fetch(`*[_type == "post"] | order(publishedAt desc)`);
export const getPostBySlug = (slug: string) => client.fetch(`*[_type == "post" && slug.current == $slug][0]`, { slug });
