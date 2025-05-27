import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import Dashboard from './components/Dashboard';
import CompanyForm from './components/CompanyForm';

const AppRoutes = () => (
  <Routes>
    <Route path="/admin" element={<AdminDashboard />} />
    <Route path="/admin/add-company" element={<CompanyForm />} />
    <Route path="/admin/edit-company/:id" element={<CompanyForm />} />
    <Route path="/user" element={<Dashboard />} />
  </Routes>
);

export default AppRoutes;
