import { v4 as uuidv4 } from "uuid"
import { source } from "@cloudinary/url-gen/actions/overlay"
import { fillPad, pad } from "@cloudinary/url-gen/actions/resize"
import { Position } from "@cloudinary/url-gen/qualifiers"
import { autoGravity, compass } from "@cloudinary/url-gen/qualifiers/gravity"
import { image, text } from "@cloudinary/url-gen/qualifiers/source"
import { TextStyle } from "@cloudinary/url-gen/qualifiers/textStyle"
import { SOCIAL_NETWORK_IMAGE_SIZES } from "@/constants"
import { gradientFade } from "@cloudinary/url-gen/actions/effect"
import { symmetricPad } from "@cloudinary/url-gen/qualifiers/GradientFade"
import { Transformation } from "@cloudinary/url-gen"
import { solid } from "@cloudinary/url-gen/actions/border"
import { color } from "@cloudinary/url-gen/qualifiers/background"

const {
  NEXT_PUBLIC_CLOUDINARY_PRESET,
  NEXT_PUBLIC_CLOUDINARY_API_KEY,
  NEXT_PUBLIC_CLOUDINARY_FOLDER,
  NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL
} = process.env

export const uploadImage = async file => {
  const formData = new FormData()
  formData.append("upload_preset", NEXT_PUBLIC_CLOUDINARY_PRESET)
  formData.append("timestamp", Date.now() / 1000)
  formData.append("api_key", NEXT_PUBLIC_CLOUDINARY_API_KEY)
  formData.append("file", file)
  formData.append("public_id", uuidv4())
  formData.append("folder", NEXT_PUBLIC_CLOUDINARY_FOLDER)

  try {
    const response = await fetch(NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL, {
      method: "POST",
      body: formData
    })

    return await response.json()
  } catch (error) {
    console.log("uploadImage error:", error)
    return {}
  }
}

export const applyTransformations = ({ cldClient, publicId, options }) => {
  const {
    target,
    productBrand,
    productName,
    productPrice,
    productPriceDecimals,
    productSizes,
    productDescription
  } = options
  const price = `${productPrice ?? "0"},${productPriceDecimals ?? "00"}`
  const sizes = productSizes.join(", ")
  const footer = `${productDescription}${productBrand ? "%0A" : ""}${
    productBrand ?? ""
  }`
  const imageSize = SOCIAL_NETWORK_IMAGE_SIZES[target]

  const newImage = cldClient
    .image(publicId)
    .resize(pad().width(imageSize.width).height(imageSize.height))
    .effect(
      gradientFade().strength(1).type(symmetricPad()).verticalStartPoint(0.1)
    )
    .overlay(
      source(
        text(
          productName.toUpperCase(),
          new TextStyle("arial", 45).fontWeight("bold")
        )
          .textColor("white")
          .transformation(
            new Transformation()
              .addFlag("text_no_trim")
              .border(solid(20, "transparent"))
          )
      ).position(new Position().gravity(compass("north")).offsetY(-50))
    )
    .overlay(
      source(
        text(footer, new TextStyle("arial", 45).fontWeight("bold"))
          .textColor("white")
          .transformation(
            new Transformation()
              .addFlag("text_no_trim")
              .border(solid(10, "transparent"))
          )
      ).position(
        new Position().gravity(compass("south_west")).offsetY(-140).offsetX(20)
      )
    )
    .overlay(
      source(
        image("price_icon_voxymc")
        // .transformation(
        //   new Transformation().resize(scale().width(1.25))
        // )
      ).position(
        new Position().gravity(compass("south_west")).offsetX(50).offsetY(120)
      )
    )
    .overlay(
      source(
        text(price, new TextStyle("arial", 60).fontWeight("bold")).textColor(
          "black"
        )
      ).position(
        new Position().gravity(compass("south_west")).offsetX(70).offsetY(200)
      )
    )
    .overlay(
      source(
        text("SIZES:", new TextStyle("arial", 60).fontWeight("bold")).textColor(
          "yellow"
        )
      ).position(
        new Position().gravity(compass("south_east")).offsetX(70).offsetY(220)
      )
    )
    .overlay(
      source(
        text(sizes, new TextStyle("arial", 60).fontWeight("bold")).textColor(
          "yellow"
        )
      ).position(
        new Position().gravity(compass("south_east")).offsetX(70).offsetY(140)
      )
    )
    .resize(
      fillPad()
        .width(0.9)
        .height(0.9)
        .gravity(autoGravity())
        .background(color("#408af0"))
    )
    .format("png")

  return newImage.toURL()
}
