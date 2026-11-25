'use client'

import Image from 'next/image';
import DarkLogo from '@/app/assets/flatbill-logo-dark-mode.png'
import LightLogo from '@/app/assets/flatbill-logo-light-mode.png'
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ArrowUpRight } from 'lucide-react';

const productLinks = [
    { key: 'monthlyBilling', href: '/#billing' },
    { key: 'onlinePayment', href: '/#payment' },
    { key: 'expenseTracking', href: '/#expenses' },
] as const;

const Footer = () => {
    const t = useTranslations('footer');
    const features = useTranslations('features');
    const nav = useTranslations('nav');
    const year = new Date().getFullYear();

    return (
        <footer className="site-footer relative isolate overflow-hidden border-t border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
            <div aria-hidden="true" className="pointer-events-none absolute -top-32 left-1/4 -z-10 size-72 rounded-full bg-blue-400/10 blur-3xl dark:bg-blue-500/10" />
            <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
                <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr] lg:gap-16 lg:py-16">
                    <div className="max-w-sm">
                        <Link href="/" aria-label="FlatBill home" className="inline-flex shrink-0">
                            <Image
                                src={LightLogo}
                                alt="FlatBill"
                                width={135}
                                height={70}
                                className="h-auto w-32 dark:hidden"
                            />
                            <Image
                                src={DarkLogo}
                                alt="FlatBill"
                                width={140}
                                height={70}
                                className="hidden h-auto w-32 dark:block"
                            />
                        </Link>
                        <p className="mt-4 max-w-sm text-sm leading-7 text-slate-600 dark:text-slate-400">
                            {t('description')}
                        </p>
                    </div>

                    <nav aria-label={t('product')} className="sm:justify-self-start">
                        <h2 className="mb-4 text-sm font-semibold tracking-wide text-slate-900 dark:text-white">
                            {t('product')}
                        </h2>
                        <ul className="space-y-3">
                            {productLinks.map(({ key, href }) => (
                                <li key={key}>
                                    <Link
                                        href={href}
                                        className="inline-flex items-center gap-1 text-sm transition-colors hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:hover:text-blue-400 dark:focus-visible:ring-offset-slate-950"
                                    >
                                        {features(key)}
                                        <ArrowUpRight aria-hidden="true" className="size-3.5 opacity-60" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <nav aria-label={t('account')} className="sm:justify-self-start">
                        <h2 className="mb-4 text-sm font-semibold tracking-wide text-slate-900 dark:text-white">
                            {t('account')}
                        </h2>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/sign-in"
                                    className="text-sm transition-colors hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:hover:text-blue-400 dark:focus-visible:ring-offset-slate-950"
                                >
                                    {nav('login')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/register"
                                    className="text-sm transition-colors hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:hover:text-blue-400 dark:focus-visible:ring-offset-slate-950"
                                >
                                    {nav('register')}
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-200 py-5 text-center text-xs sm:flex-row sm:text-left dark:border-slate-800">
                    <p>© {year} FlatBill. {t('copyright')}</p>
                    <p className="font-medium text-slate-500 dark:text-slate-400">{t('tagline')}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;