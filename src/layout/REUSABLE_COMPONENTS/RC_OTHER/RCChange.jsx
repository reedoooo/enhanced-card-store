import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import RCTypography from 'layout/REUSABLE_COMPONENTS/RCTYPOGRAPHY';
import MDBox from '../MDBOX';
import { useMode } from 'context';

const useStyles = (theme) => ({
  container: {
    width: '25%%',
    p: '20px',
    // my: '20px',
    // background: theme.palette.grey.dark,
    borderRadius: theme.spacing(4),
  },
  flexBox: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  percentageText: {
    variant: 'h4',
    fontWeight: 'bold',
    // fontFamily: 'Poppins',
    color: theme.palette.grey.default,
  },
  rangeText: {
    variant: 'h3',
    color: theme.palette.success.dark,
    mt: '2px',
    fontWeight: 'bold',
  },
});

const RCChange = ({ progress, increase, change, rangeLevel }) => {
  const { theme } = useMode();
  const styles = useStyles(theme);

  return (
    <MDBox sx={styles.container}>
      <Box sx={styles.flexBox}>
        <Box>
          <Typography sx={styles.percentageText}>Change</Typography>
          <RCTypography
            variant="h6"
            fontWeight="bold"
            color={increase ? 'success' : 'error'}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.5rem',
            }}
          >
            {increase ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            {`${change}%`}
          </RCTypography>
        </Box>
      </Box>
      <Box sx={styles.flexBox}>
        <Typography sx={styles.rangeText}>{`In ${rangeLevel}`}</Typography>
      </Box>
    </MDBox>
  );
};

RCChange.propTypes = {
  progress: PropTypes.number.isRequired,
  increase: PropTypes.bool.isRequired,
  change: PropTypes.number.isRequired,
  rangeLevel: PropTypes.string.isRequired,
};

export default RCChange;
