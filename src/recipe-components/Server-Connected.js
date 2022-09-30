
import { Icon } from '@rneui/themed';
import { View, Text } from 'react-native';
import { NO_SERVER_CONN_COL } from '../constants.js';

function ServerConnected(styles_buttons) {
  const server_connection = (
    <View style={{
      display: 'flex', width: '100%', flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end'
    }}>
      <View style={[styles_buttons.icon_margin_top, { width: '16.66%', alignItems: 'center' }]}
      >
        <Icon
          containerStyle={[styles_buttons.Icon_container, { backgroundColor: '' }]}
          iconStyle={styles_buttons.Icon_style_mag}
          name='signal'
          type='font-awesome-5'
          color={NO_SERVER_CONN_COL} />
      </View>
    </View>);
  return server_connection;
}

export {
  ServerConnected
};