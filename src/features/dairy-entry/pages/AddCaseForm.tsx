import React from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  ThemeProvider,
  createTheme,
  SelectChangeEvent,
} from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#7b1fa2', // Vibrant purple
    },
    secondary: {
      main: '#00bfa5', // Teal
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    fontWeightMedium: 600,
  },
});

const AddCaseForm: React.FC = () => {
  const [status, setStatus] = React.useState('Pending');

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setStatus(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Box
          sx={{
            mt: 4,
            p: 4,
            backgroundColor: '#f9f9f9',
            boxShadow: 3,
            borderRadius: 2,
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h5" color="primary">
              Add Case
            </Typography>
            <Button variant="contained" color="primary">
              Save
            </Button>
          </Box>

          <Box component="form" display="flex" flexDirection="column" gap={2}>
            <TextField label="Case Number" variant="outlined" fullWidth />
            <TextField label="Client" variant="outlined" fullWidth />
            <TextField label="Type" variant="outlined" defaultValue="Election" fullWidth />
            <TextField
              label="Filing Date"
              type="date"
              defaultValue="2024-04-24"
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select value={status} onChange={handleStatusChange} label="Status">
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Closed">Closed</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default AddCaseForm;
