
import { useEffect, useState } from "react";
import { EXTRA_TIMER_START } from '../util-funcs/global-values';

import { GroupButtons } from '../recipe-components/Group-Buttons';
import { useFuzzyInterval } from '../util-funcs/fuzzy-interval';

import { Vibration } from 'react-native';
import { TIMER_OVERRUN_MSEC, TIMER_OVERRUN_VIBRATE } from '../util-funcs/global-values';
import { normalizeStyles } from '../util-funcs/normalize-css';

import { lightOrDark } from '../util-funcs/light-dark';
import { INTERVAL_TIMER_EXECUTE, THEME_TIMER_OK, THEME_TIMER_OVERRUN, THEME_TIMER_POSITIVE } from '../constants';


import {
  DARK_BTN_TEXT, LITE_BTN_TEXT
} from '../constants.js';

const light_css = {
  button_text: LITE_BTN_TEXT,
};

const dark_css = {
  button_text: DARK_BTN_TEXT,
};



const toHHMMSS = function (sec_num, num_minutes) {
  const pos_num = Math.abs(sec_num);
  const to_hours = Math.floor(pos_num / 3600);
  let to_minutes = Math.floor((pos_num - to_hours * 3600) / 60);
  let to_seconds = Math.floor(pos_num - to_hours * 3600 - to_minutes * 60);
  if (to_minutes < 10) {
    to_minutes = "0" + to_minutes;
  }
  if (to_seconds < 10) {
    to_seconds = "0" + to_seconds;
  }
  let hh_mm_ss = to_minutes + ":" + to_seconds;
  if (to_hours > 0) {
    hh_mm_ss = to_hours + ":" + to_minutes + ":" + to_seconds;
  }
  if (num_minutes > 0 && sec_num < 0) {
    hh_mm_ss = "- " + hh_mm_ss; // show negative time when counting down, extra timer is only positive
  }
  return hh_mm_ss;
};

function startTimer(timerToggle, start_words, time_color) {
  const font_size = styles_header.ButtonGroup_textStyle;
  const buttons = [start_words];
  const container_height = styles_header.ButtonGroup_containerStyle;
  const start_timer = GroupButtons(timerToggle, { buttons, font_size, container_height, time_color });
  return start_timer;
}

function resumeReset(hh_mm_ss, timerResume, timerReset, resume_words, reset_words, time_color) {
  const top_buttons = [resume_words, reset_words, hh_mm_ss];
  const updateTopRadio = async chosen_index => {
    if (chosen_index == 0) {
      timerResume()
    } else {
      timerReset()
    }
  }
  const font_size = styles_header.ButtonGroup_textStyle;
  const buttons = top_buttons;
  const container_height = styles_header.ButtonGroup_containerStyle;
  const disabled = [2];
  const pause_timer = GroupButtons(updateTopRadio, { buttons, font_size, container_height, disabled, time_color });
  return pause_timer;
}

function pauseTimer(hh_mm_ss, timerToggle, pause_words, time_color) {
  const font_size = styles_header.ButtonGroup_textStyle;
  const buttons = [pause_words, hh_mm_ss];
  const container_height = styles_header.ButtonGroup_containerStyle;
  const disabled = [1];
  const pause_timer = GroupButtons(timerToggle, { buttons, font_size, container_height, disabled, time_color });
  return pause_timer;
}

function countUp({ hh_mm_ss, show_milli, is_timing, timerToggle, timerReset, timerResume, ok_time_color }) {
  const has_not_started = (show_milli === 0);
  let toggled_timer;
  if (!is_timing && has_not_started) {
    toggled_timer = startTimer(timerToggle, "Start Extra Timer", ok_time_color);
  } else if (is_timing) {
    toggled_timer = pauseTimer(hh_mm_ss, timerToggle, "Pause Extra Timer", ok_time_color);
  } else {
    toggled_timer = resumeReset(hh_mm_ss, timerResume, timerReset, 'Resume Extra', 'Reset Extra', ok_time_color);
  }
  return toggled_timer;
}

