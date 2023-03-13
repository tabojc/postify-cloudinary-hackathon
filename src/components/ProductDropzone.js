import { ALLOWED_IMAGE_FORMATS, SOCIAL_NETWORK_IMAGE_SIZES } from "@/constants"
import { CloudinaryContext } from "@/context/cloudinary"
import { ToolboxContext } from "@/context/toolbox"
import { uploadImage } from "@/utils/cloudinary"
import { socialNetworkIcons } from "@/utils/toolbox"
import Image from "next/image"
import { useCallback, useContext } from "react"
import { useDropzone } from "react-dropzone"

export default function ProductDropzone() {
  const { image, setImage } = useContext(CloudinaryContext)
  const { options } = useContext(ToolboxContext)
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/png": ALLOWED_IMAGE_FORMATS },
    maxFiles: 1,
    onDrop: useCallback(
      acceptedFiles => {
        uploadImage(acceptedFiles[0]).then(response => {
          const { public_id: publicId, secure_url: url } = response
          const filename = url.split("/").pop().split(".")[0]
          setImage(prev => ({
            ...prev,
            ...{ publicId, url, filename, originalUrl: url }
          }))
        })
      },
      [setImage]
    )
  })
  const fileName = `${options.target}_${image.filename}.png`

  const removeFile = () => setImage({})

  const downloadHandler = async () => {
    try {
      const result = await fetch(image.url)
      const blob = await result.blob()
      const url = URL.createObjectURL(blob)

      const element = document.createElement("a")
      element.setAttribute("href", url)
      element.setAttribute("download", fileName)
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error(error)
    }
  }

  if (image.url) {
    return (
      <div
        className={`flex flex-col gap-y-2 group w-full ${
          image.processed ? "h-auto" : "h-full"
        }`}
      >
        <button
          className="group-hover:block hidden absolute px-2 text-xl text-blue-500 font-bold border rounded bg-gray-100 transition-all ease-in duration-75 hover:scale-110"
          onClick={removeFile}
          title="Remove file"
        >
          x
        </button>
        <aside className="flex min-h-full border aspect-video justify-center">
          <Image
            src={image.url}
            width={800}
            height={600}
            alt="Image product"
            className="aspect-square w-full h-full"
          />
        </aside>
        {image.processed && (
          <div className="flex">
            <span className="w-full flex items-center gap-x-2">
              <span className="flex">
                {socialNetworkIcons[options.target]}[
                {SOCIAL_NETWORK_IMAGE_SIZES[options.target].width}x
                {SOCIAL_NETWORK_IMAGE_SIZES[options.target].height}]
              </span>
              <span>{fileName}</span>
            </span>
            <button
              onClick={downloadHandler}
              className="w-32 py-2 border rounded-md text-blue-600 bg-white border-blue-600 hover:text-white hover:bg-blue-600 hover:border-white focus:outline-none focus:ring-white transition-all ease-in duration-75"
            >
              Download
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      <div
        className="w-full h-full bg-white border border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-blue-500 flex items-center justify-center"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <span className="w-full h-full flex items-center justify-center text-2xl">
            Drop the file here
          </span>
        ) : (
          <span className="w-full h-full flex flex-col items-center justify-center text-2xl">
            Drag and drop your product photo here, or click to select file
          </span>
        )}
      </div>
    </>
  )
}
