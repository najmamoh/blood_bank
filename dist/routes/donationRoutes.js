"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const donationController_1 = require("../Controller/donationController");
const router = express_1.default.Router();
router.post('/', donationController_1.createDonation);
router.get('/', donationController_1.getAllDonations);
router.get('/:id', donationController_1.getDonationById);
router.put('/:id', donationController_1.updateDonation);
router.delete('/:id', donationController_1.deleteDonation);
exports.default = router;
