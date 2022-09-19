import { Text, TextInput } from 'react-native';

import { heading__styles, input__styles, normalizeStyles } from '../util-funcs/normalize-css';

function StepsDirections({ current_recipe }) {
  const { steps } = current_recipe;
  const num_lines = steps.split('\n').length;
  return (<>
    <Text style={[styles_steps.heading__styles, { fontWeight: 'bold' }]}>Steps &amp; Directions</Text>
    <TextInput
      style={[styles_steps.input__styles, { width: '100%', paddingTop: 0, paddingBottom: 0, marginTop: 0 }]}
      value={steps} multiline={true} numberOfLines={num_lines} editable={false} />
  </>
  );
}

const styles_steps = normalizeStyles({ input__styles, heading__styles });

export { StepsDirections };
