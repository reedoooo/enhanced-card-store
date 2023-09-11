import React from 'react';
import {
  FaDragon,
  FaLevelUpAlt,
  FaRegCopy,
  FaRegLightbulb,
  FaShieldAlt,
  FaVenusMars,
} from 'react-icons/fa';
import CardDetail from './CardDetail';

const CardDetailsContainer = ({ card, className }) => (
  <>
    <CardDetail
      className={className}
      icon={<FaLevelUpAlt />}
      title="Level"
      value={card?.level}
    />
    <CardDetail
      className={className}
      icon={<FaVenusMars />}
      title="Type"
      value={card?.type}
    />
    <CardDetail
      className={className}
      icon={<FaDragon />}
      title="Race"
      value={card?.race}
    />
    <CardDetail
      className={className}
      icon={<FaRegLightbulb />}
      title="Attribute"
      value={card?.attribute}
    />
    <CardDetail className={className} title="ATK" value={card?.atk} />
    <CardDetail
      className={className}
      icon={<FaShieldAlt />}
      title="DEF"
      value={card?.def}
    />
    <CardDetail
      className={className}
      icon={<FaRegCopy />}
      title="Description"
      value={card?.desc}
    />
  </>
);

export default CardDetailsContainer;
