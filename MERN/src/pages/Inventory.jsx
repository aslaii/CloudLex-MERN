import React, { useCallback, useEffect, useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import {
  addInventoryItem,
  deleteInventoryItem,
  getInventory,
} from "../api/Inventory";
import { getCategories } from "../api/Category.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Inventory = () => {
  const [data, setData] = useState([]);
  const [inputData, setInputData] = useState({
    id: "",
    name: "",
    quantity: "",
    price: "",
    category: "",
  });
  const [selectedRows, setSelectedRows] = useState([]);
  const [isError, setIsError] = useState(false);
  const [categories, setcategories] = useState([]);

  useEffect(() => {
    getInventory().then((items) => {
      setData(items);
      console.log(items);
    });
    getCategories()
      .then((categories) => {
        setcategories(categories);
        if (categories.length > 0) {
          setInputData((prevData) => ({
            ...prevData,
            category: categories[0]._id,
          }));
        }
      })
      .catch((err) => console.error(err));
  }, []);

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

  const handleCategoryChange = (e) => {
    setInputData({ ...inputData, category: e.target.value });
  };

  const handleAddData = () => {
    const newItem = {
      name: inputData.name,
      quantity: Number(inputData.quantity),
      price: Number(inputData.price),
      category: inputData.category,
    };
    addInventoryItem(newItem)
      .then((addedItem) => {
        if (addedItem && addedItem.itemId) {
          const categoryObject = categories.find(
            (cat) => cat._id === addedItem.category,
          );
          const itemForGrid = {
            ...addedItem,
            id: addedItem._id,
            category: categoryObject,
          };
          setData([...data, itemForGrid]);

          setInputData({ name: "", quantity: "", price: "" });

          toast.success("Data added successfully!");
        } else {
          console.log("Invalid item received:", addedItem);
        }
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data.message.includes("duplicate key error")
        ) {
          if (error.response.data.message.includes("name")) {
            toast.error("Name already exists!");
          }
        } else {
          console.log("Error adding item:", error);
        }
      });
  };

  const handleDelete = useCallback((row) => {
    deleteInventoryItem(row.id)
      .then(() => {
        setData((prevData) => prevData.filter((item) => item.id !== row.id));

        toast.success("Data deleted successfully!");
      })
      .catch((error) => {
        console.log("Error deleting item:", error);
        toast.error("Failed to delete data!");
      });
  }, []);

  const columns = [
    {
      header: "Item ID",
      accessorKey: "itemId",
      size: 40,
    },
    {
      header: "Category",
      accessorKey: "category.name",
      size: 100,
    },
    {
      header: "Name",
      accessorKey: "name",
      size: 140,
    },
    {
      header: "Quantity",
      accessorKey: "quantity",
      size: 140,
    },
    {
      header: "Price",
      accessorKey: "price",
      size: 140,
    },
  ];
  return (
    <Box sx={{ ml: 10, height: 500, width: "80%" }}>
      <MaterialReactTable columns={columns} data={data} />
      <ToastContainer />
      <Stack direction="row" spacing={2} sx={{ mt: 5 }}>
        {" "}
        <TextField
          select
          name="category"
          value={inputData.category}
          onChange={handleCategoryChange}
          label="Category"
          variant="outlined"
          width={100}
          defaultValue={"Select Category"}
        >
          {categories.map((option) => (
            <MenuItem key={option._id} value={option._id}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          name="name"
          value={inputData.name}
          onChange={handleInputChange}
          label="Name"
          variant="outlined"
        />
        <TextField
          name="quantity"
          value={inputData.quantity}
          onChange={handleInputChange}
          label="Quantity"
          variant="outlined"
          error={isError}
        />
        <TextField
          name="price"
          value={inputData.price}
          onChange={handleInputChange}
          label="Price"
          variant="outlined"
          error={isError}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddData}
          disabled={isError}
        >
          Add
        </Button>
      </Stack>
    </Box>
  );
};

export default Inventory;
