import { GlobalStyles } from '@mui/material';

const MyGlobalStyles = () => (
  <GlobalStyles
    styles={{
      html: {
        height: '100%',
        fontSize: '16px', // default font-size
        maxWidth: '100vw',
        fontFamily: '"Roboto", sans-serif', // default font
        color: '#333', // default text color
      },
      body: {
        backgroundColor: '#f4f4f4', // a light grey background
        margin: '0', // remove default margin
        padding: '0', // remove default padding
        maxWidth: '100vw',
        boxSizing: 'border-box', // box model handling
      },
      '*': {
        boxSizing: 'inherit', // every element to inherit boxSizing
      },
      a: {
        textDecoration: 'none', // remove underline from all links
        color: 'inherit', // links will inherit their parent color
      },
      '*::-webkit-scrollbar-track': {
        backgroundColor: 'gray.200',
      },
      '*::-webkit-scrollbar-thumb': {
        backgroundColor: 'gray.500',
        borderRadius: '20px',
      },
    }}
  />
);

export default MyGlobalStyles;
