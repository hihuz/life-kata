import React from "react";
import CreateLife from "../logic/";
import "../styles/main.css";
import Line from "./Line";

const width = 100;
const height = 100;
const amount = 42;
const Life = CreateLife({ width, height, amount });

class App extends React.Component {
  render() {
    const styles = {
      width: `${width * 10}px`,
      height: `${height * 10}px`
    };
    return (
      <div className="life-grid" style={styles}>
        {Life.board.map((line, i) => <Line cells={line} key={i} />)}
      </div>
    );
  }
}

export default App;
