import React from "react";
import Button from "../atoms/Button/Button";

const BuyButton = ({ onBuy }) => {
  return <Button onClick={onBuy}>BUY NOW</Button>;
};

export default BuyButton;