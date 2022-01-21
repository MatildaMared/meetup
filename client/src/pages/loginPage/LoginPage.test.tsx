import { render } from "@testing-library/react";
import LoginPage from "./LoginPage";

describe("LoginPage component", () => {
  it("renders without crashing", () => {
    render(<LoginPage />);
  });
});
