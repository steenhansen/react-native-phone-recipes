
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

import { sinceStart } from './util-funcs/since-start';

async function isServerConnectable() {
  let server_is_connectable;
  const requestOptions = {
    method: "GET",
    headers: { "Last-modified": "text" },
  };
  try {
    const get_response = await fetch(SERVER_UP_URL, requestOptions);
    if (get_response.ok) {
      server_is_connectable = true;
    } else {
      server_is_connectable = false;
    }
  } catch (e) {
    server_is_connectable = false;
  }
  if (TEST_FAIL_SERVER_CONNECTABLE) {
    server_is_connectable = false;
  }
  global.SERVER_IS_CONNECTABLE = server_is_connectable;
  return global.SERVER_IS_CONNECTABLE;
}

function WrapC_Screen_Connected({ have_2_firstPaint, setHave_2_firstPaint }) {
  const [is_server_connected, setIs_server_connected] = useState(false);
  const [first_paint_logs, setFirst_paint_logs] = useState(10);
  const [_clear_my_interval, _setClear_my_interval] = useState(0);

  const serverHeartbeat = async () => {
    let server_is_connectable = await isServerConnectable();
    if (TEST_FAIL_SERVER_CONNECTABLE) {
      server_is_connectable = false;
      global.SERVER_IS_CONNECTABLE = false;
    }
    setIs_server_connected(server_is_connectable);
  };

  useFuzzyInterval(serverHeartbeat, INTERVAL_CHECK_SERVER_CONNECTABLE, _setClear_my_interval);

  const which__showing = useSelector((filter_state) => filter_state.show_which);
  const empty_paint_before_cache = which__showing === SHOW_INIT;

  useEffect(() => {
    if (!empty_paint_before_cache && !have_2_firstPaint) {
      setHave_2_firstPaint(true);
      sinceStart('C ~ FIRST PAINT DONE');
    }
  }, [is_server_connected, !have_2_firstPaint]);



  global.DISPLAY_SCREEN = which__showing;
  if (empty_paint_before_cache) {
    return (null);
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
