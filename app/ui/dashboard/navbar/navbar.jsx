"use client";
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import styles from './navbar.module.css';
import {
    MdDashboard,
    MdOutlineChat,
    MdNotifications
} from 'react-icons/md';
import Image from 'next/image';
import TransitionsModal from '../../modal/sendSMSModal'; // Adjust the import path as needed

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const pathName = usePathname();

    const handleOpenModal = () => setOpen(true);
    const handleCloseModal = () => setOpen(false);

    return (
        <div className={styles.container}>
            <div className={styles.title}>{pathName.split('/').pop()}</div>
            <div className={styles.menu}>
                <div className={styles.icons}>
                    <MdDashboard className={styles.icon} size={20} />
                    <MdOutlineChat
                        className={styles.icon}
                        size={20}
                        onClick={handleOpenModal}
                    />
                    <MdNotifications className={styles.icon} size={20} />
                </div>
                <Image src='/logo.png' alt='' height='26' width='111' className={styles.logo} />
            </div>
            <TransitionsModal
                open={open}
                onClose={handleCloseModal}
                title="Send SMS"
                description="This is a chat modal. You can place your chat content here."
            />
        </div>
    );
};

export default Navbar;