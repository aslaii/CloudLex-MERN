import axios from "axios";

const baseURL = import.meta.env.VITE_REACT_APP_CLIENT_API_URL;

export const getInventory = async () => {
  try {
    const res = await axios.get(`${baseURL}inventory`, {
      withCredentials: true,
    });
    const items = res.data.map((item) => ({ ...item, id: item._id }));
    return items;
  } catch (err) {
    console.log("Error getting inventory:", err);
    throw new Error("Cannot get inventory at this time. " + err);
  }
};

export const addInventoryItem = async (item) => {
  try {
    const res = await axios.post(`${baseURL}inventory`, item, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error("Error adding inventory item:", err);
    throw err;
  }
};

export const deleteInventoryItem = async (id) => {
  try {
    const res = await axios.delete(`${baseURL}inventory/${id}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    throw new Error("Cannot delete inventory item at this time. " + err);
  }
};
