const jwt = require('jsonwebtoken');
require('dotenv').config();

const generarJWT = (uid, email) => {
  return new Promise((resolve, reject) => {
    const payload = {
      uid: uid,
      email: email,
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '12h' },
      (err, token) => {
        if (err) {
          console.log(err);
          reject('No se ha podido generar el TOKEN');
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = { generarJWT };
