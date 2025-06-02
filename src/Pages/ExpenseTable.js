import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { application } from "../authentication/auth";
import CTLNotification from "./Notification";
import DeleteConfirmation from "./ConfirmationBox";

const ExpenseTable = ({ updateList, setUpdateList }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
    pagename: "",
  });

  const deleteRow = (row) => {
    setConfirmDelete(true);
    setSelectedRows(row);
  };
  const onCancel = () => {
    setConfirmDelete(false);
  };

  function fetchExpenses() {
    application.get("/expense/list").then((response) => {
      console.log("/expense/list/expense/list", response);
      setExpenses(response.data.data);
    });
  }

  useEffect(() => {
    fetchExpenses();
  }, []);

  function DeleteExpens() {
    application
      .delete(`/expense/delete/${selectedRows}`)
      .then((response) => {
        setNotify({
          isOpen: true,
          type: "success",
          pagename: "Expense Data",
          message: response.data.message,
        });
        setTimeout(() => {
          setUpdateList(Date.now());
        }, 1000);
      })
      .catch((error) => {
        setNotify({
          isOpen: true,
          type: "error",
          pagename: "Expense Data",
          message: error.response.data.message,
        });
      });
    setConfirmDelete(false);
  }
  return (
    <Box sx={{ p: 9 }}>
      <Typography variant="h5" gutterBottom>
        Your Expenses
      </Typography>

      <Grid container spacing={2}>
        {expenses.map((expense) => (
          <Grid item xs={12} sm={6} md={4} key={expense._id}>
            <Card
              elevation={4}
              sx={{
                borderLeft: `6px solid ${
                  expense.amount > 0 ? "#2ecc71" : "#e74c3c"
                }`,
                transition: "0.3s",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                },
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {expense.text}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ color: expense.amount > 0 ? "#2ecc71" : "#e74c3c" }}
                    >
                      ₹{expense.amount}
                    </Typography>
                  </Box>
                  <IconButton
                    onClick={() => deleteRow(expense._id)}
                    color="error"
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <DeleteConfirmation
        entityName="Expense Data"
        confirmDelete={confirmDelete}
        onAgree={DeleteExpens}
        onCancel={onCancel}
      />
      <CTLNotification notify={notify} setNotify={setNotify} />
    </Box>
  );
};

export default ExpenseTable;
