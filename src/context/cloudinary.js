import { Cloudinary } from "@cloudinary/url-gen"
import { createContext, useState } from "react"

export const CloudinaryContext = createContext()

export function CloudinaryProvider({ children }) {
  const [cldClient, setCldClient] = useState(
    new Cloudinary({
      cloud: { cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME }
    })
  )
  const [image, setImage] = useState({
    originalUrl: null,
    url: null,
    publicId: null
  })

  return (
    <CloudinaryContext.Provider
      value={{ image, setImage, cldClient, setCldClient }}
    >
      {children}
    </CloudinaryContext.Provider>
  )
}
