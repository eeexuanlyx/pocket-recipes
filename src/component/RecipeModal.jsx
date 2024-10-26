import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./RecipeModal.module.css";
import { useState } from "react";

const OverLay = (props) => {
  const URL = `https://api.spoonacular.com/recipes/${props.foodId}/information?`;
  const apiKey = import.meta.env.VITE_API_KEY;
  const [recipeData, setRecipeData] = useState({});
  const [isLoadingRecipe, setIsLoadingRecipe] = useState(true);

  useEffect(() => {
    const getRecipeData = async () => {
      try {
        const res = await fetch(`${URL}apiKey=${apiKey}`);

        if (!res.ok) {
          throw new Error("getting data error");
        }

        const data = await res.json();
        console.log(data);
        setRecipeData(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    if (props.foodId) {
      getRecipeData();
      setIsLoadingRecipe(false);
    }
  }, [props.foodId]);

  return (
    <>
      {isLoadingRecipe ? (
        <p>Loading Recipe...</p>
      ) : (
        <>
          <div className={styles.backdrop}>
            <div className={styles.modal}>
              <h1>Food Details {recipeData.title}</h1>
            </div>
          </div>

          <div className="row">
            <div className="col-md-3">
              <button className="col-md-3">favourite</button>
              <button
                className="col-md-3"
                onClick={() => props.setShowRecipeModal(false)}
              >
                cancel
              </button>
              <div className="col-md-3"></div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

const RecipeModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay
          foodId={props.foodId}
          setShowRecipeModal={props.setShowRecipeModal}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default RecipeModal;
