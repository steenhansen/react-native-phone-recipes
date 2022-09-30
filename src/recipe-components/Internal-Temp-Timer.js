import { Text, TextInput, View } from 'react-native';

import { heading__styles, input__styles, heading__empty, normalizeStyles } from '../util-funcs/normalize-css';
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

function InternalTempTimer({ current_recipe }) {
  const light_or_dark = lightOrDark(light_css, dark_css);
  const { internal, minutes } = current_recipe;
  const minutes_str = '' + minutes;
  let heading_style;
  if (internal == '' && minutes == 0) {
    temp_timer_values = null;
    heading_style = styles_internal.heading__empty;
  } else {
    temp_timer_values = (<View style={{ flexDirection: "row" }}>
      <TextInput style={[styles_internal.input__styles, { width: LEFT_INPUT_WIDTH, color: light_or_dark.text_color, backgroundColor: light_or_dark.input_color }]}
        value={internal} editable={false} />
      <Text>&nbsp;</Text>
      <TextInput style={[styles_internal.input__styles, { width: RIGHT_INPUT_WIDTH, color: light_or_dark.text_color, backgroundColor: light_or_dark.input_color }]}
        value={minutes_str} editable={false} />
    </View>);
    heading_style = styles_internal.heading__styles;
  }

  return (
    <View style={{ flex: 1, alignItems: "center", backgroundColor: light_or_dark.back_ground }}>
      <View style={{ flexDirection: "row" }}>
        <Text style={[heading_style, { width: LEFT_INPUT_WIDTH, color: light_or_dark.text_color }]}>Internal Meat Temp</Text>
        <Text style={[heading_style, { width: RIGHT_INPUT_WIDTH, color: light_or_dark.text_color }]}>Timer Min</Text>
      </View>
      {temp_timer_values}
    </View>
  );
}

const styles_internal = normalizeStyles({ input__styles, heading__styles, heading__empty });

export { InternalTempTimer };
