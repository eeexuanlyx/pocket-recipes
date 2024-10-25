import React from "react";
import { Link } from "react-router-dom";
import styles from "./RecipeCard.module.css";
import { useState } from "react";

const initialState = {
  searchInput: "",
  searchType: "",
};

const URL = "https://api.spoonacular.com/recipes/complexSearch";
const apiKey = import.meta.env.VITE_API_KEY;

const SearchRecipes = (props) => {
  const [formData, setFormData] = useState(initialState);
  const [query, setQuery] = useState("");

  const getRecipesByName = async () => {
    try {
      const res = await fetch(`${URL}?query=${query}&apiKey=${apiKey}`);

      if (!res.ok) {
        throw new Error("getting data error");
      }

      const data = await res.json();
      props.setRecipeDisplay(data.results);
      console.log(data.results);
    } catch (error) {
      console.error(error.message);
    }
  };

  const getRecipesByIngredients = async () => {
    try {
      const res = await fetch(
        `${URL}?includeIngredients=${query}&apiKey=${apiKey}`
      );

      if (!res.ok) {
        throw new Error("getting data error");
      }

      const data = await res.json();
      props.setRecipeDisplay(data.results);
      console.log(data.results);
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
  };

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  return (
    <>
      <h1>Search For Recipes</h1>
      <label>New Recipe Search: </label>
      <form onSubmit={handleSubmit}>
        <input
          className="col-sm-5"
          type="text"
          id="searchInput"
          name="searchInput"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <br></br>
        <label>Search By: &nbsp;</label>
        <input
          type="radio"
          id="searchType"
          name="searchType"
          value="recipeByName"
          onClick={handleChange}
        />
        <label>By Name &nbsp;</label>

        <input
          type="radio"
          id="searchType"
          name="searchType"
          value="recipeByIngredients"
          onClick={handleChange}
        />
        <label>By Ingredient &nbsp;</label>

        <button type="submit">Submit</button>
      </form>

      <div className={styles.recipeBox}>
        {props.recipeDisplay.map((item) => (
          <div className={styles.recipeCard} key={item.id}>
            <img className={styles.img} src={item.image} alt={item.title} />
            <div className={styles.content}>
              <p className={styles.cardtext}>{item.title}</p>
            </div>
            <button className={styles.contentButton}>View Recipe</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default SearchRecipes;
