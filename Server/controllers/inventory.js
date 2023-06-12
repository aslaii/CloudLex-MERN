const Inventory = require("../models/inventory");

exports.getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find();
    res.json(inventory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addInventoryItem = async (req, res) => {
  const { itemId, name, quantity, price } = req.body;
  if (!itemId) {
    return res.status(400).json({ error: "Item ID is required" });
  }
  try {
    const newInventoryItem = new Inventory({ itemId, name, quantity, price });
    const savedInventoryItem = await newInventoryItem.save();
    res.json(savedInventoryItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteInventoryItem = async (req, res) => {
  try {
    const inventoryItem = await Inventory.findById(req.params.id);
    if (!inventoryItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    const deletedInventoryItem = await Inventory.findByIdAndDelete(
      req.params.id
    );
    res.json(deletedInventoryItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
