"use strict";

const Response = require("../shared/response");
const Table = require("../shared/tables");
const Service = require("./service");
const Validation = require("./validation");

class CharactersController {
  async getAll() {
    try {
      const characters = await Service.getAll();
      return Response.responseGetAll(Table.Character, characters);
    } catch (error) {
      return Response.responseError();
    }
  }

  async create(event) {
    try {
      const body = event.body;
      await Validation.create(body);
      // Craete character with Service
      const newCharacter = await Service.create(body);
      return Response.responseCreate(Table.Character, newCharacter);
    } catch (error) {
      if (error.statusCode) {
        return error;
      } else {
        return Response.responseError();
      }
    }
  }

  async getById(event) {
    try {
      const { id } = event.pathParameters;
      const newCharacter = await Service.getById(id);
      return Response.responseGetById(Table.Character, newCharacter);
    } catch (error) {
      if (error.statusCode) {
        return error;
      } else {
        return Response.responseError();
      }
    }
  }

  async update(event) {
    try {
      const { id } = event.pathParameters;
      const body = event.body;
      await Validation.create(body);
      const newCharacter = await Service.update(id, body);
      return Response.responseUpdate(Table.Character, newCharacter);
    } catch (error) {
      if (error.statusCode) {
        return error;
      } else {
        return Response.responseError();
      }
    }
  }

  async deleteOne(event) {
    try {
      const { id } = event.pathParameters;
      await Service.deleteOne(id);
      return Response.responseDelete(Table.Character);
    } catch (error) {
      console.log(error);
      if (error.statusCode) {
        return error;
      } else {
        return Response.responseError();
      }
    }
  }
}

module.exports = new CharactersController();
