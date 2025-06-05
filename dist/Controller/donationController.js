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
exports.deleteDonation = exports.updateDonation = exports.getDonationById = exports.getAllDonations = exports.createDonation = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createDonation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { donorId, date, units } = req.body;
        const donation = yield prisma.donation.create({
            data: { donorId, date: new Date(date), units },
        });
        res.status(201).json(donation);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create donation' });
    }
});
exports.createDonation = createDonation;
const getAllDonations = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const donations = yield prisma.donation.findMany();
    res.json(donations);
});
exports.getAllDonations = getAllDonations;
const getDonationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const donation = yield prisma.donation.findUnique({ where: { id } });
    if (!donation) {
        res.status(404).json({ error: 'Donation not found' });
        res.json(donation);
        return;
    }
});
exports.getDonationById = getDonationById;
const updateDonation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const { donorId, date, units } = req.body;
    try {
        const updated = yield prisma.donation.update({
            where: { id },
            data: { donorId, date: new Date(date), units }
        });
        res.json(updated);
    }
    catch (_a) {
        res.status(404).json({ error: 'Donation not found' });
    }
});
exports.updateDonation = updateDonation;
const deleteDonation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        yield prisma.donation.delete({ where: { id } });
        res.json({ message: 'Donation deleted' });
    }
    catch (_a) {
        res.status(404).json({ error: 'Donation not found' });
    }
});
exports.deleteDonation = deleteDonation;
