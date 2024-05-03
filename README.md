# TCG Enhanced Cardstore

[![Netlify Status](https://api.netlify.com/api/v1/badges/958aa5a1-dc96-4fc5-910b-b8274ddfbdd6/deploy-status)](https://app.netlify.com/sites/enhanced-cardstore/deploys)

## Overview

TCG Enhanced Cardstore is a full-stack web application designed for trading card game enthusiasts. It offers an all-encompassing platform to effortlessly manage card collections, construct decks, and transact securely. Designed with responsiveness and security at its core, this platform caters to the needs of both occasional collectors and professional traders.


### Key Features

- **Card Search & Management**: Robust search capabilities and collection management tools.
- **E-Commerce Functionality**: Integrated online store with secure checkout.
- **Deck Building**: Intuitive interface for creating and managing custom decks.
- **Responsive Design**: Mobile-friendly layout for on-the-go access.
- **Real-Time Updates**: Backend cron jobs ensure the latest card data.

## Technologies

### Frontend

- **React**: Builds dynamic and interactive user interfaces, ensuring smooth navigation and responsive design.
- **TypeScript**: Provides type safety and reduces runtime errors, contributing to more reliable and maintainable code.
- **Material-UI & MUI Joy**: Offers pre-styled UI components, allowing for rapid development of visually appealing interfaces.
- **React Hook Form**: Simplifies form creation and validation, ensuring a smooth user experience and reducing input errors.

#### Data Management

- **Redux**: Handles application state management, ensuring consistent and efficient data flow across the platform.
- **Zod**: Provides data validation for robust API interactions, ensuring data integrity and security.
- **Context API**: Facilitates global state management, allowing for seamless data sharing between components.

#### E-commerce

- **Stripe**: Facilitates secure payment processing, allowing for smooth and trustworthy transactions.

#### Data Visualization

- **Nivo Charts & ReCharts**: Provides interactive and visually appealing data visualization tools, enhancing user experience and data comprehension.

#### Development Tools

- **ESLint & Prettier**: Maintains code quality and consistency, reducing technical debt and ensuring readability.
- **React Scripts**: Streamlines development, build, and testing processes, enhancing the overall workflow.

#### Testing and Optimization

- **Jest & React Testing Library**: Ensures code quality and reliability through comprehensive unit and integration tests.
- **Web Vitals**: Measures the quality of user experience, helping to monitor and improve the performance of the web pages.

### Backend Technologies

The backend for the Enhanced Card Store is built using a diverse set of technologies designed to offer secure, robust, and scalable web services:

#### Core Technologies

- **Node.js & Express**: Provides the runtime environment and the web application framework, respectively, facilitating the creation of server-side logic and APIs.
- **MongoDB & Mongoose**: Used for database management; MongoDB as the NoSQL database and Mongoose as the ODM to handle business data and models efficiently.

#### Security and Authentication

- **bcrypt**: Secures user data with hashing, ensuring safe storage of sensitive information such as passwords.
- **JWT (jsonwebtoken)**: Manages authentication and secure token-based access to resources.
- **Helmet**: Enhances security by setting various HTTP headers to prevent common vulnerabilities.
- **Express Rate Limit & Rate-Limit-Redis**: Provides rate limiting to prevent abuse and brute-force attacks, enhancing API security.

#### Data Handling and Utilities

- **Axios**: Handles HTTP requests for internal and external API communications.
- **date-fns and Moment.js**: Provides comprehensive tools for date handling in JavaScript, improving data manipulation and timezone handling with Moment-Timezone.
- **Cheerio**: Enables server-side DOM manipulation to scrape or interact with HTML in a jQuery-like fashion.

#### Performance Optimization

- **Compression**: Implements middleware to compress response bodies, improving load times and bandwidth usage.
- **Node-cron**: Schedules automated tasks directly within the Node.js environment, enhancing the application's capability to perform time-based jobs.

#### Email and Notifications

- **Nodemailer**: Facilitates the sending of emails, enabling communications like notifications and password resets.
- **Socket.io**: Enables real-time bidirectional event-based communication between the server and clients, essential for notifications and live updates.

#### Logging and Monitoring

- **Morgan**: HTTP request logger middleware for node.js, aiding in monitoring request logs.
- **Winston & Winston-Daily-Rotate-File**: A powerful logging library capable of transporting logs to different storage mediums and managing log rotation.

#### Developer Tools and Testing

- **Webpack & Babel**: Bundles and transpiles JavaScript files, ensuring compatibility across different browsers and environments.
- **Jest & Supertest**: Facilitates testing, with Jest for unit and integration tests, and Supertest for HTTP assertions.
- **ESLint & Prettier**: Maintains code quality and styling consistency, essential for keeping the codebase clean and readable.

#### Continuous Integration and Deployment

- **Nodemon**: Monitors for any changes in the source and automatically restarts the server, ideal for development environments.
- **gulp**: Automates and enhances the build workflow, allowing for task automation such as minifying files and running pre-build scripts.

### Additional Middleware and Libraries

- **cookie-parser & cors**: Handles cookie parsing and enables CORS to manage security and access controls.
- **crypto-js**: Provides cryptographic functionality including encryption and secure encoding.

## Gallery

Here's a glimpse of what TCG Enhanced Cardstore offers:

### Home Page

![Home Page](https://github.com/reedoooo/enhanced-card-store/blob/f114a3d36e7b81f84b6eb1bc0d071cd4395ea611/public/images/pages/homepage.png)

### Deck Builder

![Deck Builder](https://github.com/reedoooo/enhanced-card-store/blob/f114a3d36e7b81f84b6eb1bc0d071cd4395ea611/public/images/pages/deck-home.png)

### Portfolio

![Portfolio Home](https://github.com/reedoooo/enhanced-card-store/blob/f114a3d36e7b81f84b6eb1bc0d071cd4395ea611/public/images/pages/collection-home.png)

### Cart

![Cart](https://github.com/reedoooo/enhanced-card-store/blob/f114a3d36e7b81f84b6eb1bc0d071cd4395ea611/public/images/pages/cart-checkout.png)

### Profile

![Profile](https://github.com/reedoooo/enhanced-card-store/blob/f114a3d36e7b81f84b6eb1bc0d071cd4395ea611/public/images/pages/profile-home.png)

### Store Search

![Store Search](https://github.com/reedoooo/enhanced-card-store/blob/f114a3d36e7b81f84b6eb1bc0d071cd4395ea611/public/images/pages/store-home.png)

_For an interactive experience, visit the [Live Demo](https://65624888827a3700084a3478--enhanced-cardstore.netlify.app/)._

## Installation

Get started with these simple steps:

``````bash
git clone https://github.com/your_username_/TCG-Enhanced-Cardstore.git
cd TCG-Enhanced-Cardstore
npm install
npm start
```` -->

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
- [ReCharts](https://recharts.org/)
- [Jest](https://jestjs.io/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [JWT](https://jwt.io/)
- [Helmet](https://helmetjs.github.io/)

`````markdown
``````
