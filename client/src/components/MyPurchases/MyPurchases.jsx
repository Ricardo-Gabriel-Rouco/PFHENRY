import React, { useEffect, useState } from 'react'
import {getOrdersByUser} from '../../firebase/firestore/orders'
import { Table, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
const MyPurchases = () => {

  const [purchases, setPurchases] = useState()
  
  useEffect(() => {
    const userId = 'd0ans9GotBeTdRwFhft2Hl615nb2'
    async function fetchPurchases(){
      const result = await getOrdersByUser(userId)
      setPurchases(result)
    }
    fetchPurchases()
    console.log(purchases)// eslint-disable-next-line
  }, [])
  

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
          </TableRow>
        </TableHead>
        {/* <TableBody>
          {purchases.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.items}</TableCell>
              {/* <TableCell>{row.age}</TableCell> 
            </TableRow>
          ))}
        </TableBody> */}
      </Table>
    </TableContainer>
  )
}

export default MyPurchases