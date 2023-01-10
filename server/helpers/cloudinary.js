const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
 
    api_secret: process.env.API_SECRET,
  });
module.exports = cloudinary;