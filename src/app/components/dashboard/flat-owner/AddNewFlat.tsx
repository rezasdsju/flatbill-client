"use client";

import type { ReactNode } from "react";
import { Building2, Plus } from "lucide-react";
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
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { IAddFlat } from "@/types/flatTypes";
import { addNewFlat } from "@/lib/actions/flats";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type InputFieldProps = {
    id: string;
    label: string;
    type?: "text" | "number";
    placeholder?: string;
    min?: number;
    step?: number;
    required?: boolean;
};

function InputField({
    id,
    label,
    type = "text",
    placeholder,
    min,
    step,
    required = false,
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
            />
        </Field>
    );
}

type SelectFieldProps = {
    id: string;
    label: string;
    required?: boolean;
    children: ReactNode;
};

function SelectField({
    id,
    label,
    required = false,
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
                defaultValue=""
                required={required}
                className="h-9 w-full min-w-0 rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
                {children}
            </select>
        </Field>
    );
}

function CheckboxField({ id, label }: { id: string; label: string }) {
    return (
        <label
            htmlFor={id}
            className="flex min-h-10 cursor-pointer items-center gap-2 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground transition-colors hover:bg-accent/50"
        >
            <input
                id={id}
                name={id}
                type="checkbox"
                className="size-4 shrink-0 accent-primary"
            />
            <span>{label}</span>
        </label>
    );
}

