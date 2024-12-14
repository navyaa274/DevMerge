import { Box } from "@chakra-ui/react";
import CodeEditor from "../../components/editorCode/codeEditor.jsx";

import { ChakraProvider } from "@chakra-ui/react";
import theme from "../../components/editorCode/theme.js";

function EditorCode() {
  return (
    <ChakraProvider theme={theme}>
        <Box minH="100vh" bg="#0f0a19" color="gray.500" px={6} py={8}>
            <CodeEditor />
        </Box>
    </ChakraProvider>
  );
}

export default EditorCode;