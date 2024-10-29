import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { socialMediaLinks } from "@/assets/data/socialMediaLinks";

const SocialMediaLinks = ({
  title,
  heroImage,
  currentUrl,
}: {
  title: string;
  heroImage: string;
  currentUrl: string;
}) => {
  const links = socialMediaLinks({ title, heroImage, currentUrl });

  return (
    <div className="flex flex-row">
      {links.map((link, index) => (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${link.color} hover:underline  md:mr-[1vw]  mr-[4vw]`}
        >
          <FontAwesomeIcon icon={link.icon} size="2x" />
        </a>
      ))}
    </div>
  );
};

export default SocialMediaLinks;
