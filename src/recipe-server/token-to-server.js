
import { ID_TOKEN_VALIDATE_URL } from '../constants.js';

// https://phone-recipes.herokuapp.com/validate-token/abcdefghijklmonpqrstuvwxyz234567890

async function idTokenToServer(AUTH_google_user_id, AUTH_google_idToken) {
  if (AUTH_google_idToken !== '') {
    const token_url = ID_TOKEN_VALIDATE_URL + AUTH_google_idToken;
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "text/plain" },
    };
    await fetch(token_url, requestOptions)
      .then((response) => {
        return response.text();
      })
      .then((text_response) => {
        if (text_response === AUTH_google_user_id) {     /// 123456789012345678901 == 123456789012345678901
          return true;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return false;
}

export { idTokenToServer };