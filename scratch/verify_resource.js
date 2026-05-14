const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dduy8wigb',
  api_key: '299486484696424',
  api_secret: '6Z0c46j747TATRdbxD6ScBDJVY8',
  secure: true
});

cloudinary.api.resource('hero_videos/hero_bg', { resource_type: 'video' }, function(error, result) {
  if (error) {
    console.error('Error fetching resource:', error);
  } else {
    console.log('Resource found:', result.secure_url);
    console.log('Resource type:', result.resource_type);
  }
});
