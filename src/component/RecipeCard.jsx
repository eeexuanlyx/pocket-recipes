import { useState } from "react";
import React from "react";
import styles from "./RecipeCard.module.css";
import RecipeModal from "./RecipeModal";
import LoadingSpinner from "./LoadingSpinner";

const RecipeCard = (props) => {
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [foodId, setFoodId] = useState(null);

  return (
    <div>
      {props.isLoading ? (
        <>
          <div className="centered">
            <LoadingSpinner />
          </div>
        </>
      ) : (
        <>
          <div className={styles.recipeBox}>
            {props.recipeDisplay.map((item) => (
              <div className={styles.recipeCard} key={item.id}>
                <img className={styles.img} src={item.image} alt={item.title} />
                <div className={styles.content}>
                  <p className={styles.cardtext}>{item.title}</p>
                </div>
                <div className={styles.buttonContainer}>
                  <button
                    className={styles.contentButton}
                    onClick={() => {
                      setShowRecipeModal(true);
                      setFoodId(item.id);
                    }}
                  >
                    View Recipe
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div>
            {showRecipeModal && (
              <RecipeModal
                foodId={foodId}
                setShowRecipeModal={setShowRecipeModal}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default RecipeCard;
