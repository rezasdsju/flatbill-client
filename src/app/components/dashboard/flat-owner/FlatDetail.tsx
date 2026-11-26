"use client";

import Image from "next/image";
import {
    Building2,
    MapPin,
    Ruler,
    BedDouble,
    Bath,
    Car,
    Zap,
    Flame,
    Wallet,
    CalendarDays,
    UserRound,
    Phone,
    Mail,
    CheckCircle2,
    XCircle,
    Clock,
    FileText,
    Home,
    ArrowUpDown,
} from "lucide-react";
import { useTranslations } from "next-intl";
import type { IFlat } from "@/types/flatTypes";

const FlatDetail = ({ flat }: { flat: IFlat }) => {
    const t = useTranslations("flatDetail");

    const formatMoney = (amount?: number) => {
        if (amount === undefined || amount === null) return "—";

        return new Intl.NumberFormat("en-BD", {
            style: "currency",
            currency: "BDT",
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (date?: string) => {
        if (!date) return "—";

        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) return date;

        return new Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }).format(parsedDate);
    };

    const statusStyles: Record<IFlat["status"], string> = {
        Occupied: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
        Vacant: "bg-green-500/10 text-green-600 dark:text-green-400",
        "Under Maintenance":
            "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    };

    const billStatusStyles: Record<IFlat["currentMonthBillStatus"], string> = {
        Paid: "bg-green-500/10 text-green-600 dark:text-green-400",
        Due: "bg-red-500/10 text-red-600 dark:text-red-400",
        Partial: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
        "N/A": "bg-muted text-muted-foreground",
    };

    const InfoItem = ({
        label,
        value,
    }: {
        label: string;
        value?: string | number | null;
    }) => (
        <div className="space-y-1">
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="text-sm font-medium text-foreground">
                {value !== undefined && value !== null && value !== ""
                    ? value
                    : "—"}
            </p>
        </div>
    );

    const Section = ({
        title,
        icon,
        children,
    }: {
        title: string;
        icon: React.ReactNode;
        children: React.ReactNode;
    }) => (
        <section className="rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5">
            <div className="mb-5 flex items-center gap-2">
                <span className="text-primary">{icon}</span>
                <h2 className="text-base font-semibold text-foreground">
                    {title}
                </h2>
            </div>
            {children}
        </section>
    );

    const BooleanItem = ({
        label,
        value,
    }: {
        label: string;
        value?: boolean;
    }) => (
        <div className="flex items-center justify-between gap-3 rounded-lg border border-border px-3 py-2.5">
            <span className="text-sm text-foreground">{label}</span>
            {value ? (
                <CheckCircle2 className="size-4 shrink-0 text-green-600 dark:text-green-400" />
            ) : (
                <XCircle className="size-4 shrink-0 text-muted-foreground" />
            )}
        </div>
    );

    return (
        <div className="min-h-screen bg-background px-3 py-5 text-foreground sm:px-5 sm:py-7 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-6">
                {/* Header */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-muted-foreground">
                            {t("breadcrumb")}
                        </p>
                        <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
                            {flat.buildingName} - {flat.flatNumber}
                        </h1>
                        <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="size-4" />
                            <span>{flat.floor}</span>
                            <span>•</span>
                            <span>{t(`rentalCategories.${flat.rentalCategory}`)}</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <span
                            className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyles[flat.status]}`}
                        >
                            {t(`statuses.${flat.status}`)}
                        </span>
                        <span
                            className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold ${billStatusStyles[flat.currentMonthBillStatus]}`}
                        >
                            {t(`billStatuses.${flat.currentMonthBillStatus}`)}
                        </span>
                    </div>
                </div>

                {/* Images */}
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="overflow-hidden rounded-xl border border-border bg-card">
                        <div className="relative aspect-[16/9] bg-muted">
                            {flat.flatImage ? (
                                <Image
                                    src={flat.flatImage}
                                    alt={t("flatImage")}
                                    fill
                                    unoptimized
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            ) : (
                                <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
                                    <Home className="size-10" />
                                    <span className="text-sm">{t("noFlatImage")}</span>
                                </div>
                            )}
                        </div>
                        <p className="border-t border-border px-4 py-3 text-sm font-medium">
                            {t("flatImage")}
                        </p>
                    </div>

                    <div className="overflow-hidden rounded-xl border border-border bg-card">
                        <div className="relative aspect-[16/9] bg-muted">
                            {flat.buildingImage ? (
                                <Image
                                    src={flat.buildingImage}
                                    alt={t("buildingImage")}
                                    fill
                                    unoptimized
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            ) : (
                                <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
                                    <Building2 className="size-10" />
                                    <span className="text-sm">{t("noBuildingImage")}</span>
                                </div>
                            )}
                        </div>
                        <p className="border-t border-border px-4 py-3 text-sm font-medium">
                            {t("buildingImage")}
                        </p>
                    </div>
                </div>

                {/* Financial summary */}
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        {
                            label: t("monthlyRent"),
                            value: formatMoney(flat.monthlyRent),
                            icon: <Wallet className="size-5" />,
                        },
                        {
                            label: t("serviceCharge"),
                            value: formatMoney(flat.serviceCharge),
                            icon: <FileText className="size-5" />,
                        },
                        {
                            label: t("currentDue"),
                            value: formatMoney(flat.currentDueAmount),
                            icon: <Clock className="size-5" />,
                        },
                        {
                            label: t("securityDeposit"),
                            value: formatMoney(flat.securityDeposit),
                            icon: <CalendarDays className="size-5" />,
                        },
                    ].map((item) => (
                        <div
                            key={item.label}
                            className="rounded-xl border border-border bg-card p-4 shadow-sm"
                        >
                            <div className="flex items-center justify-between gap-3">
                                <p className="text-xs text-muted-foreground">
                                    {item.label}
                                </p>
                                <span className="text-primary">{item.icon}</span>
                            </div>
                            <p className="mt-3 text-xl font-bold tracking-tight">
                                {item.value}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="grid gap-5 lg:grid-cols-2">
                    {/* Basic information */}
                    <Section title={t("basicInformation")} icon={<Building2 className="size-5" />}>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3">
                            <InfoItem label={t("buildingName")} value={flat.buildingName} />
                            <InfoItem label={t("flatNumber")} value={flat.flatNumber} />
                            <InfoItem label={t("floor")} value={flat.floor} />
                            <InfoItem
                                label={t("rentalCategory")}
                                value={t(`rentalCategories.${flat.rentalCategory}`)}
                            />
                            <InfoItem
                                label={t("facing")}
                                value={flat.facing ? t(`facingDirections.${flat.facing}`) : undefined}
                            />
                            <InfoItem
                                label={t("createdAt")}
                                value={formatDate(flat.createdAt)}
                            />
                        </div>
                    </Section>

                    {/* Room specifications */}
                    <Section title={t("roomDetails")} icon={<Ruler className="size-5" />}>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3">
                            <InfoItem
                                label={t("size")}
                                value={flat.sizeSqFt ? `${flat.sizeSqFt} ${t("sqFt")}` : undefined}
                            />
                            <InfoItem label={t("bedrooms")} value={flat.bedrooms} />
                            <InfoItem label={t("totalBathrooms")} value={flat.totalBathRooms} />
                            <InfoItem label={t("attachedBathrooms")} value={flat.attachedBathrooms} />
                            <InfoItem label={t("commonBathrooms")} value={flat.commonBathrooms} />
                            <InfoItem label={t("balconies")} value={flat.balconies} />
                        </div>

                        <div className="mt-5 grid gap-2 sm:grid-cols-2">
                            <BooleanItem
                                label={t("drawingDining")}
                                value={flat.hasDrawingDining}
                            />
                            <BooleanItem
                                label={t("servantRoom")}
                                value={flat.hasServantRoom}
                            />
                        </div>
                    </Section>

                    {/* Utilities */}
                    <Section title={t("utilities")} icon={<Zap className="size-5" />}>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-5">
                            <InfoItem
                                label={t("gasType")}
                                value={t(`gasTypes.${flat.gasType}`)}
                            />
                            <InfoItem
                                label={t("electricityType")}
                                value={t(`electricityTypes.${flat.electricityType}`)}
                            />
                            <InfoItem
                                label={t("gasMeterNumber")}
                                value={flat.gasMeterOrAccountNo}
                            />
                            <InfoItem
                                label={t("electricityMeterNumber")}
                                value={flat.electricityMeterNo}
                            />
                        </div>
                    </Section>

                    {/* Amenities */}
                    <Section title={t("amenities")} icon={<Car className="size-5" />}>
                        <div className="grid gap-2 sm:grid-cols-2">
                            <BooleanItem label={t("parking")} value={flat.hasParking} />
                            <BooleanItem label={t("lift")} value={flat.hasLift} />
                            <BooleanItem label={t("generator")} value={flat.hasGenerator} />
                        </div>

                        {flat.hasParking && flat.parkingSlotNo && (
                            <div className="mt-4">
                                <InfoItem
                                    label={t("parkingSlot")}
                                    value={flat.parkingSlotNo}
                                />
                            </div>
                        )}
                    </Section>

                    {/* Additional charges */}
                    <Section title={t("additionalCharges")} icon={<Wallet className="size-5" />}>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-5">
                            <InfoItem
                                label={t("fixedWaterBill")}
                                value={formatMoney(flat.waterBillFixed)}
                            />
                            <InfoItem
                                label={t("fixedGarbageBill")}
                                value={formatMoney(flat.garbageBillFixed)}
                            />
                            <InfoItem
                                label={t("currentBillStatus")}
                                value={t(`billStatuses.${flat.currentMonthBillStatus}`)}
                            />
                            <InfoItem
                                label={t("updatedAt")}
                                value={formatDate(flat.updatedAt)}
                            />
                        </div>
                    </Section>

                    {/* Flat owner */}
                    <Section title={t("flatOwner")} icon={<UserRound className="size-5" />}>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <InfoItem
                                label={t("ownerName")}
                                value={flat.flatOwner?.name}
                            />
                            <InfoItem
                                label={t("email")}
                                value={flat.flatOwner?.email}
                            />
                            <InfoItem
                                label={t("phone")}
                                value={flat.flatOwner?.phone}
                            />
                        </div>
                    </Section>
                </div>

                {/* Present tenants */}
                <Section title={t("presentTenants")} icon={<UserRound className="size-5" />}>
                    {flat.presentTenants?.length ? (
                        <div className="grid gap-3 md:grid-cols-2">
                            {flat.presentTenants.map((tenant) => (
                                <div
                                    key={tenant._id}
                                    className="rounded-lg border border-border p-4"
                                >
                                    <h3 className="font-semibold">{tenant.name || "—"}</h3>
                                    <div className="mt-3 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                                        <InfoItem label={t("email")} value={tenant.email} />
                                        <InfoItem label={t("phone")} value={tenant.phone} />
                                        <InfoItem
                                            label={t("moveInDate")}
                                            value={formatDate(tenant.moveInDate)}
                                        />
                                        <InfoItem
                                            label={t("leaseEndDate")}
                                            value={formatDate(tenant.leaseEndDate)}
                                        />
                                        <InfoItem
                                            label={t("roomOrSeatLabel")}
                                            value={tenant.roomOrSeatLabel}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="rounded-lg bg-muted/50 px-4 py-6 text-center text-sm text-muted-foreground">
                            {t("noPresentTenants")}
                        </p>
                    )}
                </Section>

                {/* Past tenants */}
                <Section title={t("pastTenants")} icon={<ArrowUpDown className="size-5" />}>
                    {flat.pastTenants?.length ? (
                        <div className="grid gap-3 md:grid-cols-2">
                            {flat.pastTenants.map((tenant) => (
                                <div
                                    key={tenant._id}
                                    className="rounded-lg border border-border p-4"
                                >
                                    <h3 className="font-semibold">{tenant.name || "—"}</h3>
                                    <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                                        <InfoItem label={t("email")} value={tenant.email} />
                                        <InfoItem label={t("phone")} value={tenant.phone} />
                                        <InfoItem
                                            label={t("moveInDate")}
                                            value={formatDate(tenant.moveInDate)}
                                        />
                                        <InfoItem
                                            label={t("moveOutDate")}
                                            value={formatDate(tenant.moveOutDate)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="rounded-lg bg-muted/50 px-4 py-6 text-center text-sm text-muted-foreground">
                            {t("noPastTenants")}
                        </p>
                    )}
                </Section>

                {/* Notes */}
                {flat.notes && (
                    <Section title={t("notes")} icon={<FileText className="size-5" />}>
                        <p className="whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
                            {flat.notes}
                        </p>
                    </Section>
                )}
            </div>
        </div>
    );
};

export default FlatDetail;