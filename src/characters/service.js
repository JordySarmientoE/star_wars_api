"use strict";

const DataAccess = require("./data-access");
const Character = require("../models/Character");
const Response = require("../shared/response");
const Table = require("../shared/tables");
class CharactersService {
  async getAll() {
    try {
      // Get data saved from database and star wars API on same promise
      const [charactersDB, charactersStarWars] = await Promise.all([
        DataAccess.getAll(),
        DataAccess.getStarWarsCharacters(),
      ]);
      let translatedStarWars = charactersStarWars.map(
        (ch) => new Character(ch)
      );
      translatedStarWars = await DataAccess.translateObject(translatedStarWars);
      const characters = [...charactersDB, ...translatedStarWars];
      return characters;
    } catch (error) {
      throw error;
    }
  }

  async create(payload) {
    try {
      const newCharacter = await DataAccess.create(payload);
      return newCharacter;
    } catch (error) {
      throw error;
    }
  }

  async getById(id) {
    try {
      // Get by id character with Service
      const character = await DataAccess.getById(id);
      // Validate if character exists
      if (!character) {
        throw Response.responseNotFound(Table.Character);
      }
      return character;
    } catch (error) {
      throw error;
    }
  }

  async update(id, payload) {
    try {
      // Get by id character with Service
      const character = await DataAccess.getById(id);
      // Validate if character exists
      if (!character) {
        throw Response.responseNotFound(Table.Character);
      }
      // Update when we know character exists
      const newCharacter = await DataAccess.update(id, payload);
      return newCharacter;
    } catch (error) {
      throw error;
    }
  }

  async deleteOne(id) {
    try {
      // Get by id character with Service
      const character = await DataAccess.getById(id);
      // Validate if character exists
      if (!character) {
        throw Response.responseNotFound(Table.Character);
      }
      // Delete when we know character exists
      await DataAccess.deleteOne(id);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new CharactersService();
