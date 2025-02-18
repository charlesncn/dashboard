import React from 'react';
import styles from "./sidebar.module.css"
import MenuLink from './menuLink/menuLink';
import {
    MdDashboard,
    MdSupervisedUserCircle,
    MdLogout,
    MdAnalytics,
    MdPeople,
    MdHelpCenter,
    MdOutlineSettings
} from 'react-icons/md'
import Image from 'next/image';

const menuItems = [
    {
        title: "Pages",
        list: [
            {
                title: "Dashboard",
                path: "/dashboard",
                icon: <MdDashboard />,
            },
            {
                title: "Users",
                path: "/dashboard/users",
                icon: <MdSupervisedUserCircle />,
            }
        ]
    },
    {
        title: "Analytics",
        list: [
            {
                title: "Reports",
                path: "/dashboard/reports",
                icon: <MdAnalytics />,
            },
            {
                title: "Teams",
                path: "/dashboard/teams",
                icon: <MdPeople />,
            }
        ]
    },
    {
        title: "Action Center",
        list: [
            {
                title: "Settings",
                path: "/dashbaord/settings",
                icon: <MdOutlineSettings />,
            },
            {
                title: "Help",
                path: "/dashbaord/help",
                icon: <MdHelpCenter />,
            }
        ]
    }
]

const Sidebar = () => {
    return (
        <div className={styles.container}>
            <div className={styles.user}>
                <Image className={styles.userImage} src="/noavatar.png" alt="" width="50" height="50"/>
                <div className={styles.userDetails}>
                    <span className={styles.userName}></span>
                    <span className={styles.userTitle}></span>
                </div>
            </div>
            <div className={styles.divider}></div>
            <ul className={styles.list}>
                {menuItems.map((category) => (
                    <li key={category.title}>
                        <span className={styles.category}>{category.title}</span>
                        {category.list.map((item) => (
                            <MenuLink item= {item} key={item.title}/>
                        ))}
                    </li>
                ))}
            </ul>
            <div className={styles.divider}></div>

            <button className={styles.logout}>
                <MdLogout/>
                 Logout</button>
        </div>
    );
};


export default Sidebar;