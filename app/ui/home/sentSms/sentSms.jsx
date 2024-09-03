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
import styles from '../sentSms/sentSms.module.css';

const columns = [
   {id: 'id', label: 'ID', minWidth: 70},
   {id: 'message', label: 'Message', minWidth: 230},
   {id: 'sms_status', label: 'SMS Status', minWidth: 230},
   {id: 'submitted_date', label: 'Date Submitted', minWidth: 200},
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

   useEffect(() => {
      const fetchUsers = async () => {
         setLoading(true);
         try {
            const response = await fetch(`/api/mro?page=${page + 1}&pageSize=${rowsPerPage}`);
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

   return (
      <div className={styles.container}>
         <div className={styles.header}>
            <h2 className={styles.title}>Sent SMS</h2>

         </div>

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
                              const value = row[column.id];
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