export const SOCIAL_NETWORK_IMAGE_SIZES = {
  facebook: {
    width: 1200,
    height: 628
  },
  instagram: {
    width: 1080,
    height: 1080
  },
  twitter: {
    width: 900,
    height: 450
  },
  youtube: {
    width: 1280,
    height: 760
  }
  // pinterest: {
  //   width: 222,
  //   height: 150
  // }
}

export const ALLOWED_IMAGE_FORMATS = [".png", ".jpg", ".jpeg", ".webp"]
export const SIZES_ALLOWED = [
  { value: "0M", label: "0M" },
  { value: "3M", label: "3M" },
  { value: "6M", label: "6M" },
  { value: "9M", label: "9M" },
  { value: "12M", label: "12M" },
  { value: "18M", label: "18M" },
  { value: "24M", label: "24M" },
  { value: "T2", label: "T2" }
]

export const IMAGE_COLORS = {
  background: "#00add2",
  title: "#00add2",
  description: "#00add2",
  brand: "#f1780f"
}

export const CLOUDINARY_SETTINGS = {
  CLOUDINARY_PRESET: process.env.NEXT_PUBLIC_CLOUDINARY_PRESET,
  CLOUDINARY_API_KEY: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  CLOUDINARY_FOLDER: process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER,
  CLOUDINARY_UPLOAD_URL: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL,
  CLOUDINARY_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
}
