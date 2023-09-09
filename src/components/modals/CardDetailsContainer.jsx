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

const CardDetailsContainer = ({ card }) => (
  <>
    <CardDetail icon={<FaLevelUpAlt />} title="Level" value={card?.level} />
    <CardDetail icon={<FaVenusMars />} title="Type" value={card?.type} />
    <CardDetail icon={<FaDragon />} title="Race" value={card?.race} />
    <CardDetail
      icon={<FaRegLightbulb />}
      title="Attribute"
      value={card?.attribute}
    />
    <CardDetail title="ATK" value={card?.atk} />
    <CardDetail icon={<FaShieldAlt />} title="DEF" value={card?.def} />
    <CardDetail icon={<FaRegCopy />} title="Description" value={card?.desc} />
  </>
);

export default CardDetailsContainer;
