# TCG Enhanced Cardstore

[![Netlify Status](https://api.netlify.com/api/v1/badges/958aa5a1-dc96-4fc5-910b-b8274ddfbdd6/deploy-status)](https://app.netlify.com/sites/enhanced-cardstore/deploys)

## Overview

TCG Enhanced Cardstore is a full-stack web application designed for trading card game enthusiasts. It offers a seamless experience for users to manage their card collections, build decks, and purchase cards online. With a focus on responsive design and secure transactions, this platform is a one-stop-shop for both casual collectors and serious traders.

### Key Features

- **Card Search & Management**: Robust search capabilities and collection management tools.
- **E-Commerce Functionality**: Integrated online store with secure checkout.
- **Deck Building**: Intuitive interface for creating and managing custom decks.
- **Responsive Design**: Mobile-friendly layout for on-the-go access.
- **Real-Time Updates**: Backend cron jobs ensure the latest card data.

### Technologies

- **Frontend**: React, Stripe, MUI, Convertio, YGOProDeck-API, Nivo Charts.
- **Backend**: Node.js, Express.js, MongoDB, scheduled data updates.

## Gallery

Here's a glimpse of what TCG Enhanced Cardstore offers:

```html
<!-- Add carousel or gallery of screenshots here -->
<div class="carousel">
  <div class="carousel-images">
    <img src="path-to-image-1.jpg" alt="Image 1 Description" />
    <img src="path-to-image-2.jpg" alt="Image 2 Description" />
    <img src="path-to-image-3.jpg" alt="Image 3 Description" />
    <!-- Add more images as needed -->
  </div>
  <button class="prev" onclick="moveSlide(-1)">❮</button>
  <button class="next" onclick="moveSlide(1)">❯</button>
</div>
```

```css
.carousel {
    position: relative;
    max-width: 600px; /* Adjust as needed */
    margin: auto;
    overflow: hidden;
}

.carousel-images img {
    width: 100%;
    display: none;
}

.carousel .prev, .carousel .next {
    cursor: pointer;
    position: absolute;
    top: 50%;
    width: auto;
    padding: 16px;
    margin-top: -22px;
    color: white;
    font-weight: bold;
    font-size: 18px;
    transition: 0.6s ease;
    border-radius: 0 3px 3px 0;
    user-select: none;
}

.carousel .next {
    right: 0;
    border-radius: 3px 0 0 3px;
}

.carousel .prev:hover, .carousel .next:hover {
    background-color: rgba(0,0,0,0.8);
}

```

```js
let slideIndex = 0;
showSlides(slideIndex);

function moveSlide(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("carousel-images")[0].getElementsByTagName("img");
  if (n >= slides.length) {slideIndex = 0}    
  if (n < 0) {slideIndex = slides.length - 1}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  slides[slideIndex].style.display = "block";  
}
```
## Installation

Get started with these simple steps:

```bash
git clone https://github.com/your_username_/TCG-Enhanced-Cardstore.git
cd TCG-Enhanced-Cardstore
npm install
npm start
```

Navigate to `http://localhost:3000` to explore the app.

## Testing

Our comprehensive suite of acceptance tests ensures a flawless user experience:

1. **Search & Discover**: Validate search functionality and card discovery.
2. **Deck Building**: Test deck creation and editing capabilities.
3. **Collection Management**: Confirm seamless collection tracking.
4. **Purchasing Process**: Assess the shopping cart and checkout flow.

## Contributing

We value community contributions. Here’s how you can help:

1. Fork the repo.
2. Create a feature branch: `git checkout -b feature/YourFeature`.
3. Commit changes: `git commit -m 'Add YourFeature'`.
4. Push to the branch: `git push origin feature/YourFeature`.
5. Submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Contact

Reed Vogt - [LinkedIn Profile](https://www.linkedin.com/in/reed-vogt-student/)

- Project Site: [TCG Enhanced Cardstore](https://65624888827a3700084a3478--enhanced-cardstore.netlify.app/)
- GitHub Repo: [TCG-Enhanced-Cardstore](https://github.com/reedoooo/enhanced-card-store#readme)

## Acknowledgements

- [React](https://reactjs.org/)
- [Stripe](https://stripe.com/)
- [MUI](https://mui.com/)
- [Convertio](https://convertio.co/)
- [YGOProDeck-API](https://ygoprodeck.com/api-guide/)
- [MongoDB](https://www.mongodb.com/)
- [Netlify](https://www.netlify.com/)
- [Nivo Charts](https://nivo.rocks/)
