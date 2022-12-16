const fs = require("fs");

module.exports = () => {
  fs.rmdirSync("./temp/playground", { recursive: true });
  fs.renameSync("./pages/playground", "./temp/playground");
};
