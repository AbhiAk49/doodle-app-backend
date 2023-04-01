const express = require('express');
const {
  createDoodle,
  getDoodles,
  deleteDoodle,
} = require('../controllers/doodles');

const authenticate = require('../middleware/auth');

const router = express.Router();

router.post('/save', authenticate, createDoodle);
router.get('/user', authenticate, getDoodles);
router.delete('/delete', authenticate, deleteDoodle);

module.exports = router;
