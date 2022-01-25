import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartPage from "./pages/startpage/StartPage";
import MeetupPage from "./pages/meetuppage/MeetupPage";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/footer/Footer";
// import SigninPage from "./pages/signinpage/SigninPage";
import SignupPage from "./pages/signuppage/SignupPage";
import LoginPage from "./pages/loginPage/LoginPage";
import CreatePage from "./pages/createPage/CreatePage";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/meetups/:meetupid" element={<MeetupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
