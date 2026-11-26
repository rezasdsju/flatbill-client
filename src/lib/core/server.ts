import { baseUrl } from "@/constants/baseURL";
import { auth } from "@/lib/auth"

import { headers } from "next/headers"
import { redirect } from "next/navigation";
const BASE_URL = baseUrl()
export const getSessionForServerSide = async () => {
    "use server";
    const session = await auth.api.getSession({
        headers: await headers()
    })
    return session
};


export const getToken = async () => {
    const session = await getSessionForServerSide()
    if (!session?.user?.email) {
        redirect('/unauthorized')
    }
    const res = await fetch(`${BASE_URL}/jwt`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-internal-key': process.env.INTERNAL_API_KEY as string
        },
        body: JSON.stringify({ email: session.user.email }),
        cache: 'no-store'
    })
    if (!res.ok) {
        redirect('/unauthorized')
    }
    const { token } = await res.json()
    if (!token) redirect('/unauthorized')

    return token
}

export const authFetch = async (api: string) => {
    const token = await getToken()
    const res = await fetch(api, {
        cache: 'no-store',
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    return res
}


export const protectedMutation = async (api: string, method: string, data?: unknown) => {
    const token = await getToken()
    const headers: Record<string, string> = { authorization: `Bearer ${token}` }
    if (data != undefined || data != null) {
        headers['Content-Type'] = 'application/json'
    }
    const res = await fetch(api, {
        method,
        headers,
        body: data !== undefined ? JSON.stringify(data) : undefined
    })
    return res
}