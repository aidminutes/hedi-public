const fs = require("fs");

module.exports = () => {
  fs.renameSync("./temp/playground", "./pages/playground");
};
