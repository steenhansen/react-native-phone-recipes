
import AsyncStorage from '@react-native-async-storage/async-storage';
import { C_signInSilently } from './recipe-server/call-google';
import { D_serverData } from "./recipe-server/server-data";

import { A_B_loadCache } from './recipe-server/recipe-cache.js';


import {
  INIT_A_ALL_CACHE_1
} from './test-data/load-cache';

import { SHOW_ALL, SHOW_YOURS } from './util-funcs/global-values';

/*

    -987654321 = TEST_DATA_IMMEDIATE
    -123409876 = TEST_NEVER_NO_DATA
          -123 = TEST DATA SLEEP 123 seconds
             0 = REAL_DATA_IMMEDIATE
             5 = REAL DATA SLEEP 5 seconds
  */
const test_start_cache = {
  run_after_A_B: 0, //TEST_DATA_IMMEDIATE,
  init_A_B_google_email: 'steenhansen1942@gmail.com',
  init_A_B_all_cache: INIT_A_ALL_CACHE_1,
  init_A_B_yours_cache: []
};
async function get_loadCache() {
  const { google_email, recipes_all, recipes_yours } = await A_B_loadCache(test_start_cache);
  let show_type;
  if (google_email === '' || recipes_yours.length === 0) {
    show_type = SHOW_ALL;
  } else {
    show_type = SHOW_YOURS;
  }
  return {
    google_email: google_email,
    show_which: show_type,
    recipes_yours: recipes_yours,
    recipes_all: recipes_all
  };
}

const test_silent_signin = {
  run_after_C: 0, // TEST_NEVER_NO_DATA, //TEST_DATA_IMMEDIATE,
  init_C_signed_in: true,
  init_C_google_email: 'c@gmail.com',
  init_C_google_user_id: 'c-user-id',
  init_C_google_idToken: 'c-id-token',
};
async function get_silentSignin() {
  const google_email = await AsyncStorage.getItem('@google-email');
  const user_info = await C_signInSilently(google_email, test_silent_signin);
  return user_info;
}

const test_server_data = {
  run_after_D: 0, //TEST_NEVER_NO_DATA, //TEST_DATA_IMMEDIATE,
  init_D_current_email: 'test-bob@gmail.com',
  init_D_all_server: INIT_A_ALL_CACHE_1,
  init_D_yours_server: INIT_A_ALL_CACHE_1
};

async function get_serverData(silent_google_email) {
  let google_email
  if (silent_google_email) {
    google_email = silent_google_email;
  } else {
    const cached_google_email = await AsyncStorage.getItem('@google-email');
    google_email = cached_google_email;
  }

  try {
    let all_yours_recipes = await D_serverData(google_email, test_server_data);
    all_yours_recipes['google_email'] = google_email;
    global.SERVER_IS_CONNECTABLE = true;
    return all_yours_recipes;
  } catch (e) {
    global.SERVER_IS_CONNECTABLE = false;
  }
}


export { get_loadCache, get_silentSignin, get_serverData };
