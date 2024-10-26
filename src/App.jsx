import { Route, Routes } from "react-router-dom";

import NavBar from "./component/Navbar";
import SearchRecipes from "./component/SearchRecipes";
import SavedRecipes from "./component/SavedRecipes";
import { useState } from "react";

const App = () => {
  const [recipeDisplay, setRecipeDisplay] = useState([]);
  const [foodId, setFoodId] = useState("");

  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <main>
              <h1>Pocket Recipes</h1>
            </main>
          }
        />
        <Route
          path="/search-recipes"
          element={
            <SearchRecipes
              recipeDisplay={recipeDisplay}
              setRecipeDisplay={setRecipeDisplay}
              setFoodId={setFoodId}
            />
          }
        />
        <Route path="/saved-recipes" element={<SavedRecipes />} />
      </Routes>
    </>
  );
};

export default App;
