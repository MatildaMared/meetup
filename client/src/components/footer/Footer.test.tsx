import { getByText, render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer component", () => {
    it("renders without crashing", () => {
        render(<Footer />);
    })

    it("contains text 'Made with love by Matilda, Sofia & Sara'", () => {
        render(<Footer />);
        const text = screen.getByText("Made with love by Matilda, Sofia & Sara");
        expect(text).toBeInTheDocument();
    })
})