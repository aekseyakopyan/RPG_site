import { useEffect, useState } from 'react'

interface UseSanityDataResult<T> {
    data: T | null
    loading: boolean
    error: Error | null
}

export function useSanityData<T>(
    fetcher: () => Promise<T>,
    deps: any[] = []
): UseSanityDataResult<T> {
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        setLoading(true)
        setError(null)

        fetcher()
            .then((result) => {
                setData(result)
                setError(null)
            })
            .catch((err) => {
                console.error('Sanity data fetch error:', err)
                setError(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }, deps)

    return { data, loading, error }
}
