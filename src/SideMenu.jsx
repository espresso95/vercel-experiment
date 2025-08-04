import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const menuItems = [
  { text: 'Home', href: '/' },
  { text: 'Counter Experiment', href: '/counter.html' },
  { text: 'Color Experiment', href: '/color.html' },
];

function SideMenu() {
  return (
    <Box component="nav" sx={{ width: 200, flexShrink: 0 }}>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component="a" href={item.href}>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default SideMenu;
