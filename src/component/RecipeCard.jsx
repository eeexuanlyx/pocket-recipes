import { useState } from "react";
import React from "react";
import styles from "./RecipeCard.module.css";
import RecipeModal from "./RecipeModal";

const RecipeCard = (props) => {
  const [showRecipeModal, setShowRecipeModal] = useState(false);

  return (
    <div>
      {props.isLoading ? (
        <>
          <p>
            <span>
              Toggle between <i>Search Recipe by Name</i> or{" "}
            </span>
          </p>
          <p>
            <span>
              <i>
                Search Recipe By Ingredients : each ingredient should be
                seperated with a comma
              </i>
            </span>
          </p>
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
                      props.setFoodId(item.id);
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
              <RecipeModal setShowRecipeModal={setShowRecipeModal} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default RecipeCard;
