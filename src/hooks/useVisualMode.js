import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false){
    setMode(newMode);
    setHistory(prevState => {
      if (replace) {
        prevState.pop();
      }
      return [...prevState, newMode]
    });  
  };

  function back() {

    if (history.length > 1) {
      history.pop();
      // console.log("history:",history)
      setMode((history[history.length -1 ]))
    }
  }

  return { mode, transition, back };
}
