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

const features = [
    { label: "Monthly Billing", href: "/#billing", icon: ReceiptIcon },
    { label: "Online Payment", href: "/#payment", icon: CreditCardIcon },
    { label: "Expense Tracking", href: "/#expenses", icon: WalletIcon },
    { label: "Notice Board", href: "/#notices", icon: MegaphoneIcon },
    { label: "Complaints", href: "/#complaints", icon: MessageSquareWarningIcon },
    { label: "Reports", href: "/#reports", icon: ChartColumnIcon },
]

const DropdownMenu = () => {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className={`font-sans text-base font-normal`}>Features</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-56">
                            {features.map(({ label, href, icon: Icon }) => (
                                <li key={label}>
                                    <NavigationMenuLink
                                        render={
                                            <Link href={href} className="flex-row items-center gap-2">
                                                <Icon />
                                                {label}
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