
'use client'

import { toast } from "sonner"
import { useState } from "react"

export const useImageUpload = () => {
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
            toast.success("Profile photo uploaded", {
                description: "Your profile photo is ready.",
            })
        } catch (error) {
            console.error(error)
            toast.error("Image upload failed", {
                description: error instanceof Error
                    ? error.message
                    : "Please choose a valid image and try again.",
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