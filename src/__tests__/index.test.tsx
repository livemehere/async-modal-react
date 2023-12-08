import { render, screen } from "@testing-library/react";
import { ModalProvider } from "../lib";
import App from "../App.tsx";

describe("test", () => {
  it("test", () => {
    render(
      <ModalProvider
        closeOnOutsideClick={false}
        disableBodyScrollWhenOpen={true}
        closeOnRouteChange={false}
      >
        <App />
      </ModalProvider>,
    );
    expect(screen.getByText("Async Modal")).toBeInTheDocument();
  });
});
