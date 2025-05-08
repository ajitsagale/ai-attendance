import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import axios from 'axios';

const RegisterForm = () => {
  const [form, setForm] = useState({
    name: '',
    role: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const res = await axios.post('http://localhost:8000/api/register', {
        name: form.name,
        role: form.role,
        phone: form.phone,
        email: form.email,
        password: form.password
      });
      setResponse('Registered successfully');
      setError('');
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
      <Typography variant="h5">Employee Registration</Typography>
      <TextField fullWidth margin="normal" label="Name" name="name" onChange={handleChange} />
      <TextField fullWidth margin="normal" label="Role" name="role" onChange={handleChange} />
      <TextField fullWidth margin="normal" label="Phone Number" name="phone" onChange={handleChange} />
      <TextField fullWidth margin="normal" label="Email Address" name="email" onChange={handleChange} />
      <TextField fullWidth type="password" margin="normal" label="Password" name="password" onChange={handleChange} />
      <TextField fullWidth type="password" margin="normal" label="Confirm Password" name="confirmPassword" onChange={handleChange} />
      <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleSubmit}>Register</Button>
      {response && <Alert severity="success" sx={{ mt: 2 }}>{response}</Alert>}
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
    </Box>
  );
};

export default RegisterForm;