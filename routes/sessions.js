const express = require( 'express' );
const { createSession,getSessions,getAllSessions,deleteSession} = require( '../controllers/sessions' );

const authenticate  = require( '../middleware/auth' );

const router = express.Router();

router.post( '/new', authenticate, createSession );
router.get( '/user', authenticate, getSessions );
router.get( '/all', authenticate, getAllSessions );
router.delete('/delete',authenticate, deleteSession);
module.exports = router;