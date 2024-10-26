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
              <h2>{recipeData.title}</h2>
              <div>
                <img
                  className={styles.image}
                  src={recipeData.image}
                  alt={recipeData.title}
                />
                <span>
                  <b>Servings:</b> {recipeData.servings}
                </span>
                <span>
                  <b>Prep Time:</b>
                  {recipeData.readyInMinutes}
                </span>
                <span>{recipeData.vegetarian}</span>
              </div>
              <div>
                <button>Favourite</button>
                <button>Close</button>
              </div>
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
