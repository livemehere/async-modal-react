import { useModal } from "../lib/hooks/useModal.ts";
import ExampleModal2 from "./ExampleModal2.tsx";
import { ModalProps } from "../lib/types/modal.ts";

export interface ExampleProps extends ModalProps {
  name: string;
}

const ExampleModal = ({ close, resolve, reject, name }: ExampleProps) => {
  const { pushModal } = useModal();

  /* Open other modal */
  const openOtherModal = async () => {
    const result = await pushModal(ExampleModal2);
    console.log(result);
  };

  return (
    <div
      style={{
        minWidth: "300px",
        minHeight: "300px",
        background: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "black",
        position: "absolute",
      }}
    >
      <h2>ExampleModal</h2>
      <button onClick={() => resolve(`resolve! ${name}`)}>RESOLVE</button>
      <button onClick={() => reject("reject T-T")}>REJECT</button>
      <button onClick={openOtherModal}>OPEN OTHER</button>
      <button onClick={close}>Close</button>
    </div>
  );
};

export default ExampleModal;
