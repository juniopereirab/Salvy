import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateLineModal from "@/components/CreateLineModal";

describe("CreateLineModal", () => {
  it("renders correctly", () => {
    const mockFn = jest.fn();
    render(
      <CreateLineModal handleClose={() => {}} onSubmit={mockFn} open={true} />
    );

    const modal = screen.getByText("Criar nova linha telefônica");

    expect(modal).toBeInTheDocument();
  });

  it("form submit", async () => {
    const mockFn = jest.fn();
    const handleClose = jest.fn();
    render(
      <CreateLineModal
        handleClose={handleClose}
        onSubmit={mockFn}
        open={true}
      />
    );
    const submitButton = screen.getByRole("button", { name: "Criar linha" });
    userEvent.click(submitButton);

    await waitFor(() => expect(mockFn).toHaveBeenCalledTimes(1));
  });
});
