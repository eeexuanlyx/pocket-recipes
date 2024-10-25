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
      <h2>New Recipe Search</h2>
      <form onSubmit={handleSubmit}>
        <label>Search for recipes:</label>
        <input
          type="text"
          id="searchInput"
          name="searchInput"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <label>Search By:</label>
        <input
          type="radio"
          id="searchType"
          name="searchType"
          value="recipeByName"
          onClick={handleChange}
        />
        <label>By Name</label>

        <input
          type="radio"
          id="searchType"
          name="searchType"
          value="recipeByIngredients"
          onClick={handleChange}
        />
        <label>By Ingredient </label>

        <button type="submit">Submit</button>
      </form>
      <div>
        {props.recipeDisplay.map((item) => (
          <div className={styles.recipeCard} key={item.id}>
            <img className={styles.img} src={item.image} alt={item.title} />
            <div className={styles.content}>
              <p className={styles.dish}>{item.title}</p>
            </div>
            <button className={styles.contentButton}>View Recipe</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default SearchRecipes;
