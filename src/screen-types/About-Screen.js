
import { ScrollView, Text, View } from 'react-native';


import { normalizeStyles } from '../util-funcs/normalize-css';

import { GOTO_SERVER, SERVER_NAME } from '../constants';
import { HorzLine, VertSpace } from '../screen-components/Horz-Ver';

import { browserOpen } from '../util-funcs/browser-link';

function ImperialToMetric({ left_conv, middle_conv, right_conv }) {
  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'white',
      paddingBottom: 2
    }}>

      <View style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
      }}>
        <Text style={[about_scroll.about_style, { color: 'black' }]}> {left_conv}</Text>
      </View>

      <Text style={[about_scroll.about_style, { color: 'black' }]}>{middle_conv}</Text>

      <View style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}>
        <Text style={[about_scroll.about_style, { color: 'black' }]}>{right_conv} </Text>
      </View>

    </View>);
}

function MeatTemps({ left_meat, middle_meat, right_meat }) {
  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: 'white',
      paddingBottom: 2
    }}>
      <View style={{
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'flex-start'
      }}>
        <Text style={[about_scroll.about_style, { color: 'black', fontWeight: 'bold' }]}> {left_meat} </Text>
      </View>

      <View style={{
        flex: 4, flexDirection: 'row', justifyContent: 'flex-start',
        backgroundColor: 'white', width: "100%"
      }}>
        <Text style={[about_scroll.about_style, { color: 'black' }]}>{middle_meat}</Text>
      </View>

      <View style={{
        flex: 4, flexDirection: 'row', justifyContent: 'flex-end',
        backgroundColor: 'white', width: "100%"
      }}>
        <Text style={[about_scroll.about_style, { color: 'black' }]}>{right_meat} </Text>
      </View>
    </View>);
}

function AboutScreen() {
  return (
    <ScrollView >
      <ImperialToMetric left_conv={"15 ml= tablespoon"} middle_conv={"30 ml = 1 oz"} right_conv={"5 ml= 1 teaspoon"} />
      <ImperialToMetric left_conv={"1 lb = 0.45 kg"} middle_conv={"240 ml = 1 cup"} right_conv={"2.2 lbs = 1 kg"} />
      <ImperialToMetric left_conv={"1 qt = 4 cups = 0.95 L"} middle_conv={""} right_conv={"1 lb = 2 cups = 16 oz"} />

      <VertSpace back_color='white' />
      <HorzLine line_color='black' />
      <VertSpace back_color='white' />

      <MeatTemps left_meat={"Ham&Pork"} middle_meat={"145°F/65°C"} right_meat={"Precook 165°F/75°C"} />
      <MeatTemps left_meat={"Poultry"} middle_meat={"165°F/75°C"} right_meat={""} />
      <MeatTemps left_meat={"Rabbit"} middle_meat={"160°F/70°C"} right_meat={""} />
      <MeatTemps left_meat={"Beef"} middle_meat={"145°F/65°C"} right_meat={"Ground 160°F/70°C"} />
      <MeatTemps left_meat={"Mutton"} middle_meat={"145°F/65°C"} right_meat={"Ground 160°F/70°C"} />

      <MeatTemps left_meat={"Deer&Buffalo"} middle_meat={"145°F/65°C"} right_meat={"Ground 160°F/70°C"} />
      <MeatTemps left_meat={"Fish"} middle_meat={"Salmon 125°F/55°C"} right_meat={"Halibut 130°F/55°C"} />
      <MeatTemps left_meat={""} middle_meat={"Scallops 130°F/55°C"} right_meat={"Shrimp 120°F/50°C"} />
      <MeatTemps left_meat={""} middle_meat={"Lobster 140°F/60°C"} right_meat={"Tuna 115°F/50°C"} />

      <VertSpace back_color='white' />

      <View style={{ flexDirection: 'column' }}>
        <View style={{ alignItems: 'center' }}><Text style={[about_scroll.about_style]}>Edit your recipes at</Text></View>
        <View style={{ alignItems: 'center' }}>
          <Text onPress={_ => browserOpen(GOTO_SERVER)} style={[about_scroll.about_style, { color: 'black', textDecorationLine: 'underline' }]}>{SERVER_NAME} </Text>
        </View>
      </View>

    </ScrollView >
  );
}

const about_scroll = normalizeStyles({
  meats_style: { fontSize: 16, },
  about_style: { fontSize: 12, height: 16 },
})

export { AboutScreen };
