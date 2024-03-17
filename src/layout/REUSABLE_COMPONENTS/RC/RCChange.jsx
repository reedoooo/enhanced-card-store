import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import ProgressCircle from './../ProgressCircle';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MDTypography from '../MDTYPOGRAPHY/MDTypography';
import MDBox from '../MDBOX';
import { useMode } from '../../../context';

const useStyles = (theme) => ({
  container: {
    width: '100%',
    p: '20px',
    borderRadius: theme.spacing(4),
  },
  flexBox: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  percentageText: {
    variant: 'h6',
    fontWeight: 'medium',
    color: theme.palette.chartTheme.grey.default,
  },
  rangeText: {
    variant: 'h5',
    color: theme.palette.chartTheme.greenAccent.default,
    mt: '2px',
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
          <MDTypography
            variant="h6"
            fontWeight="bold"
            color={increase ? 'success' : 'error'}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
            }}
          >
            {increase ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            {`${change}%`}
          </MDTypography>
        </Box>
        {/* <Box>
          <ProgressCircle progress={progress} />
        </Box> */}
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
