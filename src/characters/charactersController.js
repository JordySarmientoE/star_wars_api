"use strict";

const {
  responseNotFound,
  responseGetById,
  responseError,
  responseCreate,
  responseDelete,
  responseUpdate,
  responseGetAll,
} = require("../shared/response");
const Table = require("../shared/tables");
const service = require("./charactersService");
const Character = require("../models/Character");

class CharactersController {
  async getAll() {
    try {
      // Get data saved from database and star wars API on same promise
      const [charactersDB, charactersStarWars] = await Promise.all([
        service.getAll(),
        service.getStarWarsCharacters(),
      ]);
      let characters = [...charactersDB, ...charactersStarWars];
      characters = characters.map((ch) => new Character(ch));
      return responseGetAll(Table.Character, characters);
    } catch (error) {
      console.log(error);
      return responseError();
    }
  }

  async create(event) {
    try {
      const body = event.body;
      // Craete character with service
      const newCharacter = await service.create(body);

      return responseCreate(Table.Character, newCharacter);
    } catch (error) {
      return responseError();
    }
  }

  async getById(event) {
    try {
      const { id } = event.pathParameters;
      // Get by id character with service
      const newCharacter = await service.getById(id);
      // Validate if character exists
      if (!newCharacter) {
        return responseNotFound(Table.Character);
      }

      return responseGetById(Table.Character, newCharacter);
    } catch (error) {
      return responseError();
    }
  }

  async update(event) {
    try {
      const { id } = event.pathParameters;
      const body = event.body;
      // Get by id character with service
      const characterFound = await service.getById(id);
      // Validate if character exists
      if (!characterFound) {
        return responseNotFound(Table.Character);
      }
      // Create new character values with old data and new data from payload
      const newCharacter = Object.assign({ ...characterFound }, { ...body });
      // Delete some values not permited to register from payload
      Object.keys(newCharacter).forEach((key) => {
        if (!Object.keys(characterFound).includes(key)) {
          delete newCharacter[key];
        }
      });
      // Delete when we know character exists
      await service.update(id, newCharacter);

      return responseUpdate(Table.Character, newCharacter);
    } catch (error) {
      return responseError();
    }
  }

  async deleteOne(event) {
    try {
      const { id } = event.pathParameters;
      // Get by id character with service
      const newCharacter = await service.getById(id);
      // Validate if character exists
      if (!newCharacter) {
        return responseNotFound(Table.Character);
      }
      // Delete when we know character exists
      await service.deleteOne(id);

      return responseDelete(Table.Character);
    } catch (error) {
      return responseError();
    }
  }
}

module.exports = new CharactersController();
