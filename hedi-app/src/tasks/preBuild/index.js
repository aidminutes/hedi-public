const disablePlayground = require("./disablePlayground");
const enableBabelForPolyfills = require("./enableBabelForPolyfills");

async function runAllTasks() {
  console.log("started preBuild tasks");
  try {
    disablePlayground();
    enableBabelForPolyfills();
  } catch (err) {
    console.log("error in preBuild:", err);
  }
  console.log("preBuild tasks done");
}

runAllTasks().catch(err => console.log(err));
