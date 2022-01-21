import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartPage from "./pages/startpage/StartPage";
import MeetupPage from "./pages/meetuppage/MeetupPage";
import Navbar from "./components/Navbar/Navbar";
import { MeetupProvider } from "./context/MeetupContext";

function App() {
  return (
    <Router>
      <MeetupProvider>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/meetups" element={<MeetupPage />} />
          </Routes>
        </div>
      </MeetupProvider>
    </Router>
  );
}

export default App;
