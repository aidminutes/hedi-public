export function ExecutionMode() {
  if (process.env.NODE_ENV === "production")
    return !process.env.JEST_WORKER_ID ? "regeneration" : "build";
  else return process.env.NODE_ENV;
}
