require('dotenv').config();

const bcrypt = require('bcrypt');

const Bcrypt = {
  rounds: Number(process.env.CRYPT_ROUNDS) || 8,
  hash(password) {
    return bcrypt.hash(password, this.rounds);
  },
  compare(password, hash) {
    return bcrypt.compare(password, hash);
  },
};

module.exports = Bcrypt;
