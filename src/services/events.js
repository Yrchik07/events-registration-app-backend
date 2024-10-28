import createHttpError from 'http-errors';
import { Events } from '../db/models/events.js';

const createPaginationInformation = (page, perPage, count) => {
  const totalPages = Math.ceil(count / perPage);
  const hasPreviousPage = page > 1;
  const hasNextPage = page < totalPages;
  return {
    page,
    perPage,
    totalItems: count,
    totalPages,
    hasPreviousPage: hasPreviousPage,
    hasNextPage,
  };
};
export const getEvents = async ({
  page = 1,
  perPage = 5,
  sortBy = '_id',
  sortOrder = 'asc',
  filter = {},
  userId,
}) => {
  const skip = (page - 1) * perPage;
  const eventQuery = Events.find();
  if (filter.title) {
    eventQuery.where('title', new RegExp(filter.title, 'i')); // Фильтрация по части слова в title
  }
  if (filter.description) {
    eventQuery.where('description', new RegExp(filter.description, 'i')); // Фильтрация по части описания
  }
  if (filter.eventDate) {
    eventQuery.where('eventDate').equals(filter.eventDate); // Точное совпадение по дате
  }
  if (filter.organizer) {
    eventQuery.where('organizer', new RegExp(filter.organizer, 'i')); // Фильтрация по организатору (часть имени)
  }

  eventQuery.where('parentId').equals(userId);

  const [eventCount, events] = await Promise.all([
    // Events.find().merge(eventQuery).countDocuments(),
    // Events.find()
    eventQuery.clone().countDocuments(), // Считаем общее количество событий
    eventQuery
      .skip(skip)
      .limit(perPage)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);
  const paginationInformation = createPaginationInformation(
    page,
    perPage,
    eventCount,
  );
  return {
    events,
    ...paginationInformation,
  };
};

export const getEventById = async (id) => {
  const event = await Events.findById(id);

  if (!event) {
    throw createHttpError(404, 'Event not found or you are not authorized to view it');
  }

  return event;
};
export const createEvent = async (payload, userId) => {
  const event = await Events.create({...payload, parentId: userId});

  return event;
};
export const upsertEvent = async (id, payload, options = {}) => {
  const rawResult = await Events.findByIdAndUpdate(id, payload, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });

  if (!rawResult || !rawResult.value) {
    throw createHttpError(404, 'Event not found or you are not authorized to update it');
  }

  return {
    event: rawResult.value,
    isNew: !rawResult?.lastErrorObject?.updatedExisting,
  };
};

export const deleteEventById = async (id) => {
  await Events.findByIdAndDelete(id);
};
