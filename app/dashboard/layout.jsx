'use client'
import React, {useEffect} from 'react';
import Sidebar from '../ui/dashboard/sidebar/sidebar';
import Navbar from '../ui/dashboard/navbar/navbar';
import styles from "../ui/dashboard/dashboard.module.css"
import {useRouter} from "next/navigation";
import jwtDecode from "jwt-decode";

const Layout = ({children}) => {
    const router = useRouter();
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');

        if (!accessToken) {
            router.push('/login'); // Redirect to login if no token is found
            return;
        }

        try {
            const decodedToken = jwtDecode(accessToken);
            if (decodedToken.role !== 'admin') {
                router.push('/home'); // Redirect non-admin users
            }
        } catch (error) {
            localStorage.removeItem('accessToken');
            router.push('/login'); // If token is invalid, redirect to login
        }
    }, []);
    return (
        <div className={styles.container}>
            <div className={styles.menu}>
                <Sidebar/>
            </div>
            <div className={styles.content}>
                <Navbar/>
                {children}
            </div>
        </div>
    );
};


export default Layout;