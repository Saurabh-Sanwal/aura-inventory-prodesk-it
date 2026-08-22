const express = require("express");
const router = express.Router();
const { getInventory, createProduct, updateProduct } = require("../controllers/inventoryController");

router.get("/", getInventory);
router.post("/", createProduct);
router.put("/:id", updateProduct);

module.exports = router;
