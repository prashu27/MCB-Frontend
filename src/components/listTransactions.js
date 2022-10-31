import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { getTransactions } from '../data/transactions'
import { Box } from '@mui/material'

const columns = [
  {
    field: 'customerName',
    headerName: 'Customer Name',
    width: '300',
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'transferAmt',
    headerName: 'Transfer Amount',
    type: 'number',
    width: '200',
    headerAlign: 'center',
    align: 'center',
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'transferCurrency',
    headerName: 'Transfer Currency',
    width: '200',
    headerAlign: 'center',
    align: 'center',
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'reference',
    headerName: 'Reference',
    width: '450',
    headerAlign: 'center',
    align: 'center',
    headerClassName: 'super-app-theme--header',
  },
]

// const rows = getTransactions().map((transaction) => {
//   return {
//     ...transaction,
//     id: transaction.reference,
//     customerName: transaction.customer.customerName,
//   }
// })

export default function TransactionsList() {
  const [transactions, setTransactions] = React.useState([])

  React.useEffect(() => {
    const rows = getTransactions().map((transaction) => {
      return {
        ...transaction,
        id: transaction.reference,
        customerName: transaction.customer.customerName,
      }
    })
    setTransactions(rows)
  }, [])

  return (
    <Box
      sx={{
        height: '80vh',
        width: '100%',
        '& .super-app-theme--header': {
          backgroundColor: 'primary.main',
          fontWeight: 800,
        },
      }}
    >
      <DataGrid
        rows={transactions}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        sx={{
          boxShadow: 2,
          border: 2,
          borderColor: 'primary.light',
          '& .MuiDataGrid-cell:hover': {
            color: 'primary.main',
          },
        }}
      />
    </Box>
  )
}
