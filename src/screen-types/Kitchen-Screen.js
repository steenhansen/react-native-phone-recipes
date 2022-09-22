import { useEffect, useState } from "react";
import { ScrollView } from 'react-native';
import { useSelector } from "react-redux";

import { ExpandedRecipes } from "../recipe-components/Recipes-List.js";

import { ToggledTimer } from "../screen-components/Toggled-Timer";
import { normalizeStyles } from '../util-funcs/normalize-css';


import { HorzLine, VertSpace } from '../screen-components/Horz-Ver';


function KitchenScreen({ setHave_2_firstPaint }) {
  const [clear_my_interval, setClear_my_interval] = useState(0);

  useEffect(() => {
    if (clear_my_interval) {
      return () => clearInterval(clear_my_interval);
    }
  }, [clear_my_interval]);

  const recipes_kitchen = useSelector((s) => s.recipes_kitchen);
  return (
    <ScrollView >
      < ExpandedRecipes expanded_collection={recipes_kitchen} />

      <VertSpace back_color='white' />
      <HorzLine line_color='black' />
      <HorzLine line_color='black' />
      <VertSpace back_color='white' />

      <ToggledTimer num_minutes={-1} setClear_my_interval={setClear_my_interval}></ToggledTimer>
    </ScrollView >
  );
}
const styles_scroll = normalizeStyles({
  Scrollview_style: { marginTop: 16 },
  filter_space: { height: 16 }
})
export { KitchenScreen };





