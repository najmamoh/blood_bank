"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInventory = exports.updateInventory = exports.getInventoryById = exports.getAllInventories = exports.createInventory = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createInventory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { blood_type, units_available, last_updated, location } = req.body;
        const inventory = yield prisma.bloodInventory.create({
            data: {
                blood_type,
                units_available,
                last_updated: new Date(last_updated),
                location
            }
        });
        res.status(201).json(inventory);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create blood inventory' });
    }
});
exports.createInventory = createInventory;
const getAllInventories = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const inventories = yield prisma.bloodInventory.findMany();
    res.json(inventories);
});
exports.getAllInventories = getAllInventories;
const getInventoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const inventory = yield prisma.bloodInventory.findUnique({ where: { id } });
    if (!inventory) {
        res.status(404).json({ error: 'Inventory not found' });
        res.json(inventory);
        return;
    }
});
exports.getInventoryById = getInventoryById;
const updateInventory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const { blood_type, units_available, last_updated, location } = req.body;
    try {
        const updated = yield prisma.bloodInventory.update({
            where: { id },
            data: {
                blood_type,
                units_available,
                last_updated: new Date(last_updated),
                location
            }
        });
        res.json(updated);
    }
    catch (_a) {
        res.status(404).json({ error: 'Inventory not found' });
    }
});
exports.updateInventory = updateInventory;
const deleteInventory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        yield prisma.bloodInventory.delete({ where: { id } });
        res.json({ message: 'Inventory deleted' });
    }
    catch (_a) {
        res.status(404).json({ error: 'Inventory not found' });
    }
});
exports.deleteInventory = deleteInventory;
