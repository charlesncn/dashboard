'use client'
import styles from './loginScreen.module.css'
import Image from "next/image";
import React from "react";

const LoginScreen = () => {
    return (
        <div className={styles.container}>
            <div className={styles.login}>
                <div className={styles.logoWrapper}>
                    <Image src='/logo.png' alt='' height='52' width='222' className={styles.logo}/>
                </div>
                <div className={styles.SmsGw}>
                    <h2>SMS Gateway Auth</h2>
                </div>
                <input
                    type="text"
                    placeholder="Username"
                    required
                    className={styles.input}/>
                <input
                    type="password"
                    placeholder="Password"
                    required
                    className={styles.input}/>

                <button
                    type="button"
                    className={styles.loginBtn}
                > Login
                </button>

                <div className={styles.errorMsg}></div>

            </div>

        </div>
    )
}

export default LoginScreen