import { cloudinary } from "@/lib/cloudinary";

type CloudinaryResourceType = "image" | "raw";

export const deleteCloudinaryImage = async (publicId: string, fileType: CloudinaryResourceType): Promise<boolean> => {
  try {
    if (!publicId) return false;

    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: fileType,
    });

    if (result.result !== "ok" && result.result !== "not found") {
      console.error("Cloudinary delete failed:", result);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    return false;
  }
};
