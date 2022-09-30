import { View, Text, TextInput } from 'react-native';

import { heading__styles, heading__empty, input__styles, normalizeStyles } from '../util-funcs/normalize-css';
import { lightOrDark } from '../util-funcs/light-dark';

import {
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

function StepsDirections({ current_recipe }) {
  const light_or_dark = lightOrDark(light_css, dark_css);

  const { steps } = current_recipe;
  const num_lines = steps.split('\n').length;

  let heading_style;
  if (steps == '') {
    steps_value = null;
    heading_style = styles_steps.heading__empty;
  } else {
    steps_value = (< TextInput
      style={
        [styles_steps.input__styles, {
          width: '100%', paddingTop: 0, paddingBottom: 0,
          marginTop: 0, color: light_or_dark.text_color, backgroundColor: light_or_dark.input_color
        }]}
      value={steps} multiline={true} numberOfLines={num_lines} editable={false} />);
    heading_style = styles_steps.heading__styles;
  }


  return (
    <View style={{ width: '100%', backgroundColor: light_or_dark.back_ground }}>
      <Text style={[heading_style,
        { color: light_or_dark.text_color }]}>Steps &amp; Directions</Text>
      {steps_value}
    </View>
  );
}


const styles_steps = normalizeStyles({ input__styles, heading__empty, heading__styles });

export { StepsDirections };
