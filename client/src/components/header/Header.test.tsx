import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("navbar component", () => {
    it("renders without crashing", () => {
        render (<Header />)
    })
})