import React, { useEffect, useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFormContext } from '../../context';
import { z } from 'zod';
import RCZodForm from '../../components/forms/reusable/RCZodForm';
import DeckForm from '../../components/forms/DeckForm';

// const deckSchema = z.object({
//   name: z.string().min(1, 'Name is required'),
//   description: z.string().min(1, 'Description is required'),
//   tags: z.array(z.string()),
//   color: z.enum(['red', 'blue', 'green', 'yellow']),
// });

const DeckEditPanel = ({ deck }) => {
  const { formMethods, setFormSchema } = useFormContext();

  return <DeckForm actionType="update" deckData={deck} />;
};

export default DeckEditPanel;
