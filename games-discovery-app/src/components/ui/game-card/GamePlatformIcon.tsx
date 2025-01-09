import { AiFillWindows } from "react-icons/ai";
import { Icon } from "@chakra-ui/react";
import { FaPlaystation } from "react-icons/fa6";
import { RiXboxFill } from "react-icons/ri";
import { FaApple, FaAndroid, FaLinux } from "react-icons/fa";
import { SiAtari, SiCommodore, SiSega, SiD3Dotjs } from "react-icons/si";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { BsBrowserChrome, BsNintendoSwitch } from "react-icons/bs";

interface GamePlatformIconProps {
  platformName: string;
}

const GamePlatformIcon = ({ platformName }: GamePlatformIconProps) => {
  return (
    <Icon fontSize="20px" color="gray">
      {PlatformIcon(platformName)}
    </Icon>
  );
};

const PlatformIcon = (platformName: string) => {
  switch (platformName) {
    case "PC":
      return <AiFillWindows />;
    case "Linux":
      return <FaLinux />;
    case "PlayStation":
      return <FaPlaystation />;
    case "Xbox":
      return <RiXboxFill />;
    case "Apple Macintosh":
      return <FaApple />;
    case "Android":
      return <FaAndroid />;
    case "iOS":
      return <MdOutlinePhoneIphone />;
    case "Nintendo":
      return <BsNintendoSwitch />;
    case "Atari":
      return <SiAtari />;
    case "Commodore / Amiga":
      return <SiCommodore />;
    case "SEGA":
      return <SiSega />;
    case "3DO":
      return <SiD3Dotjs />;
    default:
      return <BsBrowserChrome />;
  }
};

export default GamePlatformIcon;
