import { Text, TextInput, View } from 'react-native';

import { heading__styles, heading__empty, input__styles, normalizeStyles } from '../util-funcs/normalize-css';
import { lightOrDark } from '../util-funcs/light-dark';

import {
  LEFT_INPUT_WIDTH, RIGHT_INPUT_WIDTH,
  LITE_BACK_GROUND, LITE_TEXT_COLOR, LITE_TEXT_INPUT,
  DARK_BACK_GROUND, DARK_TEXT_COLOR, DARK_TEXT_INPUT,
} from '../constants.js';

const light_css =
{
  back_ground: LITE_BACK_GROUND,
  text_color: LITE_TEXT_COLOR,
  input_color: LITE_TEXT_INPUT
};

const dark_css = {
  back_ground: DARK_BACK_GROUND,
  text_color: DARK_TEXT_COLOR,
  input_color: DARK_TEXT_INPUT
};

function HeatTimeServes({ current_recipe }) {
  const light_or_dark = lightOrDark(light_css, dark_css);
  let { time, serves } = current_recipe;

  let heading_style;
  if (time == '' && serves == '') {
    heat_time_serves = null;
    heading_style = styles_heat.heading__empty;
  } else {
    heat_time_serves = (<View style={{ flexDirection: "row" }}>
      <TextInput style={[styles_heat.input__styles, { width: LEFT_INPUT_WIDTH, color: light_or_dark.text_color, backgroundColor: light_or_dark.input_color }]} value={time} editable={false} />
      <Text>&nbsp;</Text>
      <TextInput style={[styles_heat.input__styles, { width: RIGHT_INPUT_WIDTH, color: light_or_dark.text_color, backgroundColor: light_or_dark.input_color }]} value={serves} editable={false} />
    </View>);
    heading_style = styles_heat.heading__styles;
  }
  return (
    <View style={{ flex: 1, alignItems: "center", backgroundColor: light_or_dark.back_ground }}>
      <View style={{ flexDirection: "row" }}>
        <Text style={[heading_style, { width: LEFT_INPUT_WIDTH, color: light_or_dark.text_color }]}>Heat &amp; Time</Text>
        <Text style={[heading_style, { width: RIGHT_INPUT_WIDTH, color: light_or_dark.text_color }]}>Serves</Text>
      </View>
      {heat_time_serves}
    </View>
  );
}

const styles_heat = normalizeStyles({ input__styles, heading__styles, heading__empty });

export { HeatTimeServes };
