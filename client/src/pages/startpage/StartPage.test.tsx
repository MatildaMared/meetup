import { render, screen } from "@testing-library/react";
import StartPage from "./StartPage";

describe("navbar component", () => {
    it("renders without crashing", () => {
        render (<StartPage />)
    })
})


//it contains hero image 
//