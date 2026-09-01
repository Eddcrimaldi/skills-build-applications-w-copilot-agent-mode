"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Leaderboard = void 0;
const mongoose_1 = require("mongoose");
const leaderboardEntrySchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    points: {
        type: Number,
        required: true,
        default: 0,
    },
    workoutsCompleted: {
        type: Number,
        default: 0,
    },
    streakDays: {
        type: Number,
        default: 0,
    },
    rank: {
        type: Number,
        default: 1,
    },
}, {
    timestamps: true,
});
exports.Leaderboard = (0, mongoose_1.model)('Leaderboard', leaderboardEntrySchema);
