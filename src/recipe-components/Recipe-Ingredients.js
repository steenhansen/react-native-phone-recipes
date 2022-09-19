
import { ListItem } from '@rneui/themed';
import { TouchableWithoutFeedback } from 'react-native';

import { HeatTimeServes } from './Heat-Time-Serves';
import { IngredientList } from './Ingredient-List';
import { InternalTempTimer } from './Internal-Temp-Timer';
import { MealCuisineDietCook } from './Meal-Cuisine-Diet-Cook';
import { StepsDirections } from './Steps-Directions';


function RecipeIngredients(recipe_index, current_recipe, google_email, recipes_expanded) {
  const the_key = current_recipe.title + '-filter';
  return (
    <TouchableWithoutFeedback style={{ backgroundColor: '', margin: 0, padding: 0 }}>
      <ListItem key={the_key} style={{ backgroundColor: '', margin: 0, padding: 0 }}
        containerStyle={{ margin: 0, padding: 0 }} chevron>
        <ListItem.Content style={{ backgroundColor: '', margin: 0, padding: 0 }}
          containerStyle={{ backgroundColor: '', margin: 0, padding: 0 }} chevron={false}>
          <MealCuisineDietCook current_recipe={current_recipe} google_email={google_email} recipes_expanded={recipes_expanded} />
          <StepsDirections current_recipe={current_recipe} />
          <HeatTimeServes current_recipe={current_recipe} />
          <InternalTempTimer current_recipe={current_recipe} />
          <IngredientList current_recipe={current_recipe} />
        </ListItem.Content>
      </ListItem>
    </TouchableWithoutFeedback>
  )
}

function ExpandedIngredients(recipe_index, current_recipe) {
  const the_key = current_recipe.title + '-kitchen';
  return (
    <TouchableWithoutFeedback style={{ backgroundColor: '', margin: 0, padding: 0 }}>
      <ListItem key={the_key} style={{ backgroundColor: '', margin: 0, padding: 0 }}
        containerStyle={{ margin: 0, padding: 0 }} chevron>
        <ListItem.Content style={{ backgroundColor: '', margin: 0, padding: 0 }}
          containerStyle={{ backgroundColor: '', margin: 0, padding: 0 }} chevron={false}>
          <StepsDirections current_recipe={current_recipe} />
          <HeatTimeServes current_recipe={current_recipe} />
          <InternalTempTimer current_recipe={current_recipe} />
          <IngredientList current_recipe={current_recipe} />
        </ListItem.Content>
      </ListItem>
    </TouchableWithoutFeedback>
  )
}

export { RecipeIngredients, ExpandedIngredients };
