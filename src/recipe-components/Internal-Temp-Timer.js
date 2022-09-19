import { Text, TextInput, View } from 'react-native';

import { heading__styles, input__styles, normalizeStyles } from '../util-funcs/normalize-css';

function InternalTempTimer({ current_recipe }) {
  const { internal, minutes } = current_recipe;
  const minutes_str = '' + minutes;
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <View style={{ flexDirection: "row" }}>
        <Text style={[styles_internal.heading__styles, { width: '70%' }]}>Internal Meat Temp</Text>
        <Text style={[styles_internal.heading__styles, { width: '30%' }]}>Timer Min</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TextInput style={[styles_internal.input__styles, { width: '70%' }]} value={internal} editable={false} />
        <Text>&nbsp;</Text>
        <TextInput style={[styles_internal.input__styles, { width: '30%' }]} value={minutes_str} editable={false} />
      </View>
    </View>
  );
}

const styles_internal = normalizeStyles({ input__styles, heading__styles });

export { InternalTempTimer };
