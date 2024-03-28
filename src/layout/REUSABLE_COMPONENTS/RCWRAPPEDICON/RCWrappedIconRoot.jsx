import { Box } from '@mui/material';
import styled from 'styled-components';
import { useMode } from '../../../context';

export default styled(Box)(({ color }) => {
  const { theme } = useMode();
  // const { color, size } = ownerstate;

  return {
    borderRadius: '50%',
    width: 40,
    height: 40,
    minHeight: '4rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: color,
    background:
      color === 'success'
        ? theme.palette.chartTheme.greenAccent.light
        : 'black',
    // [theme.breakpoints.down('md')]: {
    //   width: 30,
    //   height: 30,
    // },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.2rem',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1rem',
    },
  };
});
