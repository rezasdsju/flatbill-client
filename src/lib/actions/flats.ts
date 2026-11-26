import { baseUrl } from "@/constants/baseURL"
import { IAddFlat } from "@/types/flatTypes"
import { protectedMutation } from "../core/server"

const BASE_URL = baseUrl()
export const addNewFlat = async (data: IAddFlat) => {
    const api = `${BASE_URL}/flat-owner/flats`
    const res = await protectedMutation(api, 'POST', data)
    const json = await res.json().catch(() => null)
    if (!res.ok) {
        throw new Error(json?.message ?? `Failed (${res.status})`)
    }
    return json
}