"use client";

import type { ReactNode } from "react";
import { Building2, ImagePlus, Pencil, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { IAddFlat, IFlat } from "@/types/flatTypes";
import { addNewFlat, updateFlat } from "@/lib/actions/flats";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useImageUpload } from "@/hooks/useImageUpload";

type InputFieldProps = {
    id: string;
    label: string;
    type?: "text" | "number";
    placeholder?: string;
    min?: number;
    step?: number;
    required?: boolean;
    defaultValue?: string | number
};

function InputField({
    id,
    label,
    type = "text",
    placeholder,
    min,
    step,
    required = false,
    defaultValue,
}: InputFieldProps) {
    return (
        <Field>
            <Label htmlFor={id}>
                {label}
                {required && <span className="ml-1 text-destructive">*</span>}
            </Label>
            <Input
                id={id}
                name={id}
                type={type}
                placeholder={placeholder}
                min={min}
                step={step}
                required={required}
                defaultValue={defaultValue}
            />
        </Field>
    );
}

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
                className="h-9 w-full min-w-0 rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
                {children}
            </select>
        </Field>
    );
}

function CheckboxField({ id, label, defaultChecked = false }: { id: string; label: string, defaultChecked?: boolean }) {
    return (
        <label
            htmlFor={id}
            className="flex min-h-10 cursor-pointer items-center gap-2 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground transition-colors hover:bg-accent/50"
        >
            <input
                id={id}
                name={id}
                type="checkbox"

                defaultChecked={defaultChecked}
                className="size-4 shrink-0 accent-primary"
            />
            <span>{label}</span>
        </label>
    );
}

