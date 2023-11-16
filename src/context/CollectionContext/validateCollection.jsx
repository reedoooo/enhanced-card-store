function validateCollection(collection) {
  const warnings = [];

  // Utility to check if a value matches the type
  function checkType(value, type, fieldName) {
    if (typeof value !== type) {
      warnings.push(
        `Warning: Field "${fieldName}" should be of type "${type}".`
      );
    }
  }

  if (
    !collection.userId ||
    !mongoose.Types.ObjectId.isValid(collection.userId)
  ) {
    warnings.push('Warning: "userId" is missing or invalid.');
  }
  if (typeof collection.name !== 'string') {
    warnings.push('Warning: "name" is missing or not a string.');
  }
  // ... continue with other fields

  // For nested objects like priceEntrySchema, you would have to check each field
  if (collection.latestPrice) {
    if (typeof collection.latestPrice.num !== 'number') {
      warnings.push('Warning: "latestPrice.num" should be a number.');
    }
    if (!(collection.latestPrice.timestamp instanceof Date)) {
      warnings.push('Warning: "latestPrice.timestamp" should be a Date.');
    }
  }

  // For arrays, you would check each element
  if (Array.isArray(collection.priceHistory)) {
    collection.priceHistory.forEach((entry, index) => {
      if (typeof entry.num !== 'number') {
        warnings.push(
          `Warning: "priceHistory[${index}].num" should be a number.`
        );
      }
      if (!(entry.timestamp instanceof Date)) {
        warnings.push(
          `Warning: "priceHistory[${index}].timestamp" should be a Date.`
        );
      }
    });
  }

  // ... repeat for each field and nested object/array as needed

  if (warnings.length > 0) {
    console.warn('Validation warnings:', warnings.join('\n'));
  } else {
    console.log('No validation warnings. The object is valid.');
  }

  return warnings.length === 0;
}

// Example usage:
const collectionToValidate = {
  userId: '507f191e810c19729de860ea', // This should be a valid ObjectId
  name: 'My Collection',
  // ... other fields
};

validateCollection(collectionToValidate);
