"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const matchController_1 = require("../Controller/matchController");
const router = express_1.default.Router();
router.post('/', matchController_1.createMatch);
router.get('/', matchController_1.getAllMatches);
router.get('/:id', matchController_1.getMatchById);
router.put('/:id', matchController_1.updateMatch);
router.delete('/:id', matchController_1.deleteMatch);
exports.default = router;
