export const uploadImageToCloudinary = async (file: File) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "diginfo_preset");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/deg2tzvlq/image/upload",
    {
      method: "POST",
      body: data,
    }
  );

  const result = await res.json();
  
  if (!result.secure_url) {
    throw new Error(result.error?.message || "Upload failed");
  }
  
  return result.secure_url;
};