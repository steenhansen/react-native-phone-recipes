
import { ButtonGroup } from '@rneui/themed'
import { View } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { normalizeStyles } from '../util-funcs/normalize-css';
import {
  DISPLAY_0_ALL, DISPLAY_1_OTHER, DISPLAY_2_YOURS
} from '../util-funcs/global-values';

import { GroupButtons } from '../recipe-components/Group-Buttons';

const BottomFooter = () => {
  const dispatch = useDispatch();

  const google_email = useSelector((header_state) => header_state.google_email);
  if (google_email === '' || !global.SERVER_IS_CONNECTABLE) {
    var bottom_buttons = ['About'];
  } else {
    var bottom_buttons = ['About', 'Gmail Sign Out'];
  }

  const pressFooter = async footer_index => {
    if (footer_index == 0) {
      dispatch({ type: 'about-click', payload: {} });
    } else if (footer_index == 1) {
      dispatch({ type: 'signout-click', payload: {} });
    }
  }

  const font_size = styles_footer.ButtonGroup_textStyle;
  const buttons = bottom_buttons;
  const container_height = styles_footer.ButtonGroup_containerStyle;
  const footer_buttons = GroupButtons(pressFooter, { buttons, font_size, container_height });
  return footer_buttons;
}

const styles_footer = normalizeStyles({
  ButtonGroup_textStyle: { fontSize: 14 },
  ButtonGroup_containerStyle: { height: 44 }
})

export {
  BottomFooter
}
