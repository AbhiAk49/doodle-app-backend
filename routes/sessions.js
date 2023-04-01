const express = require('express');
const {
  createSession,
  getActiveSessions,
  getAllSessions,
  deleteSession,
  getInactiveSessions,
} = require('../controllers/sessions');

const authenticate = require('../middleware/auth');

const router = express.Router();

router.post('/new', authenticate, createSession);
router.get('/user', authenticate, getActiveSessions);
router.get('/inactive', authenticate, getInactiveSessions);
router.get('/all', authenticate, getAllSessions);
router.delete('/delete', authenticate, deleteSession);
module.exports = router;
