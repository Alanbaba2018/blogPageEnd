const fs = require('fs');

function readJson(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject({});
      } else {
        const str = data.toString();
        resolve(JSON.parse(str));
      }
    })
  });
}

module.exports = {
  readJson
}
