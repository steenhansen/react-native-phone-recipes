import { Dimensions, PixelRatio, StyleSheet } from 'react-native';

import { THEME_DEAD_INPUT_COLOR } from '../constants';
//   https://www.reactnativeschool.com/normalizing-text-and-spacing-between-screen-sizes

import { CLICKABLE_CONNECTABLE, CLICKABLE_NOT_CONNECTABLE, SERVER_CONNECTABLE, SERVER_NOT_CONNECTABLE } from '../constants.js';

function THEME_WAS_CLICKED_COLOR() {
  if (global.SERVER_IS_CONNECTABLE) {
    return SERVER_CONNECTABLE;
  } else {
    return SERVER_NOT_CONNECTABLE;
  }
}

function THEME_CAN_CLICK_COLOR() {
  if (global.SERVER_IS_CONNECTABLE) {
    return CLICKABLE_CONNECTABLE;
  } else {
    return CLICKABLE_NOT_CONNECTABLE;
  }
}



const screen_ratio = PixelRatio.get();

const matchScreen = (css_size) => {
  const { width, height } = Dimensions.get('window');

  if (screen_ratio >= 2 && screen_ratio < 3) {

    if (width < 360) {
      return css_size * 0.95;
    } else if (height < 667) {
      return css_size;
    } else if (height >= 667 && height <= 735) {
      return css_size * 1.15;
    }

    return css_size * 1.25;
  } else if (screen_ratio >= 3 && screen_ratio < 3.5) {
    if (width < 360) {

      return css_size;
    } else if (height < 667) {

      //
      //   test auto enbiggen text
      //      return css_size * 2;
      //

      return css_size * 1.15;
    } else if (height >= 667 && height <= 735) {
      return css_size * 1.2;
    }

    return css_size * 1.27;
  } else if (screen_ratio >= 3.5) {

    if (width < 360) {
      return css_size;
    } else if (height < 667) {
      return css_size * 1.2;
    } else if (height >= 667 && height <= 735) {
      return css_size * 1.25;
    }

    return css_size * 1.4;
  }

  return css_size;
};

const normalizeStyles = (
  my_css,
  sizeable_css = [
    'fontSize',
    'margin',
    'marginHorizontal',
    'marginVertical',
    'marginTop',
    'marginRight',
    'marginBottom',
    'marginLeft',
    'padding',
    'paddingVertical',
    'paddingHorizontal',
    'paddingTop',
    'paddingRight',
    'paddingBottom',
    'paddingLeft',
    'height',
    'left',
    'top'
  ]
) => {
  const normalized_styles = {};
  Object.keys(my_css).forEach((key) => {
    normalized_styles[key] = {};
    Object.keys(my_css[key]).forEach((property) => {
      if (sizeable_css.includes(property)) {
        normalized_styles[key][property] = matchScreen(my_css[key][property]);
      } else {
        normalized_styles[key][property] = my_css[key][property];
      }
    });
  });
  return StyleSheet.create(normalized_styles);
};

const input__styles = {
  fontSize: 12,
  backgroundColor: THEME_DEAD_INPUT_COLOR, color: 'black',
  paddingTop: 0, paddingBottom: 0
};

const heading__styles = {
  fontSize: 12,
  fontWeight: 'bold', color: 'black'
};

export {
  input__styles, heading__styles,
  THEME_CAN_CLICK_COLOR,
  THEME_WAS_CLICKED_COLOR,
  normalizeStyles
};
