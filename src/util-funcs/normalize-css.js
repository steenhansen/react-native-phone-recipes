import { Dimensions, PixelRatio, StyleSheet } from 'react-native';

import { THEME_DEAD_INPUT_COLOR } from '../constants';
//   https://www.reactnativeschool.com/normalizing-text-and-spacing-between-screen-sizes

import { CLICKABLE_CONNECTABLE, CLICKABLE_NOT_CONNECTABLE, SERVER_CONNECTABLE, SERVER_NOT_CONNECTABLE } from '../constants.js';

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
    'top',
    'minHeight'
  ]
) => {
  const normalized_styles = {};
  Object.keys(my_css).forEach((css_key) => {
    normalized_styles[css_key] = {};
    Object.keys(my_css[css_key]).forEach((css_property) => {
      if (sizeable_css.includes(css_property)) {
        normalized_styles[css_key][css_property] = matchScreen(my_css[css_key][css_property]);
      } else {
        normalized_styles[css_key][css_property] = my_css[css_key][css_property];
      }
    });
  });
  return StyleSheet.create(normalized_styles);
};

const input__styles = { fontSize: 12, paddingTop: 0, paddingBottom: 0 };

const heading__styles = { fontSize: 12, fontWeight: 'bold' };

const heading__empty = { fontSize: 8, fontWeight: 'normal' };

const normalizeConstants = (my_pixels) => {
  const normalized_pixels = {};
  Object.keys(my_pixels).forEach((const_key) => {
    normalized_pixels[const_key] = matchScreen(my_pixels[const_key]);
  });
  return normalized_pixels;
};


export {
  input__styles, heading__styles, heading__empty,

  normalizeStyles, normalizeConstants
};