const EditFlat = ({ flat }: { flat: IFlat }) => {
    const { imagePreview: flatImagePreview, imageUrl: flatImageUrl, isUploadingImage: isUploadingFlatImage, handleImageChange: handleFlatImageChange } = useImageUpload()
    const { imagePreview: buildingImagePreview, imageUrl: buildingImageUrl, isUploadingImage: isUploadingBuildingImage, handleImageChange: handleBuildingImageChange } = useImageUpload()

    const t = useTranslations("editFlat");
    const [adding, setAdding] = useState(false)
    const router = useRouter()
    const handleAddFlat = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        setAdding(true)
        const flatData: IAddFlat = {
            buildingName: formData.get("buildingName") as string,
            flatNumber: formData.get("flatNumber") as string,
            floor: formData.get("floor") as string,
            rentalCategory: formData.get("rentalCategory") as IAddFlat["rentalCategory"],
            monthlyRent: Number(formData.get("monthlyRent")),
            serviceCharge: Number(formData.get("serviceCharge")),
            status: formData.get("status") as IAddFlat["status"],
            gasType: formData.get("gasType") as IAddFlat["gasType"],
            electricityType: formData.get("electricityType") as IAddFlat["electricityType"],

            flatImage: flatImageUrl,
            buildingImage: buildingImageUrl,

            sizeSqFt: formData.get("sizeSqFt")
                ? Number(formData.get("sizeSqFt"))
                : undefined,
            facing: (formData.get("facing") as IAddFlat["facing"]) || undefined,
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

            gasMeterOrAccountNo:
                (formData.get("gasMeterOrAccountNo") as string) || undefined,
            electricityMeterNo:
                (formData.get("electricityMeterNo") as string) || undefined,
            hasParking: formData.get("hasParking") === "on",
            parkingSlotNo: (formData.get("parkingSlotNo") as string) || undefined,
            hasLift: formData.get("hasLift") === "on",
            hasGenerator: formData.get("hasGenerator") === "on",

            securityDeposit: formData.get("securityDeposit")
                ? Number(formData.get("securityDeposit"))
                : undefined,
            waterBillFixed: formData.get("waterBillFixed")
                ? Number(formData.get("waterBillFixed"))
                : undefined,
            garbageBillFixed: formData.get("garbageBillFixed")
                ? Number(formData.get("garbageBillFixed"))
                : undefined,
            notes: (formData.get("notes") as string) || undefined,
        };


        try {
            const result = await updateFlat(flat._id, flatData)
            // console.log(result)
            if (result.success) {
                toast.success(t("notifications.success"))
                router.replace('/dashboard/flat-owner/my-flats')

            } else {
                toast.error(t("notifications.failure"))
            }
        } catch (err) {
            toast.error(t("notifications.error"), {
                description: err instanceof Error ? err.message : t("notifications.networkError"),
            })
        } finally {
            setAdding(false)
        }
    }
    return (
        <Dialog>
            <DialogTrigger
                render={
                    <button className="cursor-pointer inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-border dark:bg-background dark:text-foreground dark:hover:bg-accent">
                        <Pencil className="h-3.5 w-3.5" />
                        {t("actions.edit")}
                    </button>
                }
            />
            <DialogContent className="max-h-[90dvh] w-full overflow-y-auto sm:max-w-3xl lg:max-w-4xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl">
                        <Building2 className="size-5 text-primary" />
                        {t("dialog.title")}
                    </DialogTitle>
                    <DialogDescription>
                        {t("dialog.description")}{" "}
                        <span className="font-semibold text-destructive">*</span>
                        {t("dialog.required")}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleAddFlat}>
                    <div className="space-y-8 py-2">
                        <section aria-labelledby="required-flat-details" className="space-y-4">
                            <div>
                                <h3
                                    id="required-flat-details"
                                    className="text-sm font-semibold text-foreground"
                                >
                                    {t("sections.requiredDetails")}
                                </h3>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    {t("sections.requiredDetailsDescription")}
                                </p>
                            </div>
                            <FieldGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                <InputField
                                    id="buildingName"
                                    label={t("fields.buildingName")}
                                    placeholder={t("placeholders.buildingName")}
                                    defaultValue={flat.buildingName}
                                    required
                                />
                                <InputField
                                    id="flatNumber"
                                    label={t("fields.flatNumber")}
                                    placeholder={t("placeholders.flatNumber")}
                                    defaultValue={flat?.flatNumber}
                                    required
                                />
                                <InputField
                                    id="floor"
                                    label={t("fields.floor")}
                                    placeholder={t("placeholders.floor")}
                                    defaultValue={flat.floor}
                                    required
                                />
                                <SelectField id="rentalCategory" defaultValue={flat?.rentalCategory || ""} label={t("fields.rentalCategory")} required>
                                    <option value="" disabled>
                                        {t("placeholders.rentalCategory")}
                                    </option>
                                    <option value="Family">{t("options.family")}</option>
                                    <option value="Bachelor">{t("options.bachelor")}</option>
                                    <option value="Office">{t("options.office")}</option>
                                    <option value="Sublet">{t("options.sublet")}</option>
                                </SelectField>
                                <InputField
                                    id="monthlyRent"
                                    label={t("fields.monthlyRent")}
                                    type="number"
                                    min={0}
                                    step={0.01}
                                    placeholder="0.00"
                                    defaultValue={flat.monthlyRent}
                                    required
                                />
                                <InputField
                                    id="serviceCharge"
                                    label={t("fields.serviceCharge")}
                                    type="number"
                                    min={0}
                                    step={0.01}
                                    placeholder="0.00"
                                    defaultValue={flat.serviceCharge}
                                    required
                                />
                                <SelectField id="status" defaultValue={flat.status} label={t("fields.status")} required>
                                    <option value="" disabled>
                                        {t("placeholders.status")}
                                    </option>
                                    <option value="Occupied">{t("options.occupied")}</option>
                                    <option value="Vacant">{t("options.vacant")}</option>
                                    <option value="Under Maintenance">{t("options.underMaintenance")}</option>
                                </SelectField>
                                <SelectField id="gasType" defaultValue={flat?.gasType || ''} label={t("fields.gasType")} required>
                                    <option value="" disabled>
                                        {t("placeholders.gasType")}
                                    </option>
                                    <option value="Titas Line">{t("options.titasLine")}</option>
                                    <option value="Prepaid Meter">{t("options.prepaidMeter")}</option>
                                    <option value="Cylinder">{t("options.cylinder")}</option>
                                </SelectField>
                                <SelectField
                                    id="electricityType"
                                    label={t("fields.electricityType")}
                                    defaultValue={flat?.electricityType || ''}
                                    required
                                >
                                    <option value="" disabled>
                                        {t("placeholders.electricityType")}
                                    </option>
                                    <option value="Prepaid">{t("options.prepaid")}</option>
                                    <option value="Postpaid">{t("options.postpaid")}</option>
                                    <option value="Sub-meter">{t("options.subMeter")}</option>
                                </SelectField>
                            </FieldGroup>
                        </section>


                        <section
                            aria-labelledby="optional-images-title"
                            className="space-y-4"
                        >
                            <div>
                                <h3
                                    id="optional-images-title"
                                    className="text-sm font-semibold text-foreground"
                                >
                                    {t("images.title")}
                                </h3>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    {t("images.description")}
                                </p>
                            </div>
                            <FieldGroup className="grid gap-4 sm:grid-cols-2">
                                <div className="rounded-xl border border-border bg-muted/30 p-4">
                                    <div className="grid gap-4 sm:grid-cols-[5rem_minmax(0,1fr)] sm:items-center">
                                        <div className="flex items-center justify-center">
                                            {flatImagePreview ? (
                                                <Image
                                                    src={flatImagePreview}
                                                    alt={t("images.flatImage")}
                                                    width={80}
                                                    height={80}
                                                    unoptimized
                                                    className="size-20 rounded-xl object-cover ring-1 ring-border"
                                                />
                                            ) : (

                                                flat.flatImage ?
                                                    <Image
                                                        src={flat.flatImage}
                                                        alt={t("images.flatImage")}
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
                                                    {t("images.flatImage")}
                                                </FieldLabel>
                                                <span className="shrink-0 text-xs text-muted-foreground">
                                                    {t("images.optional")}
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
                                                    ? t("images.uploadingImage")
                                                    : flatImageUrl
                                                        ? t("images.imageUploaded")
                                                        : t("images.flatImageHint")}
                                            </FieldDescription>
                                        </Field>
                                    </div>
                                </div>
                                <div className="rounded-xl border border-border bg-muted/30 p-4">
                                    <div className="grid gap-4 sm:grid-cols-[5rem_minmax(0,1fr)] sm:items-center">
                                        <div className="flex items-center justify-center">
                                            {buildingImagePreview ? (
                                                <Image
                                                    src={buildingImagePreview}
                                                    alt={t("images.buildingImage")}
                                                    width={80}
                                                    height={80}
                                                    unoptimized
                                                    className="size-20 rounded-xl object-cover ring-1 ring-border"
                                                />
                                            ) :
                                                flat.buildingImage ?
                                                    <Image
                                                        src={flat.buildingImage}
                                                        alt={t("images.buildingImage")}
                                                        width={80}
                                                        height={80}
                                                        unoptimized
                                                        className="size-20 rounded-xl object-cover ring-1 ring-border"
                                                    />
                                                    : (
                                                        <div className="flex size-20 items-center justify-center rounded-xl bg-background text-muted-foreground ring-1 ring-border">
                                                            <ImagePlus className="size-6" aria-hidden="true" />
                                                        </div>
                                                    )}
                                        </div>
                                        <Field className="min-w-0 gap-2">
                                            <div className="flex items-center justify-between gap-2">
                                                <FieldLabel htmlFor="buildingImage">
                                                    {t("images.buildingImage")}
                                                </FieldLabel>
                                                <span className="shrink-0 text-xs text-muted-foreground">
                                                    {t("images.optional")}
                                                </span>
                                            </div>
                                            <Input
                                                id="buildingImage"
                                                name="buildingImage"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleBuildingImageChange}
                                                className="bg-background text-xs file:mr-3 file:rounded-md file:border-0 file:bg-primary/10 file:px-3 file:py-1 file:font-medium file:text-primary hover:file:bg-primary/15"
                                            />
                                            <FieldDescription>
                                                {isUploadingBuildingImage
                                                    ? t("images.uploadingImage")
                                                    : buildingImageUrl
                                                        ? t("images.imageUploaded")
                                                        : t("images.buildingImageHint")}
                                            </FieldDescription>
                                        </Field>
                                    </div>
                                </div>
                            </FieldGroup>
                        </section>

                        <section aria-labelledby="optional-room-details" className="space-y-4">
                            <div>
                                <h3
                                    id="optional-room-details"
                                    className="text-sm font-semibold text-foreground"
                                >
                                    {t("sections.roomSpaceDetails")}
                                </h3>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    {t("sections.roomSpaceDetailsDescription")}
                                </p>
                            </div>
                            <FieldGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                <InputField
                                    id="sizeSqFt"
                                    label={t("fields.sizeSqFt")}
                                    type="number"
                                    min={0}
                                    step={1}
                                    placeholder={t("placeholders.sizeSqFt")}
                                    defaultValue={flat.sizeSqFt ?? ""}
                                />
                                <SelectField defaultValue={flat.facing || ''} id="facing" label={t("fields.facing")}>
                                    <option value="">{t("placeholders.facing")}</option>
                                    <option value="South">{t("options.south")}</option>
                                    <option value="North">{t("options.north")}</option>
                                    <option value="East">{t("options.east")}</option>
                                    <option value="West">{t("options.west")}</option>
                                    <option value="South-East">{t("options.southEast")}</option>
                                    <option value="South-West">{t("options.southWest")}</option>
                                </SelectField>
                                <InputField
                                    id="bedrooms"
                                    label={t("fields.bedrooms")}
                                    type="number"
                                    min={0}
                                    step={1}
                                    placeholder="0"
                                    defaultValue={flat.bedrooms ?? ""}
                                />
                                <InputField
                                    id="attachedBathrooms"
                                    label={t("fields.attachedBathrooms")}
                                    type="number"
                                    min={0}
                                    step={1}
                                    placeholder="0"
                                    defaultValue={flat.attachedBathrooms ?? ""}
                                />
                                <InputField
                                    id="commonBathrooms"
                                    label={t("fields.commonBathrooms")}
                                    type="number"
                                    min={0}
                                    step={1}
                                    placeholder="0"
                                    defaultValue={flat.commonBathrooms ?? ""}
                                />
                                <InputField
                                    id="balconies"
                                    label={t("fields.balconies")}
                                    type="number"
                                    min={0}
                                    step={1}
                                    placeholder="0"
                                    defaultValue={flat.balconies ?? ""}
                                />
                                <CheckboxField id="hasDrawingDining" defaultChecked={flat.hasDrawingDining ?? false} label={t("fields.drawingDining")} />
                                <CheckboxField id="hasServantRoom" defaultChecked={flat.hasServantRoom ?? false} label={t("fields.servantRoom")} />
                            </FieldGroup>
                        </section>

                        <section
                            aria-labelledby="optional-utility-details"
                            className="space-y-4"
                        >
                            <div>
                                <h3
                                    id="optional-utility-details"
                                    className="text-sm font-semibold text-foreground"
                                >
                                    {t("sections.utilitiesAmenities")}
                                </h3>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    {t("sections.utilitiesAmenitiesDescription")}
                                </p>
                            </div>
                            <FieldGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                <InputField
                                    id="gasMeterOrAccountNo"
                                    label={t("fields.gasMeterOrAccountNo")}
                                    placeholder={t("placeholders.gasMeterOrAccountNo")}
                                    defaultValue={flat.gasMeterOrAccountNo ?? ""}
                                />
                                <InputField
                                    id="electricityMeterNo"
                                    label={t("fields.electricityMeterNo")}
                                    placeholder={t("placeholders.electricityMeterNo")}
                                    defaultValue={flat.electricityMeterNo ?? ""}
                                />
                                <CheckboxField id="hasParking" defaultChecked={flat.hasParking ?? false} label={t("fields.parkingAvailable")} />
                                <InputField
                                    id="parkingSlotNo"
                                    label={t("fields.parkingSlotNo")}
                                    placeholder={t("placeholders.parkingSlotNo")}
                                    defaultValue={flat.parkingSlotNo ?? ""}
                                />
                                <CheckboxField id="hasLift" defaultChecked={flat.hasLift ?? false} label={t("fields.liftAvailable")} />
                                <CheckboxField id="hasGenerator" defaultChecked={flat.hasGenerator ?? false} label={t("fields.generatorAvailable")} />
                            </FieldGroup>
                        </section>

                        <section
                            aria-labelledby="optional-financial-details"
                            className="space-y-4"
                        >
                            <div>
                                <h3
                                    id="optional-financial-details"
                                    className="text-sm font-semibold text-foreground"
                                >
                                    {t("sections.financialDetails")}
                                </h3>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    {t("sections.financialDetailsDescription")}
                                </p>
                            </div>
                            <FieldGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                <InputField
                                    id="securityDeposit"
                                    label={t("fields.securityDeposit")}
                                    type="number"
                                    min={0}
                                    step={0.01}
                                    placeholder="0.00"
                                    defaultValue={flat.securityDeposit ?? ""}
                                />
                                <InputField
                                    id="waterBillFixed"
                                    label={t("fields.waterBillFixed")}
                                    type="number"
                                    min={0}
                                    step={0.01}
                                    placeholder="0.00"
                                    defaultValue={flat.waterBillFixed ?? ""}
                                />
                                <InputField
                                    id="garbageBillFixed"
                                    label={t("fields.garbageBillFixed")}
                                    type="number"
                                    min={0}
                                    step={0.01}
                                    placeholder="0.00"
                                    defaultValue={flat.garbageBillFixed ?? ""}
                                />
                                <Field className="sm:col-span-2 lg:col-span-3">
                                    <Label htmlFor="notes">{t("fields.notes")}</Label>
                                    <textarea
                                        id="notes"
                                        name="notes"
                                        rows={3}
                                        placeholder={t("placeholders.notes")}
                                        defaultValue={flat.notes ?? ""}
                                        className="w-full min-w-0 resize-y rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                                    />
                                </Field>
                            </FieldGroup>
                        </section>
                    </div>


                    <DialogFooter>
                        <DialogClose render={<Button type="button" variant="outline">{t("actions.cancel")}</Button>} />
                        <Button
                            disabled={adding || isUploadingBuildingImage || isUploadingFlatImage}
                            type="submit">
                            {adding ? t("actions.saving") : t("actions.saveChanges")}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditFlat;
