
import React from "react";
import "./Card.css"; 
import "./category_page.css";

const Card = ({ title, imageUrl ,backgroundColor,onCardClick, isSelected }) => 
{

  const handleCardClick = () =>
  {
    onCardClick(title);
  };

  return (
    <div className={`card ${isSelected ? 'selected-card' : ""} `}  onClick={handleCardClick}  style={{ backgroundColor: backgroundColor }}>
    <p className="CardTitle">{title}</p>
    <img src={imageUrl} alt={title} className="card-image" />
  </div>
  );
};

export default Card;
