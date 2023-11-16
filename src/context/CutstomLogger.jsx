let logCounter = 0;

function CustomLogger(data) {
  logCounter += 1;
  const dataType = Array.isArray(data) ? 'Array' : typeof data;
  let formattedData = '';

  if (dataType === 'object') {
    formattedData = JSON.stringify(data, null, 2);
  } else if (dataType === 'Array') {
    formattedData = data
      .map((item) => JSON.stringify(item, null, 2))
      .join('\n');
  } else {
    formattedData = data.toString();
  }

  console.log(`[LOG ${logCounter}] --- [Type: ${dataType}] -----------------`);
  console.log(formattedData);
  console.log(`[END OF LOG ${logCounter}] ---------------------------------`);
}

export default CustomLogger;
