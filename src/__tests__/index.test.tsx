import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ModalProvider } from "../lib";
import App from "../App.tsx";

// @ts-ignore
const log = jest.spyOn(global.console, "log").mockImplementation();

describe("[[ ModalProvider with default props ]]", () => {
  // @ts-igno

  beforeEach(() => {
    render(
      <ModalProvider>
        <App />
      </ModalProvider>,
    );
  });

  function openModal() {
    const openButton = screen.getByText("OPEN");
    fireEvent.click(openButton);
    expect(screen.getByText("ExampleModal")).toBeInTheDocument();
  }

  it("call pushModal create modal in screen.", () => {
    openModal();
  });

  it("when modal call resolve function then disappear modal and return resolve's args.", async () => {
    openModal();

    const resolveButton = screen.getByText("RESOLVE");
    fireEvent.click(resolveButton);

    expect(screen.queryByText("ExampleModal")).not.toBeInTheDocument();
    await waitFor(() => expect(log).toBeCalledWith("resolve! kong"));
  });

  it("when modal call reject then disappear modal and throw reject's args.", async () => {
    openModal();

    const rejectButton = screen.getByText("REJECT");
    fireEvent.click(rejectButton);

    expect(screen.queryByText("ExampleModal")).not.toBeInTheDocument();
    await waitFor(() => {
      expect(console.log).toHaveBeenCalledWith("reject");
    });
  });

  // close err with Modal closed
  it("when modal call close then disappear modal and throw Modal Closed string.", async () => {
    openModal();

    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);

    expect(screen.queryByText("ExampleModal")).not.toBeInTheDocument();
    await waitFor(() => {
      expect(console.log).toHaveBeenCalledWith("Modal closed");
    });
  });
});
