import { render } from "@testing-library/react";
import CreatePage from "./CreatePage";

describe("Create Page", () => {
  it("renders without crashing", () => {
    render(<CreatePage />);
  });
});
