const buildFilter = (queryFilter) => {
  const filter = {};
  if (!queryFilter) return filter;

  const conditions = queryFilter.split(';');
  for (const condition of conditions) {
    const [field, operator, value] = condition.split('=');
    switch (operator) {
      case 'eq': // equals
        filter[field] = value;
        break;
      case 'ilike': // case-insensitive regex
        filter[field] = new RegExp(value, 'i');
        break;
      case 'gte': // greater than or equal
        filter[field] = { $gte: value };
        break;
      case 'lte': // less than or equal
        filter[field] = { $lte: value };
        break;
      default:
        break;
    }
  }
  return filter;
}

const buildSort = (querySort) => {
  if (!querySort) return null;

  const sort = {};
  const fields = querySort.split(',');
  for (const field of fields) {
    const [key, order] = field.split(':');
    sort[key] = order === 'desc' ? -1 : 1; // -1: desc, 1: asc
  }
  return sort;
}

module.exports = {
  buildFilter,
  buildSort
}