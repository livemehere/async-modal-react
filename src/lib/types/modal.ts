import { Dispatch, FunctionComponent, SetStateAction } from "react";

/* 모달 컴포넌트 Props 에서 extends 해주세요 */
export interface ModalProps {
  close: () => void;
  resolve: <Result = any>(v: Result) => void;
  reject: <Reason = any>(reason: Reason) => void;
}

/* Modal 을 관리하는 배열의 타입 */
export interface ModalType<P = any> extends ModalProps {
  id: number;
  component: FunctionComponent<P>;
  props: P;
}

/* ModalContext 타입 */
export interface ModalContextProps {
  modals: ModalType[];
  setModals: Dispatch<SetStateAction<ModalType[]>>;
  modalIdRef: { current: number };
  scrollAbleStatus: boolean;
  setDisableScrollForce: Dispatch<SetStateAction<boolean>>;
}
