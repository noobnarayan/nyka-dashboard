import React from "react";

function Button({
  buttonText,
  color = "bg-blue-500",
  textColor = "text-white",
  type = "submit",
  rounded = "rounded-md",
  border = "border-transparent",
  paddingY = "py-2",
  paddingX = "px-4",
  width = "w-full",
  justifyContent = "justify-center",
  focus = "focus:outline-none",
  additionalClasses = "",
}) {
  return (
    <button
      type={type}
      className={` flex ${width} ${justifyContent} ${paddingY} ${paddingX} border ${border} text-sm font-medium ${rounded} ${textColor} ${color}  ${focus} ${additionalClasses}`}
    >
      {buttonText}
    </button>
  );
}

export default Button;
