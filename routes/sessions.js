const express = require( 'express' );
const { createSession,getSessions,getAllSessions} = require( '../controllers/sessions' );

const authenticate  = require( '../middleware/auth' );

const router = express.Router();

router.post( '/', authenticate, createSession );
router.get( '/user', authenticate, getSessions );
router.get( '/all', authenticate, getAllSessions );

module.exports = router;