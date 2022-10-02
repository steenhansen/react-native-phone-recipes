


const SERVER_CONNECTABLE = 'rgba(0, 255, 255, 1)';      ///  "#2089dc" BLUE
const CLICKABLE_CONNECTABLE = 'rgba(32, 137, 220, 0.1)';

const SERVER_NOT_CONNECTABLE = 'rgba(220, 137,32,  1)';      ///  "#dc8920" ORANGE
const CLICKABLE_NOT_CONNECTABLE = 'rgba(220,  137,32,   0.1)';

const ID_TOKEN_VALIDATE_URL = "https://phone-recipes.herokuapp.com/validate-token/";
const ALL_RECIPES_URL = "https://phone-recipes.herokuapp.com/get-api/";
const GMAIL_RECIPES_URL = "https://phone-recipes.herokuapp.com/user-api/";
const SERVER_UP_URL = "https://phone-recipes.herokuapp.com/";

const SERVER_NAME = "phone-recipes.herokuapp.com";
const GOTO_SERVER = "https://phone-recipes.herokuapp.com/";

const THEME_TIMER_OVERRUN = 'red';
const THEME_TIMER_OK = 'black';
const THEME_TIMER_POSITIVE = 'green';

const LEFT_INPUT_WIDTH = '70%';
const RIGHT_INPUT_WIDTH = '30%';

const THEME_ALIVE_INPUT_COLOR = 'rgba(0, 255, 0, 0.1)';
const THEME_DEAD_INPUT_COLOR = 'rgba(0, 0, 0, 0.05)';

const INTERVAL_CHECK_SERVER_CONNECTABLE = 4444;          //     54321;  // How often server is pinged
const INTERVAL_TIMER_EXECUTE = 500;  // 500==> 60fps

const ASSUME_SERVER_CONNECTABLE_START = true;

const EMPTY_CACHE_STATE = { google_email: null, recipes_yours: null, recipes_all: null };
// https://www.uxmatters.com/mt/archives/2007/01/applying-color-theory-to-digital-displays.php
const NO_SERVER_CONN_COL = 'red';
const BUTTON_BORDER_COL = 'grey';

const DARK_BACK_GROUND = 'black';
const DARK_TEXT_COLOR = 'white';
const DARK_HORZ_LINE = "#808080";
const DARK_TEXT_INPUT = '#333';
const DARK_BTN_TEXT = "black";

const DARK_LINK_COLOR = "#ffff00";
const DARK_BTN_COLOR = "#cccc00";
const DARK_BTN_OFF = "#444400";       // Yellow
const DARK_BTN_OFF_TEXT = '#ffff00';

// const DARK_LINK_COLOR = "#ff00ff";
// const DARK_BTN_COLOR = "#cc00cc";
// const DARK_BTN_OFF = "#440044";       // magenta
// const DARK_BTN_OFF_TEXT = '#ff00ff';

// const DARK_LINK_COLOR = "#00ff00";
// const DARK_BTN_COLOR = "#00cc00";
// const DARK_BTN_OFF = "#004400";       // green
// const DARK_BTN_OFF_TEXT = '#00ff00'

// const DARK_LINK_COLOR = "#00ffff";
// const DARK_BTN_COLOR = "#00cccc";
// const DARK_BTN_OFF = "#004444";        // cyan
// const DARK_BTN_OFF_TEXT = '#00ffff'



const LITE_LINK_COLOR = "rgba(32, 137, 220, 1)";
const LITE_BACK_GROUND = 'white';
const LITE_TEXT_COLOR = 'black';
const LITE_HORZ_LINE = '#888888';
const LITE_BTN_COLOR = "rgba(32, 137, 220, 1)";  // #2089DD   in Paint.net HSV(206, 85%, 86%, 255)

const LITE_BTN_OFF = "rgba(32, 137, 220, 0.1)";
const LITE_BTN_OFF_TEXT = '#145689';  // #0000A3   in Paint.net HSV(206, 85%, 53%, 255)

const LITE_TEXT_INPUT = '#eee';
const LITE_BTN_TEXT = "white";
export {
  LEFT_INPUT_WIDTH, RIGHT_INPUT_WIDTH,
  DARK_BTN_OFF_TEXT, LITE_BTN_OFF_TEXT,
  DARK_TEXT_INPUT, LITE_TEXT_INPUT,
  DARK_BTN_OFF, LITE_BTN_OFF,
  NO_SERVER_CONN_COL, BUTTON_BORDER_COL,
  DARK_LINK_COLOR, LITE_LINK_COLOR,
  DARK_BACK_GROUND, LITE_BACK_GROUND,
  DARK_TEXT_COLOR, LITE_TEXT_COLOR,
  DARK_HORZ_LINE, LITE_HORZ_LINE,
  DARK_BTN_COLOR, LITE_BTN_COLOR,
  DARK_BTN_TEXT, LITE_BTN_TEXT,
  THEME_TIMER_OVERRUN, THEME_TIMER_POSITIVE, THEME_TIMER_OK,

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
