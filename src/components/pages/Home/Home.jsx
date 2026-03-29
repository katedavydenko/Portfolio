import styles from '../../../App.module.css';

import React, { useState } from "react";
import ProductDetails from "../../product/ProductDetails";
import ProductActions from "../../product/ProductActions";

import useLocalStorage from "../../../hooks/useLocalStorage";
const Home = () => {
const [theme, setTheme] = useLocalStorage("theme", "light");

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };
  const [quantity, setQuantity] = useState(1);

  const product = {
    title: "Evangelions Ayanami Rei Asuka Action Figures Cosplay Usagis Hachiwares Anime Model Doll Cartoon Desktop Ornaments Toy Fans Gift",
    price: "$1.42",
    rating: 4,
    image: "https://p16-oec-general-useast5.ttcdn-us.com/tos-useast5-i-omjb5zjo8w-tx/f1bf6dcc68e54ccaa9f8cfd2d17d2e81~tplv-fhlh96nyum-resize-webp:800:800.webp?dr=12186&t=555f072d&ps=933b5bde&shp=6ce186a1&shcp=e1be8f53&idc=useast5&from=1826719393"
  };

  const handleBuy = () => {
    alert(`${quantity} sold ${product.title}`);
  };

  return (
    <div>
      <button className={styles.link} onClick={toggleTheme}>
        Switch to {theme === "light" ? "dark" : "light"}
      </button>
    <div className={`${styles[theme]} ${styles.product} ${styles.login}`}>
      <ProductDetails
        image={product.image}
        title={product.title}
        rating={product.rating}
      />

      <ProductActions
        price={product.price}
        quantity={quantity}
        setQuantity={setQuantity}
        onBuy={handleBuy}
      />
    </div>
    </div>
  );
};

export default Home;