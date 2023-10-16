module.exports = {
  getAll,
  // Validate payload from a schema and use middleware to parse body
  create: middleware(create),
  getById,
  // Use middleware to parse body
  update: middleware(update),
  deleteOne,
};
