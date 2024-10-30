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
import LoadingSpinner from "./LoadingSpinner";

const OverLay = (props) => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [recipeData, setRecipeData] = useState({});
  const [isLoadingRecipe, setIsLoadingRecipe] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [savedRecipe, setSavedRecipe] = useState([]);
  const [isLoadingSavedRecipes, setIsLoadingSavedRecipes] = useState(true);

  const getSavedRecipe = async () => {
    setIsLoadingRecipe(true);
    const airtableApiKey = import.meta.env.VITE_AIRTABLE_API_KEY;
    const airtableBaseId = import.meta.env.VITE_AIRTABLE_BASE_ID;
    const airtableTableId = import.meta.env.VITE_AIRTABLE_TABLE_ID;

    const airtableUrl = `https://api.airtable.com/v0/${airtableBaseId}/${airtableTableId}`;

    try {
      const res = await fetch(airtableUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${airtableApiKey}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("getting data error");
      }

      const data = await res.json();
      setSavedRecipe(data.records);
    } catch (error) {
      if (error) {
        console.error(error.message);
      }
    }
    setIsLoadingSavedRecipes(false);
  };

  useEffect(() => {
    getSavedRecipe();
  }, []);

  useEffect(() => {
    if (savedRecipe.length > 0 && props.foodId) {
      favourited();
    }
  }, [savedRecipe, props.foodId]);
  //reruns favourited when savedRecipe has the latest data, or when foodId changes

  const handleFavourite = async () => {
    if (!isLoadingSavedRecipes) {
      const sameId = savedRecipe.filter(
        (recipe) => recipe.fields.id === props.foodId
      );

      if (sameId.length === 0) {
        //if no same id, post to airtable, and disable button
        await postRecipeToAirtable(recipeData);
        setIsSaved(true);
      } else {
        setIsSaved(true);
      }
    } else {
      console.error("Loading");
    }
  };

  const favourited = () => {
    const sameId = savedRecipe.filter(
      (recipe) => recipe.fields.id === props.foodId
    );

    if (sameId.length > 0) {
      //has same id
      setIsSaved(true);
    } else {
      setIsSaved(false);
    }
  };

  useEffect(() => {
    const getRecipeData = async () => {
      const URL = `https://api.spoonacular.com/recipes/${props.foodId}/information?`;
      try {
        const res = await fetch(`${URL}apiKey=${apiKey}`);

        if (!res.ok) {
          throw new Error("getting data error");
        }

        const data = await res.json();
        setRecipeData(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    if (props.foodId) {
      //if there is foodId( to ensure already passed down), get the data,
      getRecipeData();
      setIsLoadingRecipe(false);
    }
  }, [props.foodId]); //when user click view recipe
  //food id passes down to the url to getRecipeData to fetch from API

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
    } catch (error) {
      console.error("error saving recipe:", error);
    }
  };

  return (
    <>
      {isLoadingRecipe ? (
        <div className="centered">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <div className={styles.backdrop}>
            <div className={styles.modal}>
              <h2>{recipeData.title}</h2>
              <div className={styles.recipeTop}>
                <div className={styles.imgContainer}>
                  <img
                    className={styles.image}
                    src={recipeData.image}
                    alt={recipeData.title}
                  />
                </div>
                <div className={styles.miscs}>
                  <div className={styles.buttonGap}>
                    {isSaved ? (
                      <button className={styles.favButton} disabled={true}>
                        Favourited
                      </button>
                    ) : (
                      <button
                        className={styles.favButton}
                        onClick={handleFavourite}
                      >
                        Favourite
                      </button>
                    )}
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
                      {console.log(recipeData)};
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
