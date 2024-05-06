import { RCMainCard } from 'layout/REUSABLE_COMPONENTS';
import styled from 'styled-components';

const CardWrapper = styled(RCMainCard)(({ theme }) => ({
  backgroundColor: theme.palette.success.darkest,
  color: theme.palette.primary.light,
  overflow: 'hidden',
  position: 'relative',
  '&:before': {
    content: '""',
    position: 'absolute',
    background: `linear-gradient(140.9deg, ${theme.palette.primary[200]} -14.02%, rgba(144, 202, 249, 0) 77.58%)`,
    borderRadius: '50%',
    width: 210,
    height: 210,
    top: -160,
    right: -130,
  },
  '&:after': {
    content: '""',
    position: 'absolute',
    borderRadius: '50%',
    width: 210,
    height: 210,
    top: -30,
    right: -180,
  },
}));

export { CardWrapper };
