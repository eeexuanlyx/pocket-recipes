import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const NavBar = () => {
  return (
    <nav className={styles.navbarTop}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link to="/" className={styles.navLink}>
            Search Recipes
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/saved-recipes" className={styles.navLink}>
            Favourites
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
