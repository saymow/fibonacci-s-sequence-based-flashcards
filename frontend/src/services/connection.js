import Api from "./api";

const deckManager = {
  async getDecks() {
    const response = await Api.get("/decks");

    return response.data;
  },

  async createDeck(title, limit_new_cards, limit_old_cards) {
    await Api.post("/decks", {
      title,
      limit_new_cards,
      limit_old_cards,
    });
  },

  async manageDeck(id, title, limit_new_cards, limit_old_cards) {
    await Api.put("/decks", {
      id,
      title,
      limit_new_cards,
      limit_old_cards,
    });
  },

  async deleteDeck(id) {
    await Api.delete("/decks", {
      data: {
        id,
      },
    });
  },

  async retrieveDeck(id) {
    await Api.patch("/decks", {
      id,
    });
  },

  async createCard(deckId, frontSide, backSide) {
    await Api.post("/create_card", {
      deckId,
      frontSide,
      backSide,
    });
  },

  async getCards(deckId, limit_new_cards, limit_old_cards) {
    const response = await Api.post("/get_cards", {
      deckId,
      limit_new_cards,
      limit_old_cards,
    });

    return response.data;
  },

  async updateCard(deckId, id, logx, logy) {
    await Api.patch("/update_card", {
      deckId,
      id,
      logx,
      logy
    })
  }
};

export default deckManager;
