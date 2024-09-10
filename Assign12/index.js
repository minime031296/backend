const express = require('express');
const app = express();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Middleware to parse JSON
app.use(express.json());

// Set view engine to EJS
app.set('view engine', 'ejs');

// Ensure the 'uploads' directory exists
const uploadDir = path.join(__dirname, 'uploads');
try {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
} catch (err) {
  console.error('Error creating directory:', err);
}

// Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Correctly use uploadDir
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round((Math.random() * 1E9));
    cb(null, file.fieldname + '-' + uniqueSuffix); // Correctly use Date.now()
  }
});

const uploads = multer({ storage: storage });

// Route to handle file uploads
app.post('/upload', uploads.single('file'), (req, res) => {
  return res.status(200).json({
    "message": "file uploaded successfully",
    "imageURL": "<cloudinary Link>" // Adjust to actual image URL if needed
  });
});

// Route to render index page
app.get('/', (req, res) => {
  return res.status(200).render('index'); // Ensure 'index.ejs' is in the views directory
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
