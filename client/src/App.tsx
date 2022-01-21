import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartPage from "./pages/startpage/StartPage";
import MeetupPage from "./pages/meetuppage/MeetupPage";

import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar items={["Home", "Find Meetups", "Sign in", "Sign up"]} />
        <Routes>
          <Route path="/">
            <StartPage />
          </Route>
          <Route path="/">
            <MeetupPage />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
