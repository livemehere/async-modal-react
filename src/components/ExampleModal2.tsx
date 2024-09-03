import { ModalProps } from "../lib/types/modal.ts";
import { useModal } from "../lib/hooks/useModal.ts";

export interface ExampleProps extends ModalProps {
  name: string;
}

const ExampleModal2 = ({ close, resolve, reject, name }: ExampleProps) => {
  const { open } = useModal();

  /* 또 다른 모달 열기 */
  const openOtherModal = async () => {
    const result = await open(ExampleModal2);
    console.log(result);
  };

  return (
    <div
      style={{
        minWidth: "600px",
        minHeight: "600px",
        background: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "black",
        position: "absolute",
      }}
    >
      <h2>ExampleModal2</h2>
      <button onClick={() => resolve(`resolve! ${name}`)}>RESOLVE</button>
      <button onClick={() => reject("reject T-T")}>REJECT</button>
      <button onClick={openOtherModal}>OPEN OTHER</button>
      <button onClick={close}>Close</button>
    </div>
  );
};

export default ExampleModal2;
