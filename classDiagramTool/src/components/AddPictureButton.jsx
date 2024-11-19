import React, { useState } from "react";
import "./AddPictureButton.css";

const AddPictureButton = () => {
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Set image source once the file is loaded
      };
      reader.readAsDataURL(file); // Read the file as data URL
    }
  };

  return (
    <div className="add-picture-container">
      <h3>Add a Picture</h3>

      {/* Upload Button */}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="upload-btn"
      />

      {/* Display Image */}
      {image && (
        <div className="image-container">
          <img src={image} alt="Uploaded Preview" className="image-preview" />
        </div>
      )}
    </div>
  );
};

export default AddPictureButton;
