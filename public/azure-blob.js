function fetchBlobContent() {
    const connectionString = "your_actual_connection_string_here";
    if (!connectionString) {
        document.getElementById('blob-content').innerText = 'Connection details are not present. Connection is pending.';
        setTimeout(fetchBlobContent, 5000); // Check again after 5 seconds
        return;
    }

    // Logic to connect to Azure Blob Storage and fetch content
    // Placeholder for actual implementation
    document.getElementById('blob-content').innerText = 'Blob content would be displayed here.';

    // If the connection string is present, reload the page to display the blob content
    location.reload();
}

document.addEventListener('DOMContentLoaded', fetchBlobContent);
