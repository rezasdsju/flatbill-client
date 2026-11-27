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
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updateFlat } from "@/lib/actions/flats"
import { IAddFlat, IFlat, IUpdateFlat } from "@/types/flatTypes"
import { Pencil } from "lucide-react"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import React, { ReactNode, SetStateAction, useState } from "react"
import { toast } from "sonner"



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
    flat: IFlat
}

const RoomDetailEdit = ({ edit, flat }: IBasicInfoEdit) => {
    const t = useTranslations('flatDetail')
    const tEdit = useTranslations("editFlat");
    const [adding, setAdding] = useState(false)
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const handleUpdateBasicInfo = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        setAdding(true)
        const roomDetailForFlatData: IUpdateFlat = {
            sizeSqFt: formData.get("sizeSqFt")
                ? Number(formData.get("sizeSqFt"))
                : undefined,
            bedrooms: formData.get("bedrooms")
                ? Number(formData.get("bedrooms"))
                : undefined,
            attachedBathrooms: formData.get("attachedBathrooms")
                ? Number(formData.get("attachedBathrooms"))
                : undefined,
            commonBathrooms: formData.get("commonBathrooms")
                ? Number(formData.get("commonBathrooms"))
                : undefined,
            balconies: formData.get("balconies")
                ? Number(formData.get("balconies"))
                : undefined,
            hasDrawingDining: formData.get("hasDrawingDining") === "on",
            hasServantRoom: formData.get("hasServantRoom") === "on",
        };

        try {
            const result = await updateFlat(flat._id, roomDetailForFlatData);

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
            setAdding(false);
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
                <form onSubmit={handleUpdateBasicInfo} className="space-y-4">
                    <DialogHeader>
                        <DialogTitle>{t("basicInformation")}</DialogTitle>
                        <DialogDescription />
                    </DialogHeader>


                    <FieldGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Field>
                            <Label htmlFor="sizeSqFt">{t("size")}</Label>
                            <Input
                                id="sizeSqFt"
                                name="sizeSqFt"
                                type="number"
                                min={0}
                                step={1}
                                defaultValue={flat.sizeSqFt ?? ""}
                            />
                        </Field>

                        <Field>
                            <Label htmlFor="bedrooms">{t("bedrooms")}</Label>
                            <Input
                                id="bedrooms"
                                name="bedrooms"
                                type="number"
                                min={0}
                                step={1}
                                defaultValue={flat.bedrooms ?? ""}
                            />
                        </Field>

                        <Field>
                            <Label htmlFor="attachedBathrooms">{t("attachedBathrooms")}</Label>
                            <Input
                                id="attachedBathrooms"
                                name="attachedBathrooms"
                                type="number"
                                min={0}
                                step={1}
                                defaultValue={flat.attachedBathrooms ?? ""}
                            />
                        </Field>

                        <Field>
                            <Label htmlFor="commonBathrooms">{t("commonBathrooms")}</Label>
                            <Input
                                id="commonBathrooms"
                                name="commonBathrooms"
                                type="number"
                                min={0}
                                step={1}
                                defaultValue={flat.commonBathrooms ?? ""}
                            />
                        </Field>

                        <Field>
                            <Label htmlFor="balconies">{t("balconies")}</Label>
                            <Input
                                id="balconies"
                                name="balconies"
                                type="number"
                                min={0}
                                step={1}
                                defaultValue={flat.balconies ?? ""}
                            />
                        </Field>

                        <Field className="flex flex-row items-center gap-2">
                            <input
                                id="hasDrawingDining"
                                name="hasDrawingDining"
                                type="checkbox"
                                defaultChecked={flat.hasDrawingDining}
                                className="size-4 accent-primary"
                            />
                            <Label htmlFor="hasDrawingDining">{t("drawingDining")}</Label>
                        </Field>

                        <Field className="flex flex-row items-center gap-2">
                            <input
                                id="hasServantRoom"
                                name="hasServantRoom"
                                type="checkbox"
                                defaultChecked={flat.hasServantRoom ?? false}
                                className="size-4 accent-primary"
                            />
                            <Label htmlFor="hasServantRoom">{t("servantRoom")}</Label>
                        </Field>
                    </FieldGroup>


                    <DialogFooter className="flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                        <DialogClose render={<Button type="button" variant="outline" className="w-full sm:w-auto">Cancel</Button>} />
                        <Button disabled={adding} type="submit" className="w-full sm:w-auto">{adding ? 'Updating...' : 'Update'}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default RoomDetailEdit;