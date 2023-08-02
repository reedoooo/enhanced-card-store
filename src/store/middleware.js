// middleware.js
import { errorReporter } from './middleware/errorReporter';

export const customMiddleware = (store) => (next) => (action) => {
  // perform any action-related or store-related logic here
  console.log('Middleware triggered:', action);
  return next(action);
};

// exporting all middleware here
export const middleware = [customMiddleware, errorReporter];
