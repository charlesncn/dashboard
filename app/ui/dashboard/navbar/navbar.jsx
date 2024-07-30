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

const Navbar = () => {
    const pathName = usePathname();
    return (
        <div className={styles.container}>
            <div className={styles.title}>{pathName.split('/').pop()}</div>
            <div className={styles.menu}>
                <div className={styles.search}>
                    <MdSearch/>
                    <input type='text' placeholder='Search..' className={styles.input} />
                </div>
                <div className={styles.icons}>
                    <MdDashboard className={styles.icon} size={20} />
                    <MdOutlineChat className={styles.icon} size={20} />
                    <MdNotifications className={styles.icon} size={20} />
                    <MdPublic className={styles.icon} size={20} />
                </div>
            </div>
        </div>
    );
};

export default Navbar;