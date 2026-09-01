import mongoose from 'mongoose';
import { User } from '../models/User';
import { Team } from '../models/Team';
import { Activity } from '../models/Activity';
import { Leaderboard } from '../models/Leaderboard';
import { Workout } from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await Leaderboard.deleteMany({});
    await Workout.deleteMany({});

    const users = await User.insertMany([
      {
        name: 'Ava Thompson',
        email: 'ava@example.com',
        age: 16,
        role: 'student',
        fitnessLevel: 'advanced',
      },
      {
        name: 'Marcus Lee',
        email: 'marcus@example.com',
        age: 15,
        role: 'student',
        fitnessLevel: 'intermediate',
      },
      {
        name: 'Priya Patel',
        email: 'priya@example.com',
        age: 17,
        role: 'student',
        fitnessLevel: 'beginner',
      },
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Thunder Striders',
        description: 'Fast-paced runners focused on endurance.',
        members: [users[0]._id, users[1]._id],
      },
      {
        name: 'Power Prep',
        description: 'Strength training and balance group.',
        members: [users[2]._id],
      },
    ]);

    await Activity.insertMany([
      {
        user: users[0]._id,
        type: 'running',
        durationMinutes: 35,
        distanceKm: 5.6,
        caloriesBurned: 420,
        notes: 'Morning run before school',
        date: new Date(),
      },
      {
        user: users[1]._id,
        type: 'strength',
        durationMinutes: 45,
        distanceKm: 0,
        caloriesBurned: 330,
        notes: 'Upper-body workout',
        date: new Date(),
      },
      {
        user: users[2]._id,
        type: 'walking',
        durationMinutes: 30,
        distanceKm: 3.2,
        caloriesBurned: 180,
        notes: 'Walked with class group',
        date: new Date(),
      },
    ]);

    await Leaderboard.insertMany([
      {
        user: users[0]._id,
        points: 1200,
        workoutsCompleted: 8,
        streakDays: 5,
        rank: 1,
      },
      {
        user: users[1]._id,
        points: 980,
        workoutsCompleted: 6,
        streakDays: 4,
        rank: 2,
      },
      {
        user: users[2]._id,
        points: 760,
        workoutsCompleted: 5,
        streakDays: 3,
        rank: 3,
      },
    ]);

    await Workout.insertMany([
      {
        title: 'Interval Sprint Circuit',
        category: 'cardio',
        difficulty: 'intermediate',
        durationMinutes: 25,
        focusArea: 'endurance',
        description: 'Short sprint intervals with active recovery.',
      },
      {
        title: 'Core Stability Session',
        category: 'strength',
        difficulty: 'beginner',
        durationMinutes: 20,
        focusArea: 'core',
        description: 'Bodyweight exercises for balance and core strength.',
      },
      {
        title: 'Mobility Reset',
        category: 'mobility',
        difficulty: 'beginner',
        durationMinutes: 15,
        focusArea: 'flexibility',
        description: 'Gentle mobility work for improving range of motion.',
      },
    ]);

    console.log('Seeded teams:', teams.length);
    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
