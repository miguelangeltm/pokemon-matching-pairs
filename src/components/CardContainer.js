import React from "react";
import './cardContainer.css'

const CardContainer = (props) => {
  

  return (
    <div className="container">
      {props.children}     
    </div>
  );
};

export default CardContainer;
