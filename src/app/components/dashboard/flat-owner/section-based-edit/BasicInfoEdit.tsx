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
import { IAddFlat, IFlat } from "@/types/flatTypes"
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
    setEdit: React.Dispatch<SetStateAction<boolean>>,
    flat: IFlat
}

const BasicInfoEdit = ({ edit, setEdit, flat }: IBasicInfoEdit) => {
    const t = useTranslations('flatDetail')
    const tEdit = useTranslations("editFlat");
    const [adding, setAdding] = useState(false)
    const router = useRouter()
    const handleUpdateBasicInfo = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        setAdding(true)
        const BasicInfoForFlatData: IAddFlat = {
            buildingName: formData.get("buildingName") as string,
            flatNumber: formData.get("flatNumber") as string,
            floor: formData.get("floor") as string,
            rentalCategory: formData.get("rentalCategory") as IAddFlat["rentalCategory"],
            facing: (formData.get("facing") as IAddFlat["facing"]) || undefined,

            monthlyRent: flat.monthlyRent,
            serviceCharge: flat.serviceCharge,
            status: flat.status,
            gasType: flat.gasType,
            electricityType: flat.electricityType,
            flatImage: flat.flatImage,
            buildingImage: flat.buildingImage,

            sizeSqFt: flat.sizeSqFt,
            bedrooms: flat.bedrooms,
            attachedBathrooms: flat.attachedBathrooms,
            commonBathrooms: flat.commonBathrooms,
            balconies: flat.balconies,
            hasDrawingDining: flat.hasDrawingDining,
            hasServantRoom: flat.hasServantRoom,

            gasMeterOrAccountNo: flat.gasMeterOrAccountNo,
            electricityMeterNo: flat.electricityMeterNo,
            hasParking: flat.hasParking,
            parkingSlotNo: flat.parkingSlotNo,
            hasLift: flat.hasLift,
            hasGenerator: flat.hasGenerator,

            securityDeposit: flat.securityDeposit,
            waterBillFixed: flat.waterBillFixed,
            garbageBillFixed: flat.garbageBillFixed,
            notes: flat.notes,
        };

        try {
            const result = await updateFlat(flat._id, BasicInfoForFlatData);

            if (result.success) {
                toast.success(tEdit("notifications.success"));
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
        <Dialog>
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
                            <Label htmlFor="buildingName">{t("buildingName")}</Label>
                            <Input id="buildingName" name="buildingName" defaultValue={flat.buildingName} />
                        </Field>
                        <Field>
                            <Label htmlFor="flatNumber">{t("flatNumber")}</Label>
                            <Input id="flatNumber" name="flatNumber" defaultValue={flat.flatNumber} />
                        </Field>
                        <Field>
                            <Label htmlFor="floor">{t("floor")}</Label>
                            <Input id="floor" name="floor" defaultValue={flat.floor} />
                        </Field>
                        <Field>
                            <Label htmlFor="rentalCategory">{t("rentalCategory")}</Label>
                            <Input id="rentalCategory" name="rentalCategory" defaultValue={flat.rentalCategory} />
                        </Field>


                        <SelectField
                            defaultValue={flat.facing ?? ""}
                            id="facing"
                            label={t("facing")}
                        >
                            <option value="">{t("selectFacing")}</option>
                            <option value="South">{t("facingDirections.South")}</option>
                            <option value="North">{t("facingDirections.North")}</option>
                            <option value="East">{t("facingDirections.East")}</option>
                            <option value="West">{t("facingDirections.West")}</option>
                            <option value="South-East">{t("facingDirections.South-East")}</option>
                            <option value="South-West">{t("facingDirections.South-West")}</option>
                        </SelectField>
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

export default BasicInfoEdit;