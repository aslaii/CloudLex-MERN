const Inventory = require("../models/inventory");
const IdCounter = require("../models/idCounter");

exports.getInventoryItems = async (req, res) => {
  try {
    const inventoryItems = await Inventory.find().populate(
      "category",
      "name -_id",
    ); // Only get 'name' field from Category
    res.json(inventoryItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addInventoryItem = async (req, res) => {
  const { name, quantity, price, category } = req.body;
  try {
    const idCounter = await IdCounter.findOneAndUpdate(
      {},
      { $inc: { counter: 1 } },
      { new: true, upsert: true },
    );
    const newInventoryItem = new Inventory({
      itemId: idCounter.counter,
      name,
      quantity,
      price,
      category,
    });
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
      req.params.id,
    );
    res.json(deletedInventoryItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
