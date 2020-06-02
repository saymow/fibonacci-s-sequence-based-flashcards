const database = require("./../database/connection");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const authConfig = require("../config/auth.json");


module.exports = {
  async signUp(req, res) {
    const { name, username, email, password } = req.body;

    const emailquery = await database.query("SELECT * FROM users WHERE email = ?", [email]).then(rows => rows)

    if (emailquery.length !== 0)
      return res.status(200).json({error: {type:"email",text: "Email already in use."}});

    bcrypt.hash(password, saltRounds).then(async hash => {
      const data = await database.query("INSERT INTO users (name, username, email, password) VALUES(?,?,?,?)",
        [name, username, email, hash]).then(rows => {
          console.log(rows.insertId)
          return rows
        });
      
      res.json({
        token: generateToken({id: data.insertId}),
        user: {
          name,
          email
        }
      });
    })
    
  },

  async singIn(req, res) {
    const { email, password } = req.body;

    const user = await database.query("SELECT * FROM users WHERE email = ?", [email]).then(rows => rows);

    if (user.length === 0)
      return res.status(200).json({error: {type:"email",text:"Email not registed."}})

    if (!await bcrypt.compare(password, user[0].password))
      return res.status(200).json({error: {type:"password",text: "Invalid password."}})
     
    let id = user[0].id;
    user[0].password = undefined;
    user[0].id = undefined;
    
    res.json({
      user: user[0],
      token: generateToken({ id })
    })

  },
};

function generateToken(params = {}){
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
}