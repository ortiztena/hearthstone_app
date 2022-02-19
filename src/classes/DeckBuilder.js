export class DeckBuilder {
  init(apiData) {
    const { classes, sets, types, factions, qualities, races } = apiData;

    this._info = { classes, sets, types, factions, qualities, races };
    this._cards = {
      all: new Map(),
      byClass: {},
      bySet: {},
      byType: {},
      byFaction: {},
      byQuality: {},
      byRace: {},
      
    },
    this._deck = [];  //#############/// 
    this._filtradas = [];
  }

  ///###########################///// Filtros
  addFilter(cardid){
  
    if( this._filtradas.includes(cardid) === false){
    this._filtradas.push(cardid)}
    else {console.log("nada")};
  }
  removeFilter(cardid){
  this._filtradas.pop(cardid)
  }
  showFilter(){
    return this._filtradas;
  }

  ///###########################///// DECK
  addDeck(cardid) {
    
    this._deck.push(cardid);
  }
  removeDeck(cardid) {
    this._deck.pop(cardid);
  }
  showDeck() {
    return this._deck;
  }
  ///###########################///// 

  get info() {
    return this._info;
  }

  get cards() {
    return this._cards;
  }

  getCardsAll(){
    return this._cards.all;
  }

  getCardsById(id) {
    return this._cards.all.get(id);
  }

  getCardsByClass(cardClass) {
    if (this._cards.byClass.hasOwnProperty(cardClass)) {
      return this._cards.byClass[cardClass];
    }
  }

  getCardsBySet(cardSets) {
  if (this._cards.bySet.hasOwnProperty(cardSets)) {
      return this._cards.bySet[cardSets];
    }
  }

  getCardsByType(cardTypes) {
    if (this._cards.byType.hasOwnProperty(cardTypes)) {
        return this._cards.byType[cardTypes];
      }
  }

  getCardsByFaction(cardFaction) {
    if (this._cards.byFaction.hasOwnProperty(cardFaction)) {
        return this._cards.byFaction[cardFaction];
      }
  }

  getCardsByQuality(cardQuality) {
    if (this._cards.byQuality.hasOwnProperty(cardQuality)) {
      return this._cards.byQuality[cardQuality];
    }
  }
  
  getCardsByRace(cardRace) {
    if (this._cards.byRace.hasOwnProperty(cardRace)) {
      return this._cards.byRace[cardRace];
    }
  }

  setCardsByClass(cardClass, cardsByClass) {
    this._cards.all = new Map([...this._cards.all, ...cardsByClass]);
    this._cards.byClass[cardClass] = cardsByClass.keys();
  }

  setCardsBySet(cardSets, cardsBySets) {
    this._cards.all = new Map([...this._cards.all, ...cardsBySets]);
    this._cards.bySet[cardSets] = cardsBySets.keys();
  }

  setCardsByType(cardTypes, cardsByTypes) {
    this._cards.all = new Map([...this._cards.all, ...cardsByTypes]);
    this._cards.byType[cardTypes] = cardsByTypes.keys();
  }

  setCardsByFaction(cardFaction, cardsByFaction) {
    this._cards.all = new Map([...this._cards.all, ...cardsByFaction]);
    this._cards.byFaction[cardFaction] = cardsByFaction.keys();
  }

  setCardsByQuality(cardQuality, cardsByQuality) {
    this._cards.all = new Map([...this._cards.all, ...cardsByQuality]);
    this._cards.byQuality[cardQuality] = cardsByQuality.keys();
  }
  
  setCardsByRace(cardRace, cardsByRace) {
    this._cards.all = new Map([...this._cards.all, ...cardsByRace]);
    this._cards.byRace[cardRace] = cardsByRace.keys();
  }
}

export const DeckBuilderSingleton = new DeckBuilder();




