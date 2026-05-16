
        const Jimp = require('jimp');
        Jimp.read('C:\\Users\\joelt\\Downloads\\drive-download-20260516T121036Z-3-001\\DSC03835-HDR.jpg').then(image => {
          return image
            .resize(2000, Jimp.AUTO)
            .quality(80)
            .write('C:\\Users\\joelt\\.gemini\\antigravity\\brain\\1bd43688-6b47-4701-a211-ce7dc4c42e43\\scratch\\temp_resized\\DSC03835-HDR.jpg');
        }).catch(err => {
          console.error(err);
          process.exit(1);
        });
      