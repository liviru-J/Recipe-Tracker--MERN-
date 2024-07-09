import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchRecipe } from '../redux/recipeSlice';

const RecipeDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { recipe, loading, error } = useSelector((state) => state.recipes);

  useEffect(() => {
    dispatch(fetchRecipe(id));
  }, [dispatch, id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!recipe) return <p>No recipe found</p>;

  return (
    <div className="container mt-4">
      <h2>{recipe.name}</h2>
      <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
      <p><strong>Description:</strong> {recipe.description}</p>
    </div>
  );
};

export default RecipeDetail;
