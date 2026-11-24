'use client'

import {
    CardDescription,
    Card,
    CardContent,
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
import { Eye, EyeOff, ImagePlus, LockKeyhole } from "lucide-react"


interface Props {
    mode: 'sign-in' | 'register'
}
const AuthForm = ({ mode }: Props) => {
    const { imagePreview, imageUrl, isUploadingImage, handleImageChange } = useImageUpload()

    const isRegister = mode === 'register'
    const router = useRouter()
    const [clickedToAuthButton, setClickedToAuthButton] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

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
        <Card className="w-full border-border/70 bg-card/95 shadow-xl shadow-foreground/5 ring-1 ring-border/40 backdrop-blur">
            <CardHeader className="space-y-3 px-5 pt-6 sm:px-8 sm:pt-8">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <LockKeyhole className="size-5" aria-hidden="true" />
                </div>
                <div className="space-y-1.5">
                    <CardTitle className="text-2xl font-semibold tracking-tight sm:text-3xl">
                        {isRegister ? "Create an Account" : "Welcome Back"}
                    </CardTitle>
                    <CardDescription className="max-w-sm text-sm leading-6">
                        {isRegister
                            ? "Enter your details below to create your FlatBill account"
                            : "Sign in to manage your building bills and service charges"}
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent className="px-5 pb-6 sm:px-8 sm:pb-8">
                <form onSubmit={handleAuth}>
                    <FieldGroup className="gap-4 sm:gap-5">
                        {isRegister && (
                            <Field className="gap-2">
                                <FieldLabel className="text-sm font-medium" htmlFor="name">Full Name</FieldLabel>
                                <Input
                                    className="h-11 bg-background/80 px-3"
                                    name="name"
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    required
                                />
                            </Field>
                        )}

                        <Field className="gap-2">
                            <FieldLabel className="text-sm font-medium" htmlFor="email">Email</FieldLabel>
                            <Input
                                className="h-11 bg-background/80 px-3"
                                name="email"
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                            />
                            <FieldDescription className="text-xs leading-5">
                                We&apos;ll use this to contact you. We will not share your email
                                with anyone else.
                            </FieldDescription>
                        </Field>

                        {isRegister && (
                            <div className="grid gap-3 rounded-2xl border border-dashed border-border bg-muted/40 p-3 sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:items-center sm:p-4">
                                <div className="flex items-center justify-center">
                                    {imagePreview ? (
                                        <img
                                            src={imagePreview}
                                            alt="Profile preview"
                                            className="size-16 rounded-2xl object-cover ring-1 ring-border sm:size-18"
                                        />
                                    ) : (
                                        <div className="flex size-16 items-center justify-center rounded-2xl bg-background text-muted-foreground ring-1 ring-border sm:size-18">
                                            <ImagePlus className="size-6" aria-hidden="true" />
                                        </div>
                                    )}
                                </div>
                                <Field className="gap-2">
                                    <FieldLabel className="text-sm font-medium" htmlFor="image">Profile Photo</FieldLabel>
                                    <Input
                                        className="h-11 bg-background/80 text-xs file:mr-3 file:rounded-md file:border-0 file:bg-primary/10 file:px-3 file:py-1 file:font-medium file:text-primary hover:file:bg-primary/15"
                                        name="image"
                                        id="image"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                    <FieldDescription className="text-xs">
                                        {isUploadingImage
                                            ? "Uploading image..."
                                            : imageUrl
                                                ? "Image uploaded successfully."
                                                : "Upload your profile photo"}
                                    </FieldDescription>
                                </Field>
                            </div>
                        )}

                        <Field className="gap-2">
                            <FieldLabel className="text-sm font-medium" htmlFor="password">Password</FieldLabel>
                            <div className="relative">
                                <Input
                                    className="h-11 bg-background/80 px-3 pr-12"
                                    name="password"
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-r-lg text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    aria-pressed={showPassword}
                                    onClick={() => setShowPassword((visible) => !visible)}
                                >
                                    {showPassword
                                        ? <EyeOff className="size-4" aria-hidden="true" />
                                        : <Eye className="size-4" aria-hidden="true" />}
                                </button>
                            </div>
                            <FieldDescription className="text-xs">
                                Must be at least 8 characters long.
                            </FieldDescription>
                        </Field>

                        {isRegister && (
                            <Field className="gap-2">
                                <FieldLabel className="text-sm font-medium" htmlFor="confirm-password">
                                    Confirm Password
                                </FieldLabel>
                                <div className="relative">
                                    <Input
                                        className="h-11 bg-background/80 px-3 pr-12"
                                        name="password1"
                                        id="confirm-password"
                                        type={showConfirmPassword ? "text" : "password"}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-r-lg text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                        aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                                        aria-pressed={showConfirmPassword}
                                        onClick={() => setShowConfirmPassword((visible) => !visible)}
                                    >
                                        {showConfirmPassword
                                            ? <EyeOff className="size-4" aria-hidden="true" />
                                            : <Eye className="size-4" aria-hidden="true" />}
                                    </button>
                                </div>
                                <FieldDescription className="text-xs">
                                    Please confirm your password.
                                </FieldDescription>
                            </Field>
                        )}

                        <Field className="gap-3 pt-1">
                            <Button
                                className="h-11 w-full rounded-xl font-semibold shadow-sm"
                                disabled={clickedToAuthButton || isUploadingImage}
                                type="submit"
                            >
                                {isRegister
                                    ? (clickedToAuthButton ? "Creating Account..." : "Create Account")
                                    : (clickedToAuthButton ? "Signing In..." : "Sign In")}
                            </Button>
                            <Button
                                className="h-11 w-full rounded-xl"
                                variant="outline"
                                type="button"
                            >
                                <span className="mr-2 text-base font-semibold" aria-hidden="true">G</span>
                                Sign up with Google
                            </Button>
                            {isRegister ? (
                                <FieldDescription className="pt-1 text-center">
                                    Already have an account?{" "}
                                    <a className="font-semibold text-primary underline-offset-4 hover:underline" href="#">
                                        Sign in
                                    </a>
                                </FieldDescription>
                            ) : (
                                <FieldDescription className="pt-1 text-center">
                                    Don&apos;t have an account?{" "}
                                    <a className="font-semibold text-primary underline-offset-4 hover:underline" href="#">
                                        Register
                                    </a>
                                </FieldDescription>
                            )}
                        </Field>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    );
};

export default AuthForm;

