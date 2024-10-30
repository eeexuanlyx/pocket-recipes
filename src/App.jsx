import { Route, Routes } from "react-router-dom";
import NavBar from "./component/Navbar";
import SearchRecipes from "./component/SearchRecipes";
import SavedRecipes from "./component/SavedRecipes";
import { useState } from "react";
import Footer from "./component/Footer";

const App = () => {
  const [recipeDisplay, setRecipeDisplay] = useState([]);

  return (
    <>
      <div className="appName">
        <h1 className="h1">Pocket Recipes</h1>
      </div>
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
      <Footer />
    </>
  );
};

export default App;
