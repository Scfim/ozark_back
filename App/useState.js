export const useState = (initialState) => {
  var currentState = {v:initialState};

  function setCurrentState(newState = undefined || initialState) {
    currentState.v = newState;
    
  }
  const state = currentState.v
  return [currentState, setCurrentState];
};


const [aggee, setAggee] = useState("aggestor")

setAggee("O0")
setAggee("O")

console.log(aggee)