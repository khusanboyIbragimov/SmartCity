const bcrypt = require("bcryptjs");
const db = require("../db/index");

function comparePass(username, password) {
  return bcrypt.compareSync(username, password);
}

function createUser(req, res, next) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);
  return db.one(
    "INSERT INTO users (user_id, username, password, fullname, phone_number, user_imgurl) VALUES (DEFAULT, ${username}, ${password}, ${fullname},${phone_number}, ${user_imgurl}) RETURNING user_id",
    {
      username: req.body.username,
      password: hash,
      fullname: req.body.fullname,
      phone_number: req.body.phone_number,
      user_imgurl: req.body.user_imgurl
    }
  )
}

function loginRequired(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ status: "Please log in" });
  }
  return next();
}


module.exports = {
  comparePass,
  createUser,
  loginRequired
};
