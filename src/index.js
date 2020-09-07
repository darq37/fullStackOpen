import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Hello = (props) => {
  return (
    <>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
    </>
  );
};

const App = () => {
  const name = "Dominik";
  const age = 26;
  return (
    <>
      <p>Welcome</p>
      <Hello name={name} age={age}/>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
