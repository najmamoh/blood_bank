"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bloodInventoryContrr_1 = require("../Controller/bloodInventoryContrr");
const router = express_1.default.Router();
router.post('/', bloodInventoryContrr_1.createInventory);
router.get('/', bloodInventoryContrr_1.getAllInventories);
router.get('/:id', bloodInventoryContrr_1.getInventoryById);
router.put('/:id', bloodInventoryContrr_1.updateInventory);
router.delete('/:id', bloodInventoryContrr_1.deleteInventory);
exports.default = router;
