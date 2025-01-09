import { Icon, Image } from "@chakra-ui/react";
import ratingIcons from "../../../assets/images/index";

interface GameRatingIconProps {
  ratingTitle: string;
}

const { exceptionalIcon, mehIcon, recommendedIcon, skipIcon } = ratingIcons;

const GameRatingIcon = ({ ratingTitle }: GameRatingIconProps) => {
  return (
    <Icon boxSize="8">
      <Image alt="rating icon" src={getRatingIconPath(ratingTitle)} />
    </Icon>
  );
};

const getRatingIconPath = (ratingTitle: string) => {
  switch (ratingTitle) {
    case "exceptional":
      return exceptionalIcon;
    case "meh":
      return mehIcon;
    case "recommended":
      return recommendedIcon;
    default:
      return skipIcon;
  }
};

export default GameRatingIcon;
