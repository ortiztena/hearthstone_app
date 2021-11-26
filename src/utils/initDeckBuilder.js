import { requestInfo } from "../api";
import { DeckBuilderSingleton } from "../classes/DeckBuilder";

export async function initDeckBuilder() {
  const info = await requestInfo();

  DeckBuilderSingleton.init(info);
}
