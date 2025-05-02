import React from "react";
import ImageUploading from "react-images-uploading";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageUploadIcon from "./Icons/ImageUploadIcon";
import { BaseUrl } from "../services/BaseUrls"; 

const ImageUploader = ({
  error,
  uploading,
  removeAllImages,
  removeImageById,
  setImages,
  images,
  multiple,
  onchange,
}) => {
  const onChange = (imageList, addUpdateIndex) => {
    onchange(imageList);
  };

  const removeAll = () => {
    setImages([]);
    removeAllImages();
  };

  const removeSingleImage = (index) => {
    const newImagesArray = images.filter((_, imgIndex) => imgIndex !== index);
    setImages(newImagesArray);
    removeImageById(index);
  };

  return (
    <ImageUploading
      multiple={multiple}
      value={images || []}
      onChange={onChange}
      maxNumber={7}
      dataURLKey="data_url">
      {({ imageList, onImageUpload, onImageUpdate, isDragging, dragProps }) => (
        <div className="upload__image-wrapper">
          <div
            style={{
              backgroundColor: "#efefef",
              border: "1px solid #dbdbdb",
              padding: "10px",
              borderRadius: "10px",
            }}
            className="d-flex align-items-center justify-content-between">
            <div
              title="Click here to upload image"
              className=""
              onClick={onImageUpload}
              style={{ cursor: "pointer" }}>
              <ImageUploadIcon />
            </div>
            &nbsp;
            {images?.length > 0 && multiple && (
              <button
                className="default-btn"
                style={{ height: "30px" }}
                type="button"
                onClick={removeAll}>
                Remove All
              </button>
            )}
          </div>

          {/* Conditionally render images or loading indicator */}
          {uploading ? (
            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <p>Uploading...</p>
            </div>
          ) : (
            images?.length > 0 && (
              <>
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="mt-2"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "3px",
                      justifyContent: "space-between",
                    }}>
                    <img
                      src={BaseUrl + image}
                      alt=""
                      style={{
                        width: "120px",
                        height: "130px",
                        objectFit: "cover", // Ensures the image covers the area without stretching
                      }}
                    />

                    <div className="image-item__btn-wrapper">
                      <button
                        type="button"
                        className=""
                        onClick={() => removeSingleImage(index)}>
                        <FontAwesomeIcon
                          icon={faTimes}
                          style={{ color: "red" }}
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )
          )}
        </div>
      )}
    </ImageUploading>
  );
};

export default ImageUploader;
