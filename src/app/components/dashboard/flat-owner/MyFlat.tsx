"use client";

import React, { useState } from "react";
import {
  Building2,
  User,
  Phone,
  BedDouble,
  Bath,
  Maximize2,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  Eye,
  UserPlus,
} from "lucide-react";
import type { IFlat } from "@/types/flatTypes";
import { useTranslations } from "next-intl";



const MyFlat = ({ flats }: { flats: IFlat[] }) => {
  const t = useTranslations('myFlat')
  const [filter, setFilter] = useState<"ALL" | IFlat["status"]>("ALL");

  const filteredFlats =
    filter === "ALL"
      ? flats
      : flats.filter((flat) => flat.status === filter);

  const totalFlats = flats.length;
  const occupiedCount = flats.filter((f) => f.status === "Occupied").length;
  const vacantCount = flats.filter((f) => f.status === "Vacant").length;

  const getStatusLabel = (status: IFlat["status"]) => {
    switch (status) {
      case "Occupied":
        return t("statuses.occupied");
      case "Vacant":
        return t("statuses.vacant");
      case "Under Maintenance":
        return t("statuses.underMaintenance");
    }
  };

  const getBillBadge = (status: IFlat["currentMonthBillStatus"]) => {
    switch (status) {
      case "Paid":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-950/60 dark:text-emerald-300 dark:ring-emerald-400/20">
            <CheckCircle2 className="h-3.5 w-3.5" />
            {t("billStatuses.paid")}
          </span>
        );
      case "Due":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-700 ring-1 ring-inset ring-rose-600/20 dark:bg-rose-950/60 dark:text-rose-300 dark:ring-rose-400/20">
            <AlertCircle className="h-3.5 w-3.5" />
            {t("billStatuses.due")}
          </span>
        );
      case "Partial":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20 dark:bg-amber-950/60 dark:text-amber-300 dark:ring-amber-400/20">
            <Clock className="h-3.5 w-3.5" />
            {t("billStatuses.partial")}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-muted dark:text-muted-foreground">
            {t("billStatuses.notAvailable")}
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-6 lg:p-8 dark:bg-background">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header Section */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-foreground">
              {t("title")}
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-muted-foreground">
              {t("description")}
            </p>
          </div>

          <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90">
            <Plus className="h-4 w-4" />
            {t("addNewFlat")}
          </button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs dark:border-border dark:bg-card">
            <p className="text-sm font-medium text-slate-500 dark:text-muted-foreground">{t("stats.totalFlats")}</p>
            <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-card-foreground">{totalFlats}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs dark:border-border dark:bg-card">
            <p className="text-sm font-medium text-slate-500 dark:text-muted-foreground">{t("stats.occupied")}</p>
            <p className="mt-1 text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {occupiedCount}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs dark:border-border dark:bg-card">
            <p className="text-sm font-medium text-slate-500 dark:text-muted-foreground">{t("stats.vacant")}</p>
            <p className="mt-1 text-2xl font-bold text-amber-600 dark:text-amber-400">
              {vacantCount}
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3 dark:border-border">
          {(["ALL", "Occupied", "Vacant", "Under Maintenance"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`rounded-lg px-3.5 py-1.5 text-sm font-medium transition ${filter === tab
                ? "bg-slate-900 text-white dark:bg-primary dark:text-primary-foreground"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200 dark:border-border dark:bg-background dark:text-muted-foreground dark:hover:bg-accent dark:hover:text-accent-foreground"
                }`}
            >
              {tab === "ALL"
                ? t("filters.all")
                : getStatusLabel(tab)}
            </button>
          ))}
        </div>

        {/* Desktop View: Table */}
        <div className="hidden overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-xs dark:border-border dark:bg-card md:block">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:border-border dark:bg-muted/50 dark:text-muted-foreground">
                  <th className="px-6 py-4">{t("table.flatBuilding")}</th>
                  <th className="px-6 py-4">{t("table.specifications")}</th>
                  <th className="px-6 py-4">{t("table.rentService")}</th>
                  <th className="px-6 py-4">{t("table.status")}</th>
                  <th className="px-6 py-4">{t("table.currentTenant")}</th>
                  <th className="px-6 py-4">{t("table.currentMonthBill")}</th>
                  <th className="px-6 py-4 text-right">{t("table.actions")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-border">
                {filteredFlats.map((flat) => (
                  <tr
                    key={flat._id}
                    className="transition hover:bg-slate-50/70 dark:hover:bg-muted/50"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 font-bold text-slate-800 dark:bg-muted dark:text-foreground">
                          {flat.flatNumber}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-card-foreground">
                            {flat.buildingName}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-muted-foreground">{flat.floor}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-slate-600 dark:text-muted-foreground">
                      <div className="flex items-center gap-3 text-xs">
                        <span className="inline-flex items-center gap-1">
                          <Maximize2 className="h-3.5 w-3.5 text-slate-400 dark:text-muted-foreground" />
                          {flat.sizeSqFt} {t("squareFeet")}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <BedDouble className="h-3.5 w-3.5 text-slate-400 dark:text-muted-foreground" />
                          {flat.bedrooms}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Bath className="h-3.5 w-3.5 text-slate-400 dark:text-muted-foreground" />
                          {flat.totalBathRooms}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-900 dark:text-card-foreground">
                        ৳{flat.monthlyRent.toLocaleString()}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-muted-foreground">
                        + ৳{flat.serviceCharge.toLocaleString()} {t("serviceCharge")}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${flat.status === "Occupied"
                          ? "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20 dark:bg-blue-950/60 dark:text-blue-300 dark:ring-blue-400/20"
                          : "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20 dark:bg-amber-950/60 dark:text-amber-300 dark:ring-amber-400/20"
                          }`}
                      >
                        {getStatusLabel(flat.status)}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      {flat.presentTenants?.length ? (
                        <div className="space-y-1">
                          {flat.presentTenants.map((tenant) => (
                            <div key={tenant._id}>
                              <p className="font-medium text-slate-900 dark:text-card-foreground">
                                {tenant.name ?? tenant.email}
                              </p>
                              {tenant.phone && (
                                <p className="text-xs text-slate-500 dark:text-muted-foreground">
                                  {tenant.phone}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-xs italic text-slate-400 dark:text-muted-foreground">
                          {t("noTenantAssigned")}
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      {getBillBadge(flat.currentMonthBillStatus)}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex items-center justify-end gap-2">
                        {flat.status === "Vacant" && (
                          <button className="inline-flex items-center gap-1 rounded-md bg-emerald-600 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400">
                            <UserPlus className="h-3.5 w-3.5" />
                            {t("actions.assign")}
                          </button>
                        )}
                        <button className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-border dark:bg-background dark:text-foreground dark:hover:bg-accent">
                          <Eye className="h-3.5 w-3.5" />
                          {t("actions.details")}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile & Tablet View: Cards */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {filteredFlats.map((flat) => (
            <div
              key={flat._id}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs space-y-4 dark:border-border dark:bg-card"
            >
              {/* Card Top */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-sm font-bold text-white dark:bg-primary dark:text-primary-foreground">
                    {flat.flatNumber}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-card-foreground">
                      {flat.buildingName}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-muted-foreground">{flat.floor}</p>
                  </div>
                </div>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${flat.status === "Occupied"
                    ? "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
                    : "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300"
                    }`}
                >
                  {getStatusLabel(flat.status)}
                </span>
              </div>

              {/* Specs & Rent */}
              <div className="grid grid-cols-2 gap-3 rounded-lg bg-slate-50 p-3 text-xs dark:bg-muted">
                <div>
                  <p className="text-slate-500 dark:text-muted-foreground">{t("monthlyRent")}</p>
                  <p className="mt-0.5 text-sm font-bold text-slate-900 dark:text-card-foreground">
                    ৳{flat.monthlyRent.toLocaleString()}
                  </p>
                  <p className="text-slate-500 dark:text-muted-foreground">
                    + ৳{flat.serviceCharge.toLocaleString()} {t("serviceCharge")}
                  </p>
                </div>
                <div>
                  <p className="text-slate-500 dark:text-muted-foreground">{t("flatSizeLayout")}</p>
                  <p className="mt-0.5 font-medium text-slate-800 dark:text-card-foreground">
                    {flat.sizeSqFt} {t("squareFeet")}
                  </p>
                  <p className="text-slate-600 dark:text-muted-foreground">
                    {flat.bedrooms} {t("bedrooms")} • {flat.totalBathRooms} {t("bathrooms")}
                  </p>
                </div>
              </div>

              {/* Tenant Info */}
              <div className="flex items-center justify-between border-t border-slate-100 pt-3 dark:border-border">
                {flat.presentTenants?.length ? (
                  <div className="space-y-1">
                    {flat.presentTenants.map((tenant) => (
                      <div key={tenant._id} className="space-y-0.5">
                        <p className="flex items-center gap-1.5 text-sm font-medium text-slate-900 dark:text-card-foreground">
                          <User className="h-3.5 w-3.5 text-slate-400 dark:text-muted-foreground" />
                          {tenant.name ?? tenant.email}
                        </p>
                        {tenant.phone && (
                          <p className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-muted-foreground">
                            <Phone className="h-3.5 w-3.5 text-slate-400 dark:text-muted-foreground" />
                            {tenant.phone}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs italic text-slate-400 dark:text-muted-foreground">
                    {t("noTenantAssigned")}
                  </p>
                )}

                <div>{getBillBadge(flat.currentMonthBillStatus)}</div>
              </div>

              {/* Card Actions */}
              <div className="flex items-center gap-2 pt-1">
                {flat.status === "Vacant" && (
                  <button className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-medium text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400">
                    <UserPlus className="h-3.5 w-3.5" />
                    {t("actions.assignTenant")}
                  </button>
                )}
                <button className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-border dark:bg-background dark:text-foreground dark:hover:bg-accent">
                  <Eye className="h-3.5 w-3.5" />
                  {t("actions.viewDetails")}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyFlat;