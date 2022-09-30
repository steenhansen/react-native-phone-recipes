
import { Text, View } from 'react-native';
import { useDispatch } from "react-redux";

import { getGmailRecipes } from '../recipe-server/recipe-cache.js';
import { normalizeStyles, normalizeConstants } from '../util-funcs/normalize-css';

import { lightOrDark } from '../util-funcs/light-dark';

import {
  DARK_BTN_OFF, LITE_BTN_OFF,
  LITE_BACK_GROUND, LITE_TEXT_COLOR, LITE_LINK_COLOR,
  DARK_BACK_GROUND, DARK_TEXT_COLOR, DARK_LINK_COLOR,
  NO_SERVER_CONN_COL, BUTTON_BORDER_COL,
  DARK_BTN_COLOR, LITE_BTN_COLOR,
  DARK_BTN_TEXT, LITE_BTN_TEXT
} from '../constants.js';

const light_css = {
  back_ground: LITE_BACK_GROUND,
  text_color: LITE_TEXT_COLOR,
  link_color: LITE_LINK_COLOR,
  button_color: LITE_BTN_COLOR,
  button_text: LITE_BTN_TEXT,
  button_off: LITE_BTN_OFF
};

const dark_css = {
  back_ground: DARK_BACK_GROUND,
  text_color: DARK_TEXT_COLOR,
  link_color: DARK_LINK_COLOR,
  button_color: DARK_BTN_COLOR,
  button_text: DARK_BTN_TEXT,
  button_off: DARK_BTN_OFF

};

function capitlFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function MealCuisineDietCook({ current_recipe, google_email, recipes_expanded }) {
  const dispatch = useDispatch();
  const light_or_dark = lightOrDark(light_css, dark_css);
  const { meal, cuisine, diet, cook } = current_recipe;
  let recipe_types = "";
  if (meal) recipe_types = capitlFirst(meal) + " / ";
  if (cuisine) recipe_types = recipe_types + capitlFirst(cuisine) + " / ";
  if (diet) recipe_types = recipe_types + capitlFirst(diet);
  const end_space_slash = new RegExp(/ \/ $/);
  const with_no_extra_slash = recipe_types.replace(end_space_slash, "");

  async function on_lookCookPress() {
    if (global.SERVER_IS_CONNECTABLE) {
      const recipes_other = await getGmailRecipes(cook);
      dispatch({ type: 'other-recipes', payload: { google_other: cook, recipes_other } });
    }
  }

  async function on_kitchenPress() {
    let expanded_array = [];
    for (let i = 0; i < recipes_expanded.length; i++) {
      const an_expanded = recipes_expanded[i];
      if (an_expanded !== undefined && an_expanded) {
        expanded_array.push(an_expanded);
      }
    }
    dispatch({ type: 'kitchen-view', payload: { expanded_array } });
  }
  /////////////////////////////////////////////////
  let show_cook_email = null;
  let kitchen_uppering = styles_constants.styles_kitchen_up_mine; // -12;
  if (cook !== google_email) {
    kitchen_uppering = styles_constants.styles_kitchen_up_other; //-20;
    show_cook_email = (<Text style={[styles_meal.styles_other_text, {
      backgroundColor: light_or_dark.back_ground,
      fontStyle: 'italic', width: '100%', textAlign: "center"
    }]}>
      <Text style={{ color: light_or_dark.text_color }}>by - </Text>
      <Text onPress={on_lookCookPress}
        style={[styles_meal.styles_other_text, { color: light_or_dark.link_color }, {
          fontWeight: 'bold',
          textDecorationLine: 'underline', textAlign: "center", color: light_or_dark.link_color
        }]}>
        {cook}</Text>
    </Text>)
  }

  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: light_or_dark.back_ground,
    }}>

      <View style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
      }}>
      </View>




      <View style={{
        fontStyle: 'italic',
        textAlign: "center"
      }}>
        <Text style={[styles_meal.styles_meal_type, {

          backgroundColor: light_or_dark.back_ground, fontStyle: 'italic', marginLeft: 'auto', marginRight: 'auto',
          textAlign: "center", color: light_or_dark.text_color
        }]}>{with_no_extra_slash}</Text>
        {show_cook_email}
      </View>




      <View style={[styles_meal.styles_contain_kitchen, {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center', position: 'relative', top: kitchen_uppering
      }]}>
        <Text onPress={on_kitchenPress}
          style={[styles_meal.styles_kitchen, {
            color: light_or_dark.link_color,
            textDecorationLine: 'underline'
          }]}>Kitchen</Text>
      </View>

    </View>
  )
}


const styles_constants = normalizeConstants({
  styles_kitchen_up_other: -20,
  styles_kitchen_up_mine: -12,
});

const styles_meal = normalizeStyles({
  styles_meal_type: {
    marginTop: -2,
    fontSize: 10
  },
  styles_contain_kitchen: {
    marginBottom: -10
  },
  styles_kitchen: {
    fontSize: 16,
    left: -4
  },
  styles_other_text: {
    fontSize: 10
  },

})


export { MealCuisineDietCook };
