import React, { useState, useRef, ChangeEvent } from "react";
interface ImageFile {
  id: string;
  file: File;
  preview: string;
  name: string;
}

const ImageUploader = ({
  images,
  setImages,
}: {
  images: ImageFile[];
  setImages: (img: ImageFile[]) => void;
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Validate and process uploaded images
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const newErrors: Record<string, string> = {};
    const newImages: ImageFile[] = [];

    Array.from(files).forEach((file, index) => {
      // Check file type
      if (!file.type.startsWith("image/")) {
        newErrors[file.name] = "Not a valid image file";
        return;
      }

      // Check file size (4MB limit)
      if (file.size > 4 * 1024 * 1024) {
        newErrors[file.name] = "File size exceeds 4MB limit";
        return;
      }

      // Create a preview URL for the image
      const imageUrl = URL.createObjectURL(file);
      newImages.push({
        id: `${Date.now()}-${index}`,
        file,
        preview: imageUrl,
        name: file.name,
      });
    });

    // Check if adding these images would exceed the 5 image limit
    if (images.length + newImages.length > 5) {
      setErrors({ ...errors, general: "Maximum 5 images allowed" });
      return;
    }

    setImages([...images, ...newImages]);
    setErrors(newErrors);

    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Remove an image
  const removeImage = (index: number) => {
    const newImages = [...images];
    URL.revokeObjectURL(newImages[index].preview); // Clean up memory
    newImages.splice(index, 1);
    setImages(newImages);

    // Clear any general errors when removing images
    if (errors.general) {
      const newErrors = { ...errors };
      delete newErrors.general;
      setErrors(newErrors);
    }
  };

  // Trigger file input click
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Product Images</h2>

      {/* Upload area */}
      <div
        className="border-2 border-dashed border-purple-400 rounded-lg p-8 text-center mb-6 cursor-pointer hover:bg-purple-50 transition-colors"
        onClick={triggerFileInput}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          className="hidden"
          multiple
          accept="image/*"
        />
        <svg
          className="h-12 w-12 text-purple-500 mx-auto mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        <p className="text-lg font-medium text-gray-700">
          Click to upload images
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Supports JPG, PNG, GIF up to 4MB each. Maximum 5 images.
        </p>
      </div>

      {/* Error messages */}
      {errors.general && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6 flex items-center">
          <svg
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {errors.general}
        </div>
      )}

      {/* Image preview grid */}
      {images.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Uploaded Images ({images.length}/5)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div
                key={image.id}
                className="relative group rounded-lg overflow-hidden border border-gray-200"
              >
                <img
                  src={image.preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-40 object-cover"
                />

                {/* Image info */}
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-2 text-xs">
                  <div className="truncate">{image.name}</div>
                  <div className="flex justify-between items-center mt-1">
                    <span>{(image.file.size / 1024 / 1024).toFixed(2)} MB</span>
                    <svg
                      className="h-3 w-3 text-green-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Remove button */}
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                {/* First image badge */}
                {index === 0 && (
                  <div className="absolute top-2 left-2 bg-purple-500 text-white text-xs px-2 py-1 rounded-md">
                    Main Image
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-800 mb-2">Image Guidelines</h4>
        <ul className="text-sm text-blue-600 list-disc pl-5 space-y-1">
          <li>First image will be used as the main product image</li>
          <li>Each image must be less than 4MB in size</li>
          <li>You can upload up to 5 images total</li>
          <li>Supported formats: JPG, PNG, GIF, WebP</li>
        </ul>
      </div>

      {/* Individual file error messages */}
      {Object.keys(errors).map((fileName) => {
        if (fileName !== "general") {
          return (
            <div
              key={fileName}
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-md mt-2 flex items-center text-sm"
            >
              <svg
                className="h-4 w-4 mr-2 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="truncate">
                <strong>{fileName}</strong>: {errors[fileName]}
              </span>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default ImageUploader;
