const Joi = require("joi");
const Response = require("../shared/response");

const create = async (payload) => {
  const schema = Joi.object()
    .keys({
      nombre: Joi.string().required(),
      altura: Joi.number().required(),
      masa: Joi.number().required(),
      color_cabello: Joi.string().required(),
      color_piel: Joi.string().required(),
      color_ojo: Joi.string().required(),
      cumpleanio: Joi.string().required(),
      cumpleanio: Joi.string().required(),
      genero: Joi.string().required(),
    })
    .required();
  try {
    await schema.validateAsync(payload);
  } catch (error) {
    throw Response.responseValidation(error.details);
  }
};

module.exports = { create };
