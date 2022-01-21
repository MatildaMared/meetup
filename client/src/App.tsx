import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartPage from "./pages/startpage/StartPage";
import MeetupPage from "./pages/meetuppage/MeetupPage";
import Navbar from "./components/Navbar/Navbar";
import { MeetupProvider } from "./context/MeetupContext";
// import SigninPage from "./pages/signinpage/SigninPage";
import SignupPage from "./pages/signuppage/SignupPage";
import LoginPage from "./pages/loginPage/LoginPage";

function App() {
  return (
    <Router>
      <MeetupProvider>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/meetups" element={<MeetupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </div>
      </MeetupProvider>
    </Router>
  );
}

export default App;
