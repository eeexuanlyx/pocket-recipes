import React from "react";
import styles from "./RecipeInfo.module.css";

const RecipeInfo = ({ recipeData }) => {
  return (
    <>
      <div>
        <h2>Ingredients</h2>
        {recipeData.extendedIngredients ? (
          <ul className={styles.list}>
            {recipeData.extendedIngredients.map((item, idx) => (
              <li key={idx}>
                {item.name}, {item.amount} {item.unit}
              </li>
            ))}
          </ul>
        ) : (
          <p>No data available.</p>
        )}
      </div>
      <div>
        <h2>Instructions</h2>
        {recipeData.analyzedInstructions ? (
          <ol className={styles.list2}>
            {recipeData.analyzedInstructions[0].steps.map((item, idx) => (
              <li key={idx}>{item.step}</li>
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
