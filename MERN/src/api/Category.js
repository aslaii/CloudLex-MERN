// src/api/Category.js

import axios from "axios";

const baseURL = import.meta.env.VITE_REACT_APP_CLIENT_API_URL;

export const getCategories = async () => {
  try {
    const res = await axios.get(`${baseURL}categories`);
    const data = await res.data;

    // Map over each category and add an 'id' field which is a copy of the '_id' field.
    const categories = data.map((category) => ({
      ...category,
      id: category._id,
    }));

    return categories;
  } catch (error) {
    console.error(`Error fetching categories: ${error}`);
  }
};

export const addCategory = async (category) => {
  try {
    const res = await axios.post(`${baseURL}categories`, category);
    return res.data;
  } catch (err) {
    console.error("Error adding category:", err);
    throw err;
  }
};

export const deleteCategory = async (id) => {
  try {
    const res = await axios.delete(`${baseURL}categories/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error deleting category:", err);
  }
};
