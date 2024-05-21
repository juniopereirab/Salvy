import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Snackbar from "@/components/Snackbar";

describe("Snackbar", () => {
  it("renders correctly", () => {
    render(
      <Snackbar
        handleClose={() => {}}
        message="Teste"
        open={true}
        severity="info"
      />
    );

    const snack = screen.getByText("Teste");

    expect(snack).toBeInTheDocument();
  });

  it("should not render if open equals false", () => {
    render(
      <Snackbar
        handleClose={() => {}}
        message="Teste"
        open={false}
        severity="info"
      />
    );

    const snack = screen.queryByText("Teste");

    expect(snack).not.toBeInTheDocument();
  });
});
