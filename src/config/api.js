export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const IMAGE_HOSTING_KEY = import.meta.env.VITE_IMAGE_HOSTING_KEY || "";

export const IMAGE_HOSTING_API = IMAGE_HOSTING_KEY
  ? `https://api.imgbb.com/1/upload?key=${IMAGE_HOSTING_KEY}`
  : "";
