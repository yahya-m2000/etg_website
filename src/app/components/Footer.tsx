import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="z-20 max-h-[400px] m-h-[400px] flex w-auto max-w-[1920px] flex-1 flex-col bg-foreground justify-center items-start p-20 ">
      {/* Logo */}
      <div className="mb-5">
        <h1 className="logo text-white">
          THE EASTERN <br />
          TRADE GROUP
        </h1>
      </div>

      {/* Social Media Logos */}
      <div className="flex mb-5 space-x-4">
        {/* Replace these with your social media icons as needed */}
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook className="text-white w-6 h-6 hover:text-primary transition-colors duration-200" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter className="text-white w-6 h-6 hover:text-primary transition-colors duration-200" />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin className="text-white w-6 h-6 hover:text-primary transition-colors duration-200" />
        </a>
      </div>

      {/* Subscribe Section */}
      <div className="mb-5">
        <h6 className="text-white mb-2">Subscribe to our newsletter</h6>
        <div className="flex flex-row space-x-2 items-center">
          {/* Input Field */}
          <input
            type="email"
            placeholder="Your email"
            className="w-[25vw] p-2 bg-transparent border-b-2 border-white text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors duration-200"
          />
          {/* Submit Button */}
          <button
            title="Submit"
            className="bg-primary text-white py-2 px-4 hover:bg-primary-dark transition-colors duration-200"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Footer Text */}
      <p className="text-white mt-5">
        ©2024 The Eastern Trade Group LLP. All rights reserved.{" "}
        <a href="#" className="font-bold underline">
          Privacy Policy
        </a>{" "}
        and{" "}
        <a href="#" className="font-bold  underline">
          Terms of Use
        </a>
        .
      </p>
    </div>
  );
};

export default Footer;
