
import { Text, View } from 'react-native';
import { useDispatch } from "react-redux";

import { getGmailRecipes } from '../recipe-server/recipe-cache.js';
import { normalizeStyles, THEME_WAS_CLICKED_COLOR } from '../util-funcs/normalize-css';

function capitlFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function MealCuisineDietCook({ current_recipe, google_email, recipes_expanded }) {
  const theme_was_clicked_color = THEME_WAS_CLICKED_COLOR();
  const dispatch = useDispatch();

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


  if (cook == google_email) {
    return (<>
      <Text onPress={on_kitchenPress}
        style={[styles_meal.styles_kitchen,
        { color: theme_was_clicked_color, marginLeft: 'auto', textDecorationLine: 'underline', position: 'relative' }]}
      >Kitchen</Text>
      <Text style={{ width: '100%', fontStyle: 'italic', textAlign: "center" }}>{with_no_extra_slash}</Text>
    </>
    );
  }
  let by_other_link_color;
  if (global.SERVER_IS_CONNECTABLE) {
    by_other_link_color = theme_was_clicked_color;
    by_other_underline = 'underline';
  } else {
    by_other_link_color = 'black';
    by_other_underline = 'none';
  }
  return (
    <View style={{ width: '100%', alignItems: 'center' }}>
      <Text onPress={on_kitchenPress}
        style={[styles_meal.styles_kitchen,
        { color: theme_was_clicked_color, marginLeft: 'auto', textDecorationLine: 'underline', position: 'relative' }]}
      >Kitchen</Text>
      <Text style={[styles_meal.styles_other_text, { width: '100%', fontStyle: 'italic', textAlign: "center" }]}>{with_no_extra_slash}</Text>
      <Text style={[styles_meal.styles_other_text, { fontStyle: 'italic', width: '100%', textAlign: "center" }]}>
        <Text>by - </Text>
        <Text onPress={on_lookCookPress}
          style={[styles_meal.styles_other_text, { color: by_other_link_color }, { fontWeight: 'bold', textDecorationLine: by_other_underline, textAlign: "center" }]}>
          {cook}</Text>
      </Text>
    </View>
  );
}

const styles_meal = normalizeStyles({
  styles_kitchen: {
    fontSize: 16,
    top: -18,
    left: -4
  },
  styles_other_text: {
    fontSize: 10
  },

})

export { MealCuisineDietCook };
