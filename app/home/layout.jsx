import React from 'react';
import HomeSidebar from '../ui/home/sidebar/homeSidebar';
import Navbar from '../ui/dashboard/navbar/navbar';
import styles from "../ui/dashboard/dashboard.module.css"

const Layout = ({children}) => {
    return (
        <div className= {styles.container}>
            <div className={styles.menu}>
                <HomeSidebar/>
                </div>
            <div className={styles.content}>
                <Navbar/>
                {children}
            </div>
        </div>
    );
};


export default Layout;