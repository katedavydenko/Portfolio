import React from "react";

const StarRating = ({ rating }) => {
  return <div>Рейтинг: {"⭐".repeat(rating)}</div>;
};

export default StarRating;