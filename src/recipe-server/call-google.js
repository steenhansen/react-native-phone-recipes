import { GoogleSignin } from '@react-native-google-signin/google-signin';

import {
  REAL_DATA_IMMEDIATE, TEST_DATA_IMMEDIATE, TEST_NEVER_NO_DATA
} from '../test-data/test-values';

const web_client_id = require('../config.json').webClientId;
const types_of_data = ['profile', 'email'];

GoogleSignin.configure({ scopes: types_of_data, webClientId: web_client_id });

async function gmailSignIn() {
  try {
    await GoogleSignin.hasPlayServices();
    const user_info = await GoogleSignin.signIn();
    return user_info;
  } catch (error) {
    console.log('ERROR - signIn - ', error);
  }
  return false;
};

async function signInSilently() {
  try {
    await GoogleSignin.hasPlayServices();
    const user_info = await GoogleSignin.signInSilently();
    return user_info;
  } catch (error) {
    if (error.message !== "SIGN_IN_REQUIRED") {
      console.log('ERROR - signInSilently - ', error);
    }
  }
  return false;
};

async function signOut(AUTH_setCurrent_gmail, AUTH_setUser_id, AUTH_setId_token) {
  try {
    await GoogleSignin.hasPlayServices();
    GoogleSignin.signOut();
    //    console.log('***signOut');
  } catch (error) {
    console.log('ERROR - signOut - ', error);
  }
}

async function C_signInSilently(google_email, test_silent_signin) {
  if (test_silent_signin.run_after_C < REAL_DATA_IMMEDIATE) {
    if (test_silent_signin.run_after_C === TEST_NEVER_NO_DATA) {
      return false;
    } else if (test_silent_signin.run_after_C !== TEST_DATA_IMMEDIATE) {
      await awaitSeconds(test_silent_signin.run_after_C);
    }
    const google_email = test_silent_signin.init_C_google_email;
    const google_user_id = test_silent_signin.init_C_google_user_id;
    const google_idToken = test_silent_signin.init_C_google_idToken;
    return { google_email, google_user_id, google_idToken };
  } else if (test_silent_signin.run_after_C > 0) {
    await awaitSeconds(test_silent_signin.run_after_C);
  }
  const user_info = await signInSilently();
  return user_info;
}

export { C_signInSilently, gmailSignIn, signInSilently, signOut };
