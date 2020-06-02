const database = require("../database/connection");

module.exports = {
  async createCards(req, res) {
    const { frontSide, backSide, deckId } = req.body;
    const { userId } = req;

    console.log(frontSide, backSide);

    if (!deckId) return res.status(401).json({ error: "No deck id provided" });

    const userOwnsThisdeck = await database
      .query("SELECT * FROM decks WHERE user_id = ? and id = ?", [
        userId,
        deckId,
      ])
      .then((data) => data)
      .catch((err) => {
        throw err;
      });

    if (userOwnsThisdeck.length !== 1)
      return res
        .status(401)
        .json({ error: "You do not own the deck you are trying to add cards" });

    await database
      .query(
        "INSERT INTO cards(deck_id, front_side, back_side, is_new) VALUES (?,?,?,?)",
        [deckId, frontSide, backSide, true]
      )
      .then((data) => data)
      .catch((err) => {
        throw err;
      });

    res.json();
  },

  async getCards(req, res) {
    const { deckId, limit_new_cards, limit_old_cards } = req.body;
    const { userId } = req;

    console.log(req.body);

    if (!deckId) return res.status(401).json({ error: "No deck id provided" });

    const userOwnsThisdeck = await database
      .query("SELECT * FROM decks WHERE user_id = ? and id = ?", [
        userId,
        deckId,
      ])
      .then((data) => data)
      .catch((err) => {
        throw err;
      });

    if (userOwnsThisdeck.length !== 1)
      return res
        .status(401)
        .json({ error: "You do not own the deck you are trying to get cards" });

    const response = await database
      .query(
        "(SELECT id, front_side, back_side, is_new, logx, logy FROM cards WHERE deck_id = ? and is_new = 1 LIMIT ?)" +
          "UNION" +
          "(SELECT id, front_side, back_side, is_new, logx, logy FROM cards WHERE deck_id = ? and due_date <= current_date() LIMIT ?)" +
          "ORDER BY is_new DESC",
        [deckId, limit_new_cards, deckId, limit_old_cards]
      )
      .then((data) => data)
      .catch((err) => {
        throw err;
      });

    console.log(response);

    return res.status(200).json(response);
  },

  async updateCard(req, res) {
    const { deckId, id, logx, logy } = req.body;
    const { userId } = req;

    if (!deckId) return res.status(401).json({ error: "No deck id provided" });

    const userOwnsThisdeck = await database
      .query("SELECT * FROM decks WHERE user_id = ? and id = ?", [
        userId,
        deckId,
      ])
      .then((data) => data)
      .catch((err) => {
        throw err;
      });

    if (userOwnsThisdeck.length !== 1)
      return res
        .status(401)
        .json({ error: "You do not own the deck you are trying to review" });

    const date = new Date(new Date().getTime() + 7 * (24 * 60 * 60 * 1000));

    /* getMonth() is zero indexed*/ 
    const dateFormated = [
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDay(),
    ].join("-");

    await database
      .query("UPDATE cards SET is_new = ?, logx = ?, logy = ?, due_date = DATE(?) WHERE id = ?", [
        false,
        logx,
        logy,
        dateFormated,
        id
      ])
      .then((data) => data)
      .catch((err) => {
        throw err;
      });

    res.json();
  },
};
