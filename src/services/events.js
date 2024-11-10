import createHttpError from 'http-errors';
import { Events } from '../db/models/events.js';
import { saveFile } from '../utils/saveFile.js';

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
    eventQuery.clone().countDocuments(),
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
    throw createHttpError(
      404,
      'Event not found or you are not authorized to view it',
    );
  }

  return event;
};

export const createEvent = async ({ avatar, ...payload }, userId) => {
  const url = await saveFile(avatar);
  const event = await Events.create({
    ...payload,
    parentId: userId,
    avatarUrl: url,
  });
  return event;
};

export const upsertEvent = async (id, { avatar, ...payload }, options = {}) => {
  const url = await saveFile(avatar);

  const rawResult = await Events.findByIdAndUpdate(
    id,
    { ...payload, avatarUrl: url },
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) {
    throw createHttpError(
      404,
      'Event not found or you are not authorized to update it',
    );
  }

  return {
    event: rawResult.value,
    isNew: !rawResult?.lastErrorObject?.updatedExisting,
  };
};

export const deleteEventById = async (id) => {
  await Events.findByIdAndDelete(id);
};
