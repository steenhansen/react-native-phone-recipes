


const EXTRA_TIMER_START = -0.0001;


const DISPLAY_0_ALL = 0;
const DISPLAY_1_OTHER = 1;
const DISPLAY_2_YOURS = 2;

const SHOW_INIT = 'show::init';
const SHOW_ALL = 'show::all';
const SHOW_YOURS = 'show::yours';
const SHOW_OTHER = 'show::other';
const SHOW_KITCHEN = 'show::kitchen';
const SHOW_ABOUT = 'show::about';


const MEAL_TYPES = ['Breakfast', 'Brunch', 'Lunch', 'Supper', 'Dessert', 'Snack'];
const CUISINE_TYPES = ['Chinese', 'Indian', 'Japanese', 'Mexican', 'Italian', 'French'];
const DIET_TYPES = ['Omnivore', 'Vegan', 'Vegetarian', 'Halal', 'Kosher'];

const ID_SEPARATOR = "~";

const TIMER_OVERRUN_VIBRATE = [1000, 1000, 1000, 1000, 1000, 1000];
const TIMER_OVERRUN_MSEC = -1000;

const SOLID_UNDERLINE_CHARS = "____________________________________________________________________________________________________________________________________";

const INIT_REDUX_STORE = {
  recipes_yours: [],
  recipes_all: [],
  recipes_other: [],

  show_which: SHOW_INIT,
  google_other: '',
  google_email: '',
  google_user_id: '',
  google_idToken: ''
};

export {
  TIMER_OVERRUN_VIBRATE, TIMER_OVERRUN_MSEC, SOLID_UNDERLINE_CHARS,
  EXTRA_TIMER_START,
  INIT_REDUX_STORE,
  SHOW_INIT, SHOW_ALL, SHOW_YOURS, SHOW_OTHER, SHOW_KITCHEN, SHOW_ABOUT,
  ID_SEPARATOR,
  DISPLAY_0_ALL, DISPLAY_1_OTHER, DISPLAY_2_YOURS,
  MEAL_TYPES, CUISINE_TYPES, DIET_TYPES

};

