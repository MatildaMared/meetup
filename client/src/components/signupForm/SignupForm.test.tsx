import { render } from "@testing-library/react";
import SignupForm from "./SignupForm";

describe("SignupForm component", () => {
  it("renders without crashing", () => {
    render(<SignupForm />);
  });
});
