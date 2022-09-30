import { useEffect, useState } from "react";
import { ScrollView } from 'react-native';
import { useSelector } from "react-redux";

import { ExpandedRecipes } from "../recipe-components/Recipes-List.js";

import { ToggledTimer } from "../screen-components/Toggled-Timer";
import { normalizeStyles } from '../util-funcs/normalize-css';

import { lightOrDark } from '../util-funcs/light-dark';

import { HorzLine, VertSpace } from '../screen-components/Horz-Ver';
import {
  LITE_BACK_GROUND, LITE_TEXT_COLOR, LITE_TEXT_INPUT,
  DARK_BACK_GROUND, DARK_TEXT_COLOR, DARK_TEXT_INPUT,
} from '../constants.js';

const light_css = {
  back_ground: LITE_BACK_GROUND
};

const dark_css = {
  back_ground: DARK_BACK_GROUND
};


function KitchenScreen({ setHave_2_firstPaint }) {
  const light_or_dark = lightOrDark(light_css, dark_css);


  const [clear_my_interval, setClear_my_interval] = useState(0);

  useEffect(() => {
    if (clear_my_interval) {
      return () => clearInterval(clear_my_interval);
    }
  }, [clear_my_interval]);

  const recipes_kitchen = useSelector((s) => s.recipes_kitchen);
  return (
    <ScrollView style={{
      backgroundColor: light_or_dark.back_ground
    }}>
      < ExpandedRecipes expanded_collection={recipes_kitchen} />

      <VertSpace back_color={light_or_dark.back_ground} />
      <HorzLine line_color='black' />
      <HorzLine line_color='black' />
      <VertSpace back_color={light_or_dark.back_ground} />

      <ToggledTimer num_minutes={-1} setClear_my_interval={setClear_my_interval}></ToggledTimer>
    </ScrollView >
  );
}


const styles_scroll = normalizeStyles({
  Scrollview_style: { marginTop: 16 },
  filter_space: { height: 16 }
})
export { KitchenScreen };





