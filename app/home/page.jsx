import React from 'react';
import styles from "../ui/dashboard/dashboard.module.css"
import Card from "../ui/dashboard/card/card"
import Sms from "@/app/ui/home/sentSms/sentSms"
import Charts from "../ui/dashboard/charts/charts"
import Rightbar from "../ui/dashboard/rightbar/rightbar"

const DashboardPage = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>
                <Sms />
            </div>
            {/* <div className={styles.right}>
                <Rightbar/>
            </div> */}
        </div>
    );
};

export default DashboardPage;