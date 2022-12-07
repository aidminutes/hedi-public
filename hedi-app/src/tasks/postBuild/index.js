const enablePlayground = require("./enablePlayground");
const disableBabelForPolyfills = require("./disableBabelForPolyfills");

async function runAllTasks() {
  console.log("started postBuild tasks");
  try {
    enablePlayground();
    disableBabelForPolyfills();
  } catch (err) {
    console.log("error in postBuild:", err);
  }
  console.log("postBuild tasks done");
}

runAllTasks();
