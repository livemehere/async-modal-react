import { fireEvent, render, screen } from "@testing-library/react";
import { ModalProvider } from "../lib";
import App from "../App.tsx";

describe("Close onClick outSide Test", () => {
  describe("closeOnOutsideClick(default)", () => {
    beforeEach(() => {
      render(
        <ModalProvider>
          <App />
        </ModalProvider>,
      );
    });

    it("Modal must to be close when click outside area.", () => {
      const openButton = screen.getByText("OPEN");
      fireEvent.click(openButton);

      const modal = screen.getByText("ExampleModal");
      expect(modal).toBeInTheDocument();

      fireEvent.mouseDown(document.body);
      expect(modal).not.toBeInTheDocument();
    });

    it("Modal must not be close when click inside area.", () => {
      const openButton = screen.getByText("OPEN");
      fireEvent.click(openButton);

      const modal = screen.getByText("ExampleModal");
      expect(modal).toBeInTheDocument();

      fireEvent.mouseDown(modal);
      expect(modal).toBeInTheDocument();
    });

    it("Modal must not be close when click outside modal when open called with `onClickOutsideClose:false` option.", () => {
      const openButton = screen.getByText("OPEN - disableClose");
      fireEvent.click(openButton);

      const modal = screen.getByText("ExampleModal");
      expect(modal).toBeInTheDocument();

      fireEvent.mouseDown(modal);
      expect(modal).toBeInTheDocument();
    });
  });

  describe("closeOnOutsideClick(false)", () => {
    beforeEach(() => {
      render(
        <ModalProvider closeOnOutsideClick={false}>
          <App />
        </ModalProvider>,
      );
    });

    it("Modal must not be close when click outside area.", () => {
      const openButton = screen.getByText("OPEN");
      fireEvent.click(openButton);

      const modal = screen.getByText("ExampleModal");
      expect(modal).toBeInTheDocument();

      fireEvent.mouseDown(document.body);
      expect(modal).toBeInTheDocument();
    });

    it("Modal must not be close when click inside area.", () => {
      const openButton = screen.getByText("OPEN");
      fireEvent.click(openButton);

      const modal = screen.getByText("ExampleModal");
      expect(modal).toBeInTheDocument();

      fireEvent.mouseDown(modal);
      expect(modal).toBeInTheDocument();
    });

    it("Modal must be close when click outside modal when open called with `onClickOutsideClose:true` option.", () => {
      const openButton = screen.getByText("OPEN - enableClose");
      fireEvent.click(openButton);

      const modal = screen.getByText("ExampleModal");
      expect(modal).toBeInTheDocument();

      fireEvent.mouseDown(openButton);
      expect(modal).not.toBeInTheDocument();
    });
  });
});
