
import { View, Text, ScrollView } from 'react-native';
import { useState, useRef } from 'react';
import { useSelector } from "react-redux";

import { RecipesList } from "../recipe-components/Recipes-List.js";
import { RadioButtons } from "../screen-components/Radio-Buttons.js";
import { SearchRatio } from "../screen-components/Search-Ratio";
import { normalizeStyles } from '../util-funcs/normalize-css';
import {
  SHOW_ALL, SHOW_YOURS,
  MEAL_TYPES, CUISINE_TYPES, DIET_TYPES, SHOW_OTHER
} from '../util-funcs/global-values';



function FilterScreen() {
  const [FILTER_search, FILTER_setSearch] = useState("");
  const [FILTER_meal, FILTER_setMeal] = useState("");
  const [FILTER_cuisine, FILTER_setCuisine] = useState("");
  const [FILTER_diet, FILTER_setDiet] = useState("");

  const all_state = useSelector((all_state) => all_state);

  function filterCollection(a_recipe) {
    const lower_search = FILTER_search.toLowerCase();
    const lower_meal = FILTER_meal.toLowerCase();
    const lower_cuisine = FILTER_cuisine.toLowerCase();
    const lower_diet = FILTER_diet.toLowerCase();

    const { meal, cuisine, diet, search } = a_recipe;
    if (FILTER_meal !== '' && meal !== lower_meal) return false;
    if (FILTER_cuisine !== '' && cuisine !== lower_cuisine) return false;
    if (FILTER_diet !== '' && diet !== lower_diet) return false;
    if (!search.includes(lower_search)) return false;
    return true;
  }

  const which__showing = useSelector((filter_state) => filter_state.show_which);
  let show_collection;
  const all__recipes = useSelector((s) => s.recipes_all);
  const your__recipes = useSelector((s) => s.recipes_yours);
  const other__recipes = useSelector((s) => s.recipes_other);

  if (which__showing === SHOW_ALL) {
    show_collection = all__recipes;
  } else if (which__showing === SHOW_YOURS) {
    show_collection = your__recipes;
  } else {
    show_collection = other__recipes;
  }

  const redux_google_email = useSelector((s) => s.google_email);
  const filtered_collection = show_collection.filter(filterCollection);
  const scroll_view_ref = useRef();

  const num_recipes_visible = filtered_collection.length;
  const num_recipes_possible = show_collection.length;

  const app_scroll = (
    <ScrollView ref={scroll_view_ref} style={[styles_scroll.Scrollview_style, {}]} >
      <SearchRatio num_recipes_possible={num_recipes_possible} num_recipes_visible={num_recipes_visible} FILTER_search={FILTER_search} FILTER_setSearch={FILTER_setSearch} />
      <RadioButtons button_texts={MEAL_TYPES} FILTER_text={FILTER_meal} setFilter_text={FILTER_setMeal} />
      <View style={[styles_scroll.filter_space]} ></View>
      <RadioButtons button_texts={CUISINE_TYPES} FILTER_text={FILTER_cuisine} setFilter_text={FILTER_setCuisine} />
      <View style={[styles_scroll.filter_space]}></View>
      <RadioButtons button_texts={DIET_TYPES} FILTER_text={FILTER_diet} setFilter_text={FILTER_setDiet} />
      <View style={[styles_scroll.filter_space]}></View>
      <RecipesList filtered_collection={filtered_collection} google_email={redux_google_email} scroll_view_ref={scroll_view_ref} />
    </ScrollView>
  );
  return app_scroll;
}

const styles_scroll = normalizeStyles({
  Scrollview_style: { marginTop: 16 },
  filter_space: { height: 6 }
})
export { FilterScreen };




