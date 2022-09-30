
import { ListItem } from '@rneui/themed';
import { View, TouchableWithoutFeedback } from 'react-native';

import { HeatTimeServes } from './Heat-Time-Serves';
import { IngredientList } from './Ingredient-List';
import { InternalTempTimer } from './Internal-Temp-Timer';
import { MealCuisineDietCook } from './Meal-Cuisine-Diet-Cook';
import { StepsDirections } from './Steps-Directions';
import { DARK_BACK_GROUND, LITE_BACK_GROUND } from '../constants.js';

import { lightOrDark } from '../util-funcs/light-dark';


const light_css = {
  back_ground: LITE_BACK_GROUND
};

const dark_css = {
  back_ground: DARK_BACK_GROUND
};

function RecipeBase(current_recipe, meal_cook) {


  const light_or_dark = lightOrDark(light_css, dark_css);

  const the_key = current_recipe.title + '-filter';
  return (
    <TouchableWithoutFeedback style={{ backgroundColor: '', margin: 0, padding: 0 }}>
      <View style={{ flex: 1, width: "100%", backgroundColor: '' }}>
        <ListItem key={the_key} style={{ backgroundColor: '', margin: 0, padding: 0 }}
          containerStyle={{ margin: 0, padding: 0 }} chevron>
          <ListItem.Content style={{ backgroundColor: light_or_dark.back_ground, margin: 0, padding: 0 }}
            containerStyle={{
              backgroundColor: '', margin: 0, padding: 0,
            }} chevron={false}>
            {meal_cook}
            <View style={{ backgroundColor: '', flex: 1, width: "100%" }}>
              <StepsDirections current_recipe={current_recipe} />
              <HeatTimeServes current_recipe={current_recipe} />
              <InternalTempTimer current_recipe={current_recipe} />
              <IngredientList current_recipe={current_recipe} />
            </View>
          </ListItem.Content>
        </ListItem>
      </View>
    </TouchableWithoutFeedback >
  )
}


function RecipeChoose(current_recipe, google_email, recipes_expanded) {

  const meal_cook = (<MealCuisineDietCook current_recipe={current_recipe} google_email={google_email} recipes_expanded={recipes_expanded} />);
  const recipe_choose = RecipeBase(current_recipe, meal_cook);
  return recipe_choose;
}

function RecipeKitchen(current_recipe) {
  const kitchen_recipe = RecipeBase(current_recipe, null);
  return kitchen_recipe;
}


export { RecipeChoose, RecipeKitchen };
