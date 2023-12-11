import ExampleModal, { ExampleProps } from "./components/ExampleModal.tsx";
import { useModal } from "./lib/index.ts";

function App() {
  const { pushModal } = useModal();

  const openModal = async (disableScroll?: boolean, closeOnClick?: boolean) => {
    try {
      // resolve
      const result = await pushModal<string, ExampleProps>(
        ExampleModal,
        {
          name: "kong",
        },
        {
          disableScroll: disableScroll,
          onClickOutsideClose: closeOnClick,
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
      <button onClick={() => openModal()}>OPEN</button>
      <button onClick={() => openModal(false, true)}>
        OPEN - enableScroll
      </button>
      <button onClick={() => openModal(true, true)}>
        OPEN - disableScroll
      </button>
      <button onClick={() => openModal(true, false)}>
        OPEN - disableClose
      </button>
      <button onClick={() => openModal(true, true)}>OPEN - enableClose</button>
    </div>
  );
}

export default App;
