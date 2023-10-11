import { FC, useContext } from "react";
import { ModalContext } from "../ModalContext.ts";
import { ModalProps, ModalType } from "../types/modal.ts";

export const useModal = () => {
  const { setModals, modalIdRef } = useContext(ModalContext);

  const pushModal = <Result = any, Props extends ModalProps = any>(
    component: FC<Props>,
    props?: Omit<Props, keyof ModalProps>,
  ) => {
    return new Promise<Result>((resolve, reject) => {
      const modalId = modalIdRef.current++;
      const modal: ModalType = {
        id: modalId,
        component,
        props,
        close: () => {
          removeModal(modalId);
          reject("Modal closed");
        },
        resolve: (value) => {
          removeModal(modalId);
          resolve(value as unknown as Result);
        },
        reject: (reason) => {
          removeModal(modalId);
          reject(reason);
        },
      };
      setModals((prev) => [...prev, modal]);
    });
  };

  const removeModal = (id: number) => {
    setModals((prev) => prev.filter((modal) => modal.id !== id));
  };

  return {
    pushModal,
    removeModal,
  };
};
