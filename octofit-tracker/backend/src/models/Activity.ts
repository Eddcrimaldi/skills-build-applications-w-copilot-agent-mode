import { Schema, model } from 'mongoose';

const activitySchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
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
  },
  {
    timestamps: true,
  },
);

export const Activity = model('Activity', activitySchema);
