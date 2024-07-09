import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchRecipes, deleteRecipe } from "../redux/recipeSlice";
import "../../src/App.css";

const RecipeList = () => {
  const dispatch = useDispatch();
  const { recipes, loading, error } = useSelector((state) => state.recipes);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete the recipe?")) {
      dispatch(deleteRecipe(id)).catch((error) =>
        console.error("Error deleting recipe:", error)
      );
    }
  };

  const truncateDescription = (description) => {
    if (description.length <= 25) {
      return description;
    }
    return `${description.substring(0, 25)}...`;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mt-4">
      <div className="row">
        {recipes.map((recipe) => (
          <div className="col-md-4 mb-3" key={recipe._id}>
            <div className="card shadow-lg">
              <div className="card-body">
                <h5 className="card-title">{recipe.name}</h5>
                <p className="card-text">
                  {truncateDescription(recipe.description)}
                </p>
                <Link to={`/recipes/${recipe._id}`} className="btn btn-primary">
                  View
                </Link>
                <Link
                  to={`/edit-recipe/${recipe._id}`}
                  className="btn btn-secondary mx-2"
                >
                  Edit
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(recipe._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
