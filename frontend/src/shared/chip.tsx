import React from "react";
import "./chip.scss";

const Chip = ({ text }: { text: string }) => {
  return <span className="chip">{text}</span>;
};

export default Chip;
