const cloudinary = require('./cloudinary.cjs');

const uploadToCloudinary = async (file, folder) => {
  const { createReadStream } = await file;
  const stream = createReadStream();

  return new Promise((resolve, reject) => {
    const cloudinaryStream = cloudinary.uploader.upload_stream(
      {
        folder, 
        resource_type: 'auto',
      },
      (error, result) => {
        if (error) reject(error);
        resolve(result.secure_url); 
      }
    );

    stream.pipe(cloudinaryStream);
  });
};
module.exports = { uploadToCloudinary };