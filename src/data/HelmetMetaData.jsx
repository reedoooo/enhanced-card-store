/* eslint-disable max-len */
import { Helmet } from 'react-helmet';

const HelmetMetaData = () => (
  <Helmet
    title="Enhanced Cardstore"
    titleTemplate="%s | Enhanced Cardstore"
    defaultTitle="Enhanced Cardstore"
    meta={[
      { name: 'description', content: 'Description of your site or page' },
      { name: 'keywords', content: 'YuGiOh, cards, collection, deckbuilder' },
      { property: 'og:title', content: 'Title Here' },
      { property: 'og:description', content: 'Description Here' },
      {
        property: 'og:image',
        content:
          'https://github.com/reedoooo/enhanced-card-store/blob/f114a3d36e7b81f84b6eb1bc0d071cd4395ea611/public/images/pages/collection-home.png',
      },
      {
        property: 'og:url',
        content: 'https://enhanced-cardstore.netlify.app/',
      },
      { name: 'twitter:card', content: 'summary_large_image' },
    ]}
    link={[
      { rel: 'canonical', href: 'https://enhanced-cardstore.netlify.app/' },
      {
        rel: 'apple-touch-icon',
        href: 'https://enhanced-cardstore.netlify.app/apple-touch-icon.png',
      },
      {
        rel: 'shortcut icon',
        href: 'https://enhanced-cardstore.netlify.app/favicon.ico',
      },
    ]}
  />
);

export default HelmetMetaData;
