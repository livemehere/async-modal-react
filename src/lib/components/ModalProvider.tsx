import { createElement, ReactNode, useEffect, useRef, useState } from "react";
import { ModalContext } from "../ModalContext";
import { ModalProps, ModalType } from "../types/modal.ts";
import ModalContainer from "./ModalContainer";

interface Props {
  children: ReactNode;
  closeOnOutsideClick?: boolean;
  closeOnRouteChange?: boolean;
}

export const ModalProvider = ({
  children,
  closeOnOutsideClick = true,
  closeOnRouteChange = true,
}: Props) => {
  const [modals, setModals] = useState<ModalType[]>([]);
  const modalIdRef = useRef(0);

  useEffect(() => {
    if (!closeOnOutsideClick) return;
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
  }, [modals, closeOnOutsideClick]);

  useEffect(() => {
    if (!closeOnRouteChange) return;
    const handler = () => {
      modals.forEach((modal) => {
        modal.reject("route change");
      });
    };

    window.addEventListener("popstate", handler);
    return () => {
      window.removeEventListener("popstate", handler);
    };
  }, [closeOnRouteChange]);

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
