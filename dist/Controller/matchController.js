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
exports.deleteMatch = exports.updateMatch = exports.getMatchById = exports.getAllMatches = exports.createMatch = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createMatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { donorId, recipientId, match_date, status } = req.body;
        const match = yield prisma.match.create({
            data: {
                donorId,
                recipientId,
                match_date: new Date(match_date),
                status
            }
        });
        res.status(201).json(match);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create match' });
    }
});
exports.createMatch = createMatch;
const getAllMatches = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const matches = yield prisma.match.findMany();
    res.json(matches);
});
exports.getAllMatches = getAllMatches;
const getMatchById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const match = yield prisma.match.findUnique({ where: { id } });
    if (!match) {
        res.status(404).json({ error: 'Match not found' });
        res.json(match);
        return;
    }
});
exports.getMatchById = getMatchById;
const updateMatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const { donorId, recipientId, match_date, status } = req.body;
    try {
        const updated = yield prisma.match.update({
            where: { id },
            data: {
                donorId,
                recipientId,
                match_date: new Date(match_date),
                status
            }
        });
        res.json(updated);
    }
    catch (_a) {
        res.status(404).json({ error: 'Match not found' });
    }
});
exports.updateMatch = updateMatch;
const deleteMatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        yield prisma.match.delete({ where: { id } });
        res.json({ message: 'Match deleted' });
    }
    catch (_a) {
        res.status(404).json({ error: 'Match not found' });
    }
});
exports.deleteMatch = deleteMatch;
