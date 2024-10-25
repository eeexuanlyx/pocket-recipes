import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/search-recipes">Search Recipes</Link>
        </li>
        <li>
          <Link to="/saved-recipes">Saved Recipes</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
