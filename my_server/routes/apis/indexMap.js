const express = require('express');
const router = express.Router();
const path = require('path');
router.get('/data', (req, res) => {
    res.sendFile(path.join(__dirname, '../../jsonData/map.json'));
});

module.exports = router;
