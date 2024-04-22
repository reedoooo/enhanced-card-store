import React from 'react';
import { styled } from '@mui/system';

// Create a styled section for the fallback
const StyledFallback = styled('section')(({ theme }) => ({
  display: 'block',
  border: '1px solid red',
  padding: '1rem',
  color: 'red',
  borderRadius: '5px',
  backgroundColor: 'white',
}));

// Create a styled header within the fallback
const FallbackHeader = styled('header')({
  padding: '0',
  margin: '0 0 1rem 0', // Added bottom margin for spacing
});

// Create a styled title within the fallback header
const FallbackTitle = styled('h3')({
  fontSize: '1.25rem', // Specify a font size for the title
});

// Create a styled div for the body of the fallback
const FallbackBody = styled('div')({
  fontSize: '1rem', // Adjust the font size for the body content
});

const FallbackContainer = ({ componentStack, error }) => (
  <StyledFallback>
    <FallbackHeader>
      <FallbackTitle>Oops! An error occured!</FallbackTitle>
    </FallbackHeader>
    <FallbackBody>
      <p>
        <strong>Error:</strong> {error.toString()}
      </p>
      <p>
        <strong>Stacktrace:</strong> {componentStack}
      </p>
    </FallbackBody>
  </StyledFallback>
);

export default FallbackContainer;
