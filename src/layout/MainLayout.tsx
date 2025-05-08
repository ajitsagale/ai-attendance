import React, { useState } from 'react';
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // Import the logo

interface MainLayoutProps {
  children: React.ReactNode;
}

const drawerWidth = 240; // Sidebar width

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Drawer
        anchor="left"
        open={isSidebarOpen}
        onClose={closeSidebar}
        sx={{
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Box sx={{ width: drawerWidth, p: 2 }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            PaneerWala
          </Typography>
          <List>
            <ListItem component={Link} to="/" onClick={closeSidebar}>
              <ListItemText primary="Dairy Entry Form" />
            </ListItem>
            <ListItem component={Link} to="/milk-collection" onClick={closeSidebar}>
              <ListItemText primary="Milk Collection" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <AppBar position="static" sx={{ bgcolor: '#f57c00' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={toggleSidebar}>
              <MenuIcon />
            </IconButton>

            <Box
              sx={{
                bgcolor: 'white', // White background
                borderRadius: '50%', // Makes the background circular
                width: 100, // Width of the container
                height: 60, // Height of the container
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden', // Ensures the image fits within the circle
              }}
            >
              <img src={logo} alt="PaneerWala" style={{ height: '80%', width: 'auto' }} />
            </Box>
          </Toolbar>
        </AppBar>

        <Container sx={{ flexGrow: 1, py: 4 }}>{children}</Container>

        {/* Footer */}
        <Box sx={{ bgcolor: '#f57c00', p: 2, textAlign: 'center', color: 'white' }}>
          © 2025 PaneerWala
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;