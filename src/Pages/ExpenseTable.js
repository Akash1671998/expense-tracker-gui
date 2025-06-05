import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import { application } from "../authentication/auth";
import CTLNotification from "./Notification";
import DeleteConfirmation from "./ConfirmationBox";

const ExpenseTable = ({ updateList, setUpdateList }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selectedRows, setSelectedRows] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    text: "",
  });
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
    pagename: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const fetchExpenses = () => {
    let url = "/expense/list?";
    if (filters.fromDate) url += `fromDate=${filters.fromDate}&`;
    if (filters.toDate) url += `toDate=${filters.toDate}&`;
    if (filters.text) url += `text=${filters.text}`;

    application.get(url).then((response) => {
      setExpenses(response.data.data || []);
    });
  };

  const deleteRow = (rowId) => {
    setConfirmDelete(true);
    setSelectedRows(rowId);
  };

  const onCancel = () => {
    setConfirmDelete(false);
    setSelectedRows(null);
  };

  const DeleteExpens = () => {
    if (!selectedRows) return;
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
          message: error.response?.data?.message || "Delete failed",
        });
      });
    setConfirmDelete(false);
    setSelectedRows(null);
  };

  useEffect(() => {
    fetchExpenses();
  }, [updateList]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Your Expenses
      </Typography>

      {/* Filter Section */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          alignItems: "center",
          mb: 4,
        }}
      >
        <TextField
          label="From Date"
          type="date"
          name="fromDate"
          value={filters.fromDate}
          onChange={handleInputChange}
          InputLabelProps={{ shrink: true }}
          sx={{ width: 200 }}
        />
        <TextField
          label="To Date"
          type="date"
          name="toDate"
          value={filters.toDate}
          onChange={handleInputChange}
          InputLabelProps={{ shrink: true }}
          sx={{ width: 200 }}
        />
        <TextField
          label="Search"
          name="text"
          value={filters.text}
          onChange={handleInputChange}
          placeholder="Search by description"
          sx={{ flex: 1, minWidth: 200 }}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<SearchIcon />}
          onClick={fetchExpenses}
        >
          Search
        </Button>
      </Box>

      {/* Expense Cards */}
      <Grid container spacing={2}>
        {expenses.map((expense) => {
          const date = new Date(expense.createAt || expense.createdAt);
          const formattedDate = isNaN(date.getTime())
            ? "Invalid Date"
            : date.toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              });

          return (
            <Grid item xs={12} sm={6} md={4} key={expense._id}>
              <Card
                elevation={4}
                sx={{
                  borderLeft: `6px solid ${
                    expense.amount > 0 ? "#2ecc71" : "#e74c3c"
                  }`,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "150px",
                  padding: 2,
                  position: "relative",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "scale(1.02)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                  },
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {expense.text}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {formattedDate}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 1,
                    position: "absolute",
                    bottom: 8,
                    right: 8,
                  }}
                >
                  <IconButton
                    color="primary"
                    aria-label="view all"
                    size="small"
                    onClick={() => alert("View All clicked!")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20"
                      viewBox="0 0 24 24"
                      width="20"
                      fill="#1976d2"
                    >
                      <path d="M0 0h24v24H0z" fill="none" />
                      <path d="M12 6a9.77 9.77 0 0 0-9 5.5A9.77 9.77 0 0 0 12 17a9.77 9.77 0 0 0 9-5.5A9.77 9.77 0 0 0 12 6zm0 9a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z" />
                      <circle cx="12" cy="12" r="2" />
                    </svg>
                  </IconButton>

                  <IconButton
                    onClick={() => deleteRow(expense._id)}
                    color="error"
                    aria-label="delete"
                    size="small"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          );
        })}
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
