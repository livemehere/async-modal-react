import { useModal } from "../lib";
import { ModalProps } from "../lib/types/modal";

export interface ExampleProps extends ModalProps {
  name: string;
}

const ExampleModal = ({ close, resolve, reject, name }: ExampleProps) => {
  const { pushModal } = useModal();

  const openModal = async () => {
    const result = await pushModal<string, ExampleProps>(
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
