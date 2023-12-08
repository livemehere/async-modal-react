import ExampleModal, { ExampleProps } from "./components/ExampleModal.tsx";
import { useModal } from "./lib/index.ts";

function App() {
  const { pushModal } = useModal();

  const openModal = async () => {
    try {
      // resolve
      const result = await pushModal<string, ExampleProps>(
        ExampleModal,
        { name: "kong" },
        {
          onClickOutsideClose: true,
          disableScroll: true,
        },
      );
      console.log(result);
    } catch (e) {
      // reject, close
      console.log(e);
    }
  };

  return (
    <div
      style={{
        height: "200vh",
      }}
    >
      <h1>Async Modal</h1>
      <button onClick={openModal}>OPEN</button>
    </div>
  );
}

export default App;
