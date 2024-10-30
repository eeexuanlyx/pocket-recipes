import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>
        Pocket Recipes 2024 ©{" "}
        <a className={styles.link} href="https://github.com/eeexuanlyx">
          Yi Xuan
        </a>
        .<br></br>
        <span>
          <i>Recipe data provided by Spoonacular.</i>
        </span>
      </p>
    </footer>
  );
};

export default Footer;
