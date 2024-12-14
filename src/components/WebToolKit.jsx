import { useEffect } from "react";

export const WebToolKit = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      input:focus, button:focus {
        outline: none !important;
        box-shadow: none !important;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return null;
};
