
import { normalizeStyles } from '../util-funcs/normalize-css';


import { GroupButtons } from '../recipe-components/Group-Buttons';

import { EMPTY_DIET_BOX } from '../util-funcs/global-values';


const RadioButtons = ({ button_texts, FILTER_text, setFilter_text }) => {
  const selectedIndex = button_texts.indexOf(FILTER_text);

  const updateRadio = chosen_index => {
    if (button_texts[chosen_index] !== EMPTY_DIET_BOX) {
      if (chosen_index == selectedIndex) {
        setFilter_text('');
      } else {
        const selected_text = button_texts[chosen_index];
        setFilter_text(selected_text);
      }
    }
  };
  const font_size = styles_radio.styles_filter_text;
  const buttons = button_texts;

  const container_height = styles_radio.ButtonGroup_containerStyle;
  const filter_buttons = GroupButtons(updateRadio, { buttons, selectedIndex, font_size, container_height });
  return filter_buttons;
};

const styles_radio = normalizeStyles({
  styles_filter_text: {
    fontSize: 10
  },
  ButtonGroup_containerStyle: { height: 44 }
});


export {
  RadioButtons
};

