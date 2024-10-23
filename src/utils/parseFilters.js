const parseFiltersType = (unknown) => {
  if (typeof unknown !== 'string') return;
  return unknown;
};

export const parseFilters = (query) => {
  return {
    title: parseFiltersType(query.title),
    description: parseFiltersType(query.description),
    eventDate: parseFiltersType(query.eventDate),
    organizer: parseFiltersType(query.organizer),
  };
};
