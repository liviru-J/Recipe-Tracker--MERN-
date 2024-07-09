import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async () => {
    const response = await axios.get(
      "https://recipe-tracker-back-end-production.up.railway.app/recipes"
    );
    return response.data;
  }
);

export const fetchRecipe = createAsyncThunk(
  "recipes/fetchRecipe",
  async (id) => {
    const response = await axios.get(
      `https://recipe-tracker-back-end-production.up.railway.app/recipes/${id}`
    );
    return response.data;
  }
);

export const createRecipe = createAsyncThunk(
  "recipes/createRecipe",
  async (recipe) => {
    const response = await axios.post(
      "https://recipe-tracker-back-end-production.up.railway.app/recipes",
      recipe
    );
    return response.data;
  }
);

export const updateRecipe = createAsyncThunk(
  "recipes/updateRecipe",
  async ({ id, recipe }) => {
    const response = await axios.put(
      `https://recipe-tracker-back-end-production.up.railway.app/recipes/${id}`,
      recipe
    );
    return response.data;
  }
);

export const deleteRecipe = createAsyncThunk(
  "recipes/deleteRecipe",
  async (id) => {
    await axios.delete(
      `https://recipe-tracker-back-end-production.up.railway.app/recipes/${id}`
    );
    return id;
  }
);

const recipeSlice = createSlice({
  name: "recipes",
  initialState: {
    recipes: [],
    recipe: { name: "", ingredients: "", description: "" },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchRecipe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipe.fulfilled, (state, action) => {
        state.loading = false;
        state.recipe = action.payload;
      })
      .addCase(fetchRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createRecipe.fulfilled, (state, action) => {
        state.recipes.push(action.payload);
      })
      .addCase(updateRecipe.fulfilled, (state, action) => {
        const index = state.recipes.findIndex(
          (recipe) => recipe._id === action.payload._id
        );
        if (index !== -1) {
          state.recipes[index] = action.payload;
        }
      })
      .addCase(deleteRecipe.fulfilled, (state, action) => {
        state.recipes = state.recipes.filter(
          (recipe) => recipe._id !== action.payload
        );
      });
  },
});

export default recipeSlice.reducer;
