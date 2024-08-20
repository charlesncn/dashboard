"use client"
import {DataGrid} from '@mui/x-data-grid';
import styles from "../users/users.module.css"
import SearchComponent from '@/app/dashboard/search/search';
import {MdOutlineCloudDownload, MdAddCircleOutline} from 'react-icons/md'

import {useState, useEffect} from 'react';


const columns = [
   {field: 'id', headerName: 'ID', width: 70},
   {field: 'username', headerName: 'User name', width: 230},
   {field: 'created_at', headerName: 'Created at', width: 230},
   {field: 'role', headerName: 'Role', width: 200},
   {field: 'status', headerName: 'Status', width: 90},
];

const users = () => {
   const [showCreateUser, setShowCreateUser] = useState(false)
   const [rows, setRows] = useState([]);
   const [pageSize, setPageSize] = useState(5);
   const [page, setPage] = useState(0);
   const [rowCount, setRowCount] = useState(0);
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      const fetchUsers = async () => {
         setLoading(true);
         try {
            const response = await fetch(`/api/users?page=${page + 1}&pageSize=${pageSize}`);
            if (!response.ok) {
               throw new Error('Failed to fetch users');
            }
            const data = await response.json();
            setRows(data.users);
            setRowCount(data.totalUsers);
         } catch (error) {
            console.error('Error:', error);
         } finally {
            setLoading(false);
         }
      };

      fetchUsers();
   }, [page, pageSize]);


   const handlePageChange = (newPage) => {
      setPage(newPage);
   };

   const handlePageSizeChange = (newPageSize) => {
      setPageSize(newPageSize);
      // Reset to the first page when page size changes
      setPage(0);
   };


   const [username, setUsername] = useState('');
   const [division, setDivision] = useState('');
   const [tribe, setTribe] = useState('');
   const [password, setPassword] = useState('');
   return (
      <div className={styles.container}>
         <div className={styles.header}>
            <h2 className={styles.title}>Users</h2>
            <div className={styles.details}>
               <SearchComponent placeholder="Search for a user..." className={styles.search}/>
               <div className={styles.download}>
                  <MdOutlineCloudDownload size={24}/>
                  <span className={styles.info}>Download csv</span>
               </div>
               <button onClick={() => setShowCreateUser(true)} className={styles.addUser}>
                  <MdAddCircleOutline size={24}/>
                  Add User
               </button>
            </div>
         </div>

         {showCreateUser && (
            <form onSubmit={handleSubmit}>
               <div className={styles.fomControl}>
                  <div className={styles.createUser}>
                     <input
                        type="text"
                        placeholder="Username"
                        className={styles.input}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                     />
                     <input
                        type="text"
                        placeholder="Division"
                        className={styles.input}
                        value={division}
                        onChange={(e) => setDivision(e.target.value)}
                     />
                     <input
                        type="text"
                        placeholder="Tribe"
                        className={styles.input}
                        value={tribe}
                        onChange={(e) => setTribe(e.target.value)}
                     />
                     <input
                        type="password"
                        placeholder="Password"
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
         )}

         <DataGrid
            rows={rows}
            columns={columns}
            pageSize={pageSize}
            rowCount={rowCount}
            pagination
            paginationMode="server"
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            loading={loading}
            initialState={{
               pagination: {
                  paginationModel: {page: 0, pageSize: 5},
               },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
         />
      </div>
   );
};


export default users;