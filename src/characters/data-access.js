const AwsConfigure = require("../shared/aws-configure");
const TableName = require("../shared/tableNames");
const { default: axios } = require("axios");
const externalApis = require("../shared/externalApis");
const { v4 } = require("uuid");

const translateObject = async (arrayOfObjects = []) => {
  let newString = "";
  arrayOfObjects.forEach((obj) => {
    Object.values(obj).forEach((value) => {
      newString = newString + value + "|";
    });
  });
  newString = await AwsConfigure.TranslateText(newString);
  const replaced = newString.split("|");
  let index = 0;
  arrayOfObjects.forEach((obj) => {
    Object.keys(obj).forEach((key) => {
      obj[key] = String(replaced[index]).toUpperCase().trim();
      index++;
    });
  });
  return arrayOfObjects;
};

const getAll = async () => {
  // Instance a dynamodb client
  const dynamodb = AwsConfigure.DynamoDBClient(this.options);
  // Get all dynamodb documents
  const result = await dynamodb
    .scan({
      TableName: TableName.Characters,
    })
    .promise();

  return result.Items;
};
const create = async (payload) => {
  let newPayload = { ...payload };
  // Parse Upper Case Payload
  Object.keys(newPayload).forEach((key) => {
    newPayload[key] = String(newPayload[key]).toUpperCase();
  });
  // Instance a dynamodb client
  const dynamodb = AwsConfigure.DynamoDBClient(this.options);
  // Get data from payload
  const {
    nombre,
    altura,
    masa,
    color_cabello,
    color_piel,
    color_ojo,
    cumpleanio,
    genero,
  } = newPayload;
  // Create an id from uuid package
  const id = v4();
  // Create character for create document after
  const newCharacter = {
    id,
    nombre,
    altura,
    masa,
    color_cabello,
    color_piel,
    color_ojo,
    cumpleanio,
    genero,
  };
  // Create dynamodb document
  await dynamodb
    .put({
      TableName: TableName.Characters,
      Item: newCharacter,
    })
    .promise();

  return newCharacter;
};

const getById = async (id) => {
  // Instance a dynamodb client
  const dynamodb = AwsConfigure.DynamoDBClient(this.options);
  // Get dynamodb document from id
  const result = await dynamodb
    .get({
      TableName: TableName.Characters,
      Key: {
        id,
      },
    })
    .promise();

  return result.Item;
};

const update = async (id, payload) => {
  let newPayload = { ...payload };
  // Parse Upper Case Payload
  Object.keys(newPayload).forEach((key) => {
    newPayload[key] = String(newPayload[key]).toUpperCase();
  });
  // Instance a dynamodb client
  const dynamodb = AwsConfigure.DynamoDBClient(this.options);
  // Get data from payload
  const {
    nombre,
    altura,
    masa,
    color_cabello,
    color_piel,
    color_ojo,
    cumpleanio,
    genero,
  } = newPayload;
  // Update dynamodb document
  const res = await dynamodb.update({
    TableName: TableName.Characters,
    Key: {
      id,
    },
    UpdateExpression:
      "set nombre = :nombre, altura = :altura, masa = :masa, color_cabello = :color_cabello, color_piel = :color_piel, color_ojo = :color_ojo, cumpleanio = :cumpleanio, genero = :genero",
    ExpressionAttributeValues: {
      ":nombre": nombre,
      ":altura": altura,
      ":masa": masa,
      ":color_cabello": color_cabello,
      ":color_piel": color_piel,
      ":color_ojo": color_ojo,
      ":cumpleanio": cumpleanio,
      ":genero": genero,
    },
  });
  return { ...newPayload, id };
};

const deleteOne = async (id) => {
  // Instance a dynamodb client
  const dynamodb = AwsConfigure.DynamoDBClient(this.options);
  // Delete dynamodb document
  await dynamodb
    .delete({
      TableName: TableName.Characters,
      Key: {
        id,
      },
    })
    .promise();
};

const getStarWarsCharacters = async () => {
  try {
    // Get data from STAR WARS API
    const res = await axios.get(`${externalApis.STAR_WARS}/people`);
    return res.data.results;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  translateObject,
  getAll,
  update,
  deleteOne,
  getById,
  create,
  getStarWarsCharacters,
};
