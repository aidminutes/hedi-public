import { useState, useEffect } from "react";

export const konamiSequence = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export default function useKonamiCode(
  codeSequence = konamiSequence,
  callback = () => {}
) {
  const [showEasteregg, setShowEasteregg] = useState(false);
  const [sequence, setSequence] = useState([""]);

  const onKeyDown = (event: KeyboardEvent) =>
    setSequence(prev => [...prev, event.key]);

  useEffect(() => {
    sequence.forEach((key, i) => {
      if (key !== codeSequence[i]) {
        setSequence([]);
      }
    });

    if (sequence.toString() === codeSequence.toString()) {
      setShowEasteregg(!showEasteregg);
      callback();
    }
  }, [sequence]);

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  return { sequence, showEasteregg };
}
