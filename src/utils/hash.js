require("dotenv").config();
const bcrypt = require("bcrypt");

const getHash = async (data) => {
  const hash = await bcrypt.hash(data, parseInt(process.env.SALT_ROUNDS));
  return hash;
};

module.exports = getHash;
