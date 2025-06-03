import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import ExpenseForm from "./Pages/ExpenseForm";
import ExpenseDetails from "./Pages/ExpenseDetails";
import ExpenseTable from "./Pages/ExpenseTable";
import Navbar from "./Pages/Navbar";
import NotFound from "./Pages/NotFound";
import ChangePassword from "./Pages/ChangePassword";

function App() {
  const storedToken = sessionStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!storedToken;
  });

  const [updateList, setUpdateList] = useState(Date.now());
  const location = useLocation();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);

      if (
        location.pathname === "/" ||
        location.pathname === "/login" ||
        location.pathname === "/signup"
      ) {
        window.history.replaceState({}, "", "/home");
      }
    } else {
      setIsAuthenticated(false);
    }
  }, [location.pathname]);

  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <div className="App">
      {isAuthenticated && <Navbar setIsAuthenticated={setIsAuthenticated} />}

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />

        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-expense"
          element={
            <PrivateRoute>
              <ExpenseForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/expension-details"
          element={
            <PrivateRoute>
              <ExpenseDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/expense-table"
          element={
            <PrivateRoute>
              <ExpenseTable
                updateList={updateList}
                setUpdateList={setUpdateList}
              />
            </PrivateRoute>
          }
        />

          <Route
          path="/ChangePassword"
          element={
            <PrivateRoute>
              <ChangePassword
                updateList={updateList}
                setUpdateList={setUpdateList}
              />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
