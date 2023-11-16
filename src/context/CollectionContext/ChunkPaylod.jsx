import { fetchWrapper } from './collectionUtility';

const chunkSize = 1024 * 1024 * 10; // 10 MB, adjust as needed

// Function to break the payload into smaller chunks
export const chunkPayload = (payload) => {
  const stringPayload = JSON.stringify(payload);
  const payloadSize = new TextEncoder().encode(stringPayload).length;

  if (payloadSize <= chunkSize) {
    return [payload]; // If payload is small, no need to chunk
  }

  // If payload is too large, chunk it
  const chunks = [];
  for (let i = 0; i < stringPayload.length; i += chunkSize) {
    const chunkStr = stringPayload.slice(i, i + chunkSize);
    chunks.push(JSON.parse(chunkStr));
  }

  return chunks;
};

// Function to send chunks to the server
export const sendChunks = async (endpoint, method, chunks) => {
  for (const chunk of chunks) {
    await fetchWrapper(endpoint, method, chunk);
  }
};
