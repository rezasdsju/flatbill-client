'use client'

import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { MenuIcon } from "lucide-react"
import DropdownMenu from "./DropdownMenu"
import { authClient } from "@/lib/auth-client"
import LoadingSkeleton from "./LoadingSkeleton"
import { useTranslations } from "next-intl"
import Link from "next/link"

export default function HamburgerSheet() {
    const t = useTranslations('nav')
    const { data: session, isPending } = authClient.useSession()
    const user = session?.user

    return (
        <Sheet>
            <SheetTrigger render={<Button variant="outline">
                <MenuIcon className="flex " />
            </Button>} />
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                    <SheetDescription>
                        Navigate through FlatBill.
                    </SheetDescription>
                </SheetHeader>

                <div className="flex flex-1 flex-col gap-6 px-4">
                    <div className="flex flex-col gap-4">
                        <div className="pl-2">{t('home')}</div>
                        <DropdownMenu />
                        <div className="pl-2">{t('about')}</div>
                        <div className="pl-2">{t('contact')}</div>
                    </div>
                </div>
                <SheetFooter>
                    {
                        isPending ? <LoadingSkeleton /> :
                            !user &&
                            <div className="flex flex-col gap-2">
                                <Link href={`/sign-in`}><button className='rounded-md px-4 py-2 border border-[#155EEF] text-[#155EEF] font-bold cursor-pointer'>Log In</button></Link>
                                <Link href={`/register`}><button className='rounded-md px-4 py-2 bg-[#155EEF] text-[#FFFFFF] hover:[#0047CC] font-bold cursor-pointer'>Register</button></Link>
                            </div>
                    }
                    {/* <SheetClose render={<Button variant="outline">Close</Button>} /> */}
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
