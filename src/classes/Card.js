import { ENDPOINTS } from '../config';

export async function buildImgUrl(id) {
  return `${ENDPOINTS.IMAGES}/${id}.png`;
}

export class Card {
  constructor(apiData) {
    const {
      cardId,
      cardSet,
      name,
      type,
      text,
      playerClass,
      attack,
      health,
      rarity,
      faction,
      cost,
      elite,
      race,
      flavor,
      durability
    } = apiData;

    this._id = cardId;
    this._set = cardSet || 0;
    this._name = name || 0;
    this._type = type || 0;
    this._text = text || 0;
    this._playerClass = playerClass || 0;
    this._attack = attack;
    this._health = health;
    this._rarity = rarity;
    this._faction = faction;
    this._cost = cost || 0;
    this._elite = elite;
    this._race = race;
    this._flavor = flavor;
    this._durability = durability;
    this._img = buildImgUrl(cardId);
  }

  get id() {
    return this._id;
  }
 

  get img() {
    return this._img;
  }

  get name() {
    return this._name;
  }
}
