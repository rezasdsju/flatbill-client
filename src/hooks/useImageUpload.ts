
'use client'

import { toast } from "sonner"
import { useState } from "react"
import { useTranslations } from "next-intl"

export const useImageUpload = () => {
    const t = useTranslations("auth")
    const [imagePreview, setImagePreview] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [isUploadingImage, setIsUploadingImage] = useState(false)

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        if (file) {
            setImagePreview(URL.createObjectURL(file))
            setImageUrl("")
            setIsUploadingImage(true)
        }
        try {
            const formData = new FormData()
            formData.append('image', file)
            const res = await fetch("/api/upload-image", {
                method: "POST",
                body: formData
            })
            const result = await res.json()

            if (!res.ok) {
                throw new Error(result.message)
            }
            setImageUrl(result.imageUrl)
            toast.success(t("profilePhotoUploaded"), {
                description: t("profilePhotoReady"),
            })
        } catch (error) {
            console.error(error)
            toast.error(t("imageUploadFailed"), {
                description: error instanceof Error
                    ? error.message
                    : t("imageUploadFailedDescription"),
            })

        } finally {
            setIsUploadingImage(false)
        }
    }
    const resetImage = () => {
        setImagePreview("")
        setImageUrl("")
        setIsUploadingImage(false)
    }
    return { resetImage, imagePreview, imageUrl, isUploadingImage, handleImageChange }

}