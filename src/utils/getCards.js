import { DeckBuilderSingleton } from "../classes/DeckBuilder";
import { Card, buildImgUrl } from "../classes/Card";
import {
  requestCardsByClass,
  requestCardsBySet,
  requestCardsByType,
  requestCardsByFaction,
  requestCardsByQuality,
  requestCardsByRace,
} from "../api";

const ACTION_BY_SELECTOR_NAME = {
  classes: getCardsByClass,
  sets: getCardsBySet,
  types: getCardsByType,
  factions: getCardsByFaction,
  qualities: getCardsByQuality,
  races: getCardsByRace,
};

const ACTION_BY_METHOD_NAME = {
  byClass: "_playerClass",
  bySet: "_set",
  byType: "_type",
  byFaction: "_faction",
  byQuality: "_rarity",
  byRace: "_race",
};

export async function getCardsByClass(cardClass) {
  const localCardsByClass = DeckBuilderSingleton.getCardsByClass(cardClass);

  if (localCardsByClass) {
    console.log("local");
    return localCardsByClass;
  }

  const apiData = await requestCardsByClass(cardClass);
  console.log("llamada API");
  const cardsByClass = new Map();

  apiData.forEach((cardData) =>
    cardsByClass.set(cardData.cardId, new Card(cardData))
  );
  DeckBuilderSingleton.setCardsByClass(cardClass, cardsByClass);
}

export async function getCardsBySet(cardSets) {
  const localCardsBySet = DeckBuilderSingleton.getCardsBySet(cardSets);

  if (localCardsBySet) {
    console.log("local");
    return localCardsBySet;
  }

  const apiData = await requestCardsBySet(cardSets);
  console.log("llamada API");
  const cardsBySet = new Map();

  apiData.forEach((cardData) =>
    cardsBySet.set(cardData.cardId, new Card(cardData))
  );
  DeckBuilderSingleton.setCardsBySet(cardSets, cardsBySet);
}

export async function getCardsByType(cardTypes) {
  const localCardsByType = DeckBuilderSingleton.getCardsByType(cardTypes);

  if (localCardsByType) {
    console.log("local");
    return localCardsByType;
  }

  const apiData = await requestCardsByType(cardTypes);
  console.log("llamada API");
  const cardsByType = new Map();

  apiData.forEach((cardData) =>
    cardsByType.set(cardData.cardId, new Card(cardData))
  );
  DeckBuilderSingleton.setCardsByType(cardTypes, cardsByType);
}

export async function getCardsByFaction(cardFaction) {
  const localCardsByFaction = DeckBuilderSingleton.getCardsByFaction(
    cardFaction
  );

  if (localCardsByFaction) {
    console.log("local");
    return localCardsByFaction;
  }

  const apiData = await requestCardsByFaction(cardFaction);
  console.log("llamada API");
  const cardsByFaction = new Map();

  apiData.forEach((cardData) =>
    cardsByFaction.set(cardData.cardId, new Card(cardData))
  );
  DeckBuilderSingleton.setCardsByFaction(cardFaction, cardsByFaction);
}

export async function getCardsByQuality(cardQuality) {
  const localCardsByQuality = DeckBuilderSingleton.getCardsByQuality(
    cardQuality
  );

  if (localCardsByQuality) {
    console.log("local");
    return localCardsByQuality;
  }

  const apiData = await requestCardsByQuality(cardQuality);
  console.log("llamada API");
  const cardsByQuality = new Map();

  apiData.forEach((cardData) =>
    cardsByQuality.set(cardData.cardId, new Card(cardData))
  );
  DeckBuilderSingleton.setCardsByQuality(cardQuality, cardsByQuality);
}

export async function getCardsByRace(cardRace) {
  const localCardsByRace = DeckBuilderSingleton.getCardsByRace(cardRace);

  if (localCardsByRace) {
    console.log("local");
    return localCardsByRace;
  }

  const apiData = await requestCardsByRace(cardRace);
  console.log("llamada API");
  const cardsByRace = new Map();

  apiData.forEach((cardData) =>
    cardsByRace.set(cardData.cardId, new Card(cardData))
  );
  DeckBuilderSingleton.setCardsByRace(cardRace, cardsByRace);
}

