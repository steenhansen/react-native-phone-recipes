import { Text, TextInput, View } from 'react-native';

import { heading__styles, input__styles, normalizeStyles } from '../util-funcs/normalize-css';

function IngredientList({ current_recipe }) {
  let { ingredients } = current_recipe;

  const the_ingredients = ingredients.map(({ ingredient, amount }, index) =>
    <View key={ingredient + index} style={{ flexDirection: "row", paddingTop: 3 }}>
      <TextInput style={[styles_ingredients.input__styles, { width: '80%' }]} value={ingredient} editable={false} />
      <Text>&nbsp;</Text>
      <TextInput style={[styles_ingredients.input__styles, { width: '20%' }]} value={amount} editable={false} />
    </View>)

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <View style={{ flexDirection: "row" }}>
        <Text style={[styles_ingredients.heading__styles, { width: '80%' }]}>Ingredients</Text>
        <Text style={[styles_ingredients.heading__styles, { width: '20%' }]}>Amount</Text>
      </View>
      {the_ingredients}
    </View>
  );
}

const styles_ingredients = normalizeStyles({ input__styles, heading__styles });

export { IngredientList };
