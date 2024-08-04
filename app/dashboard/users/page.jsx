import React from 'react';
import styles from "@/app/ui/dashboard/users/users.module.css"
import Users from "@/app/ui/dashboard/users/users"

const UsersPage = () => {
    return (
        <div className={styles.container}>
            <Users/>
        </div>
    );
};


export default UsersPage;