'use client'

import {
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


import { Button } from "@/components/ui/button"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useImageUpload } from "@/hooks/useImageUpload"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"


interface Props {
    mode: 'sign-in' | 'register'
}
const AuthForm = ({ mode }: Props) => {
    const { imagePreview, imageUrl, isUploadingImage, handleImageChange } = useImageUpload()

    const isRegister = mode === 'register'
    const router = useRouter()
    const [clickedToAuthButton, setClickedToAuthButton] = useState(false)

    const handleAuth = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const userData = Object.fromEntries(formData.entries())

        if (mode === 'register') {
            if (isUploadingImage) return
            const password = userData.password as string
            const password1 = userData.password1 as string
            if (!password || !password1) {
                toast.error('Please enter password')
                return
            }
            if (password !== password1) {
                toast.error("Passwords do not match", {
                    description: "Please confirm that both passwords are identical.",
                });
                return;
            }

            if (
                password.length < 8 ||
                !/[A-Z]/.test(password) ||
                !/[a-z]/.test(password)
            ) {
                toast.error("Password requirements not met", {
                    description: "Use at least 8 characters, including an uppercase and a lowercase letter.",
                })
                return
            }
            setClickedToAuthButton(true)
            const { data, error } = await authClient.signUp.email({
                name: userData.name as string,
                email: userData.email as string,
                password: userData.password as string,
                ...(imageUrl ? { image: imageUrl } : {})
            })
            if (error) {
                toast.error("Account creation failed", {
                    description: error.message || "We couldn't create your account. Please try again.",
                })
                setClickedToAuthButton(false)
            }
            if (data) {
                toast.success("Account created successfully", {
                    description: "Redirecting you to the homepage.",
                })
                router.push('/')

            }
        }
        if (mode === 'sign-in') {
            setClickedToAuthButton(true)
            const { data, error } = await authClient.signIn.email({
                email: userData.email as string,
                password: userData.password as string
            })
            if (error) {
                toast.error("Sign-in failed", {
                    description: error.message || "Please check your email and password, then try again.",
                })
                setClickedToAuthButton(false)
            }
            if (data) {
                toast.success("Signed in successfully", {
                    description: "Redirecting you to the homepage.",
                })
                router.push('/')
            }
        }
    }
    return (
        <div>

            <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">
                    {isRegister ? "Create an Account" : "Welcome Back"}
                </CardTitle>
                <CardDescription>
                    {isRegister
                        ? "Enter your details below to create your FlatBill account"
                        : "Sign in to manage your building bills and service charges"}
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleAuth}>
                <FieldGroup>
                    {
                        isRegister &&
                        <Field>
                            <FieldLabel htmlFor="name">Full Name</FieldLabel>
                            <Input name="name" id="name" type="text" placeholder="John Doe" required />
                        </Field>
                    }


                    <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input
                            name="email"
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                        />
                        <FieldDescription>
                            We&apos;ll use this to contact you. We will not share your email
                            with anyone else.
                        </FieldDescription>
                    </Field>


                    {
                        isRegister &&
                        <div className={`flex items-center justify-between ${imagePreview && 'gap-5'}`}>
                            <div>
                                {imagePreview && (
                                    <img
                                        src={imagePreview}
                                        alt="Profile preview"
                                        className="mt-3 size-20 rounded-full object-cover"
                                    />
                                )}
                            </div>
                            <Field>
                                <FieldLabel htmlFor="image">Profile Photo</FieldLabel>
                                <Input
                                    name="image"
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}

                                />
                                <FieldDescription>
                                    {isUploadingImage
                                        ? "Uploading image..."
                                        : imageUrl
                                            ? "Image uploaded successfully."
                                            : "Upload your profile photo"}
                                </FieldDescription>
                            </Field>
                        </div>
                    }


                    <Field>
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <Input
                            name="password"

                            id="password" type="password" required />
                        <FieldDescription>
                            Must be at least 8 characters long.
                        </FieldDescription>
                    </Field>

                    {
                        isRegister &&
                        <Field>
                            <FieldLabel htmlFor="confirm-password">
                                Confirm Password
                            </FieldLabel>
                            <Input
                                name="password1"
                                id="confirm-password"
                                type="password" required />
                            <FieldDescription>Please confirm your password.</FieldDescription>
                        </Field>
                    }



                    <FieldGroup>
                        <Field>
                            <Button disabled={clickedToAuthButton || isUploadingImage} type="submit">
                                {isRegister
                                    ? (clickedToAuthButton ? "Creating Account..." : "Create Account")
                                    : (clickedToAuthButton ? "Signing In..." : "Sign In")}
                            </Button>
                            <Button variant="outline" type="button">
                                Sign up with Google
                            </Button>
                            {
                                isRegister ?
                                    <FieldDescription className="px-6 text-center">
                                        Already have an account? <a href="#">Sign in</a>
                                    </FieldDescription>
                                    :
                                    <FieldDescription className="px-6 text-center">
                                        Don&apos;t have an account? <a href="#">Register</a>
                                    </FieldDescription>
                            }
                        </Field>
                    </FieldGroup>
                </FieldGroup >
            </form>
        </div>
    );
};

export default AuthForm;

