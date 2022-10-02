
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { get_loadCache, get_serverData, get_silentSignin } from './initial-data';
import { renewGoogle_email, renewRecipes_all, renewRecipes_yours } from './recipe-server/recipe-cache.js';
import { WrapC_Screen_Connected } from './wrap-c-screen-connected';

import { clearCache } from './recipe-server/recipe-cache.js';
import { sinceStart } from './util-funcs/since-start';
import { EMPTY_CACHE_STATE } from './constants';

import { TEST_EMPTY_CACHE_ON_START, TEST_FAIL_LOAD_SERVER_DATA, TEST_FAIL_RENEW_SERVER_DATA, TEST_FAIL_SILENT_SIGNIN } from './testing-flags';

const WrapB_Silent_Data = () => {

  const redux_google_email = useSelector((renew_state) => renew_state.google_email);

  async function init_clearCache() {
    if (!have_0_clearedCache) {
      if (TEST_EMPTY_CACHE_ON_START) {
        await clearCache();
      }
      setHave_0_cleardCache(true);
    }
  }

  async function init_loadCache() {
    if (have_0_clearedCache) {
      let loadCache_payload;
      sinceStart('B ~ init_loadCache');
      if (TEST_EMPTY_CACHE_ON_START) {
        loadCache_payload = EMPTY_CACHE_STATE;
      } else {
        loadCache_payload = await get_loadCache();
      }
      dispatch({ type: 'start-cache', payload: loadCache_payload });
      setHave_1_triedCache(true);
    }
  }

  async function init_silentSignin() {
    if (have_1_triedCache && have_2_firstPaint) {
      sinceStart('D ~ init_silentSignin');
      if (TEST_FAIL_SILENT_SIGNIN) {
        dispatch({ type: 'signout-click', payload: {} });
      } else {
        const silentSignin_payload = await get_silentSignin();
        dispatch({ type: 'silent-signin', payload: silentSignin_payload });
      }
      setHave_3_silentSignin(true);
    } else {
      //      console.log('2 fail silent')
    }
  }
  async function init_serverData() {
    if (have_3_silentSignin) {
      sinceStart('E ~ init_serverData');
      if (!TEST_FAIL_LOAD_SERVER_DATA) {
        const serverData_payload = await get_serverData(redux_google_email);
        if (serverData_payload !== undefined) {
          setSever_all(serverData_payload.recipes_all);
          setSever_yours(serverData_payload.recipes_yours);
          setGoogle_email(serverData_payload.google_email);
          dispatch({ type: 'server-data', payload: serverData_payload });
        }
      }
      setHave_4_serverData(true);
    } else {
      //      console.log('2 fail server')
    }
  }

  async function init_renewCache() {
    if (have_4_serverData) {
      sinceStart('F ~ init_renewCache');
      if (!TEST_FAIL_RENEW_SERVER_DATA) {
        await renewRecipes_all(severAll);
        await renewRecipes_yours(severYours);
        await renewGoogle_email(googleEmail);
      }
    } else {
      //console.log('init_renewCache - NOT YET')
    }
  }

  const dispatch = useDispatch();

  const [severAll, setSever_all] = useState(false);
  const [severYours, setSever_yours] = useState(false);
  const [googleEmail, setGoogle_email] = useState('');

  const [have_0_clearedCache, setHave_0_cleardCache] = useState(false);
  const [have_1_triedCache, setHave_1_triedCache] = useState(false);
  const [have_2_firstPaint, setHave_2_firstPaint] = useState(false);
  const [have_3_silentSignin, setHave_3_silentSignin] = useState(false);
  const [have_4_serverData, setHave_4_serverData] = useState(false);

  useEffect(_ => { init_clearCache(); }, []);
  useEffect(_ => { init_loadCache(); }, [have_0_clearedCache]);
  useEffect(_ => { init_silentSignin(); }, [have_1_triedCache, have_2_firstPaint]);
  useEffect(_ => { init_serverData(); }, [have_3_silentSignin, redux_google_email]);
  useEffect(_ => { init_renewCache(); }, [have_4_serverData, redux_google_email]);


  return (<WrapC_Screen_Connected have_2_firstPaint={have_2_firstPaint} setHave_2_firstPaint={setHave_2_firstPaint} />);
};

export { WrapB_Silent_Data };
