export const compressAndConvertToBase64 = (
  file: File,
  quality: number = 0.6, // 0.6 means 60% quality
  maxWidth: number = 800, // max width in px
  maxHeight: number = 800 // max height in px
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        // Calculate new size while keeping aspect ratio
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        // Create canvas with new size
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Could not get canvas context"));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Compress and get base64 from canvas
        const compressedBase64 = canvas.toDataURL("image/jpeg", quality);
        resolve(compressedBase64);
      };

      img.onerror = (error) => reject(error);
    };

    reader.onerror = (error) => reject(error);
  });
};
