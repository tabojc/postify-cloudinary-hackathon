import { createContext, useState } from "react"

export const ToolboxContext = createContext()

export function ToolboxProvider({ children }) {
  const [options, setOptions] = useState({
    target: null,
    productBrand: null,
    productName: null,
    productPrice: null,
    productPriceDecimals: null,
    productSizes: [],
    productDescription: null
  })

  return (
    <ToolboxContext.Provider value={{ options, setOptions }}>
      {children}
    </ToolboxContext.Provider>
  )
}
