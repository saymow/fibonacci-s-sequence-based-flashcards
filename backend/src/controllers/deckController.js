const database = require("./../database/connection");

module.exports = {
  async listDecks(req, res) {
    const { userId } = req;

    const data = await database
      .query(
        "SELECT DE.user_id, DE.id, DE.title, DE.limit_new_cards, DE.limit_old_cards, DE.deleted, " +
        "count(distinct TCA.id) total_cards, count(distinct NCA.id) new_cards, count(distinct OCA.id) due_cards " +  
        "FROM decks as DE " +
        "LEFT JOIN cards AS TCA ON TCA.deck_id = DE.id " +
        "LEFT JOIN cards AS NCA ON NCA.deck_id = DE.id AND NCA.is_new = 1 " +
        "LEFT JOIN cards AS OCA ON OCA.deck_id = DE.id AND OCA.due_date <= current_date() " +
        "WHERE DE.user_id = ? GROUP BY DE.id",
          [userId]
      )
      .then((data) => data)
      .catch((err) => {
        throw err;
      })

      console.log(data)

    res.json(data);
  },

  async createDeck(req, res) {
    const { title, limit_new_cards, limit_old_cards } = req.body;
    const { userId } = req;

    console.log(userId);

    const exists = await database
      .query("SELECT * FROM decks WHERE user_id = ? and title = ?", [
        userId,
        title,
      ])
      .then((data) => data);

    if (exists.length !== 0)
      return res
        .status(200)
        .json({ error: { message: "Card name already in use." } });

    await database
      .query(
        "INSERT INTO decks(user_id ,title, limit_new_cards, limit_old_cards) VALUES (?,?,?,?)",
        [userId, title, limit_new_cards, limit_old_cards]
      )
      .then((data) => data)
      .catch((err) => {
        throw err;
      });

    res.json();
  },

  async editDeck(req, res) {
    const { id, title, limit_new_cards, limit_old_cards } = req.body;
    const { userId } = req;

    console.log(req.body);

    await database
      .query(
        "UPDATE decks SET title = ?, limit_new_cards = ?, limit_old_cards = ? WHERE user_id = ? and id = ?",
        [title, limit_new_cards, limit_old_cards, userId, id]
      )
      .then((data) => data)
      .catch((err) => {
        throw err;
      });

    res.json();
  },

  async deleteDeck(req, res) {
    const { userId } = req;
    const { id } = req.body;

    console.log(req);
    /* DELETE DATE WILL BE 24 HOURS AFTER REQUEST */
    const deleteDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

    console.log(deleteDate);

    await database
      .query("UPDATE decks SET deleted = ? WHERE user_id = ? and id = ?", [
        deleteDate,
        userId,
        id,
      ])
      .then((data) => data)
      .catch((err) => {
        throw err;
      });

    res.json();
  },

  async retrieveDeck(req, res) {
    const { userId } = req;
    const { id } = req.body;

    console.log(req);

    await database
      .query("UPDATE decks SET deleted = ? WHERE user_id = ? and id = ?", [
        null,
        userId,
        id,
      ])
      .then((data) => data)
      .catch((err) => {
        throw err;
      });

    res.json();
  },
};
