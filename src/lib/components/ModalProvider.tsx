import { createElement, ReactNode, useEffect, useRef, useState } from "react";
import { ModalContext } from "../ModalContext";
import { ModalProps, ModalType } from "../types/modal.ts";
import ModalContainer from "./ModalContainer";

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modals, setModals] = useState<ModalType[]>([]);
  const modalIdRef = useRef(0);

  useEffect(() => {
    const modalRoot = document.getElementById("modal-root");
    if (!modalRoot) return;

    const handler = (e: MouseEvent) => {
      let flag = false;
      for (let i = 0; i < modalRoot.children.length; i++) {
        if (modalRoot.children[i].contains(e.target as Node)) {
          flag = true;
          break;
        }
      }
      if (!flag) {
        const modal = modals[modals.length - 1];
        if (modal) {
          modal.reject("click outside");
        }
      }
    };

    window.addEventListener("mousedown", handler);
    return () => {
      window.removeEventListener("mousedown", handler);
    };
  }, [modals]);

  const showModal = modals.length > 0;
  return (
    <ModalContext.Provider value={{ modals, setModals, modalIdRef }}>
      {showModal && (
        <ModalContainer>
          {modals.map((modal) => {
            return createElement<ModalProps & any>(modal.component, {
              ...modal.props,
              close: modal.close,
              resolve: modal.resolve,
              reject: modal.reject,
              key: `modal-${modal.id}`,
            });
          })}
        </ModalContainer>
      )}
      {children}
    </ModalContext.Provider>
  );
};
