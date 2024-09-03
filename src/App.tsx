import ExampleModal from "./components/ExampleModal.tsx";
import { useModal } from "./lib/index.ts";

function App() {
  const { open } = useModal();

  const openModal = async (disableScroll?: boolean, closeOnClick?: boolean) => {
    open(
      ExampleModal,
      {
        name: "kong",
      },
      {
        disableScroll: disableScroll,
        onClickOutsideClose: closeOnClick,
        errorOnClose: true,
      },
    )
      .then((result) => {
        console.log("resolve", result);
      })
      .catch((reason) => {
        console.log("reject", reason);
      });
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
