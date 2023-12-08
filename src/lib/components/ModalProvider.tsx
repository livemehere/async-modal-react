import { createElement, ReactNode, useEffect, useRef, useState } from "react";
import { ModalContext } from "../ModalContext";
import { ModalProps, ModalType } from "../types/modal.ts";
import ModalContainer from "./ModalContainer";

interface Props {
  children: ReactNode;
  closeOnOutsideClick?: boolean;
  closeOnRouteChange?: boolean;
  disableBodyScrollWhenOpen?: boolean;
}

export const ModalProvider = ({
  children,
  closeOnOutsideClick = true,
  closeOnRouteChange = true,
  disableBodyScrollWhenOpen = true,
}: Props) => {
  const [modals, setModals] = useState<ModalType[]>([]);
  const modalIdRef = useRef(0);
  const originalOverflow = useRef("");

  /* Close Modal when click outside modal.options overwrite global provider props options. */
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
        const individualModalCloseOnOutsideClick =
          modal?.options?.onClickOutsideClose !== undefined
            ? modal.options.onClickOutsideClose
            : disableBodyScrollWhenOpen;

        if (modal && individualModalCloseOnOutsideClick) {
          modal.reject("click outside");
        }
      }
    };

    window.addEventListener("mousedown", handler);
    return () => {
      window.removeEventListener("mousedown", handler);
    };
  }, [modals, closeOnOutsideClick, disableBodyScrollWhenOpen]);

  /* Clear All Modal when popstate change */
  useEffect(() => {
    if (!closeOnRouteChange) return;
    const handler = () => {
      setModals([]);
    };

    window.addEventListener("popstate", handler);
    return () => {
      window.removeEventListener("popstate", handler);
    };
  }, [closeOnRouteChange]);

  /* Disable Scroll */
  useEffect(() => {
    function disableScroll() {
      if (originalOverflow.current === "") {
        originalOverflow.current = window.getComputedStyle(
          document.body,
        ).overflow;
      }
      window.addEventListener("wheel", handler, {
        passive: false,
      });
      window.addEventListener("touchmove", handler, {
        passive: false,
      });
      document.documentElement.style.overflow = "hidden";
    }

    function enableScroll() {
      window.removeEventListener("wheel", handler);
      window.removeEventListener("touchmove", handler);
      document.documentElement.style.overflow = originalOverflow.current;
      originalOverflow.current = "";
    }

    function handler(e: Event) {
      e.preventDefault();
      e.stopPropagation();
    }

    const finallyDisableScroll =
      modals[modals.length - 1]?.options?.disableScroll !== undefined
        ? modals[modals.length - 1]?.options?.disableScroll
        : disableBodyScrollWhenOpen;

    if (finallyDisableScroll && modals.length > 0) {
      disableScroll();
    } else {
      enableScroll();
    }

    return () => {
      enableScroll();
    };
  }, [modals, disableBodyScrollWhenOpen]);

  const showModal = modals.length > 0;
  return (
    <ModalContext.Provider
      value={{
        modals,
        setModals,
        modalIdRef,
      }}
    >
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
