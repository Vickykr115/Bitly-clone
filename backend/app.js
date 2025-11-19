require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const linksRouter = require('./routes/short.routes.js');
const errorHandler = require('./middleware/exceptionCatcher.js');


const app = express();


app.use(express.json());
app.use(morgan('dev'));
app.use(cors());


// Healthcheck (must return 200)
app.get('/healthz', (req, res) => {
    return res.json({ ok: true, version: '1.0' });
});


// API
app.use('/api/links', linksRouter);


// Redirect route (/:code) - perform 302 if exists
const Link = require('./models/shortUrl.js');
app.get('/:code', async (req, res, next) => {
    try {
        const { code } = req.params;
        const link = await Link.findOne({ code });
        if (!link) return res.status(404).json({ message: 'Not found' });


        // increment click count and update lastClicked
        link.totalClicks += 1;
        link.lastClickedAt = new Date();
        await link.save();


        return res.redirect(302, link.target);
    } catch (err) {
        next(err);
    }
});


// Fallback 404 for other undefined API/paths
app.use((req, res, next) => {
    res.status(404).json({ message: 'Not found' });
});


app.use(errorHandler);


module.exports = app;