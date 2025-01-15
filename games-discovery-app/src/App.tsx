import { Switch } from "@/components/ui/switch";
import { Box, Grid, HStack, Input, Text, VStack } from "@chakra-ui/react";
import _ from "lodash";
import { useEffect, useMemo, useState } from "react";
import { LuSearch } from "react-icons/lu";
import useThemeToggle from "./components/ui/color-mode-toggle";
import DropdownMenu from "./components/ui/DropdownMenu";
import GameCard from "./components/ui/game-card/GameCard";
import GameCardSkeleton from "./components/ui/game-card/GameCardSkeleton";
import GenreItem from "./components/ui/GenreItem";
import { InputGroup } from "./components/ui/input-group";
import useGamesStore from "./hooks/games/store";
import { GameGenre, Platform } from "./services/gamesService";

function App() {
  const { appThemeColors, toggleColorMode } = useThemeToggle();
  const { games, errorMessage, initialize } = useGamesStore();
  const [shouldShowLoadingSkeleton, setShouldShowLoadingSkeleton] =
    useState(false);
  const [clickedGenre, setClickedGenre] = useState<GameGenre>();
  const [clickedPlatformName, setClickedPlatformName] = useState<string>();
  const [uniquePlatforms, setUniquePlatforms] = useState<Platform[]>();
  const existingUniqueGenres = new Set<number>();
  const relevanceMenuItems = [
    { label: "Relevance", value: "default" },
    { label: "Most recently updated", value: "updated" },
    { label: "Name", value: "name" },
    { label: "Release date", value: "released" },
    { label: "Popularity", value: "metacritic" },
    { label: "Average rating", value: "rating" },
  ];
  const [clickedRelevanceMenuItem, setClickedRelevanceMenuItem] = useState(
    relevanceMenuItems[0].value
  );
  const [searchGameName, setSearchGameName] = useState<string>();

  useEffect(() => initialize(), []);

  useEffect(() => {
    showLoadingSkeleton();
  }, [searchGameName]);

  const showLoadingSkeleton = () => {
    setShouldShowLoadingSkeleton(true);
    setTimeout(() => {
      setShouldShowLoadingSkeleton(false);
    }, 1000);
  };
  // cache games instead calling the api each time
  const visibleGames = useMemo(() => {
    let filteredGames = _.cloneDeep(games);

    if (clickedRelevanceMenuItem !== relevanceMenuItems[0].value) {
      filteredGames = filteredGames?.sort((firstGame, secondGame) => {
        switch (clickedRelevanceMenuItem) {
          case "name":
            return firstGame.name.localeCompare(secondGame.name);
          case "updated":
            return (
              new Date(secondGame.updated).getTime() -
              new Date(firstGame.updated).getTime()
            );
          case "released":
            return (
              new Date(secondGame.released).getTime() -
              new Date(firstGame.released).getTime()
            );
          case "rating":
            return secondGame.rating - firstGame.rating;
          default:
            return secondGame.metacritic - firstGame.metacritic;
        }
      });
    } else {
      filteredGames = games;
    }

    if (searchGameName) {
      filteredGames = filteredGames?.filter((game) =>
        game.name.toLowerCase().includes(searchGameName.toLowerCase())
      );
    }

    return (
      filteredGames?.filter((game) => {
        switch (true) {
          case clickedGenre && clickedPlatformName !== undefined:
            return (
              game.genres.find(
                (genreItem) => genreItem.id === clickedGenre?.id
              ) &&
              game.parent_platforms.find(
                (parentPlatform) =>
                  parentPlatform.platform.name === clickedPlatformName
              )
            );
          case clickedGenre !== undefined:
            return game.genres.find(
              (genreItem) => genreItem.id === clickedGenre?.id
            );

          case clickedPlatformName !== undefined:
            return game.parent_platforms.find(
              (parentPlatform) =>
                parentPlatform.platform.name === clickedPlatformName
            );
          default:
            return true;
        }
      }) ?? []
    );
  }, [
    clickedGenre,
    clickedPlatformName,
    games,
    clickedRelevanceMenuItem,
    searchGameName,
  ]);

  useEffect(() => {
    const newPlatformarray: Platform[] = [{ name: "All Platforms" }];

    games?.forEach((game) => {
      game.parent_platforms.forEach((platformItem) => {
        if (
          !newPlatformarray.find(
            (item) => item.name === platformItem.platform.name
          )
        ) {
          newPlatformarray.push(platformItem.platform);
        }
      });
    });
    setUniquePlatforms(newPlatformarray);
  }, [games]);

  return errorMessage ? (
    <Text color="red.500">Games couldn't be fetched, please try again.</Text>
  ) : (
    <>
      <VStack width="100vw" m="4">
        <HStack width="100%" my="14" justify="center">
          <Box
            width="1/2"
            background={appThemeColors.fieldTheme.backgroundColor}
            padding="2"
            pl="-2.5"
            borderRadius="30px"
          >
            <InputGroup
              width="1/2"
              flex="1"
              startElement={
                <LuSearch
                  size="30px"
                  color={appThemeColors.fieldTheme.iconColor}
                />
              }
            >
              <Input
                id="searchGames"
                placeholder="Search games..."
                borderRadius="20px"
                ml="5"
                variant="subtle"
                fontSize="lg"
                focusRingColor="transparent"
                onChange={(changeEvent) => {
                  showLoadingSkeleton();
                  setSearchGameName(changeEvent.currentTarget.value);
                }}
              />
            </InputGroup>
          </Box>
          <span onClick={toggleColorMode}>
            <Switch
              size="lg"
              colorScheme="green"
              trackLabel={{
                on: appThemeColors.themeSwitchIcon,
                off: appThemeColors.themeSwitchIcon,
              }}
            ></Switch>
          </span>
        </HStack>
        <HStack align="flex-start" m="6" width="100vw">
          <VStack gap="6" userSelect="none">
            <Text
              fontWeight="bold"
              fontSize="4xl"
              alignSelf="flex-start"
              my="3"
              _hover={{ textDecoration: "underline", cursor: "pointer" }}
              onClick={() => {
                setClickedGenre(undefined);
                showLoadingSkeleton();
              }}
            >
              Genres
            </Text>
            {games?.map((game) =>
              game.genres.map((genre) => {
                const clickedGenreId = clickedGenre?.id ?? -1;
                if (!existingUniqueGenres.has(genre.id)) {
                  existingUniqueGenres.add(genre.id);
                  return (
                    <GenreItem
                      {...{
                        genre,
                        clickedGenreId,
                        onClick: () => {
                          showLoadingSkeleton();
                          setClickedGenre(genre);
                        },
                      }}
                    />
                  );
                }
              })
            )}
          </VStack>
          <VStack width="100vw">
            <VStack align="start" width="100%" pb="6">
              <Text fontWeight="bolder" fontSize="6xl">{`${
                clickedPlatformName ?? ""
              } ${clickedGenre?.name ?? ""} Games`}</Text>
              {uniquePlatforms && (
                <HStack my="6">
                  <DropdownMenu
                    backgroundColor={appThemeColors.fieldTheme.backgroundColor}
                    selectionItems={uniquePlatforms}
                    menuItemValueKey={"name"}
                    menuItemLabelKey={"name"}
                    onMenuItemSelect={(value) => {
                      showLoadingSkeleton();
                      setClickedPlatformName(
                        value === uniquePlatforms[0].name
                          ? undefined
                          : (value as string)
                      );
                    }}
                  />
                  <DropdownMenu
                    selectionPrefix="Order by: "
                    backgroundColor={appThemeColors.fieldTheme.backgroundColor}
                    selectionItems={relevanceMenuItems}
                    menuItemValueKey={"value"}
                    menuItemLabelKey={"label"}
                    onMenuItemSelect={(value) => {
                      showLoadingSkeleton();
                      setClickedRelevanceMenuItem(value);
                    }}
                  />
                </HStack>
              )}
            </VStack>
            <Grid
              templateColumns="repeat(auto-fit, minmax(200px, max-content))"
              gap="4"
              width="100%"
              pe="4"
            >
              {shouldShowLoadingSkeleton || visibleGames.length === 0 ? (
                Array.from({ length: 20 }).map((_, index) => (
                  <GameCardSkeleton key={index} />
                ))
              ) : visibleGames.length !== 0 ? (
                visibleGames.map((game) => (
                  <GameCard
                    key={game.id}
                    platforms={game.parent_platforms}
                    imageUrl={game.background_image}
                    title={game.name}
                    popularity={game.metacritic}
                    ratingTitle={game.ratings[0].title ?? ""}
                  />
                ))
              ) : (
                <Text>No results found that meet these criteria.</Text>
              )}
            </Grid>
          </VStack>
        </HStack>
      </VStack>
    </>
  );
}

export default App;
