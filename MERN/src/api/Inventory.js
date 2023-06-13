const baseURL = import.meta.env.VITE_REACT_APP_CLIENT_API_URL;
export const getInventory = async () => {
  try {
    const res = await fetch(`${baseURL}inventory`, {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();
    // Convert _id to id
    const items = data.map((item) => ({ ...item, id: item._id }));
    return items;
  } catch (err) {
    console.log("Error getting inventory:", err);
    throw new Error("Cannot get inventory at this time. " + err);
  }
};
// ...

export const addInventoryItem = async (item) => {
  try {
    const response = await fetch(`${baseURL}inventory`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
      credentials: "include",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding inventory item:", error);
    throw error;
  }
};
// ...

export const deleteInventoryItem = async (id) => {
  try {
    const res = await fetch(`${baseURL}inventory/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    throw new Error("Cannot delete inventory item at this time. " + err);
  }
};
