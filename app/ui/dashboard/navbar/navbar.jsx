"use client"
import { usePathname } from 'next/navigation';
import styles from './navbar.module.css'
import {
    MdDashboard,
    MdOutlineChat,
    MdNotifications,
    MdPublic,
    MdSearch
} from 'react-icons/md'
import Image from 'next/image';

const Navbar = () => {
    const pathName = usePathname();
    return (
        <div className={styles.container}>
            <div className={styles.title}>{pathName.split('/').pop()}</div>
            <div className={styles.menu}>
                <div className={styles.icons}>
                    <MdDashboard className={styles.icon} size={20} />
                    <MdOutlineChat className={styles.icon} size={20} />
                    <MdNotifications className={styles.icon} size={20} />
                    <MdPublic className={styles.icon} size={20} />
                </div>
                <Image src='/logo.png' alt='' height='38' width='120' className={styles.logo}/>
            </div>
        </div>
    );
};

export default Navbar;