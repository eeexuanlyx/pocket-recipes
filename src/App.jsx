import { Route, Routes } from "react-router-dom";
import NavBar from "./component/Navbar";
import SearchRecipes from "./component/SearchRecipes";
import SavedRecipes from "./component/SavedRecipes";
import { useState } from "react";

const App = () => {
  const [recipeDisplay, setRecipeDisplay] = useState([]);

  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <main>
              <SearchRecipes
                recipeDisplay={recipeDisplay}
                setRecipeDisplay={setRecipeDisplay}
              />
            </main>
          }
        />
        <Route path="/saved-recipes" element={<SavedRecipes />} />
      </Routes>
    </>
  );
};

export default App;
