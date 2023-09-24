import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background-color: #2c3e50; /* Darker blue shade */
  color: #ecf0f1; /* Off white for better contrast */
  padding: 1.5rem; /* Increased padding */
  text-align: center;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1); /* subtle shadow for depth */
  z-index: 1000; /* Ensure it appears above other elements if needed */

  /* Responsive design */
  @media (min-width: 768px) {
    padding: 2rem; /* Increase padding for larger screens */
    text-align: left; /* Align text to the left for larger screens */
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
        &copy; {new Date().getFullYear()} Reed Vogt | Designed with ❤️ by{' '}
        <FooterLink href="https://yourportfolio.com">Your Portfolio</FooterLink>
      </FooterText>
    </FooterWrapper>
  );
};

export default Footer;
