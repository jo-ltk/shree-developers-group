const cloudinary = require('cloudinary').v2;
const path = require('path');

cloudinary.config({
  cloud_name: 'dduy8wigb',
  api_key: '299486484696424',
  api_secret: '6Z0c46j747TATRdbxD6ScBDJVY8'
});

const videoPath = path.join(__dirname, '..', 'public', 'videos', 'hero-mobile.mp4');

console.log('Uploading video to Cloudinary...');

cloudinary.uploader.upload(videoPath, {
  resource_type: 'video',
  folder: 'hero_videos',
  public_id: 'hero_mobile_' + Date.now()
})
.then(result => {
  console.log('Upload successful!');
  console.log('URL:', result.secure_url);
})
.catch(error => {
  console.error('Upload failed:', error);
});
