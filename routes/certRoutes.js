const express = require('express');
const { addCert, verify } = require('../controllers/certController');
const router = express.Router();

router.post('/addCert', addCert);
router.get('/verify/:id', verify);

module.exports = router;