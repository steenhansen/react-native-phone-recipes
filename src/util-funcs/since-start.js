
import { TEST_SEC_SINCE_START } from '../testing-flags';


function sinceStart(...print_args) {
  if (TEST_SEC_SINCE_START) {
    const now_milli = Date.now();
    const num_milli = now_milli - global.MILLISECOND_START;
    const num_sec = num_milli / 1000;
    console.log(num_sec, ...print_args);
  }
}

export {
  sinceStart
};
