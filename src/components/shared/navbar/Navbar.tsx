'use client'
import Image from 'next/image'
import DarkLogo from '@/app/assets/flatbill-logo-dark-mode.png'
import LightLogo from '@/app/assets/flatbill-logo-light-mode.png'
import ThemeToggle from './ThemeToggle';
import DropdownMenu from './DropdownMenu';


import HamburgerSheet from './HamburgerSheet';
import ProfileMenuPopOver from './ProfileMenuPopOver';
import { SkeletonAvatar } from './SkeletonAvatar';
import { authClient } from '@/lib/auth-client';



const Navbar = () => {
    const { data: session, isPending } = authClient.useSession()
    const user = session?.user
    return (
        <nav className='sticky top-0 z-50 bg-background border-b border-border py-2 sm:py-1'>
            <div className='flex items-center justify-between px-1 sm:px-2 max-w-7xl mx-auto'>
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

                    <ul className='hidden sm:flex items-center justify-center gap-5'>
                        <li>Home</li>
                        <DropdownMenu />
                        <li>About</li>
                        <li>Contact</li>
                    </ul>
                </div>
                <div className={`flex items-center justify-end gap-5`}>
                    <ThemeToggle />

                    <div className='flex sm:hidden'>
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
                                <div className='hidden sm:flex items-center justify-center gap-5'>
                                    <button className='rounded-md px-4 py-2 border border-[#155EEF] text-[#155EEF] font-bold cursor-pointer'>Log In</button>
                                    <button className='rounded-md px-4 py-2 bg-[#155EEF] text-[#FFFFFF] hover:[#0047CC] font-bold cursor-pointer'>Register</button>
                                </div>
                    }


                </div>
            </div>
        </nav>
    );
};

export default Navbar;