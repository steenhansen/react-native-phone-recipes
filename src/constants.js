



/* NORMAL CONSTANTS */

const SERVER_CONNECTABLE = 'rgba(32, 137, 220, 1)';      ///  "#2089dc" BLUE
const CLICKABLE_CONNECTABLE = 'rgba(32, 137, 220, 0.1)';

const SERVER_NOT_CONNECTABLE = 'rgba(220, 137,32,  1)';      ///  "#dc8920" ORANGE
const CLICKABLE_NOT_CONNECTABLE = 'rgba(220,  137,32,   0.1)';

const ID_TOKEN_VALIDATE_URL = "https://phone-recipes.herokuapp.com/validate-token/";
const ALL_RECIPES_URL = "https://phone-recipes.herokuapp.com/get-api/";
const GMAIL_RECIPES_URL = "https://phone-recipes.herokuapp.com/user-api/";
const SERVER_UP_URL = "https://phone-recipes.herokuapp.com/"

const SERVER_NAME = "phone-recipes.herokuapp.com"
const GOTO_SERVER = "https://phone-recipes.herokuapp.com/"

const THEME_TIMER_OVERRUN = 'red';
const THEME_TIMER_OK = 'black';

const THEME_ALIVE_INPUT_COLOR = 'rgba(0, 255, 0, 0.1)';
const THEME_DEAD_INPUT_COLOR = 'rgba(0, 0, 0, 0.05)';

const INTERVAL_CHECK_SERVER_CONNECTABLE = 1000;
const INTERVAL_TIMER_EXECUTE = 250;

const ASSUME_SERVER_CONNECTABLE_START = true;

const EMPTY_CACHE_STATE = { google_email: null, recipes_yours: null, recipes_all: null };



export {

  THEME_TIMER_OVERRUN,

  EMPTY_CACHE_STATE,

  SERVER_NAME, GOTO_SERVER,
  ASSUME_SERVER_CONNECTABLE_START,
  THEME_DEAD_INPUT_COLOR,
  ID_TOKEN_VALIDATE_URL,
  ALL_RECIPES_URL,
  GMAIL_RECIPES_URL,
  SERVER_UP_URL,
  INTERVAL_CHECK_SERVER_CONNECTABLE, INTERVAL_TIMER_EXECUTE,
  SERVER_CONNECTABLE, CLICKABLE_CONNECTABLE, SERVER_NOT_CONNECTABLE, CLICKABLE_NOT_CONNECTABLE
};
