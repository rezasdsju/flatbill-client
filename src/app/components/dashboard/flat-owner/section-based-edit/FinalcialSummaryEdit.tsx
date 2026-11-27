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
import { IFlat, IUpdateFlat } from "@/types/flatTypes"
import { Pencil } from "lucide-react"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import React, { ReactNode, useState } from "react"
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
    flat: IFlat;
    category: string;
}

const FinancialSummaryEdit = ({ edit, flat, category }: IBasicInfoEdit) => {
    const t = useTranslations('flatDetail')
    const tEdit = useTranslations("editFlat");
    const [adding, setAdding] = useState(false)
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const handleUpdateBasicInfo = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        setAdding(true)
        const validateNumber = (value: unknown): number | undefined => {
            if (value === "" || value === null) {
                return undefined
            }
            if (typeof value !== 'string') {
                toast.error(tEdit("validation.number"))
                return
            }
            const number = Number(value)

            if (!Number.isFinite(number)) {
                toast.error(tEdit("validation.number"))
                return
            }

            return number
        }
        const financialDetailForFlatData: IUpdateFlat = {}
        if (category === 'monthlyRent') {
            financialDetailForFlatData.monthlyRent = formData.get('monthlyRent') ? validateNumber(formData.get('monthlyRent')) : flat.monthlyRent
        }
        if (category === 'serviceCharge') {
            financialDetailForFlatData.serviceCharge = formData.get('serviceCharge') ? validateNumber(formData.get('serviceCharge')) : flat.monthlyRent
        }
        if (category === 'securityDeposit') {
            financialDetailForFlatData.securityDeposit = formData.get('securityDeposit') ? validateNumber(formData.get('securityDeposit')) : flat.monthlyRent
        }
        if (category === 'currentDueAmount') {
            financialDetailForFlatData.currentDueAmount = formData.get('currentDueAmount') ? validateNumber(formData.get('currentDueAmount')) : flat.monthlyRent
        }



        try {
            const result = await updateFlat(flat._id, financialDetailForFlatData);

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
                        className={`absolute right-3 bottom-3 z-10 cursor-pointer rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground ${!edit ? "hidden" : ""}`}
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
                            <Label htmlFor="sizeSqFt">{category === "monthlyRent" ? t("monthlyRent") : category === "serviceCharge" ? t("serviceCharge") : category === "securityDeposit" ? t("securityDeposit") : category === "currentDue" || category === "currentDueAmount" ? t("currentDue") : null}</Label>
                            <Input
                                id={category}
                                name={category}
                                type="number"
                                min={0}
                                step={1}
                                defaultValue={category === "monthlyRent" ? (flat.monthlyRent ?? "") : category === "serviceCharge" ? (flat.serviceCharge ?? "") : category === "securityDeposit" ? (flat.securityDeposit ?? "") : (flat.currentDueAmount ?? "")}
                            />
                        </Field>
                    </FieldGroup>


                    <DialogFooter className="flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                        <DialogClose render={<Button type="button" variant="outline" className="w-full sm:w-auto">{tEdit("actions.cancel")}</Button>} />
                        <Button disabled={adding} type="submit" className="w-full sm:w-auto">{adding ? tEdit("actions.saving") : tEdit("actions.saveChanges")}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default FinancialSummaryEdit;