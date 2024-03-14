require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const dns = require("dns");
const mongoose = require('mongoose');
const shortId = require('shortid');
const validUrl = require('valid-url');
const Url = require('./urlSchema');


// Basic Configuration
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());


//DB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});



// POST route to create a short URL
app.post('/api/shorturl', async (req, res) => {
  const { url: originalUrl } = req.body;
  console.log(originalUrl)
  const baseUrl = `${req.protocol}://${req.get('host')}/api/shorturl`;

  // Check if the URL is valid and starts with http:// or https://
  if (!validUrl.isWebUri(originalUrl)) {
    return res.status(400).json({ error: 'invalid url' });
  }

  try {
    let url = await Url.findOne({ originalUrl });
    if (url) {
      return res.json({ original_url: url.originalUrl, short_url: url.shortUrl });
    } else {
      url = new Url({ originalUrl });
      await url.save();
      return res.json({ original_url: url.originalUrl, short_url: url.shortUrl });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json('Server error');
  }
});

// GET route to redirect to the original URL
app.get('/api/shorturl/:shortUrl', async (req, res) => {
  try {
    const url = await Url.findOne({ shortUrl: req.params.shortUrl });
    if (url) {
      return res.redirect(url.originalUrl);
    } else {
      return res.status(404).json({ error: 'invalid url' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json('Server error');
  }
});





app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