const AddNewFlat = () => {

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
            const result = await addNewFlat(flatData)
            if (result.insertedId) {
                toast.success("Flat added successfully")
                router.replace('/dashboard/flat-owner/my-flats')

            } else {
                toast.error("Failed to add flat")
            }
        } catch (err) {
            toast.error("Something went wrong", {
                description: err instanceof Error ? err.message : "Network error",
            })
        } finally {
            setAdding(false)
        }
    }
    return (
        <Dialog>
            <DialogTrigger
                render={
                    <Button type="button">
                        <Plus className="size-4" />
                        Add New Flat
                    </Button>
                }
            />
            <DialogContent className="max-h-[90dvh] w-full overflow-y-auto sm:max-w-3xl lg:max-w-4xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl">
                        <Building2 className="size-5 text-primary" />
                        Add a Flat
                    </DialogTitle>
                    <DialogDescription>
                        Add the flat details below. Fields marked with{" "}
                        <span className="font-semibold text-destructive">*</span> are
                        required.
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
                                    Required Details
                                </h3>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    Basic information and utility types for this flat.
                                </p>
                            </div>
                            <FieldGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                <InputField
                                    id="buildingName"
                                    label="Building Name"
                                    placeholder="e.g. Swapnil Tower"
                                    required
                                />
                                <InputField
                                    id="flatNumber"
                                    label="Flat Number"
                                    placeholder="e.g. A-4"
                                    required
                                />
                                <InputField
                                    id="floor"
                                    label="Floor"
                                    placeholder="e.g. 4th Floor"
                                    required
                                />
                                <SelectField id="rentalCategory" label="Rental Category" required>
                                    <option value="" disabled>
                                        Select a category
                                    </option>
                                    <option value="Family">Family</option>
                                    <option value="Bachelor">Bachelor</option>
                                    <option value="Office">Office</option>
                                    <option value="Sublet">Sublet</option>
                                </SelectField>
                                <InputField
                                    id="monthlyRent"
                                    label="Monthly Rent"
                                    type="number"
                                    min={0}
                                    step={0.01}
                                    placeholder="0.00"
                                    required
                                />
                                <InputField
                                    id="serviceCharge"
                                    label="Service Charge"
                                    type="number"
                                    min={0}
                                    step={0.01}
                                    placeholder="0.00"
                                    required
                                />
                                <SelectField id="status" label="Flat Status" required>
                                    <option value="" disabled>
                                        Select a status
                                    </option>
                                    <option value="Occupied">Occupied</option>
                                    <option value="Vacant">Vacant</option>
                                    <option value="Under Maintenance">Under Maintenance</option>
                                </SelectField>
                                <SelectField id="gasType" label="Gas Type" required>
                                    <option value="" disabled>
                                        Select a gas type
                                    </option>
                                    <option value="Titas Line">Titas Line</option>
                                    <option value="Prepaid Meter">Prepaid Meter</option>
                                    <option value="Cylinder">Cylinder</option>
                                </SelectField>
                                <SelectField
                                    id="electricityType"
                                    label="Electricity Type"
                                    required
                                >
                                    <option value="" disabled>
                                        Select an electricity type
                                    </option>
                                    <option value="Prepaid">Prepaid</option>
                                    <option value="Postpaid">Postpaid</option>
                                    <option value="Sub-meter">Sub-meter</option>
                                </SelectField>
                            </FieldGroup>
                        </section>

                        <section aria-labelledby="optional-room-details" className="space-y-4">
                            <div>
                                <h3
                                    id="optional-room-details"
                                    className="text-sm font-semibold text-foreground"
                                >
                                    Room &amp; Space Details
                                </h3>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    Optional details to describe the flat layout.
                                </p>
                            </div>
                            <FieldGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                <InputField
                                    id="sizeSqFt"
                                    label="Size (sq ft)"
                                    type="number"
                                    min={0}
                                    step={1}
                                    placeholder="e.g. 1350"
                                />
                                <SelectField id="facing" label="Facing Direction">
                                    <option value="">Select a direction</option>
                                    <option value="South">South</option>
                                    <option value="North">North</option>
                                    <option value="East">East</option>
                                    <option value="West">West</option>
                                    <option value="South-East">South-East</option>
                                    <option value="South-West">South-West</option>
                                </SelectField>
                                <InputField
                                    id="bedrooms"
                                    label="Bedrooms"
                                    type="number"
                                    min={0}
                                    step={1}
                                    placeholder="0"
                                />
                                <InputField
                                    id="attachedBathrooms"
                                    label="Attached Bathrooms"
                                    type="number"
                                    min={0}
                                    step={1}
                                    placeholder="0"
                                />
                                <InputField
                                    id="commonBathrooms"
                                    label="Common Bathrooms"
                                    type="number"
                                    min={0}
                                    step={1}
                                    placeholder="0"
                                />
                                <InputField
                                    id="balconies"
                                    label="Balconies"
                                    type="number"
                                    min={0}
                                    step={1}
                                    placeholder="0"
                                />
                                <CheckboxField id="hasDrawingDining" label="Drawing & Dining" />
                                <CheckboxField id="hasServantRoom" label="Servant Room" />
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
                                    Utilities &amp; Amenities
                                </h3>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    Optional meter, parking, and building facility details.
                                </p>
                            </div>
                            <FieldGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                <InputField
                                    id="gasMeterOrAccountNo"
                                    label="Gas Meter / Account Number"
                                    placeholder="Enter meter or account number"
                                />
                                <InputField
                                    id="electricityMeterNo"
                                    label="Electricity Meter Number"
                                    placeholder="Enter meter number"
                                />
                                <CheckboxField id="hasParking" label="Parking Available" />
                                <InputField
                                    id="parkingSlotNo"
                                    label="Parking Slot Number"
                                    placeholder="e.g. P-12"
                                />
                                <CheckboxField id="hasLift" label="Lift Available" />
                                <CheckboxField id="hasGenerator" label="Generator Available" />
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
                                    Financial &amp; Additional Details
                                </h3>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    Optional deposits, fixed charges, and notes.
                                </p>
                            </div>
                            <FieldGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                <InputField
                                    id="securityDeposit"
                                    label="Security Deposit"
                                    type="number"
                                    min={0}
                                    step={0.01}
                                    placeholder="0.00"
                                />
                                <InputField
                                    id="waterBillFixed"
                                    label="Fixed Water Bill"
                                    type="number"
                                    min={0}
                                    step={0.01}
                                    placeholder="0.00"
                                />
                                <InputField
                                    id="garbageBillFixed"
                                    label="Fixed Garbage Bill"
                                    type="number"
                                    min={0}
                                    step={0.01}
                                    placeholder="0.00"
                                />
                                <Field className="sm:col-span-2 lg:col-span-3">
                                    <Label htmlFor="notes">Notes</Label>
                                    <textarea
                                        id="notes"
                                        name="notes"
                                        rows={3}
                                        placeholder="Add any other useful details"
                                        className="w-full min-w-0 resize-y rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                                    />
                                </Field>
                            </FieldGroup>
                        </section>
                    </div>


                    <DialogFooter>
                        <DialogClose render={<Button type="button" variant="outline">Cancel</Button>} />
                        <Button
                            disabled={adding}
                            type="submit">
                            {adding ? 'Adding' : 'Add Flat'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddNewFlat;
