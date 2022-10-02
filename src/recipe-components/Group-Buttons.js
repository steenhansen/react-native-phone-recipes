

import { Icon, ButtonGroup } from '@rneui/themed';
import { View, Text } from 'react-native';
import { THEME_TIMER_OK } from '../constants';
import { normalizeStyles } from '../util-funcs/normalize-css';
import { lightOrDark } from '../util-funcs/light-dark';
import { EMPTY_DIET_BOX } from '../util-funcs/global-values';
import { ServerConnected } from './Server-Connected';
import {
  DARK_BTN_OFF_TEXT, LITE_BTN_OFF_TEXT,
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
  button_off: LITE_BTN_OFF,
  button_off_text: LITE_BTN_OFF_TEXT
};
const dark_css = {
  back_ground: DARK_BACK_GROUND,
  text_color: DARK_TEXT_COLOR,
  link_color: DARK_LINK_COLOR,
  button_color: DARK_BTN_COLOR,
  button_text: DARK_BTN_TEXT,
  button_off: DARK_BTN_OFF,
  button_off_text: DARK_BTN_OFF_TEXT
};




const GroupButtons = (on_pressButton, { buttons, selectedIndex = null,
  font_size, container_height = 0, disabled = [], time_color = 'not-a-timer' }) => {
  const light_or_dark = lightOrDark(light_css, dark_css);
  let container_style = {};
  if (container_height === 0) {
    container_style = {};
  } else {
    container_style = container_height;
  }
  let server_connection = null;
  if (!global.SERVER_IS_CONNECTABLE && buttons.length === 6 && buttons[5] === EMPTY_DIET_BOX) {
    server_connection = ServerConnected(styles_buttons);
  }
  return (
    <View style={[styles_buttons.top_margin, { width: '101%', backgroundColor: '', marginBottom: 0 }]}>
      <ButtonGroup
        buttonContainerStyle={{ color: '', borderColor: BUTTON_BORDER_COL }}
        buttons={buttons}
        buttonStyle={[styles_buttons.button_style, {
          backgroundColor: light_or_dark.button_off
        }]}
        containerStyle={[container_style, {
          marginHorizontal: 0, marginVertical: 0,
          borderColor: BUTTON_BORDER_COL
        }]}

        disabled={disabled}
        disabledStyle={{ backgroundColor: light_or_dark.button_color, borderColor: BUTTON_BORDER_COL }}
        disabledTextStyle={{ color: time_color }}

        onPress={on_pressButton}
        selectedButtonStyle={[{
          backgroundColor: light_or_dark.button_color,
          borderColor: BUTTON_BORDER_COL
        }]}
        selectedTextStyle={{ color: light_or_dark.button_text }}
        selectedIndex={selectedIndex}
        textStyle={[font_size, { fontWeight: 'bold', color: light_or_dark.button_off_text }]}
      />
      {server_connection}
    </View >
  );
};

const styles_buttons = normalizeStyles({
  Input_container: { marginTop: 20, minHeight: 49 },
  icon_margin_top: { marginTop: -43 },
  Icon_style_mag: { padding: 10, fontSize: 21 },
  top_margin: { marginLeft: -1, marginTop: -1, marginBottom: -4 }
});

export { GroupButtons };


