import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartPage from "./pages/startpage/StartPage";
import MeetupPage from "./pages/meetuppage/MeetupPage";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/footer/Footer"
import { MeetupProvider } from "./context/MeetupContext";
// import SigninPage from "./pages/signinpage/SigninPage";
import SignupPage from "./pages/signuppage/SignupPage";

function App() {
  return (
    <Router>
      <MeetupProvider>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/meetups" element={<MeetupPage />} />
            {/* <Route path="/signin" element={<SigninPage />} /> */}
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
          <Footer />
        </div>
      </MeetupProvider>
    </Router>
  );
}

export default App;
