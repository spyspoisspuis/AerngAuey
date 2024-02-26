import { menuTheme } from "./menu";
const inputSelectedStyles = {
  variants: {
    search_bar: {
      field: {
        bg: "white",
        borderColor: "brand_gray.500",
        borderRadius: "30",
        border: "1px solid #D9D9D9",
        _focus: {
          borderColor: "brand_gray.500",
          bg: "white",
        },
        _hover: {
          borderColor: "brand_gray.500",
          bg: "white",
        },
        fontWeight: "light",
      },
    },
    authen_field: {
      field: {
        borderRadius: "15",
        border: "1px solid #C8C6C6",
        _invalid: {
          border: "1px solid #FF0000",
        },
      },
    },
    success_authen_field: {
      field: {
        borderRadius: "15",
        border: "1px solid #48BB78",
      },
    },
  },
  sizes: {
    md: {
      field: {
        borderRadius: "none",
      },
    },
  },
};

const buttonStyle = {
  baseStyle: {
    fontWeight: "medium",
  },
  props: {
    myProp: String, // Define the type for myProp
  },
  variants: {
    blue: {
      bg: "blue.400",
      color: "white",
      _hover: {
        bg: "blue.600",
      },
      _active: {
        bg: "blue.800",
      },
    },
    brand: {
      bg: "brand_orange.400",
      color: "white",
      _hover: {
        bg: "orange.600",
      },
      _active: {
        bg: "orange.800",
      },
    },
    brand_link: {
      color: "brand_orange.400",
      p: 0,
    },
    complete_ghost: {
      bg: "transparent",
      _hover: {
        bg: "transparent",
      },
      _active: {
        bg: "transparent",
      },
    },
    success: {
      bg: "green.400",
      color: "white",
      _hover: {
        bg: "green.600",
      },
      _active: {
        bg: "green.800",
      },
    },
    cancel: {
      bg: "red.400",
      color: "white",
      _hover: {
        bg: "red.600",
      },
      _active: {
        bg: "red.800",
      },
    },
  },
};

const textStyle = {
  baseStyle: {
    fontWeight: "light",
    letterSpacing: "tighter",
  },
  variants: {
    question: {
      fontWeight: "normal",
    },
    answer: {
      fontWeight: "light",
    },
  },
};

const tooltipStyle = {
  baseStyle: {
    fontWeight: "light",
  },
};

const headingStyle = {
  baseStyle: {
    fontWeight: "normal",
  },
};
const component = {
  components: {
    Input: { ...inputSelectedStyles },
    Button: { ...buttonStyle },
    Text: { ...textStyle },
    Tooltip: { ...tooltipStyle },
    Heading: { ...headingStyle },
    Menu: menuTheme,
  },
};

export default component;
