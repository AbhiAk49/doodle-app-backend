const mongoose = require( 'mongoose' );
const Users = mongoose.model('User'); 

const getUserAsynch = async (user) => {
    const founduser = await Users.findOne({
      email: user.email
    });
  
    if (!founduser) {
      throw new NotFoundError(`User NOT_FOUND`);
    } else {
      return founduser;
    }
  };
 
  module.exports = getUserAsynch