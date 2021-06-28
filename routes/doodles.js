const express = require( 'express' );
const { createDoodle,getDoodles } = require( '../controllers/doodles' );

const authenticate  = require( '../middleware/auth' );

const router = express.Router();

router.post( '/save', authenticate, createDoodle );
router.get( '/user', authenticate, getDoodles );

module.exports = router;