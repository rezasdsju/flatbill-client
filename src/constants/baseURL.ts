export const baseUrl = () => {
    const url = process.env.NEXT_PUBLIC_API_BASE_URL as string
    return url
}