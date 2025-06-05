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
exports.deleteRecipient = exports.updateRecipient = exports.getRecipientById = exports.getAllRecipients = exports.createRecipient = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createRecipient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, request_date, units_needed, status } = req.body;
        // Log data to confirm it's being received
        console.log('Incoming recipient data:', req.body);
        const recipient = yield prisma.recipient.create({
            data: {
                userId,
                request_date: new Date(request_date),
                units_needed,
                status,
            },
        });
        res.status(201).json(recipient);
    }
    catch (error) {
        // Log the actual error for debugging
        console.error('Recipient creation error:', error);
        res.status(500).json({ error: 'Failed to create recipient', details: error.message });
    }
});
exports.createRecipient = createRecipient;
const getAllRecipients = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const recipients = yield prisma.recipient.findMany();
    res.json(recipients);
});
exports.getAllRecipients = getAllRecipients;
const getRecipientById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const recipient = yield prisma.recipient.findUnique({ where: { id } });
    if (!recipient) {
        res.status(404).json({ error: 'Recipient not found' });
        res.json(recipient);
        return;
    }
});
exports.getRecipientById = getRecipientById;
const updateRecipient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const { userId, request_date, units_needed, status } = req.body;
    try {
        const updated = yield prisma.recipient.update({
            where: { id },
            data: {
                userId,
                request_date: new Date(request_date),
                units_needed,
                status
            }
        });
        res.json(updated);
    }
    catch (_a) {
        res.status(404).json({ error: 'Recipient not found' });
    }
});
exports.updateRecipient = updateRecipient;
const deleteRecipient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        yield prisma.recipient.delete({ where: { id } });
        res.json({ message: 'Recipient deleted' });
    }
    catch (_a) {
        res.status(404).json({ error: 'Recipient not found' });
    }
});
exports.deleteRecipient = deleteRecipient;
