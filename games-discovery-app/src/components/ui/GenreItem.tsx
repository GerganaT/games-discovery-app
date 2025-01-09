import { HStack, Image, Text } from "@chakra-ui/react";
import { GameGenre } from "@/services/gamesService";

interface GenreItemProps {
  genre: GameGenre;
  clickedGenreId: number;
  onClick: () => void;
}

const GenreItem = ({ genre, clickedGenreId, onClick }: GenreItemProps) => (
  <HStack
    id={genre.id.toString()}
    width="100%"
    gap="6"
    onClick={onClick}
    _hover={{ cursor: "pointer" }}
  >
    <Image
      src={genre.image_background}
      boxSize="80px"
      fit="cover"
      alt="genre image"
      borderRadius="lg"
    />
    <Text
      fontSize="2xl"
      fontWeight={clickedGenreId === genre.id ? "bold" : "normal"}
      _hover={{ textDecoration: "underline" }}
    >
      {genre.name}
    </Text>
  </HStack>
);
export default GenreItem;
