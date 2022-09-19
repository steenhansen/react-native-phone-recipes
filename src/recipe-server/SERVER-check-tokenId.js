
// This is the node.js, Express.js server code that executes to verify that 
// the gmail is actually logged into Phone-Recipes and Google Mail on a 
// mobile React Native Device

// https://phone-recipes.herokuapp.com/validate-token/abcdefghijklmonpqrstuvwxyz234567890

const { OAuth2Client } = require('google-auth-library');
const webClientId = "703366983526-rqp153lgutts5rhlhit133tuv77p0pja.apps.googleusercontent.com";
const oauth2client = new OAuth2Client(webClientId);

async function verifyIdToken(AUTH_google_idToken) {
  const oauth_ticket = await oauth2client.verifyIdToken({
    idToken: AUTH_google_idToken,
    audience: webClientId
  });
  const oauth_payload = oauth_ticket.getPayload();
  const AUTH_google_user_id = oauth_payload['sub'];
  if (Number.isInteger(AUTH_google_user_id) && AUTH_google_user_id > 1234567890) {
    return AUTH_google_user_id;                                // ex 123456789012345678901
  }
  return 'OAuth Failed';
}

app.get("/validate-token/*", async (req, res) => {
  const the_url = req.originalUrl;
  const [_1, _2, AUTH_google_idToken] = the_url.split("/");
  const trimmed_token = AUTH_google_idToken.trim();
  let AUTH_google_user_id = 'Invalid Token';
  if (trimmed_token !== '') {
    AUTH_google_user_id = await verifyIdToken(trimmed_token).catch(console.error);
  }
  res.send(AUTH_google_user_id);
});
