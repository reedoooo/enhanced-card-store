import styled from 'styled-components';
import { Button, TextField } from '@mui/material';

export const FormWrapper = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 400px;
  margin: auto;
`;

export const StyledTextField = styled(TextField)`
  && {
    margin-bottom: 12px;
  }
`;

export const StyledButton = styled(Button)`
  && {
    margin-top: 16px;
  }
`;
