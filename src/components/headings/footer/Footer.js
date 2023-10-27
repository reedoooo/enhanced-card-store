import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background-color: #2c3e50;
  color: #ecf0f1;
  padding: 1.5rem;
  bottom: 0;
  margin-top: 100%;
  text-align: center;
  width: 100%;
  height: 5rem;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;

  @media (min-width: 768px) {
    padding: 2rem;
    text-align: left;
  }
`;

const FooterText = styled.p`
  margin: 0; /* Remove default margin */
  font-size: 0.9em;

  /* Hover effects */
  &:hover {
    color: #f39c12; /* Change color on hover */
    transition: color 0.3s ease; /* Smooth transition */
  }
`;

const FooterLink = styled.a`
  color: #ecf0f1;
  text-decoration: none;

  &:hover {
    color: #f39c12;
    transition: color 0.3s ease;
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterText>
        &copy; {new Date().getFullYear()} Reed Vogt | Designed with ❤️ by
        <FooterLink href="https://reedvogt.com">ReedVogt.com</FooterLink>
      </FooterText>
    </FooterWrapper>
  );
};

export default Footer;
