const supportedImageTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const maxImageSize = 5 * 1024 * 1024;

const readFileAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Could not read the selected image"));
    reader.readAsDataURL(file);
  });

export const uploadMenuImage = async (axiosSecure, file) => {
  if (!file) {
    throw new Error("Please choose an image before submitting.");
  }

  if (!supportedImageTypes.includes(file.type)) {
    throw new Error("Please upload a JPG, PNG, WEBP, or GIF image.");
  }

  if (file.size > maxImageSize) {
    throw new Error("Image size must be under 5MB.");
  }

  const image = await readFileAsDataUrl(file);
  const res = await axiosSecure.post("/menu-images", {
    image,
    fileName: file.name,
  });

  if (!res.data.imageUrl) {
    throw new Error("Image upload did not return a usable URL.");
  }

  return res.data.imageUrl;
};
