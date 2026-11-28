
"use server"
import { baseUrl } from "@/constants/baseURL"

import { protectedMutation } from "../core/server"


const BASE_URL = baseUrl()
export const moveOutTenant = async (flatId: string, tenantId: string) => {
    const api = `${BASE_URL}/flat-owner/my-tenants/${flatId}`
    const res = await protectedMutation(api, 'PATCH', {tenantId})
    const json = await res.json().catch(() => null)
    if (!res.ok) {
        throw new Error(json?.message ?? `Failed ${res.status}`)
    }
    return json
}