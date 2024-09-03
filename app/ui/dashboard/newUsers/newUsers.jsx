'use client'
import React, {useState, useEffect} from 'react';
import styles from './newUsers.module.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const NewSysUsers = () => {
   const [rows, setRows] = useState([]);

   useEffect(() => {
      // Fetch data from the API when the component mounts
      const fetchData = async () => {
         console.log('making api call')
         try {
            const response = await fetch('/api/admin-sms');
            const res = await response.json();

            // Log the data to check its structure
            console.log('API data:', res.data);

            // Ensure the data is an array
            if (Array.isArray(res.data)) {
               setRows(res.data);
            } else {
               console.error('Expected an array but got:', res);
            }
         } catch (error) {
            console.error('Error fetching data:', error);
         }
      };

      fetchData().then(r =>r.data);
   }, []);

   return (
      <div className={styles.container}>
         <h2 className={styles.title}>New Users</h2>
         <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
               <TableHead className={styles.tableHeader}>
                  <TableRow>
                     <TableCell>Username</TableCell>
                     <TableCell align="right">Date Created</TableCell>
                     <TableCell align="right">Role</TableCell>
                     <TableCell align="right">SMS Sent</TableCell>
                  </TableRow>
               </TableHead>

               <TableBody>
                  {rows.length > 0 ? (
                     rows.map((row) => (
                        <TableRow
                           key={row.username}
                           sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                           <TableCell component="th" scope="row">
                              {row.username}
                           </TableCell>
                           <TableCell align="right">{row.created_at}</TableCell>
                           <TableCell align="right">{row.role}</TableCell>
                           <TableCell align="right">{row.sms_sent}</TableCell>
                        </TableRow>
                     ))
                  ) : (
                     <TableRow>
                        <TableCell colSpan={4} align="center">
                           No data available
                        </TableCell>
                     </TableRow>
                  )}
               </TableBody>
            </Table>
         </TableContainer>
      </div>
   );
}

export default NewSysUsers;
