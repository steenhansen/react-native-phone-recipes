import { Icon, Input } from '@rneui/themed';
import { View } from 'react-native';
import { normalizeStyles, THEME_ALIVE_INPUT_COLOR, THEME_WAS_CLICKED_COLOR } from '../util-funcs/normalize-css';

const SearchText = ({ width_percent, FILTER_search, FILTER_setSearch }) => {
  let clear_color = 'black';
  if (FILTER_search.length > 0) {
    clear_color = THEME_WAS_CLICKED_COLOR();
  }
  const search_text = (<>
    <View style={[styles_search.view_style, { flexDirection: 'row', width: width_percent, alignItems: 'center', justifyContent: 'center' }]}>
      <Icon
        containerStyle={[styles_search.Icon_container, { alignItems: 'center' }]}
        iconStyle={styles_search.Icon_style}
        name='search'
        type='font-awesome-5'
        color='black' />
      <Input
        style={[styles_search.Input_PlaceStyle, { backgroundColor: THEME_ALIVE_INPUT_COLOR }]}
        containerStyle={[styles_search.Input_container, { width: '60%' }]}
        placeholder="Search"
        value={FILTER_search}
        onChangeText={text_filter => FILTER_setSearch(text_filter)} />
      <Icon
        containerStyle={[styles_search.Icon_container, { alignItems: 'center' }]}
        iconStyle={styles_search.Icon_style}
        name='times'
        type='font-awesome-5'
        color={clear_color}
        onPress={_ => FILTER_setSearch('')} />
    </View>
  </>);
  return search_text;
}

const styles_search = normalizeStyles({
  Input_container: { marginTop: 20 },
  view_style: { height: 50, marginTop: -8 },
  Icon_style: { marginTop: 0, fontSize: 24 },
  Input_PlaceStyle: { fontSize: 16 }
})

export { SearchText };
