import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  REAL_DATA_IMMEDIATE, TEST_DATA_IMMEDIATE, TEST_NEVER_NO_DATA
} from '../test-data/test-values';
import awaitSeconds from '../util-funcs/wait-promise';

import { ALL_RECIPES_URL, GMAIL_RECIPES_URL } from '../constants.js';

//https://phone-recipes.herokuapp.com/user-api/steenhansen1942@gmail.com

async function getRecipes(get_url) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  const get_response = await fetch(get_url, requestOptions);
  const json_value = await get_response.json();
  return json_value;
}

async function getGmailRecipes(google_email) {
  const the_url = `${GMAIL_RECIPES_URL}${google_email}`;
  const all_user = await getRecipes(the_url);
  const user_filtered = all_user.sorted_recipes;
  return user_filtered;
}

async function getYours(google_email) {
  const the_url = `${GMAIL_RECIPES_URL}${google_email}`;
  const all_user = await getRecipes(the_url);
  const user_filtered = all_user.sorted_recipes;
  return user_filtered;
}

async function getAllFiltered(FILTER_meal, FILTER_cuisine, FILTER_diet, FILTER_search) {
  const lower_meal = FILTER_meal.toLowerCase();
  const lower_cuisine = FILTER_cuisine.toLowerCase();
  const lower_diet = FILTER_diet.toLowerCase();
  const lower_text = FILTER_search.toLowerCase();
  const encoded_search = encodeURI(lower_text);
  const filtered_url = `${ALL_RECIPES_URL}${lower_meal}/${lower_cuisine}/${lower_diet}/${encoded_search}`;
  const filtered_home = await getRecipes(filtered_url);
  const home_filtered = filtered_home.sorted_recipes;
  return home_filtered;
}

async function renewRecipes_all(recipes_all) {
  if (recipes_all) {
    const jsonValue = JSON.stringify(recipes_all);
    await AsyncStorage.setItem('@recipes-all', jsonValue);
  }
}

async function renewRecipes_yours(recipes_yours) {
  if (recipes_yours) {
    const jsonValue = JSON.stringify(recipes_yours);
    await AsyncStorage.setItem('@recipes-yours', jsonValue);
  }
}

async function renewGoogle_email(google_email) {
  if (google_email) {
    await AsyncStorage.setItem('@google-email', google_email);
  }
}

async function getArray(storage_name) {
  let the_array = [];
  try {
    const last_array = await AsyncStorage.getItem(storage_name);
    if (last_array !== null) {
      the_array = JSON.parse(last_array);
      if (typeof the_array !== 'object') {
        the_array = [];
      }
    }
  } catch (e) {
    console.log('getArray error, e');
  }
  return the_array;
}



async function A_B_loadCache(test_start_cache) {

  if (test_start_cache.run_after_A_B < REAL_DATA_IMMEDIATE) {
    if (test_start_cache.run_after_A_B === TEST_NEVER_NO_DATA) {
      return;
    } else if (test_start_cache.run_after_A_B !== TEST_DATA_IMMEDIATE) {
      await awaitSeconds(test_start_cache.run_after_A_B);
    }
    const google_email = test_start_cache.init_A_B_google_email;
    const recipes_yours = test_start_cache.init_A_B_yours_cache;
    const recipes_all = test_start_cache.init_A_B_all_cache;
    return { google_email, recipes_all, recipes_yours };
  } else if (test_start_cache.run_after_A_B > 0) {
    await awaitSeconds(test_start_cache.run_after_A_B);
  }
  const google_email = await AsyncStorage.getItem('@google-email');;
  const recipes_yours = await getArray('@recipes-yours');
  const recipes_all = await getArray('@recipes-all');
  return { google_email, recipes_all, recipes_yours };
}

async function async_RenewCache(google_email, recipes_yours, recipes_all) {
  await renewUserGmail(google_email);
  await renewRecipes_yours(recipes_yours);
  await renewRecipes_all(recipes_all);
}

async function clearCache() {
  try {
    await AsyncStorage.removeItem('@google-email');
    await AsyncStorage.removeItem('@recipes-yours');
    await AsyncStorage.removeItem('@recipes-all');
  } catch (e) {
    // remove error
  }
  console.log(" CACHE HAS BEEN CLEARED");
  return;
}

export {
  getAllFiltered, getYours, clearCache,
  A_B_loadCache, async_RenewCache, getGmailRecipes,
  renewGoogle_email, renewRecipes_yours, renewRecipes_all
};
