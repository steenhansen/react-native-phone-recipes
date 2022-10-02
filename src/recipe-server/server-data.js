
import { getAllFiltered, getYours } from './recipe-cache.js';

import {
  TEST_NEVER_NO_DATA,
  TEST_DATA_IMMEDIATE, TEST_DATA_SLEEP_100_SEC,
  REAL_DATA_IMMEDIATE, REAL_DATA_SLEEP_100_SEC
} from '../test-data/test-values';

async function async_loadUser(google_email) {
  const recipes_yours = await getYours(google_email);
  return recipes_yours;
}

async function D_serverData(google_email, test_server_data) {
  if (test_server_data.run_after_D < REAL_DATA_IMMEDIATE) {
    if (test_server_data.run_after_D === TEST_NEVER_NO_DATA) {
      return;
    } else if (test_server_data.run_after_D !== TEST_DATA_IMMEDIATE) {
      await awaitSeconds(test_server_data.run_after_D);
    }
    const recipes_yours = test_server_data.init_D_yours_server;
    const recipes_all = test_server_data.init_D_all_server;
    return { recipes_all, recipes_yours };
  } else if (test_server_data.run_after_D > 0) {
    await awaitSeconds(test_server_data.run_after_D);
  }
  const recipes_all = await getAllFiltered('', '', '', '');
  let recipes_yours;
  if (google_email === null) {
    recipes_yours = [];
  } else {
    recipes_yours = await getYours(google_email);
  }
  return { recipes_all, recipes_yours };
}

export {
  async_loadUser,
  D_serverData
};
