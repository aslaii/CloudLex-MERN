import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, TextField, Box, Stack } from "@mui/material";
import {
  getInventory,
  addInventoryItem,
  deleteInventoryItem,
} from "../api/Inventory";

const Inventory = () => {
  const [data, setData] = useState([]);
  const [inputData, setInputData] = useState({
    id: "",
    name: "",
    quantity: "",
    price: "",
  });
  const [selectedRows, setSelectedRows] = useState([]);

  const columns = [
    { field: "itemId", headerName: "Item ID", width: 70 },
    { field: "name", headerName: "Name", width: 300 },
    { field: "quantity", headerName: "Quantity", width: 130 },
    { field: "price", headerName: "Price", width: 130 },
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

  useEffect(() => {
    getInventory().then((items) => {
      setData(items);
      setInputData((inputData) => ({
        ...inputData,
        id: generateId(items),
      }));
    });
  }, []);

  const generateId = (items) => {
    let id;
    do {
      id = Math.floor(Math.random() * 90000) + 10000;
    } while (items.some((item) => item.id === id));
    return id;
  };
  const handleInputChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleAddData = () => {
    const newItem = { ...inputData, itemId: inputData.id };
    addInventoryItem(newItem).then((addedItem) => {
      // Ensure the response contains itemId and it's not null
      if (addedItem.itemId) {
        const itemForGrid = { ...addedItem, id: addedItem.itemId };
        setData([...data, itemForGrid]);

        // Generate a new unique 5-digit ID for the next item
        const newId = generateId(data.concat(itemForGrid));

        setInputData({ id: newId, name: "", quantity: "", price: "" });
      } else {
        console.log("Invalid item received:", addedItem);
      }
    });
  };

  const handleDelete = () => {
    console.log("Deleting items with IDs:", selectedRows);
    selectedRows.forEach((id) => {
      deleteInventoryItem(id).then(() => {
        setData(data.filter((item) => item.id !== id));
      });
    });
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
          <TextField
            disabled
            sx={{ width: 100 }}
            name="id"
            label="Item ID"
            variant="outlined"
            value={inputData.id}
          />
          <TextField
            name="name"
            label="Name"
            variant="outlined"
            value={inputData.name}
            onChange={handleInputChange}
          />
          <TextField
            sx={{ width: 100 }}
            name="quantity"
            label="Quantity"
            variant="outlined"
            value={inputData.quantity}
            onChange={handleInputChange}
          />
          <TextField
            name="price"
            label="Price"
            variant="outlined"
            value={inputData.price}
            onChange={handleInputChange}
          />
          <Button variant="contained" color="primary" onClick={handleAddData}>
            Add Data
          </Button>
          <Button variant="contained" color="secondary" onClick={handleDelete}>
            Delete
          </Button>
        </Stack>
      </div>
    </Box>
  );
};

export default Inventory;
