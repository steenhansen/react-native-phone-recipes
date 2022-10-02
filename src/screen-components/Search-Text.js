import { Icon, Input } from '@rneui/themed';
import { View } from 'react-native';
import { normalizeStyles } from '../util-funcs/normalize-css';
import { THEME_ALIVE_INPUT_COLOR } from '../constants';
import { lightOrDark } from '../util-funcs/light-dark';
import {
  DARK_BTN_OFF, LITE_BTN_OFF,
  DARK_HORZ_LINE, LITE_HORZ_LINE,
  LITE_BACK_GROUND, LITE_TEXT_COLOR, LITE_LINK_COLOR,
  DARK_BACK_GROUND, DARK_TEXT_COLOR, DARK_LINK_COLOR,
  NO_SERVER_CONN_COL, BUTTON_BORDER_COL,
  DARK_BTN_COLOR, LITE_BTN_COLOR,
  DARK_BTN_TEXT, LITE_BTN_TEXT
} from '../constants.js';

const light_css = {
  icon_color: LITE_BTN_COLOR,
  text_color: LITE_TEXT_COLOR,
  placeholder_text_col: LITE_HORZ_LINE
};

const dark_css = {

  icon_color: DARK_BTN_COLOR,
  text_color: DARK_TEXT_COLOR,
  placeholder_text_col: DARK_HORZ_LINE
};

const SearchText = ({ width_percent, FILTER_search, FILTER_setSearch }) => {
  const light_or_dark = lightOrDark(light_css, dark_css);
  const search_text = (<>
    <View style={[styles_search.view_style, { flexDirection: 'row', width: width_percent, alignItems: 'center', justifyContent: 'center' }]}>
      <Icon
        containerStyle={[styles_search.Icon_container, { alignItems: 'center' }]}
        iconStyle={styles_search.Icon_style_mag}
        name='search'
        type='font-awesome-5'
        color={light_or_dark.icon_color} />
      <Input
        style={[styles_search.Input_PlaceStyle, {
          color: light_or_dark.text_color, position: 'relative', top: 0,
          overflow: 'hidden', backgroundColor: THEME_ALIVE_INPUT_COLOR
        }]}
        containerStyle={[styles_search.Input_container, { width: '60%' }]}
        placeholder="Search"
        placeholderTextColor={light_or_dark.placeholder_text_col}
        value={FILTER_search}
        onChangeText={text_filter => FILTER_setSearch(text_filter)} />
      <Icon
        containerStyle={[styles_search.Icon_container, { alignItems: 'center' }]}
        iconStyle={styles_search.Icon_style_x}
        name='times'
        type='font-awesome-5'
        color={light_or_dark.icon_color}
        onPress={_ => FILTER_setSearch('')} />
    </View>
  </>);
  return search_text;
};




const styles_search = normalizeStyles({
  Input_container: { marginTop: 20, minHeight: 49 },
  view_style: { height: 50, marginTop: -8 },
  Icon_style_mag: { padding: 10, fontSize: 22 },
  Icon_style_x: { padding: 13, fontSize: 24 },
  Input_PlaceStyle: { fontSize: 16 }
});

export { SearchText };
