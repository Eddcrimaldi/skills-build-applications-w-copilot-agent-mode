"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workout = void 0;
const mongoose_1 = require("mongoose");
const workoutSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['cardio', 'strength', 'mobility', 'recovery'],
    },
    difficulty: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        default: 'beginner',
    },
    durationMinutes: {
        type: Number,
        required: true,
        min: 10,
    },
    focusArea: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        default: '',
    },
}, {
    timestamps: true,
});
exports.Workout = (0, mongoose_1.model)('Workout', workoutSchema);
