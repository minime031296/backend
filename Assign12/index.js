const express = require('express');
const app = express();
const multer = require('multer')
const fs = require('fs')
const path = require('path')

app.use(express.json())
app.set('view engine', 'ejs')

const uploadDir = path.join(__dirname, 'uploads');
try {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
} catch (err) {
  console.error('Error creating directory:', err);
}

const storage = multer.diskStorage({
    destination:function(req, file, cb) {
    cb(null, uploadDir)
}},
{
    filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round((Math.random() * 1E9))
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }})

const uploads = multer({storage: storage})

app.post('/upload', uploads.single("file"), (req, res) => {
  return res.status(200).json({
    "message":"file uploaded successfully",
    "imageURL": "<cloundinary Link>"  
  })
})

app.get('/', (req, res) => {
  return res.status(200).render("index")
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;