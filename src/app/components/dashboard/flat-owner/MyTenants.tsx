import {
    Building2,
    CalendarDays,
    Mail,
    Phone,
    UserRound,
    UsersRound,
    Wallet,
} from "lucide-react";
import type { IFlatWithTenants, PresentTenantRecord } from "@/types/flatTypes";
import { useLocale, useTranslations } from "next-intl";

const formatDate = (date: string, locale: string, fallback: string) => {
    const parsedDate = new Date(date);

    if (!date || Number.isNaN(parsedDate.getTime())) {
        return fallback;
    }

    const dateLocale = locale === "bn" ? "bn-BD" : "en-BD";
    return new Intl.DateTimeFormat(dateLocale, { dateStyle: "medium" }).format(parsedDate);
};

const formatAmount = (amount: number, locale: string) => {
    const numberLocale = locale === "bn" ? "bn-BD" : "en-BD";
    return `৳${amount.toLocaleString(numberLocale, { maximumFractionDigits: 2 })}`;
};

const TenantDetails = ({ tenant }: { tenant: PresentTenantRecord }) => (
    <div className="flex min-w-0 items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <UserRound className="size-5" aria-hidden="true" />
        </div>
        <div className="min-w-0">
            <p className="truncate font-medium text-card-foreground">
                {tenant.name || tenant.email}
            </p>
            {tenant.name && (
                <p className="truncate text-sm text-muted-foreground">{tenant.email}</p>
            )}
            {tenant.roomOrSeatLabel && (
                <p className="mt-1 text-xs text-muted-foreground">{tenant.roomOrSeatLabel}</p>
            )}
        </div>
    </div>
);

const TenantContacts = ({ tenant }: { tenant: PresentTenantRecord }) => (
    <div className="space-y-2 text-sm">
        <p className="flex min-w-0 items-center gap-2 text-muted-foreground">
            <Mail className="size-4 shrink-0" aria-hidden="true" />
            <span className="truncate">{tenant.email}</span>
        </p>
        {tenant.phone && (
            <p className="flex items-center gap-2 text-muted-foreground">
                <Phone className="size-4 shrink-0" aria-hidden="true" />
                <span>{tenant.phone}</span>
            </p>
        )}
    </div>
);

