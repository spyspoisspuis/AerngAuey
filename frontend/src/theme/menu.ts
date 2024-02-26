import { menuAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers,defineStyle } from "@chakra-ui/react";
import { AUEYSPEC,SPYSPEC } from "../constant/userspec";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys);

const variants = {
    auey: {
        button: {
            _hover: {
                bg: AUEYSPEC.hoverTheme,
                color: "black",
            }
        }
    },
    spy: {
        button: {
            _hover: {
                bg: SPYSPEC.hoverTheme,
                color: "white",
            }
        }
    }
}

// define the base component styles
const baseStyle = definePartsStyle({
  // define the part you're going to style
  button: {
    // this will style the MenuButton component
    fontWeight: "medium",
    _hover: {
      bg: "gray.600",
      color: "white",
    },
  },
});

// define custom styles
const lg = defineStyle({
  fontSize: 'md',
  my: '1',
});

const xl = defineStyle({
  fontSize: "lg",
  px: "4",
  py: "2",
});

// define custom sizes
const sizes = {
  // apply custom styles to parts
  xl: definePartsStyle({
    button: xl,
    item: xl,
    groupTitle: lg,
    command: xl,
  }),
};

// export the component theme
export const menuTheme = defineMultiStyleConfig({
  baseStyle,
  sizes,
  variants,
  defaultProps: {
    // define which size is applied by default
    size: "xl",
  },
});
