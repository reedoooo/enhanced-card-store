import { Box, Typography } from '@mui/material';

export const CarouselImage = ({ image, caption }) => {
  return (
    <div>
      <img
        src={image}
        alt={caption}
        style={{ height: '600px', width: '100%', objectFit: 'cover' }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          color: (theme) => theme.palette.grey.black || 'common.white',
          width: '100%',
          padding: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="body1">
          Browse and shop for your favorite trading cards. Whether buying or
          selling, we&apos;ve got something for every collector!
        </Typography>
      </Box>
    </div>
  );
};
