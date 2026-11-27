'use client'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useImageUpload } from "@/hooks/useImageUpload"
import { updateFlat } from "@/lib/actions/flats"
import { IFlat } from "@/types/flatTypes"
import { ImagePlus, Pencil } from "lucide-react"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import React, { ReactNode, useState } from "react"
import { toast } from "sonner"
import Image from "next/image"


type SelectFieldProps = {
    id: string;
    label: string;
    required?: boolean;
    defaultValue?: string;
    children: ReactNode;
};

function SelectField({
    id,
    label,
    required = false,
    defaultValue = '',
    children,
}: SelectFieldProps) {
    return (
        <Field>
            <Label htmlFor={id}>
                {label}
                {required && <span className="ml-1 text-destructive">*</span>}
            </Label>
            <select
                id={id}
                name={id}
                defaultValue={defaultValue}
                required={required}
                className="h-8 w-full min-w-0 rounded-lg border border-input bg-transparent dark:bg-input/30 px-3 text-sm text-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
                {children}
            </select>
        </Field>
    );
}



interface IBasicInfoEdit {
    edit: boolean;
    // setEdit: React.Dispatch<SetStateAction<boolean>>,
    flat: IFlat
}

const FlatImageEdit = ({ edit, flat }: IBasicInfoEdit) => {

    const { imagePreview: flatImagePreview, imageUrl: flatImageUrl, isUploadingImage: isUploadingFlatImage, handleImageChange: handleFlatImageChange } = useImageUpload()

    const [open, setOpen] = useState(false)
    const t = useTranslations('flatDetail')
    const tEdit = useTranslations("editFlat");
    const [editing, setEditing] = useState(false)
    const router = useRouter()
    const handleUpdateFlatImage = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        // const formData = new FormData(e.currentTarget)
        setEditing(true)
        const flatImage = {
            flatImage: flatImageUrl
        }
        try {
            const result = await updateFlat(flat._id, flatImage);

            if (result.success) {
                toast.success(tEdit("notifications.success"));
                setOpen(false)
                router.refresh();
            } else {
                toast.error(tEdit("notifications.failure"));
            }
        } catch (err) {
            toast.error(tEdit("notifications.error"), {
                description:
                    err instanceof Error
                        ? err.message
                        : tEdit("notifications.networkError"),
            });
        } finally {
            setEditing(false);
        }
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                render={
                    <button
                        type="button"
                        className={`absolute right-3 top-3 z-10 cursor-pointer rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground ${!edit ? "hidden" : ""}`}
                    >
                        <Pencil className="size-4 sm:size-5" />
                    </button>
                }
            />
            <DialogContent className="max-h-[90vh] w-[calc(100vw-2rem)] max-w-lg overflow-y-auto rounded-xl sm:w-full">
                <form onSubmit={handleUpdateFlatImage} className="space-y-4">
                    <DialogHeader>
                        <DialogTitle>{t("basicInformation")}</DialogTitle>
                        <DialogDescription />
                    </DialogHeader>
                    <FieldGroup >

                        <div className="rounded-xl border border-border bg-muted/30 p-4">
                            <div className="grid gap-4 sm:grid-cols-[5rem_minmax(0,1fr)] sm:items-center">
                                <div className="flex items-center justify-center">
                                    {flatImagePreview ? (
                                        <Image
                                            src={flatImagePreview}
                                            alt={tEdit("images.flatImage")}
                                            width={80}
                                            height={80}
                                            unoptimized
                                            className="size-20 rounded-xl object-cover ring-1 ring-border"
                                        />
                                    ) : (

                                        flat.flatImage ?
                                            <Image
                                                src={flat.flatImage}
                                                alt={tEdit("images.flatImage")}
                                                width={80}
                                                height={80}
                                                unoptimized
                                                className="size-20 rounded-xl object-cover ring-1 ring-border"
                                            /> :
                                            <div className="flex size-20 items-center justify-center rounded-xl bg-background text-muted-foreground ring-1 ring-border">
                                                <ImagePlus className="size-6" aria-hidden="true" />
                                            </div>
                                    )}
                                </div>
                                <Field className="min-w-0 gap-2">
                                    <div className="flex items-center justify-between gap-2">
                                        <FieldLabel htmlFor="flatImage">
                                            {tEdit("images.flatImage")}
                                        </FieldLabel>
                                        <span className="shrink-0 text-xs text-muted-foreground">
                                            {tEdit("images.optional")}
                                        </span>
                                    </div>
                                    <Input
                                        id="flatImage"
                                        name="flatImage"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFlatImageChange}
                                        className="bg-background text-xs file:mr-3 file:rounded-md file:border-0 file:bg-primary/10 file:px-3 file:py-1 file:font-medium file:text-primary hover:file:bg-primary/15"
                                    />
                                    <FieldDescription>
                                        {isUploadingFlatImage
                                            ? tEdit("images.uploadingImage")
                                            : flatImageUrl
                                                ? tEdit("images.imageUploaded")
                                                : tEdit("images.flatImageHint")}
                                    </FieldDescription>
                                </Field>
                            </div>
                        </div>
                    </FieldGroup>
                    <DialogFooter className="flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                        <DialogClose render={<Button type="button" variant="outline" className="w-full sm:w-auto">{tEdit("actions.cancel")}</Button>} />
                        <Button disabled={editing || isUploadingFlatImage} type="submit">
                            {editing ? tEdit("actions.saving") : tEdit("actions.saveChanges")}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default FlatImageEdit;