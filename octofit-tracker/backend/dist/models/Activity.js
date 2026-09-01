"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Activity = void 0;
const mongoose_1 = require("mongoose");
const activitySchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['running', 'walking', 'strength', 'cycling', 'swimming'],
    },
    durationMinutes: {
        type: Number,
        required: true,
        min: 1,
    },
    distanceKm: {
        type: Number,
        default: 0,
        min: 0,
    },
    caloriesBurned: {
        type: Number,
        default: 0,
        min: 0,
    },
    notes: {
        type: String,
        default: '',
    },
    date: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});
exports.Activity = (0, mongoose_1.model)('Activity', activitySchema);
