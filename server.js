const { BlobServiceClient } = require('@azure/storage-blob');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/blob-content', async (req, res) => {
  try {
    const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
    
    // Retrieve the first container
    let containerName = "";
    let containerClient;
    for await (const container of blobServiceClient.listContainers()) {
      containerName = container.name;
      containerClient = blobServiceClient.getContainerClient(containerName);
      break; // Take the first container and break
    }

    // Now retrieve the first blob in this container
    let blobName = "";
    for await (const blob of containerClient.listBlobsFlat()) {
      blobName = blob.name;
      break; // Take the first blob and break
    }

    // Check if we actually found a container and a blob
    if (!containerName || !blobName) {
      throw new Error("No containers or blobs found.");
    }

    // Download the content of the first blob
    const blobClient = containerClient.getBlobClient(blobName);
    const downloadBlockBlobResponse = await blobClient.download(0);
    const blobContent = await streamToString(downloadBlockBlobResponse.readableStreamBody);
    res.send(blobContent);
  } catch (error) {
    console.error('Error fetching blob content:', error);
    res.status(500).send('Error fetching blob content');
  }
});

async function streamToString(readableStream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    readableStream.on('data', (data) => {
      chunks.push(data.toString());
    });
    readableStream.on('end', () => {
      resolve(chunks.join(''));
    });
    readableStream.on('error', reject);
  });
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Function to list all containers and blobs - For initial testing or debugging
async function listAll() {
  const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
  console.log("Listing all containers and their first blob:");

  for await (const container of blobServiceClient.listContainers()) {
    const containerClient = blobServiceClient.getContainerClient(container.name);
    console.log(`Container: ${container.name}`);
    for await (const blob of containerClient.listBlobsFlat()) {
      console.log(`- ${blob.name}`);
      break; // List only the first blob
    }
  }
}

listAll().catch((err) => {
  console.error("Error running sample:", err.message);
});
