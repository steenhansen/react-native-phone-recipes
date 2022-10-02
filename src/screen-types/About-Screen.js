
import { ScrollView, Text, View } from 'react-native';


import { normalizeStyles } from '../util-funcs/normalize-css';

import { GOTO_SERVER, SERVER_NAME } from '../constants';
import { HorzLine, VertSpace } from '../screen-components/Horz-Ver';

import { browserOpen } from '../util-funcs/browser-link';
import { lightOrDark } from '../util-funcs/light-dark';

import {
  LITE_BACK_GROUND, LITE_TEXT_COLOR, LITE_LINK_COLOR,
  DARK_BACK_GROUND, DARK_TEXT_COLOR, DARK_LINK_COLOR,
  DARK_HORZ_LINE, LITE_HORZ_LINE
} from '../constants.js';


const light_css = {
  link_color: LITE_LINK_COLOR,
  back_ground: LITE_BACK_GROUND,
  hor_line_col: LITE_HORZ_LINE,
  text_color: LITE_TEXT_COLOR
};

const dark_css = {
  link_color: DARK_LINK_COLOR,
  back_ground: DARK_BACK_GROUND,
  hor_line_col: DARK_HORZ_LINE,
  text_color: DARK_TEXT_COLOR
};


function ImperialToMetric({ left_conv, middle_conv, right_conv }) {
  const light_or_dark = lightOrDark(light_css, dark_css);
  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: light_or_dark.back_ground,
      paddingBottom: 2
    }}>

      <View style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
      }}>
        <Text style={[about_scroll.about_style, { color: light_or_dark.text_color }]}> {left_conv}</Text>
      </View>

      <Text style={[about_scroll.about_style, { color: light_or_dark.text_color }]}>{middle_conv}</Text>

      <View style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}>
        <Text style={[about_scroll.about_style, { color: light_or_dark.text_color }]}>{right_conv} </Text>
      </View>

    </View>);
}

function MeatTemps({ left_meat, middle_meat, right_meat }) {
  const light_or_dark = lightOrDark(light_css, dark_css);
  let left_text = null;
  if (left_meat !== '') {
    left_text = (<Text style={[about_scroll.about_style, { color: light_or_dark.text_color, fontWeight: 'bold' }]}> {left_meat} </Text>);
  }

  let right_text = null;
  if (right_meat !== '') {
    right_text = (<Text style={[about_scroll.about_style, { color: light_or_dark.text_color }]}>{right_meat} </Text>);
  }

  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: light_or_dark.back_ground,
      paddingBottom: 2
    }}>
      <View style={{
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'flex-start'
      }}>
        {left_text}
      </View>

      <View style={{
        flex: 4, flexDirection: 'row', justifyContent: 'flex-start',
        backgroundColor: light_or_dark.back_ground, width: "100%"
      }}>
        <Text style={[about_scroll.about_style, { color: light_or_dark.text_color }]}>{middle_meat}</Text>
      </View>

      <View style={{
        flex: 4, flexDirection: 'row', justifyContent: 'flex-end',
        backgroundColor: light_or_dark.back_ground, width: "100%"
      }}>
        {right_text}
      </View>
    </View>);
}

function AboutScreen() {
  const light_or_dark = lightOrDark(light_css, dark_css);
  return (
    <ScrollView style={{ backgroundColor: light_or_dark.back_ground }} >
      <VertSpace back_color={light_or_dark.back_ground} />

      <ImperialToMetric left_conv={"15 ml= tablespoon"} middle_conv={"30 ml = 1 oz"} right_conv={"5 ml= 1 teaspoon"} />
      <ImperialToMetric left_conv={"1 lb = 0.45 kg"} middle_conv={"240 ml = 1 cup"} right_conv={"2.2 lbs = 1 kg"} />
      <ImperialToMetric left_conv={"1 qt = 4 cups = 0.95 L"} middle_conv={""} right_conv={"1 lb = 2 cups = 16 oz"} />

      <VertSpace back_color={light_or_dark.back_ground} />
      <HorzLine line_color={light_or_dark.hor_line_col} />
      <VertSpace back_color={light_or_dark.back_ground} />

      <MeatTemps left_meat={"Ham&Pork"} middle_meat={"145°F/65°C"} right_meat={"Precook 165°F/75°C"} />
      <MeatTemps left_meat={"Poultry"} middle_meat={"165°F/75°C"} right_meat={""} />
      <MeatTemps left_meat={"Rabbit"} middle_meat={"160°F/70°C"} right_meat={""} />
      <MeatTemps left_meat={"Beef"} middle_meat={"145°F/65°C"} right_meat={"Ground 160°F/70°C"} />
      <MeatTemps left_meat={"Mutton"} middle_meat={"145°F/65°C"} right_meat={"Ground 160°F/70°C"} />

      <MeatTemps left_meat={"Deer&Buffalo"} middle_meat={"145°F/65°C"} right_meat={"Ground 160°F/70°C"} />
      <MeatTemps left_meat={"Fish"} middle_meat={"Salmon 125°F/55°C"} right_meat={"Halibut 130°F/55°C"} />
      <MeatTemps left_meat={""} middle_meat={"Scallops 130°F/55°C"} right_meat={"Shrimp 120°F/50°C"} />
      <MeatTemps left_meat={""} middle_meat={"Lobster 140°F/60°C"} right_meat={"Tuna 115°F/50°C"} />

      <VertSpace back_color={light_or_dark.back_ground} />

      <View style={{ flexDirection: 'column' }}>
        <View style={{ alignItems: 'center' }}><Text
          style={[about_scroll.about_style, { color: light_or_dark.text_color }]}>Edit your recipes at</Text></View>
        <View style={{ alignItems: 'center' }}>
          <Text onPress={_ => browserOpen(GOTO_SERVER)}
            style={[about_scroll.about_style, { textDecorationLine: 'underline', color: light_or_dark.link_color }]}
          >{SERVER_NAME} </Text>
        </View>
      </View>

    </ScrollView >
  );
}




const about_scroll = normalizeStyles({
  meats_style: { fontSize: 16, },
  about_style: { fontSize: 12, height: 16 },
});

export { AboutScreen };
