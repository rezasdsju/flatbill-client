
import Image from 'next/image'
import DarkLogo from '@/app/assets/flatbill-logo-dark-mode.png'
import LightLogo from '@/app/assets/flatbill-logo-light-mode.png'
import ThemeToggle from './ThemeToggle';


const Navbar = () => {
    return (
        <nav>
            <div>
                <div>
                    <div>
                        <Image
                            src={LightLogo}
                            alt='FlatBill'
                            width={160}
                            height={80}
                            priority
                            className='dark:hidden'
                        />
                        <Image
                            src={DarkLogo}
                            alt='FlatBill'
                            width={160}
                            height={80}
                            priority
                            className='hidden dark:block'
                        />

                    </div>
                </div>


                <div>
                    <ThemeToggle />

                </div>
            </div>
        </nav>
    );
};

export default Navbar;