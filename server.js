const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files (HTML, CSS) from the current directory
app.use(express.static(path.join(__dirname)));

// Route to serve the homepage (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Route to get random text from the 'Poem' folder
app.get('/random-text', (req, res) => {
  const folderPath = path.join(__dirname, 'Poem');

  // Read the files in the 'Poem' folder
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      return res.status(500).send('Error reading folder');
    }

    // Pick a random file
    const randomFile = files[Math.floor(Math.random() * files.length)];
    const filePath = path.join(folderPath, randomFile);

    // Read the content of the random file
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        return res.status(500).send('Error reading file');
      }

      // Send the file content as the response
      res.send(data);
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
