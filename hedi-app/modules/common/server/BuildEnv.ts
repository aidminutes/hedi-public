export type BuildEnv = "local" | "staging" | "production" | "sandbox";

export function getBuildEnv(): BuildEnv {
  return (process.env.BUILD_ENV as BuildEnv) ?? "local";
}
