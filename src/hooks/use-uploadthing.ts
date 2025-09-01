// hooks/useUploadThing.ts
"use client";

import { useState, useCallback } from "react";
import { toast } from "sonner";
import { genUploader } from "uploadthing/client";

export function useUploadThing() {
  const [uploading, setUploading] = useState(false);

  const uploadFile = useCallback(async (file: File) => {
    setUploading(true);
    try {
      const uploadFiles = genUploader({
        url: `${process.env.NEXT_PUBLIC_APP_URL}/api/uploadthing`,
        package: "@uploadthing/solid",
      });

      const uploadSession = await uploadFiles.createUpload("imageUploader", {
        files: [file],
      });

      const uploadedFiles = await uploadSession.done();

      if (!uploadedFiles || uploadedFiles.length === 0) {
        throw new Error("Image upload failed. Please try again.");
      }

      return uploadedFiles[0];
    } catch (error) {
      console.error("[useUploadThing]", error);
      toast.error("Image upload failed.");
      throw error;
    } finally {
      setUploading(false);
    }
  }, []);

  return {
    uploadFile,
    uploading,
  };
}
