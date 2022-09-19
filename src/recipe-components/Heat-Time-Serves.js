import { Text, TextInput, View } from 'react-native';

import { heading__styles, input__styles, normalizeStyles } from '../util-funcs/normalize-css';

function HeatTimeServes({ current_recipe }) {
  let { time, serves } = current_recipe;
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <View style={{ flexDirection: "row" }}>
        <Text style={[styles_heat.heading__styles, { width: '70%' }]}>Heat &amp; Time</Text>
        <Text style={[styles_heat.heading__styles, { width: '30%' }]}>Serves</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TextInput style={[styles_heat.input__styles, { width: '70%' }]} value={time} editable={false} />
        <Text>&nbsp;</Text>
        <TextInput style={[styles_heat.input__styles, { width: '30%' }]} value={serves} editable={false} />
      </View>
    </View>
  );
}

const styles_heat = normalizeStyles({ input__styles, heading__styles });

export { HeatTimeServes };
