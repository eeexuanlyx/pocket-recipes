import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./RecipeModal.module.css";
import { useState } from "react";
import { FaLeaf } from "react-icons/fa";
import { TbMeat } from "react-icons/tb";
import { LuVegan } from "react-icons/lu";
import { IoTimerOutline } from "react-icons/io5";
import { GiMeal } from "react-icons/gi";
import RecipeInfo from "./RecipeInfo";

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

  const postRecipeToAirtable = async (recipeData) => {
    const airtableApiKey = import.meta.env.VITE_AIRTABLE_API_KEY;
    const airtableBaseId = import.meta.env.VITE_AIRTABLE_BASE_ID;
    const airtableTableId = import.meta.env.VITE_AIRTABLE_TABLE_ID;
    const airtableUrl = `https://api.airtable.com/v0/${airtableBaseId}/${airtableTableId}`;

    try {
      const res = await fetch(airtableUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${airtableApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            id: recipeData.id,
            Title: recipeData.title,
            Servings: recipeData.servings,
            Image: recipeData.image,
            Minutes: recipeData.readyInMinutes,
            Vegetarian: recipeData.vegetarian,
            Vegan: recipeData.vegan,
            Ingredients: recipeData.extendedIngredients
              .map((item) => `${item.amount} ${item.unit} ${item.name}`)
              .join(", "),
            Instructions: recipeData.analyzedInstructions[0].steps
              .map((item) => item.step)
              .join("|"),
          },
        }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`Failed to save recipe: ${errorData.message}`);
      }

      const data = await res.json();
      console.log("recipe saved:", data);
      alert("Recipe saved successfully.");
    } catch (error) {
      console.error("error saving recipe:", error);
      alert("Failed to save recipe.");
    }
  };

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
                  <div className={styles.buttonGap}>
                    <button onClick={() => postRecipeToAirtable(recipeData)}>
                      Favourite
                    </button>
                    <button onClick={() => props.setShowRecipeModal(false)}>
                      Close
                    </button>
                  </div>
                  <div className={styles.miscs2}>
                    <p>
                      <GiMeal />
                      Servings: {recipeData.servings}
                    </p>
                    <p>
                      <IoTimerOutline />
                      Prep Time: {recipeData.readyInMinutes} Mins
                    </p>
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
              <div>
                <div className={styles.list}>
                  <RecipeInfo recipeData={recipeData} />
                </div>
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
