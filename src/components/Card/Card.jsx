import React from "react";
import { Link } from "react-router-dom";
import style from "./Card.module.scss";

const Card = ({ to, src, title, info, content }) => {
  return (
    <Link to={to} className={style["card-contents"]}>
      <div className={style['small-image-container']}>
        <img src={src} alt={title} className={style["small-image"]} />
      </div>
      <div className={style["info-article"]}>
        <h3 className={style["info-title"]}>{title}</h3>
        <div className={style["info-addr"]}>{info}</div>
        <p className={style["info-content"]}>{content}</p>
      </div>
    </Link>
  );
};

export default Card;
