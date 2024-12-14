import { useEffect } from "react";

export const WebToolKit = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      /* Remove outline and box shadow on focus */
      input:focus, button:focus {
        outline: none !important;
        box-shadow: none !important;
      }

      /* Prevent background color change on focus */
      input:-webkit-autofill, input:-webkit-autofill:focus {
        background-color: transparent !important;
        box-shadow: none !important;
        -webkit-text-fill-color: var(--text-color) !important; /* Set text color if autofill is triggered */
      }

      /* Prevent autofill background change */
      input[autocomplete="off"] {
        background-color: transparent !important;
      }

      /* Optional: Ensure there is no auto-complete suggestions box */
      input::-webkit-contacts-auto-fill-button {
        visibility: hidden;
      }

      /* Prevent background color flicker when autofill happens */
      input[type="text"], input[type="email"], input[type="password"] {
        background-color: var(--object-bg) !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null;
};
