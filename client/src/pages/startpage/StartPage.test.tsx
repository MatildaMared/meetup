import { render, screen } from "@testing-library/react";
import StartPage from "./StartPage";

describe("navbar component", () => {
    it("renders without crashing", () => {
        render (<StartPage />)
    })
})

//it contains Header Component skriv vad användaren kommer se istället
//it contains EventSuggestion Component skriv vad användaren kommer se istället
//it contains UpcomingEvents Component skriv vad användaren kommer se istället