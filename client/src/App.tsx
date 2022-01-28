import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartPage from "./pages/startpage/StartPage";
import MeetupPage from "./pages/meetuppage/MeetupPage";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/footer/Footer";
import SignupPage from "./pages/signuppage/SignupPage";
import LoginPage from "./pages/loginPage/LoginPage";
import CreatePage from "./pages/createPage/CreatePage";
import EditPage from "./pages/editPage/EditPage";
import styled from "styled-components";

function App() {
  return (
    <Router>
      <Wrapper>
        <Navbar />
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/meetups/:meetupid/edit" element={<EditPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/meetups/:meetupid" element={<MeetupPage />} />
        </Routes>
        <Footer />
      </Wrapper>
    </Router>
  );
}

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  & main {
    flex: 1;
  }
`;

export default App;
