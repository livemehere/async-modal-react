import { createContext } from "react";
import { ModalContextProps } from "./types/modal.ts";

export const ModalContext = createContext<ModalContextProps>({
  modals: [],
  setModals: () => {},
  modalIdRef: { current: 0 },
});
