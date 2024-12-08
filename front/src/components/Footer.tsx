import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 absolute bottom-0 w-full text-white text-center p-4">
      &copy; {new Date().getFullYear()} E-Commerce
    </footer>
  );
};

export default Footer;