import React, { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  ImageList,
  ImageListItem,
  Link,
  Typography,
  Box,
  Chip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import featureCardData from '../../data/featureCardData.json'; // Path to your JSON file
import useDialogState from '../../context/hooks/useDialogState';

const DetailsModal = ({ open, onClose }) => {
  // const { onClose, selectedValue, open } = props;
  const handleClose = () => {
    onClose('isDetailsDialogOpen');
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };
  // const { closeDialog, dialogState } = useDialogState();
  // const [open, setOpen] = React.useState(false);
  // useEffect(() => {
  //   console.log('DETAILS DIALOG EFFECT', dialogState);
  //   setOpen(dialogState.isDetailsDialogOpen);
  // }, [dialogState.isDetailsDialogOpen]);
  const featureData = featureCardData[0]; // Example: Using first item for demo

  console.log('featureData', featureData);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        style: { borderRadius: 16, backgroundColor: '#1A202C', color: 'white' },
      }}
    >
      <DialogTitle>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box>
            <Chip label={featureData?.startDate} color="primary" />
            <Typography
              variant="h5"
              component="h2"
              sx={{
                fontWeight: 'bold',
                borderBottom: 2,
                borderColor: 'primary.main',
                pb: 1,
                mb: 2,
              }}
            >
              {featureData?.title}
            </Typography>
          </Box>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography
          variant="body1"
          sx={{ mb: 4, borderBottom: 1, borderColor: 'grey.600', pb: 2 }}
        >
          {featureData?.description}
        </Typography>
        <ImageList
          cols={2}
          gap={8}
          sx={{ width: '100%', height: 'auto', justifyContent: 'center' }}
        >
          {featureData?.images?.map((imgSrc, idx) => (
            <ImageListItem
              key={idx}
              style={{
                display: 'flex',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain', // ensures the aspect ratio is preserved
                margin: 'auto',
              }}
            >
              <img
                src={`${imgSrc}`}
                alt={`Image of ${featureData?.title} ${idx}`}
                loading="lazy"
                style={{
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain', // ensures the aspect ratio is preserved
                  margin: 'auto',
                }}
              />
            </ImageListItem>
          ))}
        </ImageList>
        <Box
          sx={{
            textAlign: 'center',
            mt: 4,
            borderBottom: 1,
            borderColor: 'grey.600',
            pb: 2,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Technologies Used:
          </Typography>
          {/* Additional content here if needed */}
        </Box>
      </DialogContent>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, gap: 2 }}>
        {featureData?.url && (
          <Link href={featureData.url} target="_blank" color="primary">
            <FaExternalLinkAlt size={24} />
            <Typography>View Live</Typography>
          </Link>
        )}
        {featureData?.readmeurl && (
          <Link
            href={featureData.readmeurl}
            target="_blank"
            style={{ color: 'green' }}
          >
            <FaGithub size={24} />
            <Typography>View on GitHub</Typography>
          </Link>
        )}
      </Box>
    </Dialog>
  );
};

export default DetailsModal;
