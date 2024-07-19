import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Load environment variables from .env file
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    // Upload the file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // File uploaded successfully
    console.log("File uploaded to Cloudinary: ", response.url);
    // Delete the local file after successful upload
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    // Log the error details
    console.error("Cloudinary upload error:", error);
    // Delete the local file in case of failure
    fs.unlinkSync(localFilePath);
    return null;
  }
};

export { uploadOnCloudinary };
