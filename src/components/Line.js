import React from "react";
import Cell from "./Cell";

const Line = ({ cells }) => (
  <div className="life-line">
    {cells.map((cell, i) => <Cell cell={cell} key={i} />)}
  </div>
);

export default Line;
