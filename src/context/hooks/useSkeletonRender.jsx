import { Grid, Skeleton } from '@mui/material';
import { v4 as uuidv4 } from 'uuid'; // Import UUID to generate unique keys
import useMode from '../UTILITIES_CONTEXT/ColorModeContext/useMode';

// Function to render individual skeleton based on the provided config
const renderSkeletonItem = (config, theme) => {
  return (
    <Grid
      item
      xs={config.xs || 12}
      sm={config.sm || 12}
      md={config.md || 4}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(config.gap || 2),
        ...config.style,
      }}
      key={config.key || uuidv4()} // Use UUID for unique key or a provided key
    >
      {config?.skeletons?.map((skeleton, index) => (
        <Skeleton
          key={`${config.key || 'skeleton'}-${index}`} // Use a combination of config key and index
          variant={skeleton.variant || 'text'}
          width={skeleton.width || '100%'}
          height={skeleton.height || 118}
        />
      ))}
    </Grid>
  );
};

// Main hook function
const useSkeletonRender = (configurations) => {
  const { theme } = useMode();

  return (
    <Grid container spacing={3}>
      {configurations?.map((config, index) =>
        renderSkeletonItem(config, theme)
      )}
    </Grid>
  );
};

export default useSkeletonRender;
