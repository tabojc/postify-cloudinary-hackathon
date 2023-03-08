export default function Checkbox({
  id,
  name,
  label,
  value,
  changeHandler,
  typeElement = "checkbox",
  checkedBgColor = "default"
}) {
  const bgColorVariants = {
    default: "peer-checked:bg-blue-600 hover:bg-blue-600",
    facebook: "peer-checked:bg-facebook hover:bg-facebook",
    instagram:
      "peer-checked:bg-gradient-to-br peer-checked:from-pink-500 peer-checked:via-red-500 peer-checked:to-yellow-500 hover:bg-gradient-to-br hover:from-pink-500 hover:via-red-500 hover:to-yellow-500",
    twitter: "peer-checked:bg-twitter hover:bg-twitter",
    youtube: "peer-checked:bg-youtube hover:bg-youtube",
    pinterest: "peer-checked:bg-pinterest hover:bg-pinterest"
  }

  return (
    <span className="flex items-center">
      <input
        className="sr-only peer"
        id={id}
        name={name}
        type={typeElement}
        value={value}
        onChange={changeHandler}
      />
      <label
        htmlFor={id}
        className={`flex w-14 h-12 items-center justify-center bg-white border border-gray-300 rounded-lg cursor-pointer hover:text-white focus:outline-none peer-checked:ring-white peer-checked:ring-2 peer-checked:border-transparent ${bgColorVariants[checkedBgColor]} peer-checked:text-white`}
      >
        {label}
      </label>
    </span>
  )
}
