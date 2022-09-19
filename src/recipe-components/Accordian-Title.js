
import { ListItem } from '@rneui/themed';
import { Text, View } from 'react-native';

import { SOLID_UNDERLINE_CHARS } from '../util-funcs/global-values';
import { normalizeStyles, THEME_WAS_CLICKED_COLOR } from '../util-funcs/normalize-css';

function AccordianTitle(recipe_title, do_underline, on_showHideRecipe = x => x) {
  const theme_was_clicked_color = THEME_WAS_CLICKED_COLOR();
  let text_decor_line = 'none';
  let text_title_color = 'black';
  if (do_underline == 'yes-underline') {
    text_title_color = theme_was_clicked_color;
    text_decor_line = 'underline';
  }
  return (
    <ListItem.Content style={{ backgroundColor: '' }} chevron={false} >
      <ListItem.Title style={{ fontWeight: 'bold' }} chevron={false}>
        <View style={{ flexDirection: "row" }}>
          <View style={[styles_title.underscore_style, { flexDirection: "row" }]}>
            <Text>_</Text>
          </View>
          <Text style={[styles_title.title_style, { color: text_title_color },
          { fontWeight: 'bold', textDecorationLine: text_decor_line }]}
            onPress={on_showHideRecipe}>
            {recipe_title}
          </Text>
          <View style={[styles_title.underscore_style, { flexDirection: "row" }]}>
            <Text >{SOLID_UNDERLINE_CHARS}</Text>
          </View>
        </View>
      </ListItem.Title>
    </ListItem.Content >
  )
}

const styles_title = normalizeStyles({
  title_style: { fontSize: 22 },
  underscore_style: { fontSize: 22, paddingTop: 2 }
})

export { AccordianTitle };
