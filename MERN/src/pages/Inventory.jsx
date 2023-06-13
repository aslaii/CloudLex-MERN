import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Stack, TextField } from "@mui/material";
import {
  addInventoryItem,
  deleteInventoryItem,
  getInventory,
} from "../api/Inventory";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Inventory = () => {
  const [data, setData] = useState([]);
  const [inputData, setInputData] = useState({
    id: "",
    name: "",
    quantity: "",
    price: "",
  });
  const [selectedRows, setSelectedRows] = useState([]);
  const [isError, setIsError] = useState(false);
  const columns = [
    { field: "itemId", headerName: "Item ID", width: 70 },
    { field: "name", headerName: "Name", width: 300 },
    { field: "quantity", headerName: "Quantity", width: 130 },
    { field: "price", headerName: "Price", width: 130 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: () => (
        <Button variant="contained" color="primary">
          Edit
        </Button>
      ),
    },
  ];
  const handleInputChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
    if (e.target.name === "quantity" || e.target.name === "price") {
      if (isNaN(e.target.value)) {
        setIsError(true);
      } else {
        setIsError(false);
      }
    }
  };

  const handleAddData = () => {
    const newItem = {
      name: inputData.name,
      quantity: Number(inputData.quantity),
      price: Number(inputData.price),
    };
    addInventoryItem(newItem).then((addedItem) => {
      if (addedItem && addedItem.itemId) {
        const itemForGrid = { ...addedItem, id: addedItem._id };
        setData([...data, itemForGrid]);

        setInputData({ name: "", quantity: "", price: "" });

        // Notify success
        toast.success("Data added successfully!");
      } else {
        // Check for common errors
        if (addedItem.error.includes("duplicate key error")) {
          if (addedItem.error.includes("name")) {
            toast.error("Name already exists!");
          }
        } else {
          console.log("Invalid item received:", addedItem);
        }
      }
    });
  };

  const handleDelete = async () => {
    console.log("Deleting items with IDs:", selectedRows);

    const deletePromises = selectedRows.map((id) => deleteInventoryItem(id));

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
          {/* <TextField */}
          {/*   disabled */}
          {/*   sx={{ width: 100 }} */}
          {/*   name="id" */}
          {/*   label="Item ID" */}
          {/*   variant="outlined" */}
          {/*   value={inputData.id} */}
          {/* /> */}
          <TextField
            name="name"
            label="Name"
            variant="outlined"
            value={inputData.name}
            onChange={handleInputChange}
          />
          <TextField
            error={isError}
            sx={{ width: 100 }}
            name="quantity"
            label="Quantity"
            variant="outlined"
            value={inputData.quantity}
            onChange={handleInputChange}
          />
          <TextField
            error={isError}
            name="price"
            label="Price"
            variant="outlined"
            value={inputData.price}
            onChange={handleInputChange}
          />
          <Button
            variant="contained"
            disabled={isError}
            color="primary"
            onClick={handleAddData}
          >
            Add Data
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

export default Inventory;
