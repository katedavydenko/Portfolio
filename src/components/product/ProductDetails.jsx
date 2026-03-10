import React from "react";
import StarRating from "./StarRating";
import styles from '../../App.module.css'


const ProductDetails = ({ image, title, description, rating }) => {
  return (
    <div className={styles.product} >
      <img src={image} alt={title} width="200" />
      <h2>{title}</h2>
      <StarRating rating={rating} />
    </div>
  );
};

export default ProductDetails;