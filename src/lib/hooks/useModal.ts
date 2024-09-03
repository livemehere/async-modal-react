import { FC, useContext } from "react";
import { ModalContext } from "../ModalContext.ts";
import { ModalOptions, ModalProps, ModalType } from "../types/modal.ts";
export const useModal = () => {
  const { setModals, modalIdRef, errorOnClose } = useContext(ModalContext);

  const open = <Result, Props extends ModalProps>(
    component: FC<Props>,
    props?: Omit<Props, keyof ModalProps>,
    options?: ModalOptions,
  ) => {
    return new Promise<Result>((resolve, reject) => {
      const modalId = modalIdRef.current++;
      const modal: ModalType = {
        id: modalId,
        component,
        props,
        options,
        close: () => {
          close(modalId);
          const individualErrorOnClose = options?.errorOnClose;
          if (individualErrorOnClose === undefined) {
            if (errorOnClose) {
              reject("close");
            }
          } else {
            if (individualErrorOnClose) {
              reject("close");
            }
          }
        },
        resolve: (value) => {
          close(modalId);
          resolve(value as unknown as Result);
        },
        reject: (reason) => {
          close(modalId);
          reject(reason);
        },
      };
      setModals((prev) => [...prev, modal]);
    });
  };

  const close = (id: number) => {
    setModals((prev) => prev.filter((modal) => modal.id !== id));
  };

  const closeAll = () => {
    setModals([]);
  };

  return {
    open,
    closeAll,
  };
};
