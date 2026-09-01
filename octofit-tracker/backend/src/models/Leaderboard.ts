import { Schema, model } from 'mongoose';

const leaderboardEntrySchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
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
  },
  {
    timestamps: true,
  },
);

export const Leaderboard = model('Leaderboard', leaderboardEntrySchema);
