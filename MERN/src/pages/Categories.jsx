// src/pages/Categories.jsx

import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Stack, TextField } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addCategory, deleteCategory, getCategories } from "../api/Category";

const Categories = () => {
  const [data, setData] = useState([]);
  const [inputData, setInputData] = useState({ name: "" });
  const [selectedRows, setSelectedRows] = useState([]);

  // Define your column structure
  const columns = [
    { field: "name", headerName: "Category Name", width: 300 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Button variant="contained" color="primary">
          Edit
        </Button>
      ),
    },
  ];

  // Call the getCategories API on component mount
  useEffect(() => {
    getCategories()
      .then((categories) => setData(categories))
      .catch((err) => console.error(err));
  }, []);

  const handleInputChange = (e) => {
    setInputData({ name: e.target.value });
  };

  const handleAddCategory = () => {
    const newCategory = { ...inputData };
    addCategory(newCategory)
      .then((addedCategory) => {
        if (addedCategory.name) {
          setData([...data, addedCategory]);

          setInputData({ name: "" });

          toast.success("Category added successfully!");
        } else {
          console.log("Invalid category received:", addedCategory);
        }
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data.message.includes("duplicate key error")
        ) {
          toast.error("Category name already exist.");
        } else {
          console.log("Error adding category:", error);
        }
      });
  };

  const handleDelete = async () => {
    console.log("Deleting items with IDs:", selectedRows);

    const deletePromises = selectedRows.map((id) => deleteCategory(id));

    try {
      await Promise.all(deletePromises);

      setData((prevData) =>
        prevData.filter((item) => !selectedRows.includes(item.id))
      );

      // Notify success
      toast.success("Data deleted successfully!");
    } catch (error) {
      console.error("Error deleting items:", error);
    }
  };

  return (
    <Box sx={{ ml: 10, width: 1000, height: 300 }}>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={data}
          columns={columns}
          getRowId={(row) => row._id}
          checkboxSelection
          onRowSelectionModelChange={(newSelection) => {
            console.log("Selection changed:", newSelection);
            setSelectedRows(newSelection);
          }}
        />
        <Stack
          spacing={{ sm: 2 }}
          direction="row"
          useFlexGap
          flexWrap="wrap"
          sx={{ mt: 1 }}
        >
          <TextField
            name="name"
            label="Category Name"
            variant="outlined"
            value={inputData.name}
            onChange={handleInputChange}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddCategory}
          >
            Add Category
          </Button>
          <Button variant="contained" color="secondary" onClick={handleDelete}>
            Delete
          </Button>
        </Stack>
      </div>
      <ToastContainer />
    </Box>
  );
};

export default Categories;
