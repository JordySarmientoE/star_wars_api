"use strict";
// Import controller for use methods
const controller = require("./controller");
const middleware = require("../middlewares/validation");

// API GET ALL CHARACTER
const getAll = async () => {
  const response = await controller.getAll();
  return response;
};

// API CREATE CHARACTER
const create = async (event) => {
  const response = await controller.create(event);
  return response;
};

// API GET ONE CHARACTER
const getById = async (event) => {
  const response = await controller.getById(event);
  return response;
};

// API UPDATE CHARACTER
const update = async (event) => {
  const response = await controller.update(event);
  return response;
};

// API DELETE CHARACTER
const deleteOne = async (event) => {
  const response = await controller.deleteOne(event);
  return response;
};

module.exports = {
  getAll,
  // Use middleware to parse body
  create: middleware(create),
  getById,
  // Use middleware to parse body
  update: middleware(update),
  deleteOne,
};
