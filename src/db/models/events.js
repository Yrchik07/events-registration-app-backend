import { model, Schema } from 'mongoose';

const eventsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    eventDate: {
      type: Date,
      required: true,
    },
    organizer: {
      type: String,
      required: true,
    },
    parentId: { type: Schema.ObjectId, required: true },
    avatarUrl: { type: String },
  },
  { timestamps: true, versionKey: false },
);

export const Events = model('Events', eventsSchema);
