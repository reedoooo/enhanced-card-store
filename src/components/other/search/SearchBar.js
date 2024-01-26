// commonStyles.js (or use theme.js)
export const commonPaperStyles = (theme) => ({
  padding: 3,
  borderRadius: 2,
  background: theme.palette.success.dark,
  boxShadow: 3,
  margin: 'auto',
  width: '100%',
  maxWidth: 'md',
  '&:hover': {
    boxShadow: 6,
  },
});

// SearchBar.jsx
import React, { useState, useEffect } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';

import {
  Container,
  Paper,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  useCardStore,
  useDeckStore,
  useFormContext,
  useMode,
} from '../../../context';
import SearchForm from '../../forms/SearchForm';

const SearchBar = ({ onSearchFocus, onSearchBlur }) => {
  const { theme } = useMode();
  const { forms, handleChange, handleSubmit } = useFormContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  return (
    <React.Fragment>
      <Paper elevation={3} sx={commonPaperStyles(theme)}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: theme.spacing(2),
          }}
        >
          <Typography
            variant="h4"
            align="left"
            sx={{
              fontWeight: 'bold',
              color: theme.palette.backgroundB.dark,
              textTransform: 'uppercase',
            }}
          >
            Search Cards
          </Typography>
          <IconButton aria-label="settings" onClick={handleClick} size="large">
            <SettingsIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem onClick={handleClose}>Option 1</MenuItem>
            <MenuItem onClick={handleClose}>Option 2</MenuItem>
            {/* Add more menu items as needed */}
          </Menu>
        </Box>
        <Container
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: theme.spacing(2),
          }}
        >
          {/* eslint-disable-next-line max-len */}
          <SearchForm
            searchTerm={forms?.searchForm?.searchTerm}
            handleChange={handleChange('searchForm', 'searchTerm')}
            handleSubmit={handleSubmit('searchForm')}
            handleKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSubmit('searchForm')(e);
              }
            }}
            onFocus={onSearchFocus}
            onBlur={onSearchBlur}
          />
        </Container>
      </Paper>
    </React.Fragment>
  );
};

export default SearchBar;

// // // SearchForm.jsx
// // import React from 'react';
// // import { Button, TextField, Paper } from '@mui/material';

// const SearchForm = ({
//   searchTerm,
//   handleChange,
//   handleSubmit,
//   handleKeyPress,
// }) => {
//   const { theme } = useMode();
//   return (
//     <Paper sx={{ padding: theme.spacing(2) }}>
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           handleSubmit();
//         }}
//       >
//         <TextField
//           value={searchTerm}
//           onChange={handleChange}
//           label="Search for cards"
//           variant="outlined"
//           fullWidth
//           onKeyDown={handleKeyPress}
//         />
//         <Button
//           fullWidth
//           variant="contained"
//           // color={theme.palette.backgroundA.default}
//           // background={theme.palette.backgroundA.default}
//           type="submit"
//           sx={{ mt: 1, mb: 1, background: theme.palette.backgroundA.default }}
//         >
//           Search
//         </Button>
//       </form>
//     </Paper>
//   );
// };

// // export default SearchForm;
