'use client'
import React, {useEffect, useState} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {MdAddCircleOutline, MdOutlineCloudDownload} from 'react-icons/md';
import styles from '../users/users.module.css';
import SearchComponent from '@/app/dashboard/search/search';

const columns = [
   {id: 'id', label: 'ID', minWidth: 70},
   {id: 'username', label: 'User name', minWidth: 230},
   {id: 'created_at', label: 'Created at', minWidth: 230},
   {id: 'role', label: 'Role', minWidth: 200},
   {id: 'status', label: 'Status', minWidth: 90},
];

const formatRole = (role) => {
   if (!role) return '';

   return role
      .replace(/_/g, ' ')
      .toLowerCase()
      .replace(/(?:^|\s)\S/g, a => a.toUpperCase());
};

const users = () => {
   const [rows, setRows] = useState([]);
   const [page, setPage] = useState(0);
   const [rowsPerPage, setRowsPerPage] = useState(10);
   const [rowCount, setRowCount] = useState(0);
   const [loading, setLoading] = useState(false);
   const [showCreateUser, setShowCreateUser] = useState(false);
   const [username, setUsername] = useState('');
   const [division, setDivision] = useState('');
   const [tribe, setTribe] = useState('');
   const [password, setPassword] = useState('');

   useEffect(() => {
      const fetchUsers = async () => {
         setLoading(true);
         try {
            const response = await fetch(`/api/users?page=${page + 1}&pageSize=${rowsPerPage}`);
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
   }, [page, rowsPerPage]);

   const handleChangePage = (event, newPage) => {
      setPage(newPage);
   };

   const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const response = await fetch('/api/users', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, division, tribe, password}),
         });
         if (!response.ok) {
            throw new Error('Failed to create user');
         }
         setUsername('');
         setDivision('');
         setTribe('');
         setPassword('');
         setShowCreateUser(false);
         fetchUsers();
      } catch (error) {
         console.error('Error:', error);
      }
   };

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
            <form onSubmit={handleSubmit} className={styles.form}>
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

         <Paper sx={{width: '100%', overflow: 'hidden'}}>
            <TableContainer sx={{maxHeight: 440}}>
               <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                     <TableRow>
                        {columns.map((column) => (
                           <TableCell
                              key={column.id}
                              style={{minWidth: column.minWidth}}
                           >
                              {column.label}
                           </TableCell>
                        ))}
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {rows.map((row) => (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                           {columns.map((column) => {
                              const value = column.id === 'role' ? formatRole(row[column.id]) : row[column.id];
                              return (
                                 <TableCell key={column.id}>
                                    {value}
                                 </TableCell>
                              );
                           })}
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
            </TableContainer>
            <TablePagination
               rowsPerPageOptions={[5, 10, 25, 100]}
               component="div"
               count={rowCount}
               rowsPerPage={rowsPerPage}
               page={page}
               onPageChange={handleChangePage}
               onRowsPerPageChange={handleChangeRowsPerPage}
            />
         </Paper>
      </div>
   );
};

export default users;