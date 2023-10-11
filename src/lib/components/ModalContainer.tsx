import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const ModalContainer = ({ children }: Props) => {
  return (
    <div
      id="modal-root"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </div>
  );
};

export default ModalContainer;
