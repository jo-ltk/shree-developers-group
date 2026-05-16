const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadVideo = async () => {
  try {
    const result = await cloudinary.uploader.upload('C:\\Users\\joelt\\Downloads\\WEB_4.mp4', {
      resource_type: 'video',
      folder: 'hero_videos',
      public_id: `hero_mobile_${Date.now()}`
    });
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Error uploading video:', error);
  }
};

uploadVideo();
