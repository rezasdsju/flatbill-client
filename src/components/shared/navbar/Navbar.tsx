
import Image from 'next/image'
import DarkLogo from '@/app/assets/flatbill-logo-dark-mode.png'
import LightLogo from '@/app/assets/flatbill-logo-light-mode.png'
import ThemeToggle from './ThemeToggle';
import DropdownMenu from './DropdownMenu';


import HamburgerSheet from './HamburgerSheet';

const Navbar = () => {
    return (
        <nav className='border-b border-border py-1'>
            <div className='flex items-center justify-between px-2 max-w-7xl mx-auto'>
                <div className='flex items-center justify-start'>
                    <div>
                        <Image
                            src={LightLogo}
                            alt='FlatBill'
                            width={140}
                            height={70}
                            priority
                            className='dark:hidden w-28 sm:w-35 h-auto'
                        />
                        <Image
                            src={DarkLogo}
                            alt='FlatBill'
                            width={140}
                            height={70}
                            priority
                            className='hidden dark:block w-28 sm:w-35 h-auto'
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
                <div className='flex items-center justify-end gap-5'>
                    <ThemeToggle />
                    <div className='flex sm:hidden'>
                        <HamburgerSheet />
                    </div>
                    <div className='hidden sm:flex items-center justify-center gap-5'>
                        <button className='rounded-md px-4 py-2 border border-[#155EEF] text-[#155EEF] font-bold cursor-pointer'>Log In</button>
                        <button className='rounded-md px-4 py-2 bg-[#155EEF] text-[#FFFFFF] hover:[#0047CC] font-bold cursor-pointer'>Register</button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;