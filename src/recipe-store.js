import { useSelector } from "react-redux";
import { createStore } from "redux";

import { SHOW_ABOUT, SHOW_ALL, SHOW_KITCHEN, SHOW_OTHER, SHOW_YOURS } from './util-funcs/global-values';

export {
  cloneRecipe,
  showReduxData,
  makeReduxStore,
  recipeReducer
};

const cloneAnIngredient = an_ingredient => { return { ingredient: an_ingredient.ingredient, amount: an_ingredient.amount } };
const cloneIngredients = ingredient_list => Array.from(ingredient_list, cloneAnIngredient);

const cloneRecipe = a_recipe => {
  let recipe_clone = Object.assign({}, a_recipe);
  recipe_clone.comments = [...a_recipe.comments];
  recipe_clone.ingredients = cloneIngredients(a_recipe.ingredients);
  return recipe_clone;
};

const cloneRecipeList = a_recipe_list => {
  if (a_recipe_list === null) return [];
  return Array.from(a_recipe_list, cloneRecipe);
}

function showReduxData() {
  const just_data = useSelector((header_state) => header_state);
  delete just_data.recipes_all;
  delete just_data.recipes_yours;
  return just_data;

}

function makeReduxStore(init_redux_store) {
  const recipe_store = createStore(recipeReducer, init_redux_store);
  return recipe_store;
}

const recipeReducer = (state, action) => {
  console.log('action', action.type)
  let next_state;
  if (action.type === "start-cache") {
    next_state = reduxStartCache(state, action);

  } else if (action.type === "other-recipes") {
    next_state = reduxViewOthersRecipes(state, action);


  } else if (action.type === "all-click") {
    next_state = reduxViewAllRecipes(state, action);
  } else if (action.type === "signin-click") {
    next_state = reduxSignInClick(state, action);
  } else if (action.type === "about-click") {
    next_state = reduxAboutClick(state, action);
  } else if (action.type === "signout-click") {
    next_state = reduxSignOutClick(state, action);
  } else if (action.type === "silent-signin") {
    next_state = reduxSilentSignin(state, action);


  } else if (action.type === "server-data") {
    next_state = reduxServerData(state, action);
  } else if (action.type === "yours-click") {
    next_state = reduxViewYourRecipes(state, action);
  } else if (action.type === "kitchen-view") {
    next_state = reduxViewKitchen(state, action);
  } else if (action.type === "dark-view") {
    next_state = reduxSetDark(state, action);
  } else {
    next_state = state;
  }
  return next_state;
};


function reduxSetDark(state, action) {
  const recipes_yours = cloneRecipeList(state.recipes_yours);
  const recipes_all = cloneRecipeList(state.recipes_all);
  const recipes_other = cloneRecipeList(state.recipes_other);
  const recipes_kitchen = [];
  const google_email = state.google_email;
  const google_other = state.google_other;
  const google_user_id = state.google_user_id
  const google_idToken = state.google_idToken
  const show_previous = state.show_previous;
  const show_which = state.show_which;
  const is_dark = action.payload.is_dark;

  console.log('ddddddddddd', is_dark, action.payload.is_dark)
  const next_state = {
    recipes_all, recipes_yours, recipes_other, recipes_kitchen,
    show_which, show_previous, is_dark,
    google_email, google_other, google_user_id, google_idToken
  };
  return next_state;
}


function reduxViewOthersRecipes(state, action) {
  const recipes_yours = cloneRecipeList(state.recipes_yours);
  const recipes_all = cloneRecipeList(state.recipes_all);
  const recipes_other = cloneRecipeList(action.payload.recipes_other);
  const recipes_kitchen = [];
  const google_other = action.payload.google_other;
  const google_user_id = state.google_user_id
  const google_idToken = state.google_idToken
  show_previous = state.show_which;
  const show_which = SHOW_OTHER;
  const is_dark = state.is_dark;
  const next_state = {
    recipes_all, recipes_yours, recipes_other, recipes_kitchen,
    show_which, show_previous, is_dark,
    google_email, google_other, google_user_id, google_idToken
  };
  return next_state;
}

function reduxStartCache(state, action) {
  const google_email = action.payload.google_email;
  const recipes_yours = cloneRecipeList(action.payload.recipes_yours);
  const recipes_all = cloneRecipeList(action.payload.recipes_all);
  const recipes_other = [];
  const recipes_kitchen = [];
  const google_other = '';
  show_previous = state.show_which;
  const show_which = SHOW_ALL;
  const google_user_id = state.google_user_id
  const google_idToken = state.google_idToken
  const is_dark = state.is_dark;
  const next_state = {
    recipes_all, recipes_yours, recipes_other, recipes_kitchen,
    show_which, show_previous, is_dark,
    google_email, google_other, google_user_id, google_idToken
  };
  return next_state;
}

function reduxServerData(state, action) {
  const recipes_yours = cloneRecipeList(action.payload.recipes_yours);
  const recipes_all = cloneRecipeList(action.payload.recipes_all);
  google_email = state.google_email;
  const recipes_other = cloneRecipeList(state.recipes_other);
  const recipes_kitchen = [];
  const google_other = state.google_other;
  show_previous = state.show_which;
  const show_which = state.show_which;
  const google_user_id = state.google_user_id
  const google_idToken = state.google_idToken
  const is_dark = state.is_dark;
  const next_state = {
    recipes_all, recipes_yours, recipes_other, recipes_kitchen,
    show_which, show_previous, is_dark,
    google_email, google_other, google_user_id, google_idToken
  };
  return next_state;
}

