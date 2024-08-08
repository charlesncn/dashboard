import React from 'react';
import {  MdSearch } from 'react-icons/md'
import styles from "../search/search.module.css"

const SearchComponent = ({ placeholder }) => {
    return (
        
        <div className={styles.search}>
            <MdSearch />
            <input type='text' placeholder={placeholder} className={styles.input} />
        </div>
    );
};


export default SearchComponent;