// src/components/CollectionIcon.js
import React from 'react';
import styled from 'styled-components';

const IconWrapper = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background-color: #333;
  color: #fff;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const CollectionIcon = () => {
  return (
    <IconWrapper>
      <span role="img" aria-label="Collection Icon">
        🗃️
      </span>
    </IconWrapper>
  );
};

export default CollectionIcon;
