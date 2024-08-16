"use client"
import { DataGrid } from '@mui/x-data-grid';
import styles from "../users/users.module.css"
import SearchComponent from '@/app/dashboard/search/search';
import { MdOutlineCloudDownload, MdAddCircleOutline } from 'react-icons/md'

import { useState } from 'react';


const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 90,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const users = () => {
    const [showCreateUser, setShowCreateUser] = useState(false)
    const [username, setUsername] = useState('');
    const [division, setDivision] = useState('');
    const [tribe, setTribe] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>Users</h2>
                <div className={styles.details}>
                    <SearchComponent placeholder="Search for a user..." className={styles.search} />
                    <div className={styles.download}>
                        <MdOutlineCloudDownload size={24} />
                        <span className={styles.info}>Download csv</span>
                    </div>
                    <button onClick={() => setShowCreateUser(true)} className={styles.addUser}>
                        <MdAddCircleOutline size={24} />
                        Add User
                    </button>

                </div>
            </div>
            {showCreateUser ? (
                    <form onSubmit={handleSubmit}>
                    <div className={styles.fomControl}>
                      <div className={styles.createUser}>
                        {/* Step 3: Bind inputs to state */}
                        <input
                          type="text"
                          placeholder="Username"
                          className={styles.input}
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                          type="text"
                          placeholder="division"
                          className={styles.input}
                          value={division}
                          onChange={(e) => setDivision(e.target.value)}
                        />
                        <input
                          type="text"
                          placeholder="tribe"
                          className={styles.input}
                          value={tribe}
                          onChange={(e) => setTribe(e.target.value)}
                        />
                        <input
                          type="password"
                          placeholder="password"
                          className={styles.input}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <div className={styles.createControl}>
                        <button type="submit" className={styles.create}>Create</button>
                        <button
                          type="button"
                          onClick={() => setShowCreateUser(false)}
                          className={styles.close}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </form>
            ) : (
                <></>
            )}

            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
        </div>
    );
};


export default users;