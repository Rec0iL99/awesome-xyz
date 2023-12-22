import {
  Flex,
  Box,
  Heading,
  TextFieldRoot,
  TextFieldSlot,
  TextFieldInput,
} from "@radix-ui/themes";
import { GitHubAuthButtonController } from "./home/GitHubAuthButtonController";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export const NavBar: React.FC = () => {
  return (
    <Flex style={{ zIndex: 1 }} gap="3" position="sticky" top="0" p="2">
      <Flex align="center" m="auto" grow={"1"}>
        <Heading>awesome-xyz</Heading>

        <Box ml="auto">
          <TextFieldRoot>
            <TextFieldSlot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextFieldSlot>
            <TextFieldInput placeholder="Search for tools..." />
          </TextFieldRoot>
        </Box>

        <Box ml="auto">
          <GitHubAuthButtonController />
        </Box>
      </Flex>
    </Flex>
  );
};
