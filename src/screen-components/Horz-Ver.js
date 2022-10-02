

import { View } from 'react-native';
import { normalizeStyles } from '../util-funcs/normalize-css';

const HorzLine = ({ line_color }) => {
  return (<View style={{ flexDirection: 'row' }}>
    <View style={{ flex: 1, height: 1, backgroundColor: line_color }} />
  </View>);
};


const VertSpace = ({ back_color }) => {
  return (<View style={[styles_hor_ver.styles_vertSpace, { backgroundColor: back_color }]} ></View>);
};

const styles_hor_ver = normalizeStyles({
  styles_vertSpace: { height: 8 }
});

export {
  HorzLine, VertSpace
};

