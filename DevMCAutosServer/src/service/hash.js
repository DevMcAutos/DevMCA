const bcrypt = require("bcrypt");

// Comprobación y creación de Hash

async function createHash(password) {
  const saltRounds = 10;
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcypt.hash(password, salt);
    return hash;
  } catch (error) {
    console.log(error);
  }
}

async function hashVerification(hash, password) {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createHash,
  hashVerification,
};
