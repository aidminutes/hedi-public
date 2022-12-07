import { useState, useEffect } from "react";
// timeout in ms
const timeout: number = 3000;

export function useCopyToClipboard(text: string, notText?: string) {
  const [copyText, setCopyText] = useState(text);
  const [isActive, setIsActive] = useState(false);
  const [notificationText, setNotificationText] = useState(
    notText || "Link wurde ins Clipboard kopiert"
  );

  useEffect(() => {
    setCopyText(text);
  }, [text]);
  useEffect(() => {
    setNotificationText(notText || "Link wurde ins Clipboard kopiert");
  }, [notText]);

  const addToClipboard = async () => {
    await navigator.clipboard.writeText(copyText);
    setTimeout(resetNotification, timeout);
    setIsActive(true);
    setTimeout(() => {
      setIsActive(false);
    }, notificationData.timeout);
  };

  const resetNotification = () => {
    setIsActive(false);
  };

  const notificationData = {
    timeout,
    title: notificationText,
  };

  return { addToClipboard, notificationData, isActive };
}