const MyTenants = ({ tenants }: { tenants: IFlatWithTenants[] }) => {
    const t = useTranslations("myTenants");
    const locale = useLocale();
    const totalTenants = tenants.reduce(
        (total, flat) => total + flat.presentTenants.length,
        0,
    );
    const totalDue = tenants.reduce((total, flat) => total + flat.currentDueAmount, 0);

    return (
        <main className="min-h-full bg-background p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl space-y-6">
                <header>
                    <div className="flex items-center gap-3">
                        <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <UsersRound className="size-5" aria-hidden="true" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                                {t("title")}
                            </h1>
                            <p className="mt-1 text-sm text-muted-foreground">
                                {t("description")}
                            </p>
                        </div>
                    </div>
                </header>

                <section
                    aria-label={t("overview")}
                    className="grid gap-4 sm:grid-cols-3"
                >
                    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Building2 className="size-4" aria-hidden="true" />
                            {t("properties")}
                        </div>
                        <p className="mt-2 text-2xl font-semibold text-card-foreground">
                            {tenants.length}
                        </p>
                    </div>
                    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <UsersRound className="size-4" aria-hidden="true" />
                            {t("currentTenants")}
                        </div>
                        <p className="mt-2 text-2xl font-semibold text-card-foreground">
                            {totalTenants}
                        </p>
                    </div>
                    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Wallet className="size-4" aria-hidden="true" />
                            {t("totalDue")}
                        </div>
                        <p className="mt-2 text-2xl font-semibold text-card-foreground">
                            {formatAmount(totalDue, locale)}
                        </p>
                    </div>
                </section>

                {tenants.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-border bg-card px-6 py-14 text-center">
                        <UsersRound
                            className="mx-auto size-9 text-muted-foreground"
                            aria-hidden="true"
                        />
                        <h2 className="mt-3 font-medium text-card-foreground">
                            {t("emptyTitle")}
                        </h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            {t("emptyDescription")}
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="hidden overflow-hidden rounded-xl border border-border bg-card shadow-sm md:block">
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-190 text-left text-sm">
                                    <thead className="bg-muted/50 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                        <tr>
                                            <th scope="col" className="px-5 py-4">{t("property")}</th>
                                            <th scope="col" className="px-5 py-4">{t("tenant")}</th>
                                            <th scope="col" className="px-5 py-4">{t("contact")}</th>
                                            <th scope="col" className="px-5 py-4">{t("moveInDate")}</th>
                                            <th scope="col" className="px-5 py-4 text-right">{t("currentDue")}</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        {tenants.map((flat) => (
                                            <tr key={flat._id} className="align-top">
                                                <td className="px-5 py-5">
                                                    <div className="flex items-start gap-3">
                                                        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                                                            <Building2 className="size-5" aria-hidden="true" />
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-card-foreground">{flat.buildingName}</p>
                                                            <p className="mt-1 text-muted-foreground">
                                                                {t("flatFloor", { flatNumber: flat.flatNumber, floor: flat.floor })}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="space-y-4 px-5 py-5">
                                                    {flat.presentTenants.length > 0 ? (
                                                        flat.presentTenants.map((tenant) => (
                                                            <TenantDetails key={tenant._id} tenant={tenant} />
                                                        ))
                                                    ) : (
                                                        <span className="text-sm text-muted-foreground">{t("noTenantAssigned")}</span>
                                                    )}
                                                </td>
                                                <td className="space-y-4 px-5 py-5">
                                                    {flat.presentTenants.map((tenant) => (
                                                        <TenantContacts key={tenant._id} tenant={tenant} />
                                                    ))}
                                                    {flat.presentTenants.length === 0 && (
                                                        <span className="text-muted-foreground">—</span>
                                                    )}
                                                </td>
                                                <td className="space-y-4 px-5 py-5 text-muted-foreground">
                                                    {flat.presentTenants.map((tenant) => (
                                                        <p key={tenant._id} className="flex items-center gap-2">
                                                            <CalendarDays className="size-4 shrink-0" aria-hidden="true" />
                                                            {formatDate(tenant.moveInDate, locale, t("dateNotProvided"))}
                                                        </p>
                                                    ))}
                                                    {flat.presentTenants.length === 0 && <span>—</span>}
                                                </td>
                                                <td className="px-5 py-5 text-right">
                                                    <span className={flat.currentDueAmount > 0 ? "font-semibold text-destructive" : "font-medium text-card-foreground"}>
                                                        {formatAmount(flat.currentDueAmount, locale)}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="grid gap-4 md:hidden">
                            {tenants.map((flat) => (
                                <article
                                    key={flat._id}
                                    className="space-y-4 rounded-xl border border-border bg-card p-4 shadow-sm"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                                            <Building2 className="size-5" aria-hidden="true" />
                                        </div>
                                        <div className="min-w-0">
                                            <h2 className="font-semibold text-card-foreground">{flat.buildingName}</h2>
                                            <p className="mt-1 text-sm text-muted-foreground">
                                                {t("flatFloor", { flatNumber: flat.flatNumber, floor: flat.floor })}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-4 border-t border-border pt-4">
                                        {flat.presentTenants.length > 0 ? (
                                            flat.presentTenants.map((tenant) => (
                                                <div key={tenant._id} className="space-y-3">
                                                    <TenantDetails tenant={tenant} />
                                                    <TenantContacts tenant={tenant} />
                                                    <p className="flex items-center gap-2 text-sm text-muted-foreground">
                                                        <CalendarDays className="size-4 shrink-0" aria-hidden="true" />
                                                        {t("moveIn", { date: formatDate(tenant.moveInDate, locale, t("dateNotProvided")) })}
                                                    </p>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-sm text-muted-foreground">{t("noTenantAssigned")}</p>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between border-t border-border pt-3">
                                        <span className="text-sm text-muted-foreground">{t("currentDue")}</span>
                                        <span className={flat.currentDueAmount > 0 ? "font-semibold text-destructive" : "font-medium text-card-foreground"}>
                                            {formatAmount(flat.currentDueAmount, locale)}
                                        </span>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </main>
    );
};

export default MyTenants;
