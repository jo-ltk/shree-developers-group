const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dduy8wigb',
  api_key: '299486484696424',
  api_secret: '6Z0c46j747TATRdbxD6ScBDJVY8',
  secure: true
});

const videoPath = "C:\\Users\\joelt\\Downloads\\Comp 1_5.mp4";

console.log('Uploading video to Cloudinary (using upload_large)...');

cloudinary.uploader.upload_large(videoPath, {
  resource_type: 'video',
  folder: 'hero_videos',
  public_id: 'hero_bg',
  chunk_size: 6000000
}, function(error, result) {
  if (error) {
    console.error('Upload failed:', error);
  } else {
    console.log('Upload successful!');
    console.log('URL:', result.secure_url);
  }
});
