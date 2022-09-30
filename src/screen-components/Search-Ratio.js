
import { Text, View } from 'react-native';

import { normalizeStyles } from '../util-funcs/normalize-css';
import { SearchText } from "./Search-Text";
import { lightOrDark } from '../util-funcs/light-dark';
import { reducer } from 'react-async';


const light_css = {
  back_ground: 'white',
  text_color: 'black'
};
const dark_css = {
  back_ground: 'black',
  text_color: 'white'
};

function SearchRatio({ num_recipes_possible, num_recipes_visible, FILTER_search, FILTER_setSearch }) {
  const light_or_dark = lightOrDark(light_css, dark_css);
  // <View style={[styles_scroll.container_style, { flexDirection: "row", backgroundColor: light_or_dark.back_ground }]}>
  const ratio_search = (
    <View style={[styles_scroll.container_style, { flexDirection: "row", backgroundColor: '' }]}>
      <View style={[styles_scroll.fraction_style, { flexDirection: "column", width: '15%' }]}>
        <Text style={[styles_scroll.Text_textStyle, {
          textDecorationLine: 'underline',
          width: '100%', textAlign: "center", color: light_or_dark.text_color
        }]}>
          {num_recipes_visible}</Text>
        <Text style={[styles_scroll.Text_textStyle,
        styles_scroll.bottom_fraction,
        { width: '100%', textAlign: "center", color: light_or_dark.text_color }]}>{num_recipes_possible}</Text>
      </View>
      <SearchText width_percent={'85%'} FILTER_search={FILTER_search} FILTER_setSearch={FILTER_setSearch} />
    </View>
  );
  return ratio_search;
}



const styles_scroll = normalizeStyles({
  container_style: { marginTop: 6 },
  Text_textStyle: { fontSize: 14 },
  bottom_fraction: { marginTop: - 6 },
  fraction_style: { paddingLeft: 4, marginTop: 0 }

})
export { SearchRatio };




