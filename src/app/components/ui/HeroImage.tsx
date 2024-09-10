"use client";
import Image from "next/image";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

const HeroImage: React.FC<HeroImageProps> = ({
  title,
  tag,
  backgroundImage,
  body,
  author,
  date,
  url,
}) => {
  return (
    <div className="relative h-[60vh] md:h-[80vh]">
      {/* Background Image */}
      <Image
        src={backgroundImage}
        layout="fill"
        objectFit="cover"
        alt="Background"
        className="absolute inset-0 z-0"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />

      {/* Content with absolute positioning to control placement */}
      <div className="main absolute md:w-[54vw] md:bottom-[15vh] sm:bottom-[10vh] bottom-10 left-0 right-0 z-20">
        <div className="">
          {/* Tag and Download */}
          <div className="flex justify-between items-center">
            <p className="base text-white">{tag}</p>
            <a
              href={url}
              download
              className="flex items-center hover:bg-black hover:bg-opacity-25 rounded-md px-2 py-1"
            >
              <p className="base text-white flex-nowrap">
                Download <span className="font-extrabold">PDF</span>
              </p>
              <FileDownloadOutlinedIcon className="text-white ml-2" />
            </a>
          </div>

          {/* Title */}
          <h1 className="title text-white">{title}</h1>

          {/* Body Text */}
          <p className="base text-white">{body}</p>

          {/* Author and Date */}
          <div className="flex space-x-4 mt-2]">
            <p className="base text-white">{author}</p>
            <p className="base text-white">{date}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroImage;
