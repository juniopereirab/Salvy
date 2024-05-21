import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import LineItem from "@/components/LineItem";
import { ILine } from "@/interfaces/Line";

describe("LineItem", () => {
  it("renders correctly", () => {
    const line: ILine = {
      ddd: "61",
      email: "teste@mail.com",
      idempotencyKey: "123",
      pending: false,
      phoneNumber: "+5561996572881",
      plan: 1,
      _id: "123456",
    };
    render(<LineItem index={0} line={line} />);

    const item = screen.getByText("+55 (61) 99657-2881");

    expect(item).toBeInTheDocument();
  });
});
