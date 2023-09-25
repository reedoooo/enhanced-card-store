import { GlobalStyles } from '@mui/material';

const MyGlobalStyles = () => (
  <GlobalStyles
    styles={{
      html: {
        height: '100vh',
        fontSize: '16px', // default font-size
        fontFamily: '"Roboto", sans-serif', // default font
        color: '#333', // default text color
      },
      body: {
        backgroundColor: '#f4f4f4', // a light grey background
        margin: '0', // remove default margin
        padding: '0', // remove default padding
        boxSizing: 'border-box', // box model handling
      },
      '*': {
        boxSizing: 'inherit', // every element to inherit boxSizing
      },
      a: {
        textDecoration: 'none', // remove underline from all links
        color: 'inherit', // links will inherit their parent color
      },
      // '*::-webkit-scrollbar': {
      //   visibility: 'hidden',
      //   // width: '8px',
      // },
      '*::-webkit-scrollbar-track': {
        backgroundColor: 'gray.200',
      },
      '*::-webkit-scrollbar-thumb': {
        backgroundColor: 'gray.500',
        borderRadius: '20px',
      },
      h1: {
        fontSize: '2.5rem', // styling for h1 tags
        fontWeight: 'bold',
      },
      h2: {
        fontSize: '2rem', // styling for h2 tags
        fontWeight: 'bold',
      },
      h3: {
        fontSize: '1.75rem', // styling for h3 tags
      },
      h4: {
        fontSize: '1.5rem', // styling for h4 tags
      },
      h5: {
        fontSize: '1.25rem', // styling for h5 tags
      },
      h6: {
        fontSize: '1rem', // styling for h6 tags
      },
      p: {
        fontSize: '1rem', // styling for p tags
      },
    }}
  />
);

export default MyGlobalStyles;
