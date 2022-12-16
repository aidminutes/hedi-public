import { Body, TextArea } from "@/modules/components";
import { IBodyComponent, ITextAreaComponent } from "@/modules/components/types";

export const FeedbackInput = ({
  body,
  textArea,
}: {
  body: IBodyComponent | undefined;
  textArea: ITextAreaComponent | undefined;
}) => {
  return (
    <div className="hedi--userfeedback-item">
      {body && (
        <div className="hedi--userfeedback-text">
          <Body {...body}></Body>
        </div>
      )}
      {textArea && <TextArea {...textArea} name={textArea.id} />}
    </div>
  );
};
