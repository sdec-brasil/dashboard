import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import uuid from 'uuid/v4';


const bcrypt = require('bcrypt');

export const hashPassword = (password, salt) => bcrypt.hashSync(password, salt);
export const comparePassword = (password, hash) => bcrypt.compareSync(password, hash);
export const generateSalt = () => bcrypt.genSaltSync(5);
/** Private certificate used for signing JSON WebTokens */
const privateKey = fs.readFileSync(path.join(__dirname, '../../../certs/privatekey.pem'));

/** Public certificate used for verification.  Note: you could also use the private key */
const publicKey = fs.readFileSync(path.join(__dirname, '../../../certs/certificate.pem'));

export const uid = {
  generate: () => uuid(),
};

/**
 * Creates a signed JSON WebToken and returns it.  Utilizes the private certificate to create
 * the signed JWT.  For more options and other things you can change this to, please see:
 * https://github.com/auth0/node-jsonwebtoken
 *
 * @param  {Number} exp - The number of seconds for this token to expire.  By default it will be 60
 *                        minutes (3600 seconds) if nothing is passed in.
 * @param  {String} sub - The subject or identity of the token.
 * @return {String} The JWT Token
 */
export const createToken = ({ exp = 3600, sub = '' } = {}) => {
  const id = uid.generate();
  const token = jwt.sign({
    jti: id,
    sub,
    exp: Math.floor(Date.now() / 1000) + exp,
  }, privateKey, {
    algorithm: 'RS256',
  });


  return token;
};

/**
 * Verifies the token through the jwt library using the public certificate.
 * @param   {String} token - The token to verify
 * @throws  {Error} Error if the token could not be verified
 * @returns {Object} The token decoded and verified
 */
export const verifyToken = token => jwt.verify(token, publicKey);

export const crypto = {
  createToken,
  verifyToken,
  hashPassword,
  comparePassword,
  generateSalt,
};
