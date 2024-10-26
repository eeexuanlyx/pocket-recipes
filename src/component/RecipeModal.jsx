import React from "react";
import ReactDOM from "react-dom";
import styles from "./RecipeModal.module.css";

const OverLay = () => {
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <h1>Recipe Instructions here</h1>
      </div>
    </div>
  );
};

const RecipeModal = () => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default RecipeModal;
