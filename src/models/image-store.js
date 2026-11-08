import * as cloudinary from "cloudinary";
import { writeFileSync } from "fs";
import dotenv from "dotenv";

dotenv.config();

const credentials = {
  cloud_name: process.env.cloudinary_name,
  api_key: process.env.cloudinary_key,
  api_secret: process.env.cloudinary_secret,
};


cloudinary.config(credentials);

export const imageStore = {
    getAllImages: async function () {
        const result = await cloudinary.v2.api.resources();
        return result.resources;
    },

    uploadImage: async function (imagefile) {
        writeFileSync("./public/vinyl.jpg", imagefile);
        const response = await cloudinary.v2.uploader.upload("./public/vinyl.jpg");

        const imageurl = cloudinary.v2.url(response.public_id, {
            secure: true,
            transformation: [
                {
                    width: 500,
                    height: 500,
                    crop: "fill",
                    gravity: "auto",
                    quality: "auto",
                    fetch_format: "auto",
                }
            ],
        });
        return imageurl;
    },

    deleteImage: async function (image) {
        await cloudinary.v2.uploader.destroy(image, {});
    },
};