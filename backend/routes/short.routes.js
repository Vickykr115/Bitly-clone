// routes/short.routes.js
const express = require('express');
const router = express.Router();
const svc = require('../controller/shortLinkService');

router.post('/', svc.createShort);
router.get('/', svc.listShorts);
router.get('/:code', svc.getShort);
router.delete('/:code', svc.removeShort);

module.exports = router;
