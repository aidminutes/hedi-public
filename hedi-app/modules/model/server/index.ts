export * from "./gqTypes";

import { AssertClientSide } from "@/modules/common/utils/functions";

if (AssertClientSide()) {
  console.error("model/server leaking to client side");
}
