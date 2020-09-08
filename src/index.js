import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const App = () => {
  const [clicks, setClicks] = useState({
    left: 0,
    right: 0,
    allClicks: [],
  });

  const handleLeftClick = () => {
    setClicks({
      left: clicks.left + 1,
      right: clicks.right,
      allClicks: (clicks.allClicks = clicks.allClicks.concat("L")),
    });
  };

  const handleResetCLick = () => {
    setClicks({
      left: (clicks.left = 0),
      right: (clicks.right = 0),
      allClicks: (clicks.allClicks = []),
    });
  };

  const handleRightClick = () => {
    setClicks({
      left: clicks.left,
      right: clicks.right + 1,
      allClicks: (clicks.allClicks = clicks.allClicks.concat("R")),
    });
  };

  return (
    <>
      {clicks.left}
      <Button clickHandler={handleLeftClick} text="left" />
      <Button clickHandler={handleResetCLick} text="reset" />
      <Button clickHandler={handleRightClick} text="right" />
      {clicks.right}
      <History allClicks ={clicks.allClicks}/>
    </>
  );
};

const Button = ({ clickHandler, text }) => (
  <button onClick={clickHandler}>{text}</button>
);

const History = (props) => {
  if(props.allClicks.length ===0){
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return(
    <div>
      button press history: {props.allClicks.join('>')}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"));
