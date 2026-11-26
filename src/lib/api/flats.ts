'use server'

import { baseUrl } from "@/constants/baseURL"
import { authFetch } from "../core/server"

const BASE_URL = baseUrl()
export const getFlatsByFlatOwner = async () => {
    const api = `${BASE_URL}/flat-owner/flats`
    const res = await authFetch(api)
    return res.json()
}