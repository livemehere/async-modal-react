import { useModal } from "../lib";
import { ModalProps } from "../lib/types/modal";

export interface ExampleProps extends ModalProps {
  name: string;
}

const ExampleModal = ({ close, resolve, reject, name }: ExampleProps) => {
  const { open } = useModal();

  const openModal = async () => {
    const result = await open(
      ExampleModal,
      {
        name: "kong",
      },
      {
        disableScroll: false,
      },
    );
    console.log(result);
  };
  return (
    <div
      style={{
        background: "#fff",
        position: "absolute",
        color: "#000",
      }}
    >
      <h2>ExampleModal</h2>
      <button onClick={() => resolve(`resolve! ${name}`)}>RESOLVE</button>
      <button onClick={() => reject("reject")}>REJECT</button>
      <button onClick={close}>Close</button>
      <button onClick={openModal}>OPEN</button>
      <hr />
    </div>
  );
};

export default ExampleModal;
