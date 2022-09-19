//  https://overreacted.io/making-setinterval-declarative-with-react-hooks/


import { useEffect, useRef } from 'react';

function useFuzzyInterval(fuzzy_callback, fuzzy_delay) {
  const saved_callback = useRef();

  useEffect(() => {
    saved_callback.current = fuzzy_callback;
  }, [fuzzy_callback]);

  useEffect(() => {
    function fuzzyTick() {
      saved_callback.current();
    }
    if (fuzzy_delay !== null) {
      let fuzzy_id = setInterval(fuzzyTick, fuzzy_delay);
      return () => clearInterval(fuzzy_id);
    }
  }, [fuzzy_delay]);
}




export { useFuzzyInterval };