function countDown({ hh_mm_ss, show_milli, recipe_milli, num_minutes, is_timing, timerToggle, timerReset, timerResume, ok_time_color }) {
  let time_color = ok_time_color;
  if (show_milli < 0) {
    time_color = THEME_TIMER_OVERRUN; // only counting down timers get to be red, extra is always green
    if (show_milli > TIMER_OVERRUN_MSEC) {
      Vibration.vibrate(TIMER_OVERRUN_VIBRATE);
    }
  }
  const has_not_started = (show_milli === recipe_milli);
  let toggled_timer;
  if (!is_timing && has_not_started) {
    toggled_timer = startTimer(timerToggle, "Start " + num_minutes + " Minute Timer", time_color);
  } else if (is_timing) {
    toggled_timer = pauseTimer(hh_mm_ss, timerToggle, "Pause " + num_minutes + " Minute Timer", time_color);
  } else {
    toggled_timer = resumeReset(hh_mm_ss, timerResume, timerReset, 'Resume', 'Reset', time_color);
  }
  return toggled_timer;
}

function drawTimer(props) {
  const light_or_dark = lightOrDark(light_css, dark_css);
  const { show_milli, num_minutes } = props;
  let toggled_timer;
  let show_seconds = Math.round(show_milli / 1000);
  const hh_mm_ss = toHHMMSS(show_seconds, num_minutes);
  props['hh_mm_ss'] = hh_mm_ss;
  props['ok_time_color'] = light_or_dark.button_text;
  if (num_minutes < 0) {
    toggled_timer = countUp(props);
  } else {
    toggled_timer = countDown(props);
  }
  return toggled_timer;
}

///////////////////////////////////////////////////////////////////////////////

function ToggledTimer({ num_minutes, setClear_my_interval }) {

  if (num_minutes === 0) { return ""; }
  let recipe_milli, show_milli;
  if (num_minutes < 0) {
    recipe_milli = EXTRA_TIMER_START;
  } else {
    recipe_milli = num_minutes * 60 * 1000;
  }

  //   have a test, TEST_ALL_TIMERS_4_SECONDS
  //recipe_milli = 2000;   ///////////////@@@@@@@@@@@@@@@@@@@@@

  const [is_timing, setIs_timing] = useState(false);
  const [milli_total_previous, setmilli_total_previous] = useState(0);
  const [milli_current_start, setMilli_current_start] = useState(0);
  const [milli_current_interval, setMilli_current_interval] = useState(0);

  useFuzzyInterval(() => {
    if (is_timing) {
      const now_milli = Date.now();
      const new_current_milli = now_milli - milli_current_start;
      setMilli_current_interval(new_current_milli);
    }
  }, INTERVAL_TIMER_EXECUTE, setClear_my_interval);

  const timerResume = () => {
    const now_milli = Date.now();
    setMilli_current_start(now_milli);
    setIs_timing(true);
  }

  const timerToggle = () => {
    const now_milli = Date.now();
    if (is_timing) {
      const new_interval_milli = now_milli - milli_current_start;
      const new_total_previous_milli = milli_total_previous + new_interval_milli;
      setmilli_total_previous(new_total_previous_milli);
      setMilli_current_interval(0);
    } else {
      setMilli_current_start(now_milli);
    }
    setIs_timing(!is_timing);
  };

  const timerReset = () => {
    setIs_timing(false);
    setmilli_total_previous(0);
    setMilli_current_interval(0);
  };

  if (num_minutes < 0) {
    show_milli = milli_total_previous + milli_current_interval;
  } else {
    show_milli = recipe_milli - milli_total_previous - milli_current_interval;
  }
  let stop_watch = drawTimer({ show_milli, recipe_milli, num_minutes, is_timing, timerToggle, timerReset, timerResume });
  return stop_watch;
}

const styles_header = normalizeStyles({
  ButtonGroup_containerStyle: { height: 44 },
  ButtonGroup_textStyle: { fontSize: 14 },
})

export { ToggledTimer };


