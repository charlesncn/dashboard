import React from 'react';
import styles from "../ui/dashboard/dashboard.module.css"
import LoginScreen from '../ui/login/loginScreen'

const Layout = ({children}) => {
    return (
        <div>
                <LoginScreen/>
                {children}
        </div>
    );
};


export default Layout;