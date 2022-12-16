import { ToastNotification, Button } from "@/modules/components";
import {
  IToastNotificationComponent,
  IButtonComponent,
} from "@/modules/components/types";

export interface IFeedbackSubmitProps {
  errorNotification: IToastNotificationComponent | undefined;
  successNotification: IToastNotificationComponent | undefined;
  submitButton: IButtonComponent | undefined;
  errorMessage?: string | null;
  successMessage?: string | null;
}

export const FeedbackSubmit = ({
  errorNotification,
  successNotification,
  submitButton,
  errorMessage,
  successMessage,
}: IFeedbackSubmitProps) => {
  return (
    <div className="hedi--feedback-submit">
      {errorMessage && errorNotification && (
        <ToastNotification
          {...errorNotification}
          subtitle={errorMessage}
          lowContrast
        />
      )}
      {successMessage && successNotification && (
        <ToastNotification
          {...successNotification}
          subtitle={successMessage}
          lowContrast
        />
      )}
      {submitButton && <Button type="submit" size="field" {...submitButton} />}
    </div>
  );
};
