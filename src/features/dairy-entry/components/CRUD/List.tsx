import ConfirmationDialog from './ConfirmationDialog';
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { Search, Delete, Edit } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import Form, { Column } from './Form';
import DataTable from './DataTable';

type Props = {
  initialData: any[]; // Array of objects representing the initial data
  columnsConfig: Column[]; // Array of column definitions
  uniqueKey: string; // The unique key for each row (e.g., "id")
};

const List: React.FC<Props> = ({ initialData, columnsConfig, uniqueKey }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(initialData); // State for the data
  const [columns, setColumns] = useState<Column[]>(columnsConfig); // State for the columns
  const [SelectedRowId, setSelectedRowId] = useState('0'); // State for the columns
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // State for delete confirmation dialog
  const [rowToDelete, setRowToDelete] = useState<any>(null); // State to store the row to be deleted

  // Filter rows dynamically based on search query
  const filteredData = data.filter((row) =>
    Object.values(row).some(
      (value) =>
        typeof value === 'string' &&
        value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleEditClick = (rowData: any) => {
    setSelectedRowId(rowData.id)
    const transformedColumns = columns.map((column) => {
      if (rowData.hasOwnProperty(column.id)) {
        return {
          ...column,
          value:
            column.type === 'date'
              ? format(new Date(rowData[column.id]), 'yyyy-MM-dd') // Format date
              : rowData[column.id],
        };
      }
      return column;
    });
    setColumns(transformedColumns);
    setOpen(true); // Open the dialog for editing
  };

  // const handleDeleteClick = (rowData: any) => {
  //   setData((prevData) =>
  //     prevData.filter((item) => item[uniqueKey] !== rowData[uniqueKey])
  //   );
  //   toast.success('Item deleted successfully!');
  // };
  const handleDeleteClick = (rowData: any) => {
    setRowToDelete(rowData); // Store the row to be deleted
    setDeleteDialogOpen(true); // Open the confirmation dialog
  };

  const confirmDelete = () => {
    setData((prevData) =>
      prevData.filter((item) => item[uniqueKey] !== rowToDelete[uniqueKey])
    );
    toast.success('Item deleted successfully!');
    setDeleteDialogOpen(false); // Close the confirmation dialog
    setRowToDelete(null); // Clear the row to delete
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false); // Close the confirmation dialog
    setRowToDelete(null); // Clear the row to delete
  };
  const clickSave = () => {
    // Extract data from columns
    const newRow = columns.reduce((acc, column) => {
      acc[column.id] = column.value;
      return acc;
    }, {} as any);
  
    setData((prevData) => {
      const existingRowIndex = prevData.findIndex(
        (item) => item[uniqueKey] === SelectedRowId
      );
  
      if (existingRowIndex !== -1) {
        // Update the existing row
        const updatedData = [...prevData];
        updatedData[existingRowIndex] = { ...prevData[existingRowIndex], ...newRow };
        return updatedData;
      } else {
        // Add a new row
        return [...prevData, { [uniqueKey]: (prevData.length + 1).toString(), ...newRow }];
      }
    });
  
    // Reset column values
    setColumns((prevColumns) =>
      prevColumns.map((col) => ({ ...col, value: '' }))
    );
    
    // Show a success toast message
    toast.success(
      newRow[uniqueKey]
        ? 'Item updated successfully!'
        : 'Item added successfully!'
    );
  
    // Close the dialog
    setOpen(false);
  };

  useEffect(() => {
    if(open==false){
        setSelectedRowId('0');
    }
  }, [open]);

  const clickOpenClose = (state: boolean) => {
    setOpen(state);
    setColumns((prevColumns) =>
      prevColumns.map((col) => ({ ...col, value: '' }))
    );
  };

  return (
    <div>
      <ConfirmationDialog
        open={deleteDialogOpen}
        title="Delete Confirmation"
        message="Are you sure you want to delete this item? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
      {open && (
        <>
          <Dialog open={open} fullWidth maxWidth="md"
            onClose={() => {clickOpenClose(false);}}
          >
            <DialogContent>
              <Form columns={columns} handleChange={setColumns}
                clickSave={clickSave} open={open}
                clickOpenClose={clickOpenClose}
              />
            </DialogContent>
          </Dialog>
        </>
      )}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <TextField placeholder="Search" variant="outlined" size="small"
          fullWidth sx={{ maxWidth: 400, mb: 2 }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton edge="start">
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button variant="contained" 
        sx={{ backgroundColor: '#f57c00', '&:hover': { backgroundColor: '#e65100' } }} 
        onClick={handleOpenDialog}>
          Add Item
        </Button>
      </Box>

      <DataTable
        columns={[
          ...columns,
          {
            id: 'Edit',
            label: 'Edit',
            type: 'action',
            renderCell: (rowData: any) => (
              <IconButton onClick={() => handleEditClick(rowData)}>
                <Edit />
              </IconButton>
            ),
          },
          {
            id: 'Delete',
            label: 'Delete',
            type: 'action',
            renderCell: (rowData: any) => (
              <IconButton onClick={() => handleDeleteClick(rowData)}>
                <Delete />
              </IconButton>
            ),
          },
        ]}
        data={filteredData}
      />
    </div>
  );
};

export default List;