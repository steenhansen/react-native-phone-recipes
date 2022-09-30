//  https://overreacted.io/making-setinterval-declarative-with-react-hooks/

import { useEffect, useRef } from 'react';

function useFuzzyInterval(fuzzy_callback, fuzzy_delay, setClear_my_interval) {
  const saved_callback = useRef();

  useEffect(() => {
    saved_callback.current = fuzzy_callback;
  }, [fuzzy_callback]);

  useEffect(() => {
    function fuzzyTick() {
      saved_callback.current();
    }
    if (fuzzy_delay !== null) {
      const fuzzy_id = setInterval(fuzzyTick, fuzzy_delay);
      setClear_my_interval(fuzzy_id);
    }
  }, [fuzzy_delay]);
}

// so wonky
// function varyingInterval(vary_callback, vary_delay) {
//   const vary_id = setInterval(vary_callback, vary_delay);
//   return vary_id;
// }





export { useFuzzyInterval };
