'use client'
import React from 'react';
import styles from "../ui/dashboard/dashboard.module.css"
import Sms from "@/app/ui/home/sentSms/sentSms"

const DashboardPage = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>
                <Sms />
            </div>
        </div>
    );
};

export default DashboardPage;