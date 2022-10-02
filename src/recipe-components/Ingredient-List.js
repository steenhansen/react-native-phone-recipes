import { Text, TextInput, View } from 'react-native';

import { heading__styles, heading__empty, input__styles, normalizeStyles } from '../util-funcs/normalize-css';

import { lightOrDark } from '../util-funcs/light-dark';

import {
  LEFT_INPUT_WIDTH, RIGHT_INPUT_WIDTH,
  LITE_BACK_GROUND, LITE_TEXT_COLOR, LITE_TEXT_INPUT,
  DARK_BACK_GROUND, DARK_TEXT_COLOR, DARK_TEXT_INPUT,
} from '../constants.js';

const light_css = {
  back_ground: LITE_BACK_GROUND,
  text_color: LITE_TEXT_COLOR,
  input_color: LITE_TEXT_INPUT
};

const dark_css = {
  back_ground: DARK_BACK_GROUND,
  text_color: DARK_TEXT_COLOR,
  input_color: DARK_TEXT_INPUT
};

function IngredientList({ current_recipe }) {
  let { ingredients } = current_recipe;

  const light_or_dark = lightOrDark(light_css, dark_css);

  const the_ingredients = ingredients.map(({ ingredient, amount }, index) =>
    <View key={ingredient + index} style={{ flexDirection: "row", paddingTop: 3, backgroundColor: light_or_dark.back_ground }}>
      <TextInput style={[styles_ingredients.input__styles, { width: LEFT_INPUT_WIDTH, color: light_or_dark.text_color, backgroundColor: light_or_dark.input_color }]} value={ingredient} editable={false} />
      <Text>&nbsp;</Text>
      <TextInput style={[styles_ingredients.input__styles, { width: RIGHT_INPUT_WIDTH, color: light_or_dark.text_color, backgroundColor: light_or_dark.input_color }]} value={amount} editable={false} />
    </View>);

  let heading_style;
  if (ingredients.length == 0) {
    heading_style = styles_ingredients.heading__empty;
  } else {
    heading_style = styles_ingredients.heading__styles;
  }
  return (
    <View style={{ flex: 1, alignItems: "center", backgroundColor: light_or_dark.back_ground }}>
      <View style={{ flexDirection: "row" }}>
        <Text style={[heading_style, { width: LEFT_INPUT_WIDTH, color: light_or_dark.text_color }]}>Ingredients</Text>
        <Text style={[heading_style, { width: RIGHT_INPUT_WIDTH, color: light_or_dark.text_color }]}>Amount</Text>
      </View>
      {the_ingredients}
    </View>
  );
}



const styles_ingredients = normalizeStyles({ input__styles, heading__styles, heading__empty });

export { IngredientList };
