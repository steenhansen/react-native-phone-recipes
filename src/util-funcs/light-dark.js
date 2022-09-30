

import { Appearance, ScrollView, Text, View } from 'react-native';


function lightOrDark(light_css, dark_css) {


  //return dark_css;

  const color_scheme = Appearance.getColorScheme();
  if (color_scheme === 'dark') {
    return dark_css;
  }
  return light_css;
}

export { lightOrDark };
