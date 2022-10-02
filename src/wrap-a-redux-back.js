
import { useEffect } from "react";
import { BackHandler } from "react-native";
import { Provider, useDispatch, useSelector } from "react-redux";

import { makeReduxStore } from "./recipe-store";
import { INIT_REDUX_STORE, SHOW_ABOUT, SHOW_KITCHEN, SHOW_YOURS } from './util-funcs/global-values';
import { WrapB_Silent_Data } from './wrap-b-silent-data';
import { sinceStart } from './util-funcs/since-start';

const BackToMain = () => {
  const dispatch = useDispatch();
  const show__previous = useSelector((filter_state) => filter_state.show_previous);
  const which__showing = useSelector((filter_state) => filter_state.show_which);
  useEffect(() => {
    const backAction = () => {
      if (which__showing == SHOW_ABOUT || which__showing == SHOW_KITCHEN) {
        let dispatch_type;
        if (show__previous == SHOW_YOURS) {
          dispatch_type = 'yours-click';
        } else {
          dispatch_type = 'all-click';
        }
        dispatch({ type: dispatch_type, payload: {} });
        return true;    // return to main
      }
      return false;     // minimize program
    };
    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => backHandler.remove();
  }, [which__showing]);
  return (<></>);
};

const WrapA_Redux_Back = () => {
  sinceStart('A ~ makeReduxStore');
  const recipe_store = makeReduxStore(INIT_REDUX_STORE);
  return (
    <Provider store={recipe_store}>
      <BackToMain />
      <WrapB_Silent_Data />
    </Provider>
  );
};


export { WrapA_Redux_Back };
