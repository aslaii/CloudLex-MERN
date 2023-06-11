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
  try {
    const newInventoryItem = new Inventory(req.body);
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
