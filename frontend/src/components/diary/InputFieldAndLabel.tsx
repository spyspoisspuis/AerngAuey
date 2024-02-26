import { VStack, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

interface InputFieldAndLabelProps {
  children: ReactNode;
  label: string;
  width?: string;
}

function InputFieldAndLabel({
  children,
  label,
  width = "100%",
}: InputFieldAndLabelProps) {
  return (
    <VStack w={width} align="flex-start">
      <Text>{label}</Text>
      {children}
    </VStack>
  );
}

export default InputFieldAndLabel;
