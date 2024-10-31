import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import styles from "./SearchRecipes.module.css";

const SearchRecipes = (props) => {
  const initialState = {
    searchInput: "",
    searchType: "recipeByName",
  };
  const URL = "https://api.spoonacular.com/recipes/complexSearch";

  const apiKey = import.meta.env.VITE_API_KEY;
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(true);

  const getRecipesByName = async () => {
    try {
      const res = await fetch(
        `${URL}?query=${formData.searchInput}&number=20&apiKey=${apiKey}`
      );

      if (!res.ok) {
        throw new Error("getting data error");
      }

      const data = await res.json();
      props.setRecipeDisplay(data.results);
    } catch (error) {
      console.error(error.message);
    }
  };

  //gets random recipes on mount
  useEffect(() => {
    getRecipesByName();
    setFormData(initialState);
    setIsLoading(false);
  }, []);

  const getRecipesByIngredients = async () => {
    try {
      const res = await fetch(
        `${URL}?includeIngredients=${formData.searchInput}&number=20&apiKey=${apiKey}`
      );

      if (!res.ok) {
        throw new Error("getting data error");
      }

      const data = await res.json();
      props.setRecipeDisplay(data.results);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.searchType === "recipeByName") {
      getRecipesByName();
    } else getRecipesByIngredients();

    setFormData(initialState);
    setIsLoading(false);
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className={styles.searchContainer}>
        <form className={styles.searchForm} onSubmit={handleSubmit}>
          <label className={styles.rs} htmlFor="searchInput">
            New Recipe Search:
          </label>
          <br></br>
          <div className={styles.recipeSearch}>
            <input
              className="col-sm-5"
              type="text"
              id="searchInput"
              name="searchInput"
              onChange={handleChange}
              value={formData.searchInput}
            />
            <br></br>
            <div className={styles.submitInfo}>
              <div className={styles.radioSubmit}>
                <input
                  type="radio"
                  id="recipeByName"
                  name="searchType"
                  value="recipeByName"
                  onClick={handleChange}
                />
                <label className="label2" htmlFor="recipeByName">
                  By Name &nbsp;
                </label>

                <input
                  type="radio"
                  id="recipeByIngredients"
                  name="searchType"
                  value="recipeByIngredients"
                  onClick={handleChange}
                />
                <label className="label2" htmlFor="recipeByIngredients">
                  By Ingredient &nbsp;
                </label>

                <button type="submit">Submit</button>
              </div>
            </div>
          </div>
          <div className={styles.rs2} htmlFor="searchInput">
            To search By Ingredients : each ingredient should be seperated with
            a comma
          </div>
        </form>
      </div>

      <RecipeCard isLoading={isLoading} recipeDisplay={props.recipeDisplay} />
    </>
  );
};

export default SearchRecipes;
