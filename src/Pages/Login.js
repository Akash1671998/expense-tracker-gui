// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   Box,
//   Button,
//   Container,
//   TextField,
//   Typography,
//   Grid,
//   Paper,
// } from "@mui/material";
// import { ToastContainer } from "react-toastify";
// import { APIUrl, handleError, handleSuccess } from "../utils";
// import { application } from "../authentication/auth";

// function Login({setIsAuthenticated}) {
//   const [loginInfo, setLoginInfo] = useState({
//     email: "",
//     password: "",
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setLoginInfo((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const { email, password } = loginInfo;
//     if (!email || !password) {
//       return handleError("Email and password are required");
//     }

//     try {
//       const url = `${APIUrl}/auth/login`;
//       const response = await fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(loginInfo),
//       });

//       const result = await response.json();
//       const { success, message, error } = result;
//       const jwtToken = result.data?.token;
//       const name = result.data?.name;


//       if (success) {
//         setIsAuthenticated(true)
//         handleSuccess(message);
//         sessionStorage.setItem("token",jwtToken);
//         sessionStorage.setItem("loggedInUser",name);
//         setTimeout(() => {
//           navigate("/expense-table");
//         }, 1000);
//       } else if (error) {
//         const details = error?.details[0]?.message;
//         handleError(details);
//       } else {
//         handleError(message);
//       }
//     } catch (err) {
//       handleError(err.message || "Login failed");
//     }
//   };




//   return (
//     <Container maxWidth="xs">
//     <Paper elevation={1} sx={{ padding: 2, marginTop: 2 }}>
//       <Typography variant="h4" align="center" gutterBottom>
//         Login
//       </Typography>
//       <Box component="form" onSubmit={handleLogin} noValidate>
//         <TextField
//           fullWidth
//           size="small"
//           label="Email"
//           name="email"
//           type="email"
//           value={loginInfo.email}
//           onChange={handleChange}
//           margin="normal"
//           required
//           sx={{
//             '& .MuiInputBase-root': {
//               height: '40px',
//             },
//           }}
//         />
//         <TextField
//           fullWidth
//           size="small"
//           label="Password"
//           name="password"
//           type="password"
//           value={loginInfo.password}
//           onChange={handleChange}
//           margin="normal"
//           required
//           sx={{
//             '& .MuiInputBase-root': {
//               height: '40px',
//             },
//           }}
//         />
//         <Button
//           type="submit"
//           fullWidth
//           variant="contained"
//           color="primary"
//           sx={{ mt: 2, mb: 2 }}
//         >
//           Login
//         </Button>
//         <Grid container justifyContent="flex-end">
//           <Grid item>
//             <Typography variant="body2">
//               Don't have an account?{" "}
//               <Link
//                 to="/signup"
//                 style={{ textDecoration: "none", color: "#1976d2" }}
//               >
//                 Signup
//               </Link>
//             </Typography>
//           </Grid>
//         </Grid>
//       </Box>
//     </Paper>
//     <ToastContainer />
//   </Container>
  
//   );
// }

// export default Login;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import { ToastContainer } from "react-toastify";
import { APIUrl, handleError, handleSuccess } from "../utils";
import { application } from "../authentication/auth";
import loginIllustration from "../Images/Expense.svg";

function Login({ setIsAuthenticated }) {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError("Email and password are required");
    }

    try {
      const url = `${APIUrl}/auth/login`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });

      const result = await response.json();
      const { success, message, error } = result;
      const jwtToken = result.data?.token;
      const name = result.data?.name;

      if (success) {
        setIsAuthenticated(true);
        handleSuccess(message);
        sessionStorage.setItem("token", jwtToken);
        sessionStorage.setItem("loggedInUser", name);
        setTimeout(() => {
          navigate("/expense-table");
        }, 1000);
      } else if (error) {
        const details = error?.details[0]?.message;
        handleError(details);
      } else {
        handleError(message);
      }
    } catch (err) {
      handleError(err.message || "Login failed");
    }
  };

  return (
    <Grid container sx={{ minHeight: "100vh" }}>
      {/* Left Side - Image or Logo */}
      <Grid
        item
        xs={false}
        sm={6}
        sx={{
          backgroundColor: "#f5f5f5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          p: 4,
        }}
      >
        <img
          src={loginIllustration}
          alt="Finance illustration"
          style={{ maxWidth: "80%", height: "auto" }}
        />
        <Typography variant="h5" sx={{ mt: 2, color: "#555" }}>
          Manage Your Expenses Smartly
        </Typography>
      </Grid>

      {/* Right Side - Login Form */}
      <Grid
        item
        xs={12}
        sm={6}
        component={Paper}
        elevation={3}
        square
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{ width: "80%", maxWidth: 400 }}
          noValidate
        >
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>
          <TextField
            fullWidth
            size="small"
            label="Email"
            name="email"
            type="email"
            value={loginInfo.email}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            size="small"
            label="Password"
            name="password"
            type="password"
            value={loginInfo.password}
            onChange={handleChange}
            margin="normal"
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2, mb: 2 }}
          >
            Login
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Typography variant="body2">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  style={{ textDecoration: "none", color: "#1976d2" }}
                >
                  Signup
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Grid>

      <ToastContainer />
    </Grid>
  );
}

export default Login;
