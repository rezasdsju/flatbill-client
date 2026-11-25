
import Image from "next/image";
import Banner2 from "@/app/assets/hero-2.png";
import Banner3 from "@/app/assets/hero-dark.png";
import { getTranslations } from "next-intl/server";

export default async function HeroSection() {
    const t = await getTranslations("hero");

    return (
        <section className="relative isolate w-full overflow-hidden bg-linear-to-br from-[#F0F7FF] via-white to-[#EAF2FF] dark:from-slate-950 dark:via-[#0B1730] dark:to-slate-950">

            {/* Background Decorations */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
            >
                <div className="absolute -left-40 -top-40 size-112.5 rounded-full bg-sky-400/20 blur-[120px] dark:bg-blue-500/15" />

                <div className="absolute -right-32 -top-32 size-125 rounded-full bg-indigo-400/20 blur-[130px] dark:bg-indigo-500/15" />

                <div className="absolute -bottom-40 left-1/3 size-112.5 rounded-full bg-cyan-400/20 blur-[120px] dark:bg-cyan-500/10" />

                <div className="absolute inset-0 bg-[radial-gradient(#3B82F6_0.8px,transparent_0.8px)] bg-size-[28px_28px] opacity-[0.08] dark:opacity-[0.05]" />
            </div>

            {/* Main Content */}
            <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-4 lg:px-10 lg:py-24">

                {/* Left Content */}
                <div className="relative z-10 max-w-2xl">

                    {/* Badge */}
                    <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-200/70 bg-white/70 px-4 py-2 shadow-sm backdrop-blur-md dark:border-blue-400/20 dark:bg-slate-900/60">
                        <span className="relative flex size-2.5">
                            <span className="absolute inline-flex size-full animate-ping rounded-full bg-blue-500 opacity-50" />
                            <span className="relative inline-flex size-2.5 rounded-full bg-blue-600" />
                        </span>

                        <span className="text-sm font-semibold tracking-wide text-blue-700 dark:text-blue-300">
                            {t("badge")}
                        </span>
                    </div>

                    {/* Heading */}
                    <div className="space-y-2">
                        <h1 className="text-5xl font-extrabold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl dark:text-white">
                            Flat
                            <span className="bg-linear-to-r from-blue-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                                Bill
                            </span>
                        </h1>

                        <h2 className="max-w-xl text-3xl font-bold leading-tight tracking-tight text-slate-800 sm:text-4xl lg:text-[42px] dark:text-slate-100">
                            {t("headingLead")}
                            <span className="pl-2 bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                                {t("headingHighlight")}
                            </span>
                        </h2>
                    </div>

                    {/* Description */}
                    <p className="mt-6 max-w-lg text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-400">
                        {t("description")}
                    </p>

                    {/* CTA Buttons */}
                    <div className="mt-9 flex flex-col gap-4 sm:flex-row">

                        <button className="cursor-pointer group inline-flex items-center justify-center gap-3 rounded-xl bg-linear-to-r from-[#155EEF] to-[#2563EB] px-8 py-4 font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/30">
                            {t("getStarted")}

                            <span className="cursor-pointer transition-transform duration-300 group-hover:translate-x-1">
                                →
                            </span>
                        </button>

                        <button className="cursor-pointer inline-flex items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white/70 px-8 py-4 font-semibold text-slate-800 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-blue-400 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900/60 dark:text-white dark:hover:border-blue-400 dark:hover:text-blue-400">
                            <span className="flex size-7 items-center justify-center rounded-full bg-blue-100 text-sm text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                                ▶
                            </span>
                            {t("watchDemo")}
                        </button>

                    </div>

                    {/* Trust Indicators */}
                    <div className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-4 border-t border-slate-200/80 pt-7 dark:border-slate-700/70">

                        <div className="flex items-center gap-2.5">
                            <span className="flex size-9 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400">
                                ✓
                            </span>
                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                {t("secure")}
                            </span>
                        </div>

                        <div className="flex items-center gap-2.5">
                            <span className="flex size-9 items-center justify-center rounded-lg bg-cyan-100 text-cyan-600 dark:bg-cyan-500/15 dark:text-cyan-400">
                                ⚡
                            </span>
                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                {t("easy")}
                            </span>
                        </div>

                        <div className="flex items-center gap-2.5">
                            <span className="flex size-9 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-400">
                                ♡
                            </span>
                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                {t("community")}
                            </span>
                        </div>

                    </div>
                </div>

                {/* Right Image */}
                <div className="relative flex items-center justify-center lg:-mr-10">

                    {/* Image Glow */}
                    <div className="absolute inset-10 rounded-full bg-blue-400/20 blur-[90px] dark:bg-blue-500/20" />

                    <div className="relative w-full">

                        <Image
                            src={Banner2}
                            alt="FlatBill Smart Apartment Management"
                            width={900}
                            height={900}
                            priority
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="block dark:hidden relative z-10 h-auto w-full object-contain
mask-[linear-gradient(to_right,transparent_0%,black_15%,black_100%),linear-gradient(to_bottom,transparent_0%,black_15%,black_85%,transparent_100%)]
mask-intersect
[-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_15%,black_100%),linear-gradient(to_bottom,transparent_0%,black_15%,black_85%,transparent_100%)]"
                        />
                        <Image
                            src={Banner3}
                            alt="FlatBill Smart Apartment Management"
                            width={900}
                            height={900}
                            priority
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="hidden dark:block relative z-10 h-auto w-full object-contain
mask-[linear-gradient(to_right,transparent_0%,black_15%,black_100%),linear-gradient(to_bottom,transparent_0%,black_15%,black_85%,transparent_100%)]
mask-intersect
[-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_15%,black_100%),linear-gradient(to_bottom,transparent_0%,black_15%,black_85%,transparent_100%)]"
                        />

                    </div>
                </div>

            </div>
        </section>
    );
}
