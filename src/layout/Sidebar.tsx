import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <List>
      <ListItem component={Link} to="/">
        <ListItemText primary="Dairy Entry Form" />
      </ListItem>
      <ListItem component={Link} to="/milk-collection">
        <ListItemText primary="Milk Collection" />
      </ListItem>
    </List>
  );
};

export default Sidebar;