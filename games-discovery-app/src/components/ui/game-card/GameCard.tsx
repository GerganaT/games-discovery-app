import {
  Card,
  HStack,
  Image,
  Highlight,
  Spacer,
  Heading,
} from "@chakra-ui/react";
import GamePlatformIcon from "./GamePlatformIcon";
import GameRatingIcon from "./GameRatingIcon";
import { PlatformType } from "@/services/gamesService";

interface GameCardProps {
  title: string;
  imageUrl: string;
  platforms: PlatformType[];
  popularity: number;
  ratingTitle: string;
}

const GameCard = ({
  title,
  imageUrl,
  platforms,
  popularity,
  ratingTitle,
}: GameCardProps) => {
  const [backgroundColor, textColor] = getPopularityStyling(popularity);
  return (
    <Card.Root overflow="hidden" rounded="lg">
      <Image height="200px" src={imageUrl} alt="game image" />
      <Card.Body gap="3" p="3">
        <HStack align="top">
          <HStack wrap="wrap">
            {platforms.map((element) => (
              <GamePlatformIcon
                key={element.platform.name}
                platformName={element.platform.name}
              />
            ))}
          </HStack>
          <Spacer />
          <Heading>
            <Highlight
              query={popularity.toString()}
              styles={{
                px: "1.5",
                bg: backgroundColor,
                color: textColor,
                rounded: "sm",
                fontSize: "md",
              }}
            >
              {popularity.toString()}
            </Highlight>
          </Heading>
        </HStack>

        <Card.Title>{title}</Card.Title>
      </Card.Body>
      {ratingTitle && (
        <Card.Footer>
          <GameRatingIcon ratingTitle={ratingTitle} />
        </Card.Footer>
      )}
    </Card.Root>
  );
};

export default GameCard;

const getPopularityStyling = (popularity: number) => {
  switch (true) {
    case popularity > 70:
      return ["green.subtle", "green.fg"];
    case popularity <= 70 && popularity > 50:
      return ["yellow.subtle", "yellow.fg"];
    default:
      return ["red.subtle", "red.fg"];
  }
};
