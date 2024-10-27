import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaLeaf } from "react-icons/fa";
import { TbMeat } from "react-icons/tb";
import { LuVegan } from "react-icons/lu";
import { IoTimerOutline } from "react-icons/io5";
import { GiMeal } from "react-icons/gi";
import LoadingSpinner from "./LoadingSpinner.module.css";

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [dataByTitle, setDataByTitle] = useState([]);
  const [selection, setSelection] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getSavedData = async (signal) => {
    setIsLoading(true);
    setError(null);

    const airtableApiKey = import.meta.env.VITE_AIRTABLE_API_KEY;
    const airtableBaseId = import.meta.env.VITE_AIRTABLE_BASE_ID;
    const airtableTableId = import.meta.env.VITE_AIRTABLE_TABLE_ID;

    const airtableUrl = `https://api.airtable.com/v0/${airtableBaseId}/${airtableTableId}`;

    // ?fields[]=Title&fields[]=Image&fields[]=Minutes&fields[]=Vegetarian&fields[]=Vegan&fields[]=Ingredients&fields[]=Instructions&sort[0][field]=Title&sort[0][direction]=asc

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
      setSavedRecipes(data.records);
      console.log(data.records);
    } catch (error) {
      if (error.name !== "AbortError") {
        //if user aborted previos fetch, ignore
        setError(error.message);
      }
      setError(error.message);
    }
    setIsLoading(false);
  };

  const getTitles = async (signal) => {
    const airtableApiKey = import.meta.env.VITE_AIRTABLE_API_KEY;
    const airtableBaseId = import.meta.env.VITE_AIRTABLE_BASE_ID;
    const airtableTableId = import.meta.env.VITE_AIRTABLE_TABLE_ID;
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
      if (error.name !== "AnortError") {
        setError(error.message);
      }
      setError(error.message);
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

  return (
    <div>
      <div className="container">
        <section>
          <h2>Selection</h2>
          <div className="row">
            <select
              id="selection"
              className="col-md-12"
              onChange={handleSelectionChange}
              value={selection}
            >
              {savedRecipes.map((recipe, idx) => (
                <option key={idx} value={recipe.fields.Title}>
                  {recipe.fields.Title}
                </option>
              ))}
            </select>
          </div>
        </section>
        <br />
        <section>
          {!isLoading &&
            dataByTitle && ( //data not loading and data is not null,
              <div>
                {dataByTitle.map((recipe, idx) => {
                  return (
                    <div key={idx}>
                      <div>
                        <h2>{recipe.fields.Title}</h2>
                        <div>
                          <div>
                            <img
                              src={recipe.fields.Image}
                              alt={recipe.fields.Title}
                            />
                          </div>
                          <div>
                            <div>
                              <button>Remove</button>
                            </div>
                            <div>
                              <p>
                                <GiMeal />
                                Servings: {recipe.fields.Servings}
                              </p>
                              <p>
                                <IoTimerOutline />
                                Prep Time: {recipe.fields.Minutes}
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
                            </div>
                          </div>
                        </div>
                        <div>
                          <div>
                            <div>
                              <h3>Ingredients</h3>
                              <ul>
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
