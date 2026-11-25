'use client'
import Image from 'next/image'
import DarkLogo from '@/app/assets/flatbill-logo-dark-mode.png'
import LightLogo from '@/app/assets/flatbill-logo-light-mode.png'
import ThemeToggle from './ThemeToggle';
import DropdownMenu from './DropdownMenu';
import { useTranslations } from "next-intl";
import LanguageToggle from "./LanguageToggle";
import HamburgerSheet from './HamburgerSheet';
import ProfileMenuPopOver from './ProfileMenuPopOver';
import { SkeletonAvatar } from './SkeletonAvatar';
import { authClient } from '@/lib/auth-client';



const Navbar = () => {
    const t = useTranslations("nav");
    const { data: session, isPending } = authClient.useSession()
    const user = session?.user
    return (
        <nav className='sticky top-0 z-50 h-16 bg-background border-b border-border py-2 sm:py-1'>
            <div className='flex items-center justify-between h-full px-1 sm:px-2 max-w-7xl mx-auto'>
                <div className='flex items-center justify-start'>
                    <div className='shrink-0'>
                        <Image
                            src={LightLogo}
                            alt='FlatBill'
                            width={135}
                            height={70}
                            priority
                            className='dark:hidden w-30 sm:w-32 h-auto'
                        />
                        <Image
                            src={DarkLogo}
                            alt='FlatBill'
                            width={140}
                            height={70}
                            priority
                            className='hidden dark:block w-33 sm:w-35 h-auto'
                        />

                    </div>
                </div>


                <div className='flex items-center justify-center gap-5'>

                    <ul className='hidden md:flex items-center justify-center gap-5'>
                        <li>{t("home")}</li>
                        <DropdownMenu />
                        <li>{t("about")}</li>
                        <li>{t("contact")}</li>
                    </ul>
                </div>
                <div className={`flex items-center justify-end gap-1 min-[325px]:gap-2 min-[380px]:gap-3 min-[400px]:gap-4 sm:gap-5 md:gap-5`}>
                    <ThemeToggle />
                    <LanguageToggle />

                    <div className='flex md:hidden'>
                        <HamburgerSheet />
                    </div>


                    {
                        isPending ? <SkeletonAvatar></SkeletonAvatar> :
                            user ? <div>
                                <div >
                                    <ProfileMenuPopOver user={user} />
                                </div>
                                {/* <div className='flex sm:hidden'>
                                    <Suspense><ProfileMenuSheet user={user} /></Suspense >
                                </div> */}
                            </div> :
                                <div className='hidden md:flex items-center justify-center gap-5'>
                                    <button className='rounded-md px-4 py-2 border border-[#155EEF] text-[#155EEF] font-bold cursor-pointer'>{t("login")}</button>
                                    <button className='rounded-md px-4 py-2 bg-[#155EEF] text-[#FFFFFF] hover:[#0047CC] font-bold cursor-pointer'>{t("register")}</button>
                                </div>
                    }


                </div>
            </div>
        </nav>
    );
};

export default Navbar;