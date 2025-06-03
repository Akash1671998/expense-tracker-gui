// src/components/Navbar.js
import React from 'react';
import { AppBar, Toolbar, Tabs, Tab, IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate, useLocation } from 'react-router-dom';

function Navbar({setIsAuthenticated}) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  // Map paths to tab index
  const pathToTab = {
    '/add-expense': 0,
    '/expension-details': 1,
    '/expense-table': 2,
    '/ChangePassword': 3,
  };

  const tabToPath = [
    '/add-expense',
    '/expension-details',
    '/expense-table',
    '/ChangePassword',
  ];

  const currentTab = pathToTab[location.pathname] ?? false;

  const handleTabChange = (event, newValue) => {
    navigate(tabToPath[newValue]);
  };

  return (
    <AppBar>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          textColor="inherit"
          indicatorColor="secondary"
        >
          <Tab label="Add Expense" />
          <Tab label="Expension Details" />
          <Tab label="Expense Table" />
          <Tab label="Change-Password" />
        </Tabs>

        <IconButton color="inherit" onClick={handleLogout}>
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
