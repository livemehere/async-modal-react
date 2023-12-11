import { fireEvent, render, screen } from "@testing-library/react";
import { ModalProvider } from "../lib";
import App from "../App.tsx";

function checkHTMLOverflowStyle(style: string) {
  expect(document.documentElement.style.overflow).toBe(style);
}

/**
 * real scroll or wheel event is not working in jsdom.
 * must to use e2e test.
 */
describe("Scroll test", () => {
  describe("disableBodyScrollWhenOpen(default)", () => {
    beforeEach(() => {
      render(
        <ModalProvider>
          <App />
        </ModalProvider>,
      );
    });

    it("Disable scroll when modal open", () => {
      const openButton = screen.getByText("OPEN");
      fireEvent.click(openButton);
      expect(screen.getByText("ExampleModal")).toBeInTheDocument();
      checkHTMLOverflowStyle("hidden");
    });

    it("Enable scroll when modal open with `disableScroll:false` option.", () => {
      const openButton = screen.getByText("OPEN - enableScroll");
      fireEvent.click(openButton);
      expect(screen.getByText("ExampleModal")).toBeInTheDocument();
      checkHTMLOverflowStyle("visible");
    });
  });

  describe("disableBodyScrollWhenOpen(false)", () => {
    beforeEach(() => {
      render(
        <ModalProvider disableBodyScrollWhenOpen={false}>
          <App />
        </ModalProvider>,
      );
    });

    it("Enable scroll when modal open", () => {
      const openButton = screen.getByText("OPEN");
      fireEvent.click(openButton);
      expect(screen.getByText("ExampleModal")).toBeInTheDocument();
      checkHTMLOverflowStyle("visible");
    });

    it("Disable scroll when modal open with `disableScroll:true` option.", () => {
      const openButton = screen.getByText("OPEN - disableScroll");
      fireEvent.click(openButton);
      expect(screen.getByText("ExampleModal")).toBeInTheDocument();
      checkHTMLOverflowStyle("hidden");
    });
  });
});
