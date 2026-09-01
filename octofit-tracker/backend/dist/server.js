"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./config/database");
const User_1 = require("./models/User");
const Team_1 = require("./models/Team");
const Activity_1 = require("./models/Activity");
const Leaderboard_1 = require("./models/Leaderboard");
const Workout_1 = require("./models/Workout");
const app = (0, express_1.default)();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
app.use(express_1.default.json());
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        message: 'Octofit Tracker API is running',
        baseUrl,
    });
});
app.get('/api/users', async (_req, res) => {
    try {
        const users = await User_1.User.find();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
});
app.post('/api/users', async (req, res) => {
    try {
        const user = await User_1.User.create(req.body);
        res.status(201).json(user);
    }
    catch (error) {
        res.status(400).json({ message: 'Error creating user', error });
    }
});
app.get('/api/teams', async (_req, res) => {
    try {
        const teams = await Team_1.Team.find().populate('members');
        res.json(teams);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching teams', error });
    }
});
app.post('/api/teams', async (req, res) => {
    try {
        const team = await Team_1.Team.create(req.body);
        res.status(201).json(team);
    }
    catch (error) {
        res.status(400).json({ message: 'Error creating team', error });
    }
});
app.get('/api/activities', async (_req, res) => {
    try {
        const activities = await Activity_1.Activity.find().populate('user');
        res.json(activities);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching activities', error });
    }
});
app.post('/api/activities', async (req, res) => {
    try {
        const activity = await Activity_1.Activity.create(req.body);
        res.status(201).json(activity);
    }
    catch (error) {
        res.status(400).json({ message: 'Error creating activity', error });
    }
});
app.get('/api/leaderboard', async (_req, res) => {
    try {
        const leaderboard = await Leaderboard_1.Leaderboard.find().populate('user').sort({ points: -1, rank: 1 });
        res.json(leaderboard);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching leaderboard', error });
    }
});
app.post('/api/leaderboard', async (req, res) => {
    try {
        const entry = await Leaderboard_1.Leaderboard.create(req.body);
        res.status(201).json(entry);
    }
    catch (error) {
        res.status(400).json({ message: 'Error creating leaderboard entry', error });
    }
});
app.get('/api/workouts', async (_req, res) => {
    try {
        const workouts = await Workout_1.Workout.find();
        res.json(workouts);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching workouts', error });
    }
});
app.post('/api/workouts', async (req, res) => {
    try {
        const workout = await Workout_1.Workout.create(req.body);
        res.status(201).json(workout);
    }
    catch (error) {
        res.status(400).json({ message: 'Error creating workout', error });
    }
});
app.listen(port, () => {
    console.log(`Octofit Tracker server listening on http://localhost:${port}`);
    console.log(`Codespaces base URL: ${baseUrl}`);
});
