import { CLOUDINARY_SETTINGS } from "@/constants"
import { Cloudinary } from "@cloudinary/url-gen"
import { createContext, useState } from "react"

export const CloudinaryContext = createContext()

const { CLOUDINARY_CLOUD_NAME } = CLOUDINARY_SETTINGS

export function CloudinaryProvider({ children }) {
  const [cldClient, setCldClient] = useState(
    new Cloudinary({
      cloud: { cloudName: CLOUDINARY_CLOUD_NAME }
    })
  )
  const [image, setImage] = useState({
    filename: null,
    originalUrl: null,
    url: null,
    publicId: null,
    processed: false
  })

  return (
    <CloudinaryContext.Provider
      value={{ image, setImage, cldClient, setCldClient }}
    >
      {children}
    </CloudinaryContext.Provider>
  )
}
