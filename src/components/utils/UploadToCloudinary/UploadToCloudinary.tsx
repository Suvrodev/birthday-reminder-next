// export const uploadToCloudinary = async (file: File): Promise<string> => {
//   const formData = new FormData();
//   formData.append("file", file);
//   formData.append("upload_preset", "birthday_reminder_preset"); // Cloudinary preset নাম (Unsigned হলে)

//   const res = await fetch(
//     `https://api.cloudinary.com/v1_1/dqu7fo3ky/image/upload`,
//     {
//       method: "POST",
//       body: formData,
//     }
//   );

//   const data = await res.json();
//   return data.secure_url; // uploaded image link
// };

export const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "birthday_reminder_preset"); // তোমার unsigned preset

  // Upload to Cloudinary
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/dqu7fo3ky/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) {
    throw new Error("Cloudinary upload failed");
  }

  const data = await res.json();
  const originalUrl: string = data.secure_url;

  // optimized URL বানানো
  const optimizedUrl = originalUrl.replace(
    "/upload/",
    "/upload/w_400,h_400,c_fill,q_auto,f_auto/"
  );

  return optimizedUrl;
};
