import { initDeckBuilder } from "./utils/initDeckBuilder";
import { DeckBuilderSingleton } from "./classes/DeckBuilder";
import { makeSelectors } from "./DOM";

export async function init() {
  await initDeckBuilder();
  makeSelectors(DeckBuilderSingleton.info);
}
