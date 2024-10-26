import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import RecipeCard from "./RecipeCard";

const initialState = {
  searchInput: "",
  searchType: "recipeByName",
};

const URL = "https://api.spoonacular.com/recipes/complexSearch";
const apiKey = import.meta.env.VITE_API_KEY;

const SearchRecipes = (props) => {
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(true);

  const getRecipesByName = async () => {
    try {
      const res = await fetch(
        `${URL}?query=${formData.searchInput}&apiKey=${apiKey}`
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

  const getRecipesByIngredients = async () => {
    try {
      const res = await fetch(
        `${URL}?includeIngredients=${formData.searchInput}&apiKey=${apiKey}`
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
    setIsLoading(false);
  };

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  return (
    <>
      <h1>Search For Recipes</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="searchInput">New Recipe Search: </label>
        <br></br>
        <input
          className="col-sm-5"
          type="text"
          id="searchInput"
          name="searchInput"
          onChange={handleChange}
          value={formData.searchInput}
        />
        <br></br>
        <input
          type="radio"
          id="recipeByName"
          name="searchType"
          value="recipeByName"
          onClick={handleChange}
        />
        <label htmlFor="recipeByName">By Name &nbsp;</label>

        <input
          type="radio"
          id="recipeByIngredients"
          name="searchType"
          value="recipeByIngredients"
          onClick={handleChange}
        />
        <label htmlFor="recipeByIngredients">By Ingredient &nbsp;</label>

        <button type="submit">Submit</button>
      </form>

      <RecipeCard isLoading={isLoading} recipeDisplay={props.recipeDisplay} />
    </>
  );
};

export default SearchRecipes;
