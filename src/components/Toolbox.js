import { CloudinaryContext } from "@/context/cloudinary"
import Facebook from "@/icons/facebook"
import Instagram from "@/icons/Instagram"
import Pinterest from "@/icons/Pinterest"
import Twitter from "@/icons/Twitter"
import Youtube from "@/icons/Youtube"
import { applyTransformations } from "@/utils/cloudinary"
import { useContext, useState } from "react"
import Checkbox from "@/components/Checkbox"
import { SIZES_ALLOWED, SOCIAL_NETWORK_IMAGE_SIZES } from "@/constants"
import { ToolboxContext } from "@/context/toolbox"

export default function Toolbox() {
  const {
    image: { publicId, originalUrl },
    setImage,
    cldClient
  } = useContext(CloudinaryContext)
  const { options, setOptions } = useContext(ToolboxContext)
  const [loading, setLoading] = useState(false)

  const socialNetworkIcons = {
    facebook: <Facebook width={24} height={24} />,
    instagram: <Instagram width={24} height={24} />,
    twitter: <Twitter width={24} height={24} />,
    youtube: <Youtube width={24} height={24} />,
    pinterest: <Pinterest width={24} height={24} />
  }

  const generateHandler = () => {
    setLoading(true)
    const newImageUrl = applyTransformations({ cldClient, publicId, options })
    setImage(prev => ({ ...prev, ...{ url: newImageUrl } }))
    setLoading(false)
  }

  const resetHandler = () => {
    setImage(prev => ({ ...prev, ...{ url: originalUrl } }))
  }

  const updateOptions = option => {
    setOptions(prev => ({ ...prev, ...option }))
  }

  return (
    <>
      <button
        onClick={generateHandler}
        disabled={loading}
        className="relative inline-flex items-center justify-center p-0.5 w-full text-lg font-medium text-gray-900 rounded-lg group bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 group-hover:from-green-300 group-hover:via-blue-500 group-hover:to-purple-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-white hover:scale-105"
      >
        {loading ? (
          <span className="relative px-5 py-4 transition-all ease-in duration-75 w-full bg-white rounded-md group-hover:bg-opacity-0 text-blue-800 hover:text-white">
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 mr-3 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
            Loading...
          </span>
        ) : (
          <span className="relative px-5 py-4 transition-all ease-in duration-75 w-full bg-white rounded-md group-hover:bg-opacity-0 text-blue-800 hover:text-white">
            GENERATE
          </span>
        )}
      </button>

      <button
        onClick={resetHandler}
        className="w-full border rounded-md text-red-500 bg-white border-red-500 hover:text-white hover:bg-red-500 hover:border-white focus:outline-none focus:ring-white transition-all ease-in duration-75"
      >
        Reset Image Styles
      </button>

      <div className="flex flex-col">
        <label className="block mb-2 text-lg font-medium text-gray-900">
          Target:
        </label>
        <div className="grid grid-cols-4 justify-items-center gap-y-2">
          {Object.keys(SOCIAL_NETWORK_IMAGE_SIZES).map(
            (socialNetwork, index) => {
              return (
                <Checkbox
                  key={index}
                  id={`target_${socialNetwork}`}
                  name="target"
                  typeElement="radio"
                  value={socialNetwork}
                  checkedBgColor={socialNetwork}
                  label={socialNetworkIcons[socialNetwork]}
                  changeHandler={({ target }) =>
                    updateOptions({ [target.name]: target.value })
                  }
                />
              )
            }
          )}
        </div>
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="productBrand"
          className="block mb-2 text-lg font-medium text-gray-900"
        >
          Brand:
        </label>
        <input
          type="text"
          id="productBrand"
          name="productBrand"
          placeholder="@mystore"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2 px-4"
          onChange={({ target }) =>
            updateOptions({ [target.name]: target.value || null })
          }
        />
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="productName"
          className="block mb-2 text-lg font-medium text-gray-900"
        >
          Product Name:
        </label>
        <input
          type="text"
          id="productName"
          name="productName"
          placeholder="Adidas shoes..."
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2 px-4"
          onChange={({ target }) =>
            updateOptions({ [target.name]: target.value || null })
          }
        />
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="productPrice"
          className="block mb-2 text-lg font-medium text-gray-900"
        >
          Price:
        </label>
        <div className="relative">
          <input
            type="text"
            id="productPrice"
            name="productPrice"
            className="py-2 px-4 pl-9 pr-16 block w-full border border-gray-300 rounded-lg text-sm focus:z-10"
            placeholder="0,000"
            onChange={({ target }) =>
              updateOptions({ [target.name]: target.value || null })
            }
          />
          <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none z-20 pl-4">
            <span className="text-gray-500">$</span>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center z-20">
            <input
              type="text"
              id="productPriceDecimals"
              name="productPriceDecimals"
              maxLength={2}
              className="py-2 px-4 block w-16 border border-gray-300 rounded-r-lg text-sm focus:z-10"
              placeholder=".00"
              onChange={({ target }) =>
                updateOptions({ [target.name]: target.value || null })
              }
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <label className="block mb-2 text-lg font-medium text-gray-900">
          Sizes:
        </label>
        <div className="grid grid-cols-4 justify-items-center gap-y-2">
          {SIZES_ALLOWED.map(({ value, label }, index) => {
            return (
              <Checkbox
                key={index}
                id={`size_${value}`}
                name="productSizes"
                value={value}
                label={label}
                changeHandler={({ target }) => {
                  const value = target.checked
                    ? [...options[target.name], target.value]
                    : options[target.name].splice(
                        options[target.name].findIndex(
                          curr => curr === target.value
                        ),
                        1
                      )

                  return updateOptions({ [target.name]: value })
                }}
              />
            )
          })}
        </div>
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="productDescription"
          className="block mb-2 text-lg font-medium text-gray-900"
        >
          Description:
        </label>
        <textarea
          id="productDescription"
          name="productDescription"
          rows="4"
          placeholder="Some description..."
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 resize-none"
          onChange={({ target }) =>
            updateOptions({ [target.name]: target.value || null })
          }
        ></textarea>
      </div>
    </>
  )
}
