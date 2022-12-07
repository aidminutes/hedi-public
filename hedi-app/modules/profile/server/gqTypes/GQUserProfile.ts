import { UserProfile } from "../../types";
import { GQPersonal } from "./GQPersonal";
import { GQProfessional } from "./GQProfessional";
import { GQMidwife } from "./GQMidwife";
import { withMultiform } from "@/modules/graphql/server/gq-ts/decorators";

export const GQUserProfile /* : UserProfile */ = withMultiform(
  GQPersonal,
  GQProfessional,
  GQMidwife
);
