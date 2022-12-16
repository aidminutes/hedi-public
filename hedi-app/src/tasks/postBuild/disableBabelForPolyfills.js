const fs = require("fs");

module.exports = () => {
  fs.renameSync("./.babelrc", "./.ie11-babelrc");
};
