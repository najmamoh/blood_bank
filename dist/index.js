"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const recipientRoutes_1 = __importDefault(require("./routes/recipientRoutes"));
const matchRoutes_1 = __importDefault(require("./routes/matchRoutes"));
const donationRoutes_1 = __importDefault(require("./routes/donationRoutes"));
const bloodInventoryRoutes_1 = __importDefault(require("./routes/bloodInventoryRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/users', userRoutes_1.default);
app.use('/api/recipent', recipientRoutes_1.default);
app.use('/api/matches', matchRoutes_1.default);
app.use('/api/donation', donationRoutes_1.default);
app.use('/api/blood', bloodInventoryRoutes_1.default);
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
