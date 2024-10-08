import { getEventById, getEvents } from "../services/events.js";

export const getEventsController = async (req, res) => {
    const events = await getEvents();
    res.json({
        status: 200,
        message: 'Events fetched successfully',
        data: events,
    });
};

export const getEventByIdController = async (req, res) => {
    const eventId = req.params.eventId;
    const events = await getEventById(eventId);

    res.json({
        status: 200,
        message: `Successfully found event with id ${eventId} not found!`,
        data: events,
    });
};
export const createEventController = async (req, res) => {
    const eventId = req.params.eventId;
    const events = await getEventById(eventId);

    res.json({
        status: 200,
        message: `Successfully found event with id ${eventId} not found!`,
        data: events,
    });
};

