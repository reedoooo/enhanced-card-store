import React, { useEffect } from 'react';
import './deckcard.css'; // Assuming you have styles here

const CardToolTip = ({ cardInfo, isHovering, isDeckModalOpen, tooltipRef }) => {
  useEffect(() => {
    if (isHovering && tooltipRef.current) {
      const cardRect = tooltipRef.current.getBoundingClientRect();
      tooltipRef.current.style.top = `${cardRect.top}px`;
      tooltipRef.current.style.left = `${cardRect.right}px`;
    }
  }, [isHovering]);

  return (
    <div
      ref={tooltipRef}
      className={`tooltip ${isHovering && !isDeckModalOpen ? 'show' : ''}`}
    >
      {cardInfo?.name && <h4 className="tooltip-title">{cardInfo.name}</h4>}
      {cardInfo?.level && (
        <span>
          <strong>LV:</strong> {cardInfo.level}
        </span>
      )}
      {cardInfo?.type && (
        <span>
          <strong>Type:</strong> {cardInfo.type}
        </span>
      )}
      {cardInfo?.race && (
        <span>
          <strong>Race:</strong> {cardInfo.race}
        </span>
      )}
      {cardInfo?.attribute && (
        <span>
          <strong>Attribute:</strong> {cardInfo.attribute}
        </span>
      )}
      {cardInfo?.atk && (
        <span>
          <strong>ATK:</strong> {cardInfo.atk}
        </span>
      )}
      {cardInfo?.def && (
        <span>
          <strong>DEF:</strong> {cardInfo.def}
        </span>
      )}
      {cardInfo?.desc && (
        <span>
          <strong>Description:</strong> {cardInfo.desc}
        </span>
      )}
    </div>
  );
};

export default CardToolTip;
