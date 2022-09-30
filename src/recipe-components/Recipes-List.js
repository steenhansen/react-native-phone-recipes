import { Icon, ListItem } from '@rneui/themed';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

import { cloneRecipe } from '../recipe-store';
import { AccordianTitle } from './Accordian-Title';
import { RecipeKitchen, RecipeChoose } from './Recipe-Ingredients';
import { ToggledTimer } from "../screen-components/Toggled-Timer";
import { normalizeStyles } from '../util-funcs/normalize-css';

function RecipeAccordian({ recipe_index, recipes_expanded, setRecipes_expanded, current_recipe, google_email, scroll_view_ref }) {
  const [expanded_recipe, setExpanded_recipe] = useState(false);
  const [accordian_y_coord, setAccordian_y_coord] = useState(0);

  function on_showHideRecipe() {
    let copy_expandeds = [...recipes_expanded];
    if (expanded_recipe) {
      copy_expandeds[recipe_index] = false;
    } else {
      copy_expandeds[recipe_index] = cloneRecipe(current_recipe);
    }
    setRecipes_expanded(copy_expandeds);

    setExpanded_recipe(!expanded_recipe);
    scroll_view_ref.current.scrollTo({
      y: accordian_y_coord,
      animated: true,
    });
  }

  const accordian_title = AccordianTitle(current_recipe.title, 'yes-underline', on_showHideRecipe);
  const recipe_ingredients = RecipeChoose(current_recipe, google_email, recipes_expanded);
  const my_icon = (<Icon name={'power-on'} type="material-community" size={0} />);
  return (
    <ListItem.Accordion style={{ backgroundColor: '', padding: 0 }}
      containerStyle={{ backgroundColor: '', margin: 0, padding: 0 }}
      onLayout={event => { setAccordian_y_coord(event.nativeEvent.layout.y) }}
      chevron={false}
      content={accordian_title}
      isExpanded={expanded_recipe}
      icon={my_icon}                         >
      {recipe_ingredients}
    </ListItem.Accordion>
  )
}

function RecipesList({ filtered_collection, scroll_view_ref, google_email }) {
  const [recipes_expanded, setRecipes_expanded] = useState([]);
  const recipes_list = filtered_collection.map((current_recipe, recipe_index) =>
    <RecipeAccordian key={current_recipe.title} recipe_index={recipe_index} recipes_expanded={recipes_expanded}
      setRecipes_expanded={setRecipes_expanded} google_email={google_email} current_recipe={current_recipe} scroll_view_ref={scroll_view_ref} />)
  return recipes_list;
}

function ExpandedRecipes({ expanded_collection }) {
  const expanded_list = expanded_collection.map((current_recipe) =>
    <ExpandedAccordian key={current_recipe.title} current_recipe={current_recipe} />)
  return expanded_list;
}

function ExpandedAccordian({ current_recipe }) {
  const [clear_my_interval, setClear_my_interval] = useState(0);            // not ever used

  useEffect(() => {
    if (clear_my_interval) {
      return () => clearInterval(clear_my_interval);
    }
  }, [clear_my_interval]);

  const accordian_title = AccordianTitle(current_recipe.title, 'no-underline');
  const recipe_ingredients = RecipeKitchen(current_recipe);
  const my_icon = (<Icon name={'power-on'} type="material-community" size={0} />);

  return (
    <ListItem.Accordion style={{ backgroundColor: '', padding: 0 }}
      containerStyle={{ backgroundColor: '', margin: 0, padding: 0 }}
      chevron={false}
      content={accordian_title}
      isExpanded={true}
      icon={my_icon}                      >
      {recipe_ingredients}
      <View style={[styles_scroll.filter_space]} ></View>
      <ToggledTimer num_minutes={current_recipe.minutes} setClear_my_interval={setClear_my_interval}></ToggledTimer>
    </ListItem.Accordion>
  )
}

const styles_scroll = normalizeStyles({
  Scrollview_style: { marginTop: 16 },
  filter_space: { height: 6 }
})

export { RecipesList, ExpandedRecipes };
