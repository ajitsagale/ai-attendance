import { CircularProgress,
  Paper, Table, TableBody, TableCell, TableCellProps, TableContainer, TableHead, TablePagination, TableRow, styled } from '@mui/material';
import React, { useState } from 'react';

// Define a styled TableCell for the header
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: '#f57c00', // Use the primary color of the theme
  color: theme.palette.primary.contrastText, // Use a contrasting text color
  fontWeight: 'bold', // Make the font bold
  // textAlign: 'center', // Center-align the text
}));
export type Column = {
  id: string;
  label: string;
  type?: string;
  renderCell?: (rowData: any) => React.ReactNode;
  renderHeader?: () => React.ReactNode;
  cellProps?: TableCellProps;
  headerCellProps?: TableCellProps;
};

export type RowData = {
  [key: string]: any;
};

type Props = {
  columns: Column[];
  type?:string;
  data: RowData[];
  isLoading?: boolean;
  isPagination?: boolean;
};


// export const StyledTableRow = styled(TableRow)(
//   ({ theme }) => `
//   background-color: ${theme.palette.primary.main};
//  `
// );

// export const StyledTableCell = styled(TableCell)(
//   ({ theme }) => `
//   color: white;
//   font-weight: bold;
//  `
// );


const DataTable: React.FC<Props> = ({ columns, data, isLoading = false, isPagination = true }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 5));
    setPage(0);
  };

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
            {columns.map((column,rowIndex) => (
              <StyledTableCell key={rowIndex}>
              <strong>{column.renderHeader ? column.renderHeader() : column.label}</strong>
            </StyledTableCell>
            ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center" sx={{ paddingTop: '2.5px', paddingBottom: '2.5px' }}>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center" sx={{ paddingTop: '2.5px', paddingBottom: '2.5px' }}>
                  No data available
                </TableCell>
              </TableRow>
            ) : (
              isPagination ? (
                data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {columns.map((column, columnIndex) => (
                      <TableCell {...column.cellProps} key={column.id} 
                      // sx={{ paddingTop: '2.5px', paddingBottom: '2.5px' }}
                      >{column.renderCell ? column.renderCell(row) : null}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                data.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {columns.map((column) => (
                      <TableCell {...column.cellProps} key={column.id} 
                      >{column.renderCell ? column.renderCell(row) : null}</TableCell>
                    ))}
                  </TableRow>
                ))
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {(isPagination && data.length>rowsPerPage) && (
        <TablePagination
        rowsPerPageOptions={[5, 20, 25, 50, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
};

export default DataTable;
