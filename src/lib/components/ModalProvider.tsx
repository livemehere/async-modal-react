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
  const [disableScrollForce, setDisableScrollForce] = useState(true);
  const scrollAbleStatus = !disableScrollForce && !disableBodyScrollWhenOpen;

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
    if (originalOverflow.current === "") {
      originalOverflow.current = window.getComputedStyle(
        document.body,
      ).overflow;
    }

    function disableScroll(e: Event) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (disableScrollForce && disableBodyScrollWhenOpen && modals.length > 0) {
      window.addEventListener("wheel", disableScroll, {
        passive: false,
      });
      window.addEventListener("touchmove", disableScroll, {
        passive: false,
      });
      document.documentElement.style.overflow = "hidden";
    } else {
      window.removeEventListener("wheel", disableScroll);
      window.removeEventListener("touchmove", disableScroll);
      document.documentElement.style.overflow = originalOverflow.current;
      originalOverflow.current = "";
    }

    return () => {
      window.removeEventListener("wheel", disableScroll);
      window.removeEventListener("touchmove", disableScroll);
      document.documentElement.style.overflow = originalOverflow.current;
      originalOverflow.current = "";
    };
  }, [modals, disableBodyScrollWhenOpen, disableScrollForce]);

  const showModal = modals.length > 0;
  return (
    <ModalContext.Provider
      value={{
        modals,
        setModals,
        modalIdRef,
        setDisableScrollForce,
        scrollAbleStatus,
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
