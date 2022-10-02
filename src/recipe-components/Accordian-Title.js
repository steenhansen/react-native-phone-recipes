
import { ListItem } from '@rneui/themed';
import { Text, View } from 'react-native';

import { SOLID_UNDERLINE_CHARS } from '../util-funcs/global-values';
import { normalizeStyles } from '../util-funcs/normalize-css';


import { DARK_HORZ_LINE, LITE_HORZ_LINE } from '../constants.js';

import { lightOrDark } from '../util-funcs/light-dark';
import {
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
  button_off: LITE_BTN_OFF
};

const dark_css = {
  back_ground: DARK_BACK_GROUND,
  text_color: DARK_TEXT_COLOR,
  link_color: DARK_LINK_COLOR,
  button_color: DARK_BTN_COLOR,
  button_text: DARK_BTN_TEXT,
  button_off: DARK_BTN_OFF
};

function AccordianTitle(recipe_title, do_underline, on_showHideRecipe = x => x) {
  const light_or_dark = lightOrDark(light_css, dark_css);

  let text_decor_line = 'none';
  let text_title_color = light_or_dark.text_color;
  if (do_underline == 'yes-underline') {
    text_title_color = light_or_dark.button_color;
    text_decor_line = 'underline';
  }
  return (
    <ListItem.Content style={{ backgroundColor: light_or_dark.back_ground }} chevron={false} >
      <ListItem.Title style={{ fontWeight: 'bold' }} chevron={false}>
        <View style={{ flexDirection: "row", width: '100%' }}>
          <View style={[styles_title.underscore_style, { flexDirection: "row" }]}>
            <Text>_</Text>
          </View>
          <Text style={[styles_title.title_style, { color: text_title_color },
          { fontWeight: 'bold', textDecorationLine: text_decor_line }]}
            onPress={on_showHideRecipe}>
            {recipe_title}
          </Text>
          <View style={[styles_title.underscore_style, { flexDirection: "row", backgroundColor: light_or_dark.back_ground }]}>
            <Text style={{ color: light_or_dark.text_color }}>{SOLID_UNDERLINE_CHARS}</Text>
          </View>
        </View>
      </ListItem.Title>
    </ListItem.Content >
  );
}





const styles_title = normalizeStyles({
  title_style: { fontSize: 22 },
  underscore_style: { fontSize: 22, paddingTop: 2 }
});

export { AccordianTitle };
