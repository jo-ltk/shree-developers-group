import { v2 as cloudinary } from 'cloudinary';
import path from 'path';

cloudinary.config({
  cloud_name: 'dduy8wigb',
  api_key: '299486484696424',
  api_secret: '6Z0c46j747TATRdbxD6ScBDJVY8',
  secure: true
});

const videoPath = "C:\\Users\\joelt\\Downloads\\Comp 1_5.mp4";

async function uploadVideo() {
  try {
    console.log('Uploading video to Cloudinary...');
    const result = await cloudinary.uploader.upload(videoPath, {
      resource_type: 'video',
      folder: 'hero_videos',
      public_id: 'hero_bg'
    });
    console.log('Upload successful!');
    console.log('URL:', result.secure_url);
    console.log('Public ID:', result.public_id);
  } catch (error) {
    console.error('Upload failed:', error);
  }
}

uploadVideo();
