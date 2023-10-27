import styled from '@emotion/styled';
import { Avatar, Box, Button, IconButton, Typography } from '@mui/material';
export const AvatarStyled = styled(Avatar)({
  width: 60,
  height: 60,
  marginBottom: 15,
});

export const TypographyStyled = styled(Typography)({
  marginBottom: 15,
});

export const IconButtonStyled = styled(IconButton)({
  marginBottom: 20,
});

export const DataBoxStyled = styled(Box)({
  margin: '10px 0',
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  textAlign: 'center',
  width: '100%',
});

export const ButtonStyled = styled(Button)({
  margin: '15px 0',
  padding: '10px',
  color: '#fff',
  backgroundColor: '#3f51b5',
  '&:hover': {
    backgroundColor: '#303f9f',
  },
});

export const DataTextStyled = styled(Typography)({
  margin: '5px 0',
  fontSize: '0.9rem',
});

export const DataTextBoldStyled = styled(Typography)({
  margin: '5px 0',
  fontSize: '0.9rem',
  fontWeight: 'bold',
});
