

import { ButtonGroup } from '@rneui/themed';
import { View } from 'react-native';
import { THEME_TIMER_OK } from '../constants';
import { THEME_CAN_CLICK_COLOR, THEME_WAS_CLICKED_COLOR } from '../util-funcs/normalize-css';

const GroupButtons = (on_pressButton, { buttons, selectedIndex = null, font_size, container_height = 0, disabled = [], time_color = THEME_TIMER_OK }) => {
  const theme_can_click_color = THEME_CAN_CLICK_COLOR();
  const theme_was_clicked_color = THEME_WAS_CLICKED_COLOR();

  let container_style = {};
  if (container_height === 0) {
    container_style = {};
  } else {
    container_style = container_height;
  }
  return (
    <View style={{ width: '101%', margin: -1 }}>
      <ButtonGroup
        buttonContainerStyle={{ backgroundColor: theme_can_click_color }}
        buttons={buttons}
        buttonStyle={{}}
        containerStyle={[container_style, { marginHorizontal: 0, marginVertical: 0 }]}

        disabled={disabled}
        disabledStyle={{ backgroundColor: "#ffffff" }}
        disabledTextStyle={{ color: time_color }}

        onPress={on_pressButton}
        selectedButtonStyle={[{ backgroundColor: theme_was_clicked_color }, {}]}
        selectedIndex={selectedIndex}
        textStyle={[font_size, { fontWeight: 'bold' }]}
      />
    </View>
  )
}

export {
  GroupButtons
};
