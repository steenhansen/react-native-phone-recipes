
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useSelector } from "react-redux";

import { BottomFooter } from "./screen-components/Bottom-Footer";
import { TopHeader } from "./screen-components/Top-Header";
import { SHOW_ABOUT, SHOW_INIT, SHOW_KITCHEN } from './util-funcs/global-values';

import { AboutScreen } from "./screen-types/About-Screen";
import { FilterScreen } from "./screen-types/Filter-Screen";
import { KitchenScreen } from "./screen-types/Kitchen-Screen";

import { INTERVAL_CHECK_SERVER_CONNECTABLE, SERVER_UP_URL } from './constants.js';

import { TEST_FAIL_SERVER_CONNECTABLE } from './testing-flags';
import { useFuzzyInterval } from './util-funcs/fuzzy-interval';


async function isServerConnectable() {
  let server_CONNECTABLE;
  const requestOptions = {
    method: "GET",
    headers: { "Last-modified": "text" },
  };
  try {
    const get_response = await fetch(SERVER_UP_URL, requestOptions);
    if (get_response.ok) {
      server_CONNECTABLE = true;
    } else {
      server_CONNECTABLE = false;
    }
  } catch (e) {
    server_CONNECTABLE = false;
  }
  if (TEST_FAIL_SERVER_CONNECTABLE) {
    server_CONNECTABLE = false;
  }
  global.SERVER_IS_CONNECTABLE = server_CONNECTABLE;
  return global.SERVER_IS_CONNECTABLE;
}

function WrapC_Screen_Connected({ setHave_2_firstPaint }) {
  const [is_server_connected, setIs_server_connected] = useState(false);
  const [_clear_my_interval, _setClear_my_interval] = useState(0); // not used, need for useFuzzyInterval()

  useFuzzyInterval(() => {
    let server_CONNECTABLE = isServerConnectable();
    if (TEST_FAIL_SERVER_CONNECTABLE) {
      server_CONNECTABLE = false;
      global.SERVER_IS_CONNECTABLE = false;
    }
    setIs_server_connected(server_CONNECTABLE);
  }, INTERVAL_CHECK_SERVER_CONNECTABLE, _setClear_my_interval);

  useEffect(() => {
    //   updates via global vars
  }, [is_server_connected]);

  useEffect(() => {
    setHave_2_firstPaint(true);
  }, []);

  const which__showing = useSelector((filter_state) => filter_state.show_which);


  global.DISPLAY_SCREEN = which__showing;
  if (which__showing === SHOW_INIT) {
    return (null)
  } else if (which__showing === SHOW_KITCHEN) {
    return (<SafeAreaProvider>
      <KitchenScreen />
    </SafeAreaProvider>
    );
  } else if (which__showing === SHOW_ABOUT) {
    return (<SafeAreaProvider>
      <AboutScreen />
    </SafeAreaProvider>
    );
  }
  const app_top_bot = (
    <SafeAreaProvider>
      <View style={{ flex: 1 }}>
        <TopHeader />
        <View style={{ flex: 1 }}>
          <FilterScreen />
          <BottomFooter />
        </View>
      </View>
    </SafeAreaProvider>
  );
  return app_top_bot;
}

export { WrapC_Screen_Connected };
