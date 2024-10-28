import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaLeaf } from "react-icons/fa";
import { TbMeat } from "react-icons/tb";
import { LuVegan } from "react-icons/lu";
import { IoTimerOutline } from "react-icons/io5";
import { GiMeal } from "react-icons/gi";
import styles from "./SavedRecipes.module.css";
import LoadingSpinner from "./LoadingSpinner";

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [dataByTitle, setDataByTitle] = useState([]);
  const [selection, setSelection] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recipeId, setRecipeId] = useState(null);
  const navigate = useNavigate();

  const airtableApiKey = import.meta.env.VITE_AIRTABLE_API_KEY;
  const airtableBaseId = import.meta.env.VITE_AIRTABLE_BASE_ID;
  const airtableTableId = import.meta.env.VITE_AIRTABLE_TABLE_ID;

  const getSavedData = async (signal) => {
    setIsLoading(true);
    setError(null);

    const airtableUrl = `https://api.airtable.com/v0/${airtableBaseId}/${airtableTableId}`;

    try {
      const res = await fetch(airtableUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${airtableApiKey}`,
          "Content-Type": "application/json",
        },
        signal,
      });
      if (!res.ok) {
        throw new Error("getting data error");
      }

      const data = await res.json();
      const sortedData = data.records.sort((a, b) => {
        return new Date(a.createdTime) - new Date(b.createdTime);
      });
      setSavedRecipes(sortedData);
      console.log(sortedData);
    } catch (error) {
      if (error.name !== "AbortError") {
        //if user aborted previos fetch, ignore
        setError(error.message);
      }
    }
    setIsLoading(false);
  };

  const getTitles = async (signal) => {
    const airtableUrl = `https://api.airtable.com/v0/${airtableBaseId}/${airtableTableId}?filterByFormula={Title}='${selection}'`;

    try {
      const res = await fetch(
        airtableUrl,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${airtableApiKey}`,
          },
        },
        signal
      );

      if (!res.ok) {
        throw new Error("getting data error");
      }

      const data = await res.json();
      setDataByTitle(data.records);
      console.log(data.records);
    } catch (error) {
      if (error.name !== "AbortError") {
        setError(error.message);
      }
    }
  };

  const handleSelectionChange = (event) => {
    setSelection(event.target.value);
  };

  useEffect(() => {
    const controller = new AbortController();
    getSavedData(controller.signal);

    return () => {
      controller.abort();
    };
  }, []); //Fetch saved recipes on mount

  useEffect(() => {
    if (selection) {
      const controller = new AbortController();
      getTitles(controller.signal);

      return () => {
        controller.abort();
      };
    }
  }, [selection]); //Fetch recipes on selection change

  useEffect(() => {
    if (savedRecipes.length > 0) {
      // sets selection to the first recipe title of savedRecipes
      setSelection(savedRecipes[savedRecipes.length - 1].fields.Title);
    }
  }, [getSavedData]);

  const removeRecipe = async (recipeId) => {
    const airtableUrl = `https://api.airtable.com/v0/${airtableBaseId}/${airtableTableId}/${recipeId}`;

    try {
      const res = await fetch(airtableUrl, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${airtableApiKey}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("cannot delete recipe");
      }
    } catch (error) {
      setError(error.message);
    }
    alert("Recipe removed.");
    setSelection("");
    await getSavedData();
    navigate("/saved-recipes");
  };

  return (
    <div>
      <div className="container">
        <section>
          <label htmlFor="selection">Select from your Favourites:</label>
          <div className="row">
            <select
              id="selection"
              className="col-md-12"
              onChange={handleSelectionChange}
              value={selection}
            >
              {savedRecipes.length &&
                savedRecipes.map((recipe, idx) => (
                  <option key={idx} value={recipe.fields.Title}>
                    {recipe.fields.Title}
                  </option>
                ))}
            </select>
          </div>
          <br></br>
          <h2>Recently Favourited:</h2>
        </section>
        <br />
        <section>
          {!isLoading &&
            dataByTitle && ( //data not loading and data is not null,
              <div>
                {dataByTitle.map((recipe, idx) => {
                  console.log(dataByTitle);
                  return (
                    <div key={idx}>
                      <div>
                        <h2>{recipe.fields.Title}</h2>
                        <div>
                          <div>
                            <img
                              className={styles.img}
                              src={recipe.fields.Image}
                              alt={recipe.fields.Title}
                            />
                          </div>
                          <div>
                            <div className={styles.miscs}>
                              <p>
                                <GiMeal />
                                Servings: {recipe.fields.Servings}
                              </p>
                              <p>
                                <IoTimerOutline />
                                Prep Time: {recipe.fields.Minutes} Mins
                              </p>
                              {recipe.fields.Vegetarian ? (
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
                              {recipe.fields.Vegan && (
                                <p>
                                  <LuVegan /> Vegan
                                </p>
                              )}

                              <button
                                onClick={() => {
                                  setRecipeId(recipe.id);
                                  removeRecipe(recipe.id);
                                }}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div>
                            <div>
                              <h3>Ingredients</h3>
                              <ul className={styles.list}>
                                {recipe.fields.Ingredients &&
                                  recipe.fields.Ingredients.split(",").map(
                                    (ingredient, idx) => (
                                      <li key={idx}>{ingredient.trim()}</li>
                                    )
                                  )}
                              </ul>
                            </div>
                            <div>
                              <h3>Instructions</h3>
                              <ol>
                                {recipe.fields.Instructions &&
                                  recipe.fields.Instructions.split("|").map(
                                    (step, idx) => (
                                      <li key={idx}>{step.trim()}</li>
                                    )
                                  )}
                              </ol>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          {isLoading && (
            <div className="centered">
              <LoadingSpinner />
            </div>
          )}

          {isLoading && error && <p>{error}</p>}
        </section>
      </div>
    </div>
  );
};

export default SavedRecipes;
