import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MenuIcon from '@mui/icons-material/Menu';

import logo from '../../../assets/logo.png'; // Import the logo
import MainLayout from '../../../layout/MainLayout'; // Import MainLayout

const farmerNames = ['Ram Singh', 'Sita Devi', 'Mohan Lal'];
const paymentStatusOptions = ['Pending', 'Paid'];

const DairyEntryForm: React.FC = () => {
  const [formData, setFormData] = useState({
    date: '',
    farmerName: '',
    quantity: '',
    fat: '',
    snf: '',
    rate: '',
    totalAmount: '',
    paymentStatus: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log(formData);
    // API call or local save here
  };

  return (
    <MainLayout>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={4} sx={{ borderRadius: 3, overflow: 'hidden' }}>
          
          {/* Form Content */}
          <Box sx={{ p: 3 }}>
            <Grid container spacing={2}>
            <Grid size={{ xs: 12,md: 6 }}>
                <Typography variant="subtitle1" color="orange">
                  Date
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <CalendarTodayIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12,md: 6 }}>
                <Typography variant="subtitle1" color="orange">
                  Farmer Name
                </Typography>
                <TextField
                  fullWidth
                  select
                  variant="outlined"
                  size="small"
                  name="farmerName"
                  value={formData.farmerName}
                  onChange={handleChange}
                >
                  {farmerNames.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle1" color="orange">
                  Quantity (Liters)
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                />
              </Grid>

              <Grid size={{ xs: 12,md: 6 }}>
                <Typography variant="subtitle1" color="orange">
                  Fat %
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  name="fat"
                  value={formData.fat}
                  onChange={handleChange}
                />
              </Grid>

              <Grid size={{ xs: 12,md: 6 }}>
                <Typography variant="subtitle1" color="orange">
                  SNF %
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  name="snf"
                  value={formData.snf}
                  onChange={handleChange}
                />
              </Grid>

              <Grid size={{ xs: 12,md: 6 }}>
                <Typography variant="subtitle1" color="orange">
                  Rate per Liter
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  name="rate"
                  value={formData.rate}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12,md: 6 }}>
                <Typography variant="subtitle1" color="orange">
                  Total Amount
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  name="totalAmount"
                  value={formData.totalAmount}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle1" color="orange">
                  Payment Status
                </Typography>
                <TextField
                  fullWidth
                  select
                  variant="outlined"
                  size="small"
                  name="paymentStatus"
                  value={formData.paymentStatus}
                  onChange={handleChange}
                >
                  {paymentStatusOptions.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ bgcolor: '#f57c00', mt: 2 }}
                  onClick={handleSave}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Box>

          {/* Footer */}
          {/* <Box sx={{ bgcolor: '#f57c00', p: 2, textAlign: 'center', color: 'white' }}>
            © 2025 PaneerWala
          </Box> */}
        </Paper>
      </Container>
    </MainLayout>
  );
};

export default DairyEntryForm;