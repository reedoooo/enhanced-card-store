import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    maxHeight: '300px', // or any desired max height
    minHeight: '300px', // make sure it matches max height
    overflow: 'hidden', // ensures content doesn't spill out
    borderRadius: theme.spacing(1), // Add border radius for cards
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Add shadow for cards
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.03)', // Add a slight scale effect on hover
    },
  },
  image: {
    maxHeight: '200px',
    width: '100%',
    objectFit: 'cover', // Ensure the image covers the entire space
  },
  text: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  button: {
    // maxWidth: '200px',
    minHeight: '40px',
    maxHeight: '60px',
    width: '100%',
  },
  content: {
    transform: 'scale(0.9)', // scales down to 90% of the original size
    padding: 0,
  },
  cardActions: {
    marginTop: 'auto', // pushes the actions to the bottom
    display: 'flex',
    justifyContent: 'center', // centers the buttons
    width: '100%',
  },
  tooltip: {
    // maxWidth: '75vw', // 75% of the viewport width
    width: 'auto', // Let the width be automatic
    border: `1px solid ${theme.palette.divider}`, // Add border
    borderRadius: theme.shape.borderRadius, // Use theme border radius
    padding: theme.spacing(2), // Add some padding
    backgroundColor: theme.palette.backgroundA.lightest, // Use theme background
    color: theme.palette.text.primary, // Use theme text color
    boxShadow: theme.shadows[3], // Use theme shadow
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    height: '100%',
    // Add more styles here for intricate design
    // You can add background images, gradients, etc.
    maxWidth: 220,
    position: 'relative',
    '&::before': {
      // Create a pseudo-element to control the aspect ratio
      content: '""',
      display: 'block',
      paddingTop: '100%', // This controls the aspect ratio, 100% for 1:1, 56.25% for 16:9, etc.
    },
    '& > img': {
      // Assuming you are including an image
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover', // This makes sure your image covers the entire content area
    },
  },
  // tooltip: {
  //   // Define the width or max-width for your tooltip
  //   maxWidth: 220,
  //   position: 'relative',
  //   '&::before': {
  //     // Create a pseudo-element to control the aspect ratio
  //     content: '""',
  //     display: 'block',
  //     paddingTop: '100%' // This controls the aspect ratio, 100% for 1:1, 56.25% for 16:9, etc.
  //   },
  //   '& > img': { // Assuming you are including an image
  //     position: 'absolute',
  //     top: 0,
  //     left: 0,
  //     width: '100%',
  //     height: '100%',
  //     objectFit: 'cover', // This makes sure your image covers the entire content area
  //   },
  // Define styles for children components like headers, images, etc.
  tooltipTitle: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
    alignContent: 'flex-start',
    alignItems: 'flex-start',
  },
  descriptionSpan: {
    display: 'block', // Make description appear on a new line
    marginTop: theme.spacing(1),
    flexGrow: 1,
  },
  attributeSpan: {
    display: 'block',
    marginBottom: theme.spacing(0.5),
  },
}));