export async function getCardsBySelector(event) {
  const loader = document.createElement("div");
  loader.className = "loader";
  let cardsArea = document.getElementById("hearthStone_cardSelector");
  const { name, value } = event.target;
  const getCardsMethod = ACTION_BY_SELECTOR_NAME[name];
  let methodName = "by" + getCardsMethod.name.slice(10);

  console.log(name); // nombre selector
  console.log(value); // valor del selector

  // si no hay nada de cartas y deck vacio
  if (
    Object.keys(DeckBuilderSingleton.cards[methodName]).length == 0 &&
    DeckBuilderSingleton.cards.all.size == 0
  ) {
    cardsArea.innerHTML = "";
    cardsArea.appendChild(loader);
    await getCardsMethod(value);
    const localCards = DeckBuilderSingleton[getCardsMethod.name](value);
    cardsArea.innerHTML = "";
    await renderImg(localCards, value);
  } else if (DeckBuilderSingleton.cards.all.size > 0) {
    // si ya hay cartas
    if (Object.keys(DeckBuilderSingleton.cards[methodName]).length > 0) {
      // si ya hay cartas en selector
      console.log("mismo selector: reset, borrar pantalla, volver a llamar");
      DeckBuilderSingleton.cards[methodName] = {}; // reset
      DeckBuilderSingleton.cards.all.clear(); // si quitas esto, se bloquea
      cardsArea.innerHTML = ""; // borra pantalla
      getCardsBySelector(event); // vuelve a entrar en esta misma funcion.
    }
    // si el cards.By(loquesea) esta vacio
    else if (Object.keys(DeckBuilderSingleton.cards[methodName]).length == 0) {
      console.log("Filtrado");
      filter(methodName, value);
    }
  }
}

async function filter(method, select) {
  const _method = ACTION_BY_METHOD_NAME[method];
  const all_method = Object.keys(ACTION_BY_SELECTOR_NAME);
  let localCards = DeckBuilderSingleton.cards.all;
  let filterSelection = DeckBuilderSingleton;
  let cardsArea = document.getElementById("hearthStone_cardSelector");

  if (all_method.includes(select) === true) {
    cardsArea.innerHTML = "";
    await renderImg(filterSelection.cards.all);
    console.log("quita filtrado");
    console.log(DeckBuilderSingleton.cards);
    console.log(select);
  }

  if (all_method.includes(select) === false) {
    filterSelection._filtradas = [];
    localCards.forEach(function (a) {
      if (a[_method] == select) {
        filterSelection.addFilter(a._id);
      }
    });

    console.log(filterSelection.showFilter());
    cardsArea.innerHTML = "";
    if (filterSelection.showFilter().length > 0) {
      await renderImg(filterSelection.showFilter());
    } else {
      alert("No hay cartas con su criterio de búsqueda");
    }
  }
}

async function renderImg(localCards) {
  /// RENDERIZADO DE IMAGENES //////
  const cardSelector = document.getElementById("hearthStone_cardSelector");
  cardSelector.addEventListener("click", addDeck);

  for (let name of localCards) {
    const cardImg = document.createElement("img");
    cardSelector.appendChild(cardImg);
    cardImg.id = name;
    cardImg.className = "card";
    const url = await buildImgUrl(name);
    cardImg.addEventListener("error", function () {
      cardImg.remove();
    });
    cardImg.src = url;
  }
}

//// FUNCIONES DE EVENT LISTENER //////////

function addDeck(event) {
  let maze = document.getElementById("hearthStone_deckBuilderCards");
  const cardId = event.target.id;
  const cardData = DeckBuilderSingleton.getCardsById(cardId);
  let li = document.createElement("li");
  li.innerHTML = cardData._name;
  li.id = cardData._name;

  li.addEventListener("mouseover", function () {
    // añade el sumario de la carta
    const cardData = DeckBuilderSingleton.getCardsById(cardId);
    document.getElementById("internal").innerHTML += cardData._id;
    document.getElementById("name").innerHTML += cardData._name;
    document.getElementById("set").innerHTML += cardData._set;
    document.getElementById("type").innerHTML += cardData._type;
    document.getElementById("cost").innerHTML += cardData._cost;
    document.getElementById("text").innerHTML += cardData._text;
    document.getElementById("playerclass").innerHTML += cardData._playerClass;
  });

  li.addEventListener("mouseleave", cardSummaryHide);
  li.addEventListener("click", function () {
    document.getElementById(cardData._name).remove();
    DeckBuilderSingleton.removeDeck(cardData._id);
    cardSummaryHide();
  });
  maze.appendChild(li);
  DeckBuilderSingleton.addDeck(cardData);
  const ensena = DeckBuilderSingleton.showDeck();
  console.log(ensena);
}

function cardSummaryHide() {
  // Elimina el Sumario de la carta.

  document.getElementById("internal").innerHTML = "Internal ID: ";
  document.getElementById("name").innerHTML = "Name: ";
  document.getElementById("set").innerHTML = "Set: ";
  document.getElementById("type").innerHTML = "Type: ";
  document.getElementById("cost").innerHTML = "Cost: ";
  document.getElementById("text").innerHTML = "Text: ";
  document.getElementById("playerclass").innerHTML = "PlayerClass: ";
}
