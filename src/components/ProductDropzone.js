import { useCallback, useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"

export default function ProductDropzone() {
  const [file, setFile] = useState({})
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/png": [".png", ".jpg", ".jpeg", ".webp"]
    },
    maxFiles: 1,
    onDrop: useCallback(acceptedFiles => {
      console.log("acceptedFiles", acceptedFiles)
      setFile(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )[0]
      )
    }, [])
  })

  const removeFile = () => setFile({})

  useEffect(() => {
    return () => URL.revokeObjectURL(file?.preview)
  }, [file])

  return (
    <>
      {file?.preview ? (
        <aside className="flex min-w-0 border aspect-video">
          <button
            className="absolute px-2 text-xl text-red-600 font-bold border rounded-full bg-gray-100 transition-all ease-in duration-75 hover:scale-110"
            onClick={removeFile}
            title="Remove file"
          >
            x
          </button>
          <img
            src={file.preview}
            width={800}
            height={600}
            onLoad={() => {
              URL.revokeObjectURL(file.preview)
            }}
          />
        </aside>
      ) : (
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
      )}
    </>
  )
}
