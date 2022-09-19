
import { Text, View } from 'react-native';

import { normalizeStyles } from '../util-funcs/normalize-css';
import { SearchText } from "./Search-Text";

function SearchRatio({ num_recipes_possible, num_recipes_visible, FILTER_search, FILTER_setSearch }) {
  const ratio_search = (
    <View style={{ flexDirection: "row" }}>
      <View style={[styles_scroll.fraction_style, { flexDirection: "column", width: '15%' }]}>
        <Text style={[styles_scroll.Text_textStyle, { textDecorationLine: 'underline', width: '100%', textAlign: "center", color: 'black' }]}>
          {num_recipes_visible}</Text>
        <Text style={[styles_scroll.Text_textStyle,
        styles_scroll.bottom_fraction,
        { width: '100%', textAlign: "center", color: 'black' }]}>{num_recipes_possible}</Text>
      </View>
      <SearchText width_percent={'85%'} FILTER_search={FILTER_search} FILTER_setSearch={FILTER_setSearch} />
    </View>
  );
  return ratio_search;
}

const styles_scroll = normalizeStyles({
  Text_textStyle: { fontSize: 14 },
  bottom_fraction: { marginTop: - 6 },
  fraction_style: { paddingLeft: 4, marginTop: -4 }

})
export { SearchRatio };




