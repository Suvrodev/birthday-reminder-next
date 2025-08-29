export const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "br_preset"); // Cloudinary preset নাম (Unsigned হলে)

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/dixfkupof/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();
  return data.secure_url; // uploaded image link
};
