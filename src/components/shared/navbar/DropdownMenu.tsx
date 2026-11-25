"use client"
import Link from "next/link"
import {
    ReceiptIcon,
    CreditCardIcon,
    WalletIcon,
    MegaphoneIcon,
    MessageSquareWarningIcon,
    ChartColumnIcon,
} from "lucide-react"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { useTranslations } from "next-intl"

const features = [
    { label: "monthlyBilling", href: "/#billing", icon: ReceiptIcon },
    { label: "onlinePayment", href: "/#payment", icon: CreditCardIcon },
    { label: "expenseTracking", href: "/#expenses", icon: WalletIcon },
    { label: "noticeBoard", href: "/#notices", icon: MegaphoneIcon },
    { label: "complaints", href: "/#complaints", icon: MessageSquareWarningIcon },
    { label: "reports", href: "/#reports", icon: ChartColumnIcon },
] as const

type Props = { className?: string }
const DropdownMenu = ({ className }: Props) => {
    const t = useTranslations('features')
    return (
        <NavigationMenu className={className}>
            <NavigationMenuList >
                <NavigationMenuItem>
                    <NavigationMenuTrigger className={`font-sans text-base font-normal `}>{t('title')}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-56">
                            {features.map(({ label, href, icon: Icon }) => (
                                <li key={label}>
                                    <NavigationMenuLink
                                        render={
                                            <Link href={href} className="flex-row items-center gap-2">
                                                <Icon />
                                                {t(label)}
                                            </Link>
                                        }
                                    />
                                </li>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
};

export default DropdownMenu;