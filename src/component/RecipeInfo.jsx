import React from "react";
import styles from "./RecipeInfo.module.css";

const RecipeInfo = ({ recipeData }) => {
  return (
    <>
      <div>
        {recipeData.extendedIngredients ? (
          <ul className={styles.list}>
            {recipeData.extendedIngredients.map((item) => (
              <li>
                {item.name}, {item.amount} {item.unit}
              </li>
            ))}
          </ul>
        ) : (
          <p>No data available.</p>
        )}
      </div>
      <div>
        {recipeData.analyzedInstructions ? (
          <ol className={styles.list2}>
            {recipeData.analyzedInstructions[0].steps.map((item) => (
              <li>{item.step}</li>
            ))}
          </ol>
        ) : (
          <p>No date available.</p>
        )}
      </div>
    </>
  );
};

export default RecipeInfo;
