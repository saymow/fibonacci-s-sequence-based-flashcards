const express = require("express");

const authMiddleWare = require("./middleWare/auth");

const authController = require("./controllers/authController");
const deckController = require("./controllers/deckController");
const cardController = require("./controllers/cardController");


const routes = express.Router();

routes.post("/register", authController.signUp);
routes.post("/login", authController.singIn);

routes.get("/decks", authMiddleWare, deckController.listDecks);
routes.post("/decks", authMiddleWare, deckController.createDeck);
routes.put("/decks", authMiddleWare, deckController.editDeck);
routes.delete("/decks", authMiddleWare, deckController.deleteDeck);
routes.patch("/decks", authMiddleWare, deckController.retrieveDeck);

routes.post("/create_card", authMiddleWare, cardController.createCards);
routes.post("/get_cards", authMiddleWare, cardController.getCards);
routes.patch("/update_card", authMiddleWare, cardController.updateCard);


module.exports = routes;