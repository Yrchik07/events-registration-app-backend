import { Events } from "../db/models/events.js";

export const getEvents = async () => {
    return await Events.find();
};

export const getEventById = async (id) => {
    return await Events.findById(id);
};