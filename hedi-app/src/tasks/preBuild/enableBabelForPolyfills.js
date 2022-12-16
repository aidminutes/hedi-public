const fs = require("fs");

module.exports = () => {
  fs.renameSync("./.ie11-babelrc", "./.babelrc");
};
