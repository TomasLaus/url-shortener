require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const validUrl = require('valid-url');
const Url = require('./urlSchema'); // Adjust the path as necessary
const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from 'public' directory
app.use(express.static('public'));

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


// POST route to create a short URL
app.post('/api/shorturl', async (req, res) => {
    const originalUrl = req.body.url; // Use 'url' to match the form's input name
    const baseUrl = `${req.protocol}://${req.get('host')}/api/shorturl`;

    // Validate URL
    if (!validUrl.isWebUri(originalUrl)) {
        return res.status(400).json({ error: 'invalid url' });
    }

    try {
        // Check if URL already exists
        let url = await Url.findOne({ originalUrl });
        if (!url) {
            url = new Url({ originalUrl });
            await url.save();
        }
        res.json({ original_url: url.originalUrl, short_url: url.shortUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json('Server error');
    }
});

// GET route for redirecting to the original URL
app.get('/api/shorturl/:shortUrl', async (req, res) => {
    try {
        const url = await Url.findOne({ shortUrl: req.params.shortUrl });
        if (url) {
            return res.redirect(url.originalUrl);
        } else {
            return res.status(404).json('No URL found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json('Server error');
    }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
