import { useEffect, useState } from "react";
import { supabase } from "../superbase.config";

const useUploadImage = () => {
  const [image, setImage] = useState(null);
  const [uploadError, setUploadError] = useState("");
  const [isImgUploading, setIsImgUploading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");

  useEffect(() => {
    if (!isImgUploading || !image) return;

    const uploadImage = async () => {
      const imageFileName = Date.now() + "_" + image?.name;
      const { data, error } = await supabase.storage
        .from("Images")
        .upload(imageFileName, image, {
          cacheControl: "3600",
          upsert: true,
        });

      if (error) {
        setIsImgUploading(false);
        setUploadError(error.message);
      }

      const { data: result, error: error1 } = await supabase.storage
        .from(`Images`)
        .getPublicUrl(data.path);

      if (error1) {
        setIsImgUploading(false);
        setUploadError(error1.message);
      }

      if (!result?.publicUrl) {
        uploadError("Failed to upload image");
      }

      setDownloadUrl(result.publicUrl);
      setIsImgUploading(false);
    };

    uploadImage();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isImgUploading, image]);

  return {
    image,
    setImage,
    uploadError,
    isImgUploading,
    setIsImgUploading,
    setDownloadUrl,
    setUploadError,
    downloadUrl,
  };
};

export default useUploadImage;
