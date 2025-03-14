import React from 'react';
import styles from "./sidebar.module.css"
import MenuLink from './menuLink/menuLink';
import {
    MdHome,
    MdLogout,
    MdAnalytics,
    MdHelpCenter,
    MdOutlineSettings
} from 'react-icons/md'
import Image from 'next/image';

const menuItems = [
    {
        title: "Pages",
        list: [
            {
                title: "Home",
                path: "/home",
                icon: <MdHome />,
            }
        ]
    },
    {
        title: "Analytics",
        list: [
            {
                title: "Reports",
                path: "/home/reports",
                icon: <MdAnalytics />,
            }
        ]
    },
    {
        title: "Action Center",
        list: [
            {
                title: "Settings",
                path: "/home/settings",
                icon: <MdOutlineSettings />,
            },
            {
                title: "Help",
                path: "/home/help",
                icon: <MdHelpCenter />,
            }
        ]
    }
]

const HomeSidebar = () => {
    return (
       <div className={styles.container}>
           <div className={styles.content}>
               <Image src='/logo.png' alt='' height='26' width='111' className={styles.logo}/>

               <div className={styles.divider}></div>
               <ul className={styles.list}>
                   {menuItems.map((category) => (
                      <li key={category.title}>
                          <span className={styles.category}>{category.title}</span>
                          {category.list.map((item) => (
                             <MenuLink item={item} key={item.title}/>
                          ))}
                      </li>
                   ))}
               </ul>
           </div>
           <div className={styles.logoutContent}>
               <div className={styles.divider}></div>

               <button className={styles.logout}>
                   <MdLogout/>
                   Logout
               </button>
           </div>
       </div>
    );
};


export default HomeSidebar;