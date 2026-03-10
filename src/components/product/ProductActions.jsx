import React from "react";
import Button from "../atoms/Button/Button";
import Input from "../atoms/Input/Input";
import styles from '../../App.module.css'
import BuyButton from "./BuyButton";

const ProductActions = ({ price, quantity, setQuantity, onBuy }) => {
  return (
    <div className={styles.productInfo}>
      <h3>{price} USD</h3>

      <Input 
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}  
      />

      <BuyButton onBuy={onBuy}>BUY NOW</BuyButton> 
    </div>
  );
};

export default ProductActions;