// Define a Logger class
class Logger {
  constructor(headers) {
    this.headers = headers || [];
    this.data = [];
  }

  // Add a new row of data
  addRow(row) {
    if (!this.validateRow(row)) {
      console.error('Row data does not match headers.');
      return;
    }
    this.data.push(row);
  }

  // Validate that the row data matches the headers
  validateRow(row) {
    for (let header of this.headers) {
      if (!(header in row)) {
        return false;
      }
    }
    return true;
  }

  // Log the data as a table
  logTable() {
    if (this.data.length === 0) {
      console.log('No data to display.');
      return;
    }
    console.table(this.data);
  }

  // Clear the logged data
  clearData() {
    this.data = [];
  }

  // Function to log actions specific to CardList events
  logCardAction(action, card) {
    this.addRow({
      Action: action,
      'Card Name': card?.name || '',
      Quantity: card?.quantity || '',
      'Total Price': card?.totalPrice || '',
    });
    this.logTable();
  }
}

// Define a Logger class
export default Logger;
