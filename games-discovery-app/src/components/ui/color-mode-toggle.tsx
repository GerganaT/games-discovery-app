import { Icon } from "@chakra-ui/react";
import { useTheme } from "next-themes";
import { FaMoon, FaSun } from "react-icons/fa";

export const useThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const toggleColorMode = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const appThemeColors = {
    themeSwitchIcon:
      theme === "light" ? (
        <Icon color="yellow.400">
          <FaMoon />
        </Icon>
      ) : (
        <Icon color="yellow.400">
          <FaSun />
        </Icon>
      ),
    fieldTheme: {
      backgroundColor: theme === "light" ? "gray.100" : "gray.900",
      iconColor: theme === "light" ? "black" : "white",
    },
  };

  return { appThemeColors, toggleColorMode };
};

export default useThemeToggle;
