import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ModalProvider } from "./lib/index.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ModalProvider
    closeOnOutsideClick={false}
    disableBodyScrollWhenOpen={true}
    closeOnRouteChange={false}
  >
    <App />
  </ModalProvider>,
);
