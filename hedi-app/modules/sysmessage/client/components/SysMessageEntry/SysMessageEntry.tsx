import { Row, Column } from "carbon-components-react";
import { ISysMessageEntryProps } from ".";
import { isIStateful } from "@/modules/model";
import { TransitionButtons } from "@/modules/common/client/components/TransitionButtons";

export const SysMessageEntry: React.FC<ISysMessageEntryProps> = (
  props
): JSX.Element => {
  const { type, message, source } = props;

  const kind = props.kind ?? "SysMessageEntry";

  const classNames = [
    `hedi--sys-message-type--${type.toLowerCase()}`,
    `hedi--sys-message-type--${kind.toLowerCase()}`,
    "hedi--sys-message-entry",
  ];

  return (
    <Row as="section" className={classNames.join(" ")}>
      <Column sm={4} md={6} lg={13}>
        <div className="hedi--sys-message-entry__content--wrap">
          <div className="hedi--sys-message-entry__content">
            <div
              className="hedi--sys-message-entry__content__message"
              dangerouslySetInnerHTML={{ __html: message }}></div>
            {isIStateful(source) ? (
              <TransitionButtons statefulEntity={source} />
            ) : null}
          </div>
        </div>
      </Column>
    </Row>
  );
};
