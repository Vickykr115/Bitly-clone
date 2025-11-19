// controllers/shortLinkService.js
const ShortUrl = require('../models/shortUrl');
const validUrl = require('valid-url');

// ensure custom codes meet rules
function validateCustomCode(code) {
    return /^[A-Za-z0-9]{6,8}$/.test(code);
}

// POST /api/short
exports.createShort = async (req, res, next) => {
    try {
        const { target, code } = req.body;

        if (!target) return res.status(400).json({ message: 'target required' });
        if (!validUrl.isWebUri(target)) return res.status(400).json({ message: 'invalid url' });

        const cleaned = code ? String(code).trim() : null;

        if (cleaned) {
            if (!validateCustomCode(cleaned)) {
                return res.status(400).json({
                    message: 'code invalid. must match [A-Za-z0-9]{6,8}'
                });
            }
            const already = await ShortUrl.findOne({ code: cleaned });
            if (already) return res.status(409).json({ message: 'code already exists' });
        }

        // random code generator (6 chars)
        const makeCode = () => {
            const pool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let out = '';
            for (let i = 0; i < 6; i++) {
                out += pool[Math.floor(Math.random() * pool.length)];
            }
            return out;
        };

        let chosen = cleaned || makeCode();
        // ensure unique when auto-generated (tries up to small number)
        let attempts = 0;
        while (await ShortUrl.findOne({ code: chosen })) {
            chosen = makeCode();
            attempts++;
            if (attempts > 5) break;
        }

        const doc = new ShortUrl({ code: chosen, target });
        await doc.save();

        return res.status(201).json({
            code: doc.code,
            target: doc.target,
            totalClicks: doc.totalClicks,
            createdAt: doc.createdAt
        });
    } catch (err) {
        next(err);
    }
};

// GET /api/short
exports.listShorts = async (req, res, next) => {
    try {
        const docs = await ShortUrl.find().sort({ createdAt: -1 });
        const out = docs.map(d => ({
            code: d.code,
            target: d.target,
            totalClicks: d.totalClicks,
            lastClickedAt: d.lastClickedAt,
            createdAt: d.createdAt
        }));
        return res.json(out);
    } catch (err) {
        next(err);
    }
};

// GET /api/short/:code
exports.getShort = async (req, res, next) => {
    try {
        const { code } = req.params;
        const doc = await ShortUrl.findOne({ code });
        if (!doc) return res.status(404).json({ message: 'Not found' });
        return res.json({
            code: doc.code,
            target: doc.target,
            totalClicks: doc.totalClicks,
            lastClickedAt: doc.lastClickedAt,
            createdAt: doc.createdAt
        });
    } catch (err) {
        next(err);
    }
};

// DELETE /api/short/:code
exports.removeShort = async (req, res, next) => {
    try {
        const { code } = req.params;
        const doc = await ShortUrl.findOneAndDelete({ code });
        if (!doc) return res.status(404).json({ message: 'Not found' });
        return res.json({ message: 'deleted' });
    } catch (err) {
        next(err);
    }
};
