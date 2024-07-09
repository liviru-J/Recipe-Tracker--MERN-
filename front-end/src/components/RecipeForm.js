import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchRecipe, createRecipe, updateRecipe } from '../redux/recipeSlice';

const RecipeForm = ({ edit }) => {
  const [recipe, setRecipe] = useState({ name: '', ingredients: '', description: '' });
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { recipe: fetchedRecipe } = useSelector((state) => state.recipes);

  useEffect(() => {
    if (edit) {
      dispatch(fetchRecipe(id));
    }
  }, [dispatch, edit, id]);

  useEffect(() => {
    if (edit && fetchedRecipe) {
      setRecipe(fetchedRecipe);
    }
  }, [edit, fetchedRecipe]);

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (edit) {
      dispatch(updateRecipe({ id, recipe }))
        .unwrap()
        .then(() => navigate('/'))
        .catch((error) => console.error('Error updating recipe:', error));
    } else {
      dispatch(createRecipe(recipe))
        .unwrap()
        .then(() => navigate('/'))
        .catch((error) => console.error('Error creating recipe:', error));
    }
  };

  return (
    <div className="container mt-4">
      <h2>{edit ? 'Edit Recipe' : 'Add Recipe'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Recipe Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={recipe.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Ingredients</label>
          <textarea
            className="form-control"
            name="ingredients"
            value={recipe.ingredients}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={recipe.description}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </div>
  );
};

export default RecipeForm;
