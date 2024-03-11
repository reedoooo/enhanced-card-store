import React from 'react';
import { Skeleton, Box, Stack, Grid } from '@mui/material';

// Enhanced skeleton configurations for a wider variety of types
const skeletonVariants = {
  title: {
    variant: 'text',
    width: '60%',
    height: 32, // Approximate height of a title
  },
  subtitle: {
    variant: 'text',
    width: '40%',
    height: 24, // Approximate height of a subtitle
  },
  button: {
    variant: 'rectangular',
    width: 180, // Approximate width of a button
    height: 40, // Approximate height of a button
  },
  chart: {
    variant: 'rectangular',
    width: '100%',
    height: 300,
  },
  listItem: {
    variant: 'rectangular',
    width: '100%',
    height: 50,
    marginBottom: 1,
  },
  text: {
    variant: 'text',
    width: '60%',
    height: 40,
  },
  card: {
    variant: 'rectangular',
    width: '100%',
    height: 200,
    marginBottom: 2,
  },
  avatar: {
    variant: 'circular',
    width: 40,
    height: 40,
    marginBottom: 1,
  },
  dashboardPanel: {
    variant: 'rectangular',
    width: '100%',
    height: 150,
    marginBottom: 2,
  },
  grid: {
    variant: 'rectangular',
    width: '100%',
    height: 150, // Default height for grid items
  },
  gridContainer: {
    variant: 'rectangular',
    width: '100%',
    height: 150,
    marginBottom: 2,
  },
  gridItem: {
    variant: 'rectangular',
    width: '100%',
    height: 150,
    marginBottom: 2,
  },
};

/**
 * Custom hook to return skeleton loaders based on type, with enhanced styles and variants.
 * @returns A skeleton component based on the specified type, with added flexibility for customization.
 */
const useSkeletonLoader = () => {
  const SkeletonLoader = ({
    type = 'text',
    count = 3,
    gridProps = {
      container: true,
      spacing: 2,
    },
    gridItemProps = {
      xs: 12,
      sm: 6,
      md: 3,
      lg: 4,
    },
    styleProps = {},
    contentProps = {
      typeData: [
        {
          id: 0,
          type: 'avatar',
          num: 1,
          index: 0,
        },
        {
          id: 1,
          type: 'title',
          num: 1,
          index: 1,
        },
        {
          id: 2,
          type: 'subtitle',
          num: 1,
          index: 2,
        },
      ],
      numOfItems: 3,
      types: ['title', 'subtitle', 'avatar'],
    },
    ...props
  }) => {
    // if (type === 'grid') {
    //   const { variant, width, height } = skeletonVariants.grid;
    //   const typesKeyMap = contentProps.types.reduce(
    //     (acc, type) => ({ ...acc, [contentProps.numOfItems]: type }),
    //     {}
    //   );
    //   console.log(typesKeyMap);
    //   const selectedVariant = typesKeyMap[count] || variant;

    //   // Render skeletons within Grid container for 'grid' type
    //   return (
    //     <Grid
    //       container
    //       {...gridProps}
    //       sx={{
    //         ...styleProps,
    //       }}
    //     >
    //       {Array.from({ length: count }, (_, index) => (
    //         <Grid item {...gridItemProps} key={index}>
    //           {/* Customize Grid item props as needed */}
    //           <Skeleton
    //             variant={selectedVariant || variant}
    //             animation="wave"
    //             width={width}
    //             height={height}
    //             {...props}
    //           />
    //         </Grid>
    //       ))}
    //     </Grid>
    //   );
    // }
    // const skeletonVariants = {
    //   grid: { variant: 'rect', width: 210, height: 118 },
    //   text: { variant: 'text', width: '100%', height: 20, marginBottom: 1 },
    //   // Add other types as needed...
    // };

    const generateVariantSequence = () => {
      return contentProps?.typeData?.flatMap((item) =>
        Array.from({ length: item.num }, () => item.type)
      );
    };

    if (type === 'grid') {
      const variantSequence = generateVariantSequence();
      return (
        <Grid container {...gridProps} sx={{ ...styleProps }}>
          {variantSequence.map((variantType, index) => {
            const { variant, width, height } = skeletonVariants[variantType];
            return (
              <Grid item {...gridItemProps} key={index}>
                <Skeleton
                  variant={variant}
                  animation="wave"
                  width={width}
                  height={height}
                  {...props}
                />
              </Grid>
            );
          })}
        </Grid>
      );
    }
    const { variant, width, height, marginBottom } =
      skeletonVariants[type] || skeletonVariants.text;

    // Support for rendering multiple skeletons of the same type, useful for lists
    return (
      <Stack spacing={1}>
        {Array.from({ length: count }, (_, index) => (
          <Box key={index} mb={marginBottom}>
            <Skeleton
              variant={variant}
              animation="wave"
              width={width}
              height={height}
              {...props}
            />
          </Box>
        ))}
      </Stack>
    );
  };

  return { SkeletonLoader };
};

export default useSkeletonLoader;