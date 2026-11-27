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

const UtilitiesEdit = ({ edit, flat }: IBasicInfoEdit) => {
    const t = useTranslations('flatDetail')
    const tEdit = useTranslations("editFlat");
    const [adding, setAdding] = useState(false)
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const handleUpdateBasicInfo = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        setAdding(true)
        const gasType = formData.get("gasType");
        const electricityType = formData.get("electricityType");
        const gasMeterOrAccountNo = formData.get("gasMeterOrAccountNo");
        const electricityMeterNo = formData.get("electricityMeterNo");

        const utilitiesData: IUpdateFlat = {
            gasType:
                gasType === "Titas Line" || gasType === "Prepaid Meter" || gasType === "Cylinder"
                    ? gasType
                    : flat.gasType,
            electricityType:
                electricityType === "Prepaid" || electricityType === "Postpaid" || electricityType === "Sub-meter"
                    ? electricityType
                    : flat.electricityType,
            gasMeterOrAccountNo:
                typeof gasMeterOrAccountNo === "string" && gasMeterOrAccountNo !== ""
                    ? gasMeterOrAccountNo
                    : flat.gasMeterOrAccountNo,
            electricityMeterNo:
                typeof electricityMeterNo === "string" && electricityMeterNo !== ""
                    ? electricityMeterNo
                    : flat.electricityMeterNo,
        };

        try {
            const result = await updateFlat(flat._id, utilitiesData);

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
                        <SelectField
                            defaultValue={flat.gasType ?? ""}
                            id="gasType"
                            label={t("gasType")}
                        >
                            <option disabled value="">{tEdit("placeholders.gasType")}</option>
                            <option value="Titas Line">{t("gasTypes.Titas Line")}</option>
                            <option value="Prepaid Meter">{t("gasTypes.Prepaid Meter")}</option>
                            <option value="Cylinder">{t("gasTypes.Cylinder")}</option>
                        </SelectField>

                        <SelectField
                            defaultValue={flat.electricityType ?? ""}
                            id="electricityType"
                            label={t("electricityType")}
                        >
                            <option disabled value="">{tEdit("placeholders.electricityType")}</option>
                            <option value="Prepaid">{t("electricityTypes.Prepaid")}</option>
                            <option value="Postpaid">{t("electricityTypes.Postpaid")}</option>
                            <option value="Sub-meter">{t("electricityTypes.Sub-meter")}</option>
                        </SelectField>

                        <Field>
                            <Label htmlFor="gasMeterOrAccountNo">{t("gasMeterNumber")}</Label>
                            <Input id="gasMeterOrAccountNo" name="gasMeterOrAccountNo" defaultValue={flat.gasMeterOrAccountNo} />
                        </Field>
                        <Field>
                            <Label htmlFor="electricityMeterNo">{t("electricityMeterNumber")}</Label>
                            <Input id="electricityMeterNo" name="electricityMeterNo" defaultValue={flat.electricityMeterNo} />
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

export default UtilitiesEdit;