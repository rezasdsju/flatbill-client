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
import Image from "next/image"
import { IFlat, IUpdateFlat } from "@/types/flatTypes"
import { ITenant } from "@/types/tenantTypes"
import { UserPlus, UserRound } from "lucide-react"
import { useTranslations } from "next-intl"
import React, { useState } from "react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { updateFlat } from "@/lib/actions/flats"
import { toast } from "sonner"
import { router } from "better-auth/api"
import { useRouter } from "next/navigation"



const AssignTenant = ({ flat, tenants }: { flat: IFlat, tenants: ITenant[] }) => {
    const t = useTranslations('myFlat')
    const tAssign = useTranslations('assignTenant')
    const [searchText, setSearchText] = useState('')
    const [selectedEmail, setSelectedEmail] = useState('')
    const [assigning, setAssigning] = useState(false)
    // console.log(selectedEmail)
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const matchedTenants = tenants.filter(tenant => searchText.length > 1 && tenant.email.includes(searchText.toLocaleLowerCase()))
    // console.log(tenant)

    const targetTenant = tenants.find(tenant => tenant.email === selectedEmail)

    const handleAssignTenant = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        setAssigning(true)
        if (!targetTenant) {
            toast.error(tAssign("selectTenantError"))
            return
        }
        const tenantDataAndFlatAvailabilityStatus: IUpdateFlat = {
            presentTenants: [
                {
                    _id: targetTenant._id,
                    name: targetTenant.name || '',
                    email: targetTenant?.email,
                    phone: targetTenant?.phone || '',
                    moveInDate: new Date().toISOString()
                },

            ],
            status: 'Occupied'
        }

        try {
            const result = await updateFlat(flat._id, tenantDataAndFlatAvailabilityStatus)

            if (!result.success) {
                toast.error(result.message || tAssign("assignFailure"))
                return
            }

            toast.success(tAssign("assignSuccess"))
            setOpen(false)
            router.refresh()
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : tAssign("assignFailure")
            )
        } finally {
            setAssigning(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={(value) => {
            setOpen(value);
            if (!value) {
                setSearchText('');
                setSelectedEmail('')
            }
        }
        }>
            <form id="assign-tenant" onSubmit={handleAssignTenant}>
                <DialogTrigger render={
                    <button className="cursor-pointer inline-flex items-center gap-1 rounded-md bg-emerald-600 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400">
                        <UserPlus className="h-3.5 w-3.5" />
                        {t("actions.assign")}
                    </button>
                } />
                <DialogContent className="sm:max-w-sm max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{tAssign("title")}</DialogTitle>
                        <DialogDescription>

                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <Label htmlFor="name-1">{tAssign("searchLabel")}</Label>
                            <Input type="search" placeholder={tAssign("emailSearchPlaceholder")} onChange={(e) => {
                                setSearchText(e.target.value);
                            }} />
                        </Field>

                        {searchText.trim() === "" ? (
                            <p className="text-sm text-muted-foreground">
                                {tAssign("searchByEmail")}
                            </p>
                        ) : matchedTenants.length === 0 ? (
                            <p className="text-sm text-muted-foreground">
                                {tAssign("noTenantsFound")}
                            </p>
                        ) : (
                            <p className="text-sm text-muted-foreground">
                                {matchedTenants.length === 1
                                    ? tAssign("oneTenantFound")
                                    : tAssign("tenantsFound", { count: matchedTenants.length })}
                            </p>
                        )}
                        <Select value={selectedEmail} onValueChange={(value) => setSelectedEmail(value ?? '')}>
                            <SelectTrigger className="w-full">
                                <SelectValue
                                    placeholder={tAssign("selectEmailPlaceholder")}
                                    className="text-muted-foreground"
                                />
                            </SelectTrigger>
                            <SelectContent>
                                {

                                }
                                <SelectGroup>
                                    {/* <SelectLabel>Fruits</SelectLabel> */}

                                    {

                                        matchedTenants.length === 0 ?
                                            <div className="px-2 py-6 text-center text-sm text-muted-foreground">
                                                {tAssign("searchEmailFirst")}
                                            </div> :
                                            matchedTenants.map((tenant) => (
                                                <SelectItem key={tenant._id} value={tenant.email}>
                                                    {tenant.email}
                                                </SelectItem>
                                            ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Field>
                            <Label htmlFor="name">{tAssign("name")}</Label>
                            <Input id="name" name="name" defaultValue={targetTenant?.name || ''} required />
                        </Field>
                        {targetTenant && (
                            <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-3">
                                {targetTenant.image ? (
                                    <Image
                                        src={targetTenant.image}
                                        alt=""
                                        width={64}
                                        height={64}
                                        className="size-16 shrink-0 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                                        <UserRound className="size-7" aria-hidden="true" />
                                    </div>
                                )}
                                <div className="min-w-0">
                                    {targetTenant.name && (
                                        <p className="truncate text-sm font-medium">
                                            {targetTenant.name}
                                        </p>
                                    )}
                                    <p className="truncate text-sm text-muted-foreground">
                                        {targetTenant.email}
                                    </p>
                                </div>
                            </div>
                        )}
                        <Field>
                            <Label htmlFor="email">{tAssign("email")}</Label>
                            <Input id="email" name="email" defaultValue={targetTenant?.email || ''} readOnly required />
                        </Field>
                        <Field>
                            <Label htmlFor="phone">{tAssign("phone")}</Label>
                            <Input id="phone" name="phone" defaultValue={targetTenant?.phone || ''} />
                        </Field>
                    </FieldGroup>
                    <DialogFooter>
                        <DialogClose render={<Button variant="outline">{tAssign("cancel")}</Button>} />
                        <Button disabled={assigning} form="assign-tenant" type="submit">{tAssign("saveChanges")}</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
};

export default AssignTenant;