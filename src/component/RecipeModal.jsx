import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./RecipeModal.module.css";
import { useState } from "react";
import { FaLeaf } from "react-icons/fa";
import { TbMeat } from "react-icons/tb";
import { LuVegan } from "react-icons/lu";
import { IoTimerOutline } from "react-icons/io5";
import { GiMeal } from "react-icons/gi";

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
              <div className={styles.recipeTop}>
                <div>
                  <img
                    className={styles.image}
                    src={recipeData.image}
                    alt={recipeData.title}
                  />
                </div>
                <div className={styles.miscs}>
                  <div>
                    <button>Favourite</button>
                    <button onClick={() => props.setShowRecipeModal(false)}>
                      Close
                    </button>
                  </div>
                  <div className={styles.miscs2}>
                    <p>
                      <GiMeal />
                      Servings: {recipeData.servings}
                    </p>
                    <IoTimerOutline />
                    Prep Time: {recipeData.readyInMinutes}
                    {recipeData.vegetarian ? (
                      <p>
                        <FaLeaf />
                        Vegetarian
                      </p>
                    ) : (
                      <p>
                        <TbMeat />
                        Non-Vegetarian
                      </p>
                    )}
                    {recipeData.vegan && (
                      <p>
                        <LuVegan /> Vegan
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <h2>Ingredients</h2>
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
