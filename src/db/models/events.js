import { model, Schema } from "mongoose";

const eventsSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    eventDate: {
        type: Date,
        required: true
    },
    organizer: {
        type: String,
        required: true
    }

}, { timestamps: true });

export const Events = model('Events', eventsSchema);