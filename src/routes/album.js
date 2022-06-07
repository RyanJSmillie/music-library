const express = require('express');
const albumController = require('../controllers/album');

const router = express.Router();

router.post('/', albumController.create);
router.post('/artist/:artistId/album', albumController.create);

module.exports = router;