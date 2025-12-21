import dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken';

export const createAccessToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  )
}

export const createRefreshToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: '15d' }
  )
}