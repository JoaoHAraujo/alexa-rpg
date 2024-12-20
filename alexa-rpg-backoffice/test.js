const crypto = require("crypto");

function generateSHA256Hash(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

const password = "alexaRPG";
const hashedPassword = generateSHA256Hash(password);
console.log("SHA-256 Hashed Password:", hashedPassword);
