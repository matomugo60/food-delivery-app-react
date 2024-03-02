import React, { useContext, useReducer } from "react";

export const StateContext = React.createContext();
const StateProvider = function (props) {
  return (
    <StateContext.Provider
      value={useReducer(props.reducer, props.initialState)}
    >
      {props.children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);

export default StateProvider;
