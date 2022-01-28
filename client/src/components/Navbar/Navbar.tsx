import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components/macro";
import { getTokenFromLocalStorage } from "../../services/localStorageService";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = getTokenFromLocalStorage();

  function logoutHandler() {
    localStorage.removeItem("meetupToken");
    localStorage.removeItem("meetupUser");
    if (location.pathname === "/") {
      window.location.reload();
    } else {
      navigate("/");
    }
  }

  return (
    <NavbarWrapper>
      <ListWrapper>
        <ListElement onClick={() => navigate("/")}>Home</ListElement>
        {!token && (
          <ListElement onClick={() => navigate("/login")}>Login</ListElement>
        )}
        {!token && (
          <ListElement onClick={() => navigate("/signup")}>Sign up</ListElement>
        )}
        {token && (
          <ListElement onClick={() => navigate("/create")}>
            Create Meetup
          </ListElement>
        )}
        {token && (
          <ListElement onClick={() => logoutHandler()}>Logout</ListElement>
        )}
      </ListWrapper>
    </NavbarWrapper>
  );
}

const NavbarWrapper = styled.nav`
  background: rgba(46, 46, 46, 0.8);
  backdrop-filter: blur(8px);
  position: fixed;
  top: 0;
  z-index: 10;
  width: 100%;
`;

const ListWrapper = styled.ul`
  display: flex;
  justify-content: space-evenly;
  list-style-type: none;
  padding: 1.5rem 0;
`;

const ListElement = styled.li`
  cursor: pointer;
  color: #eee;
`;

export default Navbar;
