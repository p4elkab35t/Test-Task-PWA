import React from "react";

interface ButtonAuthProps {
    value: string;
    name: string;
    type?: "button" | "submit" | "reset";
}

const ButtonAuth: React.FC<ButtonAuthProps & React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
    value,
    name,
    type = "button",
    ...props
}) => (
    <button
    type={type}
    className="rounded-lg bg-blue-600 text-gray-100 font-semibold border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent px-3 py-1"
    {...props}
    >
      {value}
    </button>
);

export default ButtonAuth;
