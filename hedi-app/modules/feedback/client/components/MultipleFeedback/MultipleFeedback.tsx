import { sendFeedbacks } from "@/modules/feedback/client/request/sendFeedback";
import { FeedbackType } from "../../../types";
import { Form } from "carbon-components-react";
import { FormEvent } from "react";

export const MultipleFeedback: React.FC<{
  type: FeedbackType;
  lang: string;
  onSuccess?: () => void;
  onError?: () => void;
  onEmptyError?: () => void;
}> = ({ type, lang, onSuccess, onError, onEmptyError, children }) => {
  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const texts: string[] = [];
    formData.forEach((value, key) => {
      texts.push(value.valueOf().toString());
    });
    if (texts.join("").length) {
      sendFeedbacks(type, texts)
        .then(resp => {
          if (resp && resp.success) {
            if (onSuccess) onSuccess();
          } else {
            if (onError) onError();
          }
        })
        .catch(err => {
          if (onError) onError();
        });
    } else {
      if (onEmptyError) onEmptyError();
    }
    return false;
  };

  return <Form onSubmit={onSubmitHandler}>{children}</Form>;
};
