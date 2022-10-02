
const cloneAnIngredient = an_ingredient => { return { ingredient: an_ingredient.ingredient, amount: an_ingredient.amount }; };
const cloneIngredients = ingredient_list => Array.from(ingredient_list, cloneAnIngredient);

const cloneARecipe = a_recipe => {
  let recipe_clone = Object.assign({}, a_recipe);
  recipe_clone.comments = [...a_recipe.comments];
  recipe_clone.ingredients = cloneIngredients(a_recipe.ingredients);
  return recipe_clone;
};

const cloneRecipeList = a_recipe_list => {
  if (a_recipe_list === null) return [];
  return Array.from(a_recipe_list, cloneARecipe);
};

export {
  cloneRecipeList, cloneARecipe
};
