import axios from 'axios'
import { useEffect, useState } from 'react'

type METHODS = 'GET' | 'POST' | 'PUT' | 'DELETE'
interface RESPONSE {
    isLoadding: boolean
    error: string
    data: any
}

const useFetch = (
    url: string,
    headers: Record<string, string> = {},
    payload: Record<string, any> = {},
    method: METHODS = 'GET', // Default method is GET
): RESPONSE => {
    const [isLoadding, setIsLoadding] = useState<boolean>(true)
    const [error, setError] = useState<string>('')
    const [data, setData] = useState<any>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoadding(true)
                const res = await axios({
                    url,
                    data: payload,
                    method,
                    headers: {
                        ...headers,
                        'Content-Type': 'application/json',
                    },
                })
                setData(res.data?.data)
                setIsLoadding(false)
            } catch (err: any) {
                setError(err?.response?.data?.message || 'An error occurred')
                setIsLoadding(false)
                setData(null)
            }
        }

        if (url.trim()) {
            // *  Fetch data when URL changes or not empty
            fetchData()
        }
    }, [url])

    return { isLoadding, error, data }
}

export default useFetch
