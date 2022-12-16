import { IBlankLayout } from "../types/IBlankLayout";
import { IWithGroupClass } from "../types/IWithGroupClass";

export const Blank: React.FC<IBlankLayout & IWithGroupClass> = ({
  children,
  groupClass,
}) => <>{children && <div className={groupClass}>{children}</div>}</>;
