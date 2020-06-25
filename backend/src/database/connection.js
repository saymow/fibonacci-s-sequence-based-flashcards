const mysql = require("mysql");

// A SIMPLE WAY TO "PROMISIFY" database queries, instead of using a plenty of callbacks.
// font: https://codeburst.io/node-js-mysql-and-promises-4c3be599909b

class Database {
  constructor(config) {
    this.connection = mysql.createConnection(config);
  }
  query(sql, args) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }
  connect() {
    this.connection.connect((error) => {
      if (error) return console.log(error);
      console.log("Connected with database.");
    });
  }
  close() {
    return new Promise((resolve, reject) => {
      this.connection.end((err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }
}

const database = new Database({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "password",
  database: "my_db",
});

database.connect();

module.exports = database;


// Database queries to create respective tables: 

// CREATE TABLE `users` (
//   `id` int NOT NULL AUTO_INCREMENT,
//   `name` varchar(255) NOT NULL,
//   `username` varchar(36) NOT NULL,
//   `email` varchar(320) NOT NULL,
//   `password` varchar(60) NOT NULL,
//   PRIMARY KEY (`id`)
// ) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8

// CREATE TABLE `decks` (
//   `user_id` int NOT NULL,
//   `id` int NOT NULL AUTO_INCREMENT,
//   `title` varchar(20) NOT NULL,
//   `limit_new_cards` smallint NOT NULL,
//   `limit_old_cards` smallint NOT NULL,
//   `deleted` timestamp NULL DEFAULT NULL,
//   PRIMARY KEY (`id`),
//   KEY `user_id` (`user_id`),
//   CONSTRAINT `decks_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
// ) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8

// CREATE TABLE `cards` (
//   `deck_id` int DEFAULT NULL,
//   `id` int NOT NULL AUTO_INCREMENT,
//   `front_side` varchar(5000) DEFAULT NULL,
//   `back_side` varchar(5000) DEFAULT NULL,
//   `is_new` tinyint(1) DEFAULT NULL,
//   `logx` smallint DEFAULT NULL,
//   `logy` smallint DEFAULT NULL,
//   `due_date` date DEFAULT NULL,
//   PRIMARY KEY (`id`),
//   KEY `deck_id` (`deck_id`),
//   CONSTRAINT `cards_ibfk_1` FOREIGN KEY (`deck_id`) REFERENCES `decks` (`id`)
// ) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8


// SQL EVENT DO DELETE MARKED CARDS

// CREATE DEFINER=`root`@`localhost` 
// EVENT `autoDeleteCards` 
// ON SCHEDULE EVERY 1 MINUTE 
// STARTS '2020-05-23 20:25:02' ON COMPLETION NOT PRESERVE ENABLE 
// COMMENT 'Delete cards' 
//   DO 
// DELETE FROM my_db.decks WHERE deleted < NOW()