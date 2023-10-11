import { createContext } from "react";
import {ModalContextProps} from "./modal";

export const ModalContext = createContext<ModalContextProps>({
  modals: [],
  setModals: () => {},
  modalIdRef: { current: 0 },
});
