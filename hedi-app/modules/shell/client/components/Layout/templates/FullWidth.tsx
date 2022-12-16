import { HeroImage } from "@/modules/common/client/components";
import { IFullWidthLayout } from "../types/IFullWidthLayout";
import { IWithGroupClass } from "../types/IWithGroupClass";

export const FullWidth: React.FC<IFullWidthLayout & IWithGroupClass> = ({
  children,
  groupClass,
  poster,
}) => (
  <>
    <HeroImage layout="fill" {...poster} />
    {children && <div className={groupClass}>{children}</div>}
  </>
);
