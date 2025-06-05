"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const recipientController_1 = require("../Controller/recipientController");
const router = express_1.default.Router();
router.post('/', recipientController_1.createRecipient);
router.get('/', recipientController_1.getAllRecipients);
router.get('/:id', recipientController_1.getRecipientById);
router.put('/:id', recipientController_1.updateRecipient);
router.delete('/:id', recipientController_1.deleteRecipient);
exports.default = router;
