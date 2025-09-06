import { deleteFile } from "@/hooks/delete-uploadthing";
import { ProductImage } from "@prisma/client";
import { useState, useRef, ChangeEvent } from "react";

interface ImageFile {
  id: string;
  file: File;
  preview: string;
  name: string;
}

interface UploadedImgInfo {
  deletedImages: ProductImage[];
  uploadedImages: ProductImage[];
}

const ImageUploader = ({
  images,
  setImages,
  uploadedImgInfo,
  setUploadedImgInfo,
}: {
  images: ImageFile[];
  setImages: (img: ImageFile[]) => void;
  uploadedImgInfo: UploadedImgInfo;
  setUploadedImgInfo: (img: UploadedImgInfo) => void;
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { deletedImages, uploadedImages } = uploadedImgInfo;

  // Validate and process uploaded images
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const newErrors: Record<string, string> = {};
    const newImages: ImageFile[] = [];

    Array.from(files).forEach((file, index) => {
      if (!file.type.startsWith("image/")) {
        newErrors[file.name] = "Not a valid image file";
        return;
      }

      if (file.size > 3 * 1024 * 1024) {
        newErrors[file.name] = "File size exceeds 3MB limit";
        return;
      }

      const imageUrl = URL.createObjectURL(file);
      newImages.push({
        id: `${Date.now()}-${index}`,
        file,
        preview: imageUrl,
        name: file.name,
      });
    });

    if (images.length + uploadedImages.length + newImages.length > 3) {
      setErrors({ ...errors, general: "Maximum 3 images allowed" });
      return;
    }

    setImages([...images, ...newImages]);
    setErrors(newErrors);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Remove a new file image
  const removeImage = (index: number) => {
    const newImages = [...images];
    URL.revokeObjectURL(newImages[index].preview);
    newImages.splice(index, 1);
    setImages(newImages);

    if (errors.general) {
      const newErrors = { ...errors };
      delete newErrors.general;
      setErrors(newErrors);
    }
  };

  // Remove an existing image URL
  const removeImageUrl = async (index: number) => {
    const updatedUrls = [...uploadedImages];
    const removedUrl = updatedUrls.splice(index, 1);

    if (removedUrl[0].key) {
      const deleted = await deleteFile(removedUrl[0].key);

      if (!deleted.success) {
        throw new Error("Failed to delete file.");
      } else {
        setUploadedImgInfo({
          deletedImages: [...deletedImages, ...removedUrl],
          uploadedImages: updatedUrls,
        });
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
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
        <p className="text-lg font-medium text-gray-700">
          Click to upload images
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Supports JPG, PNG, GIF up to 4MB each. Maximum 3 images.
        </p>
      </div>

      {/* Image preview grid */}
      {(images.length > 0 || uploadedImages.length > 0) && (
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Uploaded Images ({images.length + uploadedImages.length}/3)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {/* Existing image URLs */}
            {uploadedImages.map((img, index) => (
              <div
                key={`url-${index}`}
                className="relative group rounded-lg overflow-hidden border border-gray-200"
              >
                <img
                  src={img.url}
                  alt={`Uploaded ${index + 1}`}
                  className="w-full h-40 object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImageUrl(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ✕
                </button>
                {index === 0 && (
                  <div className="absolute top-2 left-2 bg-purple-500 text-white text-xs px-2 py-1 rounded-md">
                    Main Image
                  </div>
                )}
              </div>
            ))}

            {/* New file previews */}
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
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ✕
                </button>
                {index === 0 && uploadedImages.length === 0 && (
                  <div className="absolute top-2 left-2 bg-purple-500 text-white text-xs px-2 py-1 rounded-md">
                    Main Image
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
