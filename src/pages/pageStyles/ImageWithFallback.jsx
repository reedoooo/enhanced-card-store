import React from 'react';
import square from './square.png';
import rectangle from './rectangle.png';
import { Card, CardMedia, Container } from '@mui/material';

class ImageWithFallback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      src: props.src || rectangle, // Default image
      error: false,
    };
  }

  onError = () => {
    if (!this.state.error) {
      this.setState({
        src: square, // Fallback image
        error: true,
      });
    }
  };

  render() {
    const { alt, ...rest } = this.props;
    return (
      // <img src={this.state.src} alt={alt} onError={this.onError} {...rest} />
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexGrow: 1, // Ensure the container takes up 100% of its parent's height
          width: '100%', // Ensure the container takes up 100% of its parent's width
          overflow: 'hidden', // Prevent any overflow
          p: 'auto',
          m: 'auto',
          // paddingTop: '56.25%', // Aspect ratio padding hack for 16:9
          // position: 'relative', // Needed for positioning the image absolutely within
        }}
      >
        <Card
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%', // Ensure the container takes up 100% of its parent's width
            height: '100%', // Ensure the container takes up 100% of its parent's height
            overflow: 'hidden', // Prevent any overflow
            // paddingTop: '56.25%', // Aspect ratio padding hack for 16:9
            // position: 'relative', // Needed for positioning the image absolutely within
          }}
        >
          <CardMedia
            component="img"
            alt={alt}
            image={this.state.src}
            onError={this.onError}
            {...rest}
            sx={{
              // position: 'absolute',
              // top: 0,
              // left: 0,
              width: '100%', // Make the image responsive
              height: '100%', // Maintain aspect ratio
              objectFit: 'cover', // Cover the container without losing aspect ratio
            }}
          />
        </Card>
      </Container>
    );
  }
}

export default ImageWithFallback;
