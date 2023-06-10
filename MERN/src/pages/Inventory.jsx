import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, TextField, Box, Stack } from "@mui/material";

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
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 130 },
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

  const handleInputChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleAddData = () => {
    setData([...data, inputData]);
    setInputData({ id: "", name: "", quantity: "", price: "" });
  };

  const handleDelete = () => {
    setData(data.filter((item) => !selectedRows.includes(item.id.toString())));
  };

  return (
    <Box sx={{ ml: 10, width: 1000, height: 300 }}>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={5}
          checkboxSelection
          onSelectionModelChange={(newSelection) => {
            setSelectedRows(newSelection.selectionModel);
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
            sx={{ width: 100 }}
            name="id"
            label="ID"
            variant="outlined"
            value={inputData.id}
            onChange={handleInputChange}
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
