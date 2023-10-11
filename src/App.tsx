import ExampleModal from "./components/ExampleModal.tsx";
import { useModal } from "./lib/index.ts";

function App() {
  const { pushModal } = useModal();

  const openModal = async () => {
    const result = await pushModal<string>(ExampleModal, {
      name: "kong2",
    });
    console.log(result);
  };

  return (
    <div>
      <h1>hello</h1>
      <button onClick={openModal}>OPEN</button>
    </div>
  );
}

export default App;
