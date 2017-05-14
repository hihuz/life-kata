import React from "react";

const Cell = ({ cell }) => <div className={`life-cell${cell === 1 ? " alive" : ""}`} />;

export default Cell;
