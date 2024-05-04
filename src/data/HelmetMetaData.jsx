import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const HelmetMetaData = ({ title, description, image, url }) => (
  <HelmetProvider>
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta
          name="keywords"
          content="YuGiOh, cards, collection, deckbuilder"
        />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={url} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={url} />
        <link rel="apple-touch-icon" href="/path/to/apple-touch-icon.png" />
        <link rel="shortcut icon" href="/path/to/favicon.ico" />
      </Helmet>
    </div>
  </HelmetProvider>
);

export default HelmetMetaData;