function reduxSignInClick(state, action) {
  let { google_email, google_user_id, google_idToken, recipes_yours } = action.payload;
  const recipes_all = cloneRecipeList(state.recipes_all);
  show_previous = state.show_which;
  if (google_email) {
    recipes_yours = cloneRecipeList(recipes_yours);
    show_which = SHOW_YOURS;
  } else {
    recipes_yours = [];
    show_which = SHOW_ALL;
    google_email = '';
    google_user_id = '';
    google_idToken = '';
  }
  const recipes_other = [];
  const recipes_kitchen = [];
  const google_other = '';
  const is_dark = state.is_dark;
  const next_state = {
    recipes_all, recipes_yours, recipes_other, recipes_kitchen,
    show_which, show_previous, is_dark,
    google_email, google_other, google_user_id, google_idToken
  };
  return next_state;
}

function reduxSignOutClick(state, action) {
  const recipes_all = cloneRecipeList(state.recipes_all);
  recipes_yours = [];
  const recipes_other = [];
  const recipes_kitchen = [];
  show_previous = state.show_which;
  show_which = SHOW_ALL;
  google_email = '';
  const google_other = '';
  google_user_id = '';
  google_idToken = '';
  const is_dark = state.is_dark;
  const next_state = {
    recipes_all, recipes_yours, recipes_other, recipes_kitchen,
    show_which, show_previous, is_dark,
    google_email, google_other, google_user_id, google_idToken
  };
  return next_state;
}


function reduxSilentSignin(state, action) {
  const user_info = action.payload;
  const recipes_all = cloneRecipeList(state.recipes_all);
  show_previous = state.show_which;
  if (user_info) {
    recipes_yours = cloneRecipeList(state.recipes_yours);
    show_which = SHOW_YOURS;
    google_email = user_info.user.email;
    google_user_id = user_info.user.id;
    google_idToken = user_info.idToken;
  } else {
    recipes_yours = [];
    show_which = SHOW_ALL;
    google_email = '';
    google_user_id = '';
    google_idToken = '';
  }
  const recipes_other = [];
  const recipes_kitchen = [];
  const google_other = '';
  const is_dark = state.is_dark;
  const next_state = {
    recipes_all, recipes_yours, recipes_other, recipes_kitchen,
    show_which, show_previous, is_dark,
    google_email, google_other, google_user_id, google_idToken
  };
  return next_state;
}

function reduxViewAllRecipes(state, action) {
  const recipes_all = cloneRecipeList(state.recipes_all);
  const recipes_yours = cloneRecipeList(state.recipes_yours);
  const recipes_other = [];
  const recipes_kitchen = [];
  show_previous = state.show_which;
  const show_which = SHOW_ALL;
  const google_email = state.google_email;
  const google_other = '';
  const google_user_id = state.google_user_id;
  const google_idToken = state.google_idToken;
  const is_dark = state.is_dark;
  const next_state = {
    recipes_all, recipes_yours, recipes_other, recipes_kitchen,
    show_which, show_previous, is_dark,
    google_email, google_other, google_user_id, google_idToken
  };
  return next_state;
}

function reduxViewYourRecipes(state, action) {
  const recipes_all = cloneRecipeList(state.recipes_all);
  const recipes_yours = cloneRecipeList(state.recipes_yours);
  const recipes_other = [];
  const recipes_kitchen = [];
  show_previous = state.show_which;
  const show_which = SHOW_YOURS;
  const google_email = state.google_email;
  const google_other = '';
  const google_user_id = state.google_user_id;
  const google_idToken = state.google_idToken;
  const is_dark = state.is_dark;
  const next_state = {
    recipes_all, recipes_yours, recipes_other, recipes_kitchen,
    show_which, show_previous, is_dark,
    google_email, google_other, google_user_id, google_idToken
  }
  return next_state;
}

function reduxViewKitchen(state, action) {
  const recipes_all = cloneRecipeList(state.recipes_all);
  const recipes_yours = cloneRecipeList(state.recipes_yours);
  const recipes_other = [];
  const recipes_kitchen = cloneRecipeList(action.payload.expanded_array);
  show_previous = state.show_which;
  const show_which = SHOW_KITCHEN;
  const google_email = state.google_email;
  const google_other = '';
  const google_user_id = state.google_user_id;
  const google_idToken = state.google_idToken;
  const is_dark = state.is_dark;
  const next_state = {
    recipes_all, recipes_yours, recipes_other, recipes_kitchen,
    show_which, show_previous, is_dark,
    google_email, google_other, google_user_id, google_idToken
  };
  return next_state;
}




function reduxAboutClick(state, action) {
  const recipes_all = cloneRecipeList(state.recipes_all);
  const recipes_yours = cloneRecipeList(state.recipes_yours);
  const recipes_other = [];
  const recipes_kitchen = [];
  show_previous = state.show_which;
  const show_which = SHOW_ABOUT;
  const google_email = state.google_email;
  const google_other = '';
  const google_user_id = state.google_user_id;
  const google_idToken = state.google_idToken;
  const is_dark = state.is_dark;
  const next_state = {
    recipes_all, recipes_yours, recipes_other, recipes_kitchen,
    show_which, show_previous, is_dark,
    google_email, google_other, google_user_id, google_idToken
  };
  return next_state;
}