// errorReporter.js
export const errorReporter = (store) => (next) => (action) => {
  try {
    return next(action);
  } catch (err) {
    console.error('Caught an exception!', err);
    // You might want to dispatch an action for the error here,
    // or send the error to an error reporting service
    throw err;
  }
};
