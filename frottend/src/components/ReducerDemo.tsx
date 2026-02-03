import React, { useReducer } from "react";
import { number, string } from "yup";
const initial = () => {
  name: string;
  age: number;
};
const reducer = (state, action) => {
  switch (action.type) {
    case "incr": {
      state.age = state.age + 1;
    }
    case "decr":
      {
        
          age: state.age,
        
      }
      return state;
  }
};

function ReducerDemo() {
  const [state, dispatch] = useReducer(reducer, { name: "", age: 0 });
  const addNew = () => {
    dispatch({ type: "incr" });
  };
  const removeNew = () => {
    dispatch({ type: "decr" });
  };
  return (
    <div>
      <button onClick={() => removeNew()}>-</button>
      {JSON.stringify(state)}
      <button onClick={() => addNew()}>+</button>
    </div>
  );
}

export default ReducerDemo;
