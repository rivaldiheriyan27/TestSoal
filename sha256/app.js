const CryptoJS = require("crypto-js");

function hash(str) {
    const hash = CryptoJS.SHA256(str);
    return hash.toString(CryptoJS.enc.Hex);
  }
  
  const input = '18032023johnpriaifabula';
  const output = hash(input);
  console.log(output);