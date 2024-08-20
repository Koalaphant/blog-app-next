"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { uploadImage } from "@/lib/uploadImage"; // Adjust the path as necessary

export default function ImageUploadForm() {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(
    null
  );
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setImage(file);

      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (image) {
      const imagePath = await uploadImage(image, "featured_images");
      if (imagePath) {
        console.log("Image uploaded successfully:", imagePath);
        setSuccess("Image uploaded successfully.");
        setError("");
      } else {
        setError("Failed to upload image.");
      }
    } else {
      setError("No image selected.");
    }
  };

  return (
    <div className="min-w-full space-y-4 px-8">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="image">Upload Image:</label>
          <input
            id="image"
            type="file"
            accept="image/*"
            className="border p-2 w-full mb-4"
            onChange={handleImageChange}
          />
          {imagePreview && (
            <div className="w-full mt-4">
              <img
                src={imagePreview as string}
                alt="Preview"
                className="w-40 h-40 object-cover border"
              />
            </div>
          )}
        </div>
        <button
          type="submit"
          className="bg-red-800 text-white py-2 px-8 rounded-lg mt-5"
        >
          Upload
        </button>
      </form>
      {error && (
        <p className="mt-4 border border-red-800 p-2 text-red-800">{error}</p>
      )}
      {success && (
        <p className="mt-4 border border-green-800 p-2 text-green-800">
          {success}
        </p>
      )}
    </div>
  );
}
