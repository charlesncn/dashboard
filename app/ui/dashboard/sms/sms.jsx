import * as React from 'react';
import styles from './sms.module.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
    name,
    tribe,
    date,
    privilege,
    smsSent,
) {
    return { name, tribe,date, privilege, smsSent };
}

const rows = [
    createData('IDE SRE', 'Digital Engineering', '04/06/2024', 'System user', 84746),
    createData('BSS SRE', 'BSS', '04/06/2024', 'System user', 9),
    createData('Stability Squad', 'BSS', '04/06/2024', 'System user', 8735),
    createData('Buddy bot', 'BSS', '04/06/2024', 'System user', 6000),
    createData('Commission bot', "BSS", '04/06/2024', 'System user', 567),
];

const card = () => (
    <div className={styles.container}>
        <h2 className={styles.title}>New Users</h2>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead className={styles.tableHeader}>
                    <TableRow>
                        <TableCell>Dessert (100g serving)</TableCell>
                        <TableCell align="right">tribe&nbsp;(g)</TableCell>
                        <TableCell align="right">date created</TableCell>
                        <TableCell align="right">privilege&nbsp;(g)</TableCell>
                        <TableCell align="right">smsSent&nbsp;(g)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.date}</TableCell>
                            <TableCell align="right">{row.tribe}</TableCell>
                            <TableCell align="right">{row.privilege}</TableCell>
                            <TableCell align="right">{row.smsSent}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
)
export default card;