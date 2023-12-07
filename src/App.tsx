import ExampleModal, { ExampleProps } from "./components/ExampleModal.tsx";
import { useModal } from "./lib/index.ts";

function App() {
  const { pushModal } = useModal();

  const openModal = async () => {
    const result = await pushModal<string, ExampleProps>(ExampleModal, {
      name: "kong",
    });

    console.log(result);
  };

  return (
    <div
      style={{
        height: "200vh",
      }}
    >
      <h1>hello</h1>
      <button onClick={openModal}>OPEN</button>
    </div>
  );
}

export default App;
