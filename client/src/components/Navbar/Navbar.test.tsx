import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";

describe("navbar component", () => {
    it("renders without crashing", () => {
        render (<Navbar />)
    })
})