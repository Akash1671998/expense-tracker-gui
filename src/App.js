// App.js
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { useState } from 'react';

import RefrshHandler from './RefrshHandler';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Home from './Pages/Home';
import ExpenseForm from './Pages/ExpenseForm';
import ExpenseDetails from './Pages/ExpenseDetails';
import ExpenseTable from './Pages/ExpenseTable';
import Navbar from './Pages/Navbar';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [updateList,setUpdateList]=useState(Date.now())
  

  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <div className="App">
      <RefrshHandler setIsAuthenticated={setIsAuthenticated} />

      {isAuthenticated && <Navbar setIsAuthenticated={setIsAuthenticated} />}

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated}/>} />
        <Route path="/signup" element={<Signup />} />
        
        <Route path="/home" element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />

        <Route path="/add-expense" element={
          <PrivateRoute>
            <ExpenseForm />
          </PrivateRoute>
        } />

        <Route path="/expension-details" element={
          <PrivateRoute>
            <ExpenseDetails />
          </PrivateRoute>
        } />

        <Route path="/expense-table" element={
          <PrivateRoute>
            <ExpenseTable updateList={updateList} setUpdateList={setUpdateList} />
          </PrivateRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;
