// GridLayoutComponent.jsx
import React from 'react';
import { Grid, Container } from '@mui/material';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const GridLayout = ({
  children,
  containerStyles,
  isLoading,
  skeletonCount,
  gridItemProps,
}) => (
  <Container sx={containerStyles}>
    <Grid container spacing={1}>
      <TransitionGroup component={null}>
        {/* Ensure children are properly formatted for transition */}
        {React.Children.map(children, (child, index) => (
          <CSSTransition key={index} timeout={500} classNames="card">
            {React.cloneElement(child, gridItemProps)}
          </CSSTransition>
        ))}
        {/* {isLoading
          ? Array.from({ length: skeletonCount }).map((_, index) => (
              <CSSTransition key={index} timeout={500} classNames="card">
                <Grid item sx={{ ...gridItemProps }}>
                  {React.cloneElement(children, { key: index })}
                </Grid>
              </CSSTransition>
            ))
          : children} */}
      </TransitionGroup>
    </Grid>
  </Container>
);

export default GridLayout;
