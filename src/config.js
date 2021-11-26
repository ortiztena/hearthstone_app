export const DATA_API_HOST = 'omgvamp-hearthstone-v1.p.rapidapi.com';
export const DATA_API_TOKEN = '30d84eb62bmshf62be082dbd55afp135f9cjsnac3080191278';

export const DATA_API = `https://${DATA_API_HOST}`;
export const IMAGES_API = 'https://art.hearthstonejson.com/v1/render/latest/enUS/256x';

export const ENDPOINTS = {
  ALL : `${DATA_API}/cards`,
  INFO: `${DATA_API}/info`,
  CLASSES: `${DATA_API}/cards/classes`,
  SETS: `${DATA_API}/cards/sets`,
  TYPES: `${DATA_API}/cards/types`,
  FACTIONS: `${DATA_API}/cards/factions`,
  QUALITIES: `${DATA_API}/cards/qualities`,
  RACES: `${DATA_API}/cards/races`,
  IMAGES: IMAGES_API
};
