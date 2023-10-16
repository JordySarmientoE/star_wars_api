class Character {
  constructor(payload) {
    this.nombre = payload.name || "";
    this.altura = payload.height || "";
    this.masa = payload.mass || "";
    this.color_cabello = payload.hair_color || "";
    this.color_piel = payload.skin_color || "";
    this.color_ojo = payload.eye_color || "";
    this.cumpleanio = payload.birth_year || "";
    this.genero = payload.gender || "";
  }
}

module.exports = Character;
