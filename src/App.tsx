import { GiKnifeFork } from "react-icons/gi";
import { BrowserRouter, Link } from "react-router-dom";
import styled from "styled-components";
import Category from "./components/Category";
import Search from "./components/Search";
import Pages from "./pages/Pages";

function App() {
  return (
    <BrowserRouter>
      <Nav>
        <GiKnifeFork />
        <Logo to="/"> yummyy</Logo>
      </Nav>
      <Search />
      <Category />
      <Pages />
    </BrowserRouter>
  );
}

const Logo = styled(Link)`
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 400;
  font-family: "Lobster Two", cursive;
`;
const Nav = styled.div`
  padding: 1rem 0rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  svg {
    font-size: 2rem;
  }
`;

export default App;
