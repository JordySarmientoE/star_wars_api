const service = require("../../characters/controller");
const Service = require("../../characters/service");
const DataMock = require("./data/characters.mock");
const DataAccess = require("../../characters/data-access.js");
const Response = require("../../shared/response");

jest.mock("../../characters/data-access.js");

describe("Characters Tests", () => {
  test("Service is an object", () => {
    expect(typeof service).toBe("object");
  });

  test("Service has functions", () => {
    expect(typeof Service.create).toBe("function");
    expect(typeof Service.deleteOne).toBe("function");
    expect(typeof Service.getAll).toBe("function");
    expect(typeof Service.getById).toBe("function");
    expect(typeof Service.update).toBe("function");
    expect(typeof Service.deleteOne).toBe("function");
  });

  test("Service create, create a character", async () => {
    const newCharacter = {
      ...DataMock.payloadCharacter,
      id: DataMock.characterIdCreated,
    };
    await DataAccess.create.mockResolvedValue(newCharacter);
    // Create character
    const res = await Service.create(newCharacter);
    // Expect character saved is equal from data send to save
    expect(res).toEqual(newCharacter);
  });

  test("Service getAll return characters", async () => {
    const newCharacter = {
      ...DataMock.payloadCharacter,
      id: DataMock.characterIdCreated,
    };
    await DataAccess.getAll.mockResolvedValue([newCharacter]);
    await DataAccess.getStarWarsCharacters.mockResolvedValue(
      DataMock.starWarsAPIResponse
    );
    await DataAccess.translateObject.mockResolvedValue(
      DataMock.starWarsAPIResponse
    );
    // List characters
    const characters = await Service.getAll();
    // Expect first character from list is equal character created up
    expect(characters[0]).toEqual(newCharacter);
    // Expect length of list of characters is equal 11
    expect(characters.length).toEqual(11);
  });

  test("Service getById with an valid id, return character", async () => {
    const newCharacter = {
      ...DataMock.payloadCharacter,
      id: DataMock.characterIdCreated,
    };
    await DataAccess.getById.mockResolvedValue(newCharacter);
    // Get character from id valid
    const res = await Service.getById(DataMock.characterIdCreated);
    // Expect character is equal first character from list
    expect(res).toEqual(newCharacter);
  });

  test("Service getById with an not valid id, return undefined", async () => {
    await DataAccess.getById.mockResolvedValue(undefined);
    // Get undefined from id invalid
    await expect(() =>
      Service.getById("ID_TEST").rejects.toThrow(
        expect.objectContaining(Response.responseNotFound("Character"))
      )
    );
  });

  test("Service update with an valid id, return new character", async () => {
    const new_body = {
      ...DataMock.payloadCharacter,
    };
    await DataAccess.getById.mockResolvedValue(new_body);
    new_body.altura = "200";
    await DataAccess.update.mockResolvedValue(new_body);
    // Update first character from list with new data mock
    const res = await Service.update(DataMock.payloadCharacter, new_body);
    // Expect value from response after update is equal new data mock
    expect(new_body).toStrictEqual(res);
  });
});
