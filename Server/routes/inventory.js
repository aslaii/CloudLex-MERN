const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventory");
const auth = require("../middlewares/auth");

router.get("/inventory", auth.verifyToken, inventoryController.getInventory);
router.post(
  "/inventory",
  auth.verifyToken,
  inventoryController.addInventoryItem
);
router.delete(
  "/inventory/:id",
  auth.verifyToken,
  inventoryController.deleteInventoryItem
);

module.exports = router;
