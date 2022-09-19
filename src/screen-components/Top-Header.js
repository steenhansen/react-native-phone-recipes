import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";


import { gmailSignIn } from '../recipe-server/call-google';
import { SHOW_ALL, SHOW_KITCHEN, SHOW_OTHER } from '../util-funcs/global-values';
import { normalizeStyles } from '../util-funcs/normalize-css';

import { async_loadUser } from '../recipe-server/server-data';



import { GroupButtons } from '../recipe-components/Group-Buttons';

import { browserOpen } from '../util-funcs/browser-link';

import { GOTO_SERVER } from '../constants';


//   https://reactnativeelements.com/docs/components/buttongroup

function createNew(redux_google_email) {
  const [email_name, email_company] = redux_google_email.split('@');
  const create_url = GOTO_SERVER + email_name + '/' + email_company;
  browserOpen(create_url);
}

async function signIntoGmail(dispatch) {
  let signed_into_gmail = false;
  try {
    const google_info = await gmailSignIn();
    const google_email = google_info.user.email;
    const google_user_id = google_info.user.id;
    const google_idToken = google_info.idToken;

    const recipes_yours = await async_loadUser(google_email)
    dispatch({ type: 'signin-click', payload: { google_email, google_user_id, google_idToken, recipes_yours } });
    signed_into_gmail = true;
  } catch (error) {
    console.log('ERROR - signin-click - ', error);
  }
  return signed_into_gmail;
}

const TopHeader = () => {
  const dispatch = useDispatch();
  const [top_selected, setTop_selected] = useState(0);

  const [top_buttons, setTop_buttons] = useState(['ALL RECIPES ', 'Gmail Sign In']);

  const other_cook = useSelector((header_state) => header_state.google_other);

  const other_cook_arr = other_cook.split('@');
  const other_cook_2 = other_cook_arr[0] + '\n@' + other_cook_arr[1];

  const redux_google_email = useSelector((header_state) => header_state.google_email);
  const redux_show_which = useSelector((header_state) => header_state.show_which);
  useEffect(_ => {
    if (redux_show_which === SHOW_KITCHEN) {
      setTop_selected(null);
      setTop_buttons(['Quit Kitchen']);
    } else if (redux_show_which === SHOW_ALL) {
      setTop_selected(0);
      if (redux_google_email === '') {
        setTop_buttons(['ALL RECIPES ', 'Gmail Sign In']);
      } else {
        setTop_buttons(['ALL RECIPES ', 'Create Recipe', 'YOUR RECIPES']);
      }
    } else if (redux_show_which === SHOW_OTHER) {
      setTop_selected(1);
      if (redux_google_email === '') {
        setTop_buttons(['ALL RECIPES ', other_cook_2]);
      } else {
        setTop_buttons(['ALL RECIPES ', other_cook_2, 'YOUR RECIPES']);
      }
    } else {
      setTop_selected(2);
      setTop_buttons(['ALL RECIPES ', 'Create Recipe', 'YOUR RECIPES']);
    }
  },
    [redux_show_which, redux_google_email]);

  const updateTopRadio = async chosen_index => {
    if (chosen_index == 0) {
      setTop_selected(0);
      dispatch({ type: 'all-click', payload: {} });
    } else if (chosen_index == 1) {
      if (redux_google_email === '') {
        if (signIntoGmail(dispatch)) {
          setTop_selected(2);
        }
      } else {
        createNew(redux_google_email);
      }
    } else {
      setTop_selected(2)
      dispatch({ type: 'yours-click', payload: { google_email, google_user_id, google_idToken, recipes_yours } });
    }
  }

  const font_size = styles_header.ButtonGroup_textStyle;
  const buttons = top_buttons;
  const selectedIndex = top_selected;
  const header_buttons = GroupButtons(updateTopRadio, { buttons, selectedIndex, font_size });
  return header_buttons;
}
const styles_header = normalizeStyles({
  ButtonGroup_textStyle: { fontSize: 13 },

})

export {
  TopHeader
};

