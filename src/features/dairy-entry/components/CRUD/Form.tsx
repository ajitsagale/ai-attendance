import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Paper, TextField, Typography } from '@mui/material'
import React from 'react'
export type Column = {
  id: string;
  label: string;
  value: string;
  type: string;
  renderCell?: (rowData: any) => React.ReactNode;
  renderHeader?: () => React.ReactNode;
  rows?: RowData[];
};

export type RowData = {
  [key: string]: any;
};

type Props = {
    open: boolean;
    clickOpenClose: (state: boolean) => void;
    columns: Column[];
  type?: string;
  handleChange: (value: Column[]) => void;
    clickSave: () => void;
};
const Form = ({ open, clickOpenClose, columns, handleChange, clickSave }: Props) => {
console.log(columns,"columns")
    const updateColumnValue = (targetId: string,newValue: string): Column[] => {
        return columns.map((column) =>
            column.id === targetId ? { ...column, value: newValue } : column
          );
      };
  return (<>
    {/* <Dialog open={open} onClose={()=>{clickOpenClose(false)}} fullWidth maxWidth="md">
    <DialogContent> */}
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <Typography variant="h5" fontWeight="bold" onClick={()=>{clickOpenClose(false)}}>Add Case</Typography>
            {columns.map((column:any, i:number) => (<React.Fragment key={i}>
            {column.type=="select" ?
                <TextField
                        label={'Select ' + column.label}
                        select
                        fullWidth
                        type={column.type}
                        margin="normal"
                        value={column.value}
                        InputLabelProps={{shrink: column.value,}}
                        onChange={(e)=>{handleChange(updateColumnValue(column.id, e.target.value))}}>
                            {
                                column.rows.map((row:any,i:number)=>{
                                    return (<MenuItem key={i} value={row.id}>{row.value}</MenuItem>)
                                })
                            }
                </TextField>
                    :(<>
                    {column.type!=="action" &&
                    <TextField
                        label={column.label}
                        name={column.id}
                        InputLabelProps={{shrink: (column.type=="date"|| column.value),}}
                        fullWidth
                        type={column.type}
                        margin="normal"
                        value={column.value}
                        onChange={(e)=>{handleChange(updateColumnValue(column.id, e.target.value));
                            console.log(e.target.value,"value")

                        }}
                        />
                    
                      } </>)
                    }
                </React.Fragment>))}
        </Box>
    {/* </DialogContent>
    <DialogActions> */}
            <Button onClick={()=>{clickOpenClose(false)}}>Cancel</Button>
            <Button sx={{ backgroundColor: '#f57c00', '&:hover': { backgroundColor: '#e65100' } }} onClick={clickSave} variant="contained">
              Save
            </Button>
        {/* </DialogActions>
        </Dialog> */}
        </>)
}

export default Form