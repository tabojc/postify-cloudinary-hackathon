import { v4 as uuidv4 } from "uuid"
import { source } from "@cloudinary/url-gen/actions/overlay"
import {
  limitFit,
  limitPad,
  pad,
  scale
} from "@cloudinary/url-gen/actions/resize"
import { Position } from "@cloudinary/url-gen/qualifiers"
import { compass } from "@cloudinary/url-gen/qualifiers/gravity"
import { image, text } from "@cloudinary/url-gen/qualifiers/source"
import { TextStyle } from "@cloudinary/url-gen/qualifiers/textStyle"
import {
  CLOUDINARY_SETTINGS,
  IMAGE_COLORS,
  SOCIAL_NETWORK_IMAGE_SIZES
} from "@/constants"
import { colorize } from "@cloudinary/url-gen/actions/effect"
import { Transformation } from "@cloudinary/url-gen"
import { color } from "@cloudinary/url-gen/qualifiers/background"
import { byAngle } from "@cloudinary/url-gen/actions/rotate"

const {
  CLOUDINARY_PRESET,
  CLOUDINARY_API_KEY,
  CLOUDINARY_FOLDER,
  CLOUDINARY_UPLOAD_URL
} = CLOUDINARY_SETTINGS

export const uploadImage = async file => {
  const formData = new FormData()
  formData.append("upload_preset", CLOUDINARY_PRESET)
  formData.append("timestamp", Date.now() / 1000)
  formData.append("api_key", CLOUDINARY_API_KEY)
  formData.append("file", file)
  formData.append("public_id", uuidv4())
  formData.append("folder", CLOUDINARY_FOLDER)

  try {
    const response = await fetch(CLOUDINARY_UPLOAD_URL, {
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
  const price = `${productPrice ?? "0"},${productPriceDecimals || "00"}`
  const sizeChunks = splitIntoChunk(productSizes, 3)
  const sizes = sizeChunks.map(curr => curr.join(" ")).join("%0A")
  const imageSize = SOCIAL_NETWORK_IMAGE_SIZES[target]
  const defaultImageSize = {
    width: 1280,
    height: 760
  }

  const priceSettings = {
    size: { 4: 80, 5: 70, 6: 60, 7: 45 },
    offsetX: { 4: 80, 5: 70, 6: 65, 7: 70 },
    offsetY: { 4: 210, 5: 210, 6: 220, 7: 220 }
  }
  const sizeSettings = {
    size: { 1: 60, 2: 50, 3: 40 },
    offsetX: { 1: 50, 2: 50, 3: 50 },
    offsetY: { 1: 180, 2: 140, 3: 140 }
  }

  const newImage = cldClient
    .image(publicId)
    .resize(pad().width(defaultImageSize.width).height(defaultImageSize.height))
    .resize(
      limitPad()
        .height(defaultImageSize.height + 150)
        .background(color(IMAGE_COLORS.background))
    )
    .overlay(
      source(
        image("footer_bar_raiw6l").transformation(
          new Transformation()
            .rotate(byAngle(-180))
            .resize(scale().width("1.0").height(0.1).relative())
            .effect(colorize().color("white"))
        )
      ).position(new Position().gravity(compass("north")))
    )
    .overlay(
      source(
        text(
          productName.toUpperCase(),
          new TextStyle("Arial", 45).fontWeight("bold")
        ).textColor(IMAGE_COLORS.title)
      ).position(new Position().gravity(compass("north")).offsetY(20))
    )
    .overlay(
      source(
        image("footer_bar_raiw6l").transformation(
          new Transformation().resize(
            scale().width("1.0").height(0.16).relative()
          )
        )
      ).position(new Position().gravity(compass("south")))
    )
    .overlay(
      source(
        text(
          productDescription,
          new TextStyle("Arial", 60).fontWeight("bold")
        ).textColor(IMAGE_COLORS.description)
      ).position(
        new Position().gravity(compass("south_west")).offsetY(50).offsetX(20)
      )
    )
    .overlay(
      source(
        text(productBrand, new TextStyle("Arial", 40)).textColor(
          IMAGE_COLORS.brand
        )
      ).position(
        new Position().gravity(compass("south_west")).offsetY(10).offsetX(20)
      )
    )
    .overlay(
      source(image("price_icon_voxymc")).position(
        new Position().gravity(compass("south_west")).offsetX(40).offsetY(140)
      )
    )
    .overlay(
      source(
        text(
          price,
          new TextStyle(
            "arial",
            priceSettings.size[price.length] || 40
          ).fontWeight("bold")
        ).textColor("black")
      ).position(
        new Position()
          .gravity(compass("south_west"))
          .offsetX(priceSettings.offsetX[price.length] || 60)
          .offsetY(priceSettings.offsetY[price.length] || 220)
      )
    )
    .overlay(
      source(
        text("SIZES:", new TextStyle("arial", 60).fontWeight("bold")).textColor(
          "yellow"
        )
      ).position(
        new Position().gravity(compass("south_east")).offsetX(50).offsetY(250)
      )
    )
    .overlay(
      source(
        text(
          sizes,
          new TextStyle("arial", sizeSettings.size[sizeChunks.length])
            .lineSpacing(-10)
            .textAlignment("right")
        ).textColor("yellow")
      ).position(
        new Position()
          .gravity(compass("south_east"))
          .offsetX(sizeSettings.offsetX[sizeChunks.length])
          .offsetY(sizeSettings.offsetY[sizeChunks.length])
      )
    )
    .resize(limitFit().width(imageSize.width).height(imageSize.height))
    .format("png")

  return newImage.toURL()
}

const splitIntoChunk = (arr, chunk) => {
  const newArray = []
  for (let i = 0; i < arr.length; i += chunk) {
    newArray.push(arr.slice(i, i + chunk))
  }
  return newArray
}
