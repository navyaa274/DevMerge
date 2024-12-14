import React, { useState } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import { Box, HStack, VStack, Select, Button, Text, useColorMode, useColorModeValue, IconButton, Input, Flex } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import AceEditor from 'react-ace';
import { CODE_SNIPPETS } from '../../constants/editor.js'; // Predefined code snippets
import Chatbot from "../../pages/chatBot/index.jsx"; // Import the Chatbot component
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-ruby';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools'; // Import for auto-completion

// Main Code Editor Component
const CodeEditor = () => {
  const [value, setValue] = useState(''); // Code editor's value
  const [language, setLanguage] = useState('javascript'); // Selected language
  const [output, setOutput] = useState(''); // Output state
  const [userInput, setUserInput] = useState(''); // User input state
  const { colorMode, toggleColorMode } = useColorMode(); // Chakra's color mode (light/dark)
  const editorTheme = colorMode === 'dark' ? 'monokai' : 'github'; // Dynamic editor theme
  const [isChatbotVisible, setChatbotVisible] = useState(false);

  const bgColor = useColorModeValue('gray.100', 'gray.800');
  const editorBgColor = useColorModeValue('white', 'gray.900');
  const outputBgColor = useColorModeValue('gray.50', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'gray.100');

  // Handle language selection
  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language] || ''); // Update value with default snippet
  };

  // Handle user input change
  const onInputChange = (e) => {
    setUserInput(e.target.value);
  };

  // Run code and capture output
  const onRun = async () => {
    try {
      const response = await fetch('http://localhost:2004/api/submission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language, code: value, input: userInput }),
      });
      const data = await response.json();
      setOutput(data.output || 'Error in code execution.');
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  const toggleChatbot = () => {
    setChatbotVisible(!isChatbotVisible); // Toggle Chatbot visibility
  };

  return (
    <Box
      w="100%"
      minHeight="100vh"
      p={6}
      bg={bgColor}
      color={textColor}
      sx={{
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Main Container */}
      <VStack
        w="90%"
        spacing={6}
        p={6}
        bg={editorBgColor}
        borderRadius="12px"
        boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
        alignItems="stretch"
      >
        {/* Header */}
        <HStack justifyContent="space-between" w="100%">
          <Box>
            <Text fontSize="2xl" fontWeight="bold">
              DevMerge
            </Text>
            <Text fontSize="sm" color={useColorModeValue('gray.500', 'gray.400')}>
              Your code, our canvas!
            </Text>
          </Box>
          <HStack spacing={4}>
            <IconButton
              aria-label="Toggle theme"
              icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
              onClick={toggleColorMode}
              colorScheme="blue"
            />
            <Button colorScheme="teal" onClick={toggleChatbot}>
              Ask AI
            </Button>
            <Link to="/home">
            <Button colorScheme="teal">
              Home
            </Button>
            </Link>
            
          </HStack>
        </HStack>

        {/* Language Selector and Run Code Button */}
        <Flex justifyContent="center" alignItems="center" gap="4">
          <Select
            value={language}
            onChange={(e) => onSelect(e.target.value)}
            maxW="200px"
            sx={{
              backgroundColor: 'white',
              borderColor: 'gray.300',
              color: 'black',
            }}
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="c">C</option>
            <option value="c++">C++</option>
            <option value="ruby">Ruby</option>
          </Select>

          <Button
            colorScheme="blue"
            size="lg"
            onClick={onRun}
          >
            Run Code
          </Button>
        </Flex>

        {/* Input and Output Side-by-Side */}
        <HStack
          spacing={6}
          alignItems="stretch"
          justifyContent="space-between"
          w="100%"
        >
          {/* Ace Editor: Input */}
          <Box
            flex={1}
            border="1px solid"
            borderColor={useColorModeValue('gray.300', 'gray.600')}
            borderRadius="8px"
            overflow="hidden"
          >
            <AceEditor
              mode={language === 'c' || language === 'c++' ? 'c_cpp' : language}
              theme={editorTheme}
              value={value}
              onChange={(newValue) => setValue(newValue)}
              name="code-editor"
              editorProps={{ $blockScrolling: true }}
              fontSize={14}
              showPrintMargin={false}
              showGutter={true}
              highlightActiveLine={true}
              placeholder='Write your code here!'
              width="100%"
              height="400px"
              setOptions={{
                useWorker: false,
                tabSize: 2,
                wrap: true,
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
              }}
            />
          </Box>

          <Flex direction="column" h="100%" w="40%" gap={4}>
            {/* Input Box */}
            <Box
              w="100%"
              p={4}
              borderRadius="8px"
              border="1px solid"
              borderColor="gray.300"
            >
              <Text mb={2}>Enter Input:</Text>
              <Input
                value={userInput}
                onChange={onInputChange}
                placeholder="Type input here"
              />
            </Box>

            {/* Output Box */}
            <Box
              flex={1}
              p={4}
              bg={outputBgColor}
              border="1px solid"
              borderColor={useColorModeValue("gray.300", "gray.600")}
              borderRadius="8px"
              boxShadow="inset 0 1px 3px rgba(0, 0, 0, 0.1)"
              overflow="auto"
            >
              <Text fontSize="lg" fontWeight="bold" mb={4}>
                Output
              </Text>
              <Box
                p={3}
                borderRadius="8px"
                fontSize="14px"
                color={textColor}
                border="1px solid"
                borderColor={useColorModeValue("gray.200", "gray.600")}
                bg={editorBgColor}
              >
                {output || "Run your code to see the output!"}
              </Box>
            </Box>
          </Flex>

          {isChatbotVisible && (
            <Chatbot onClose={() => setChatbotVisible(false)} />
          )}
        </HStack>
      </VStack>
    </Box>
  );
};

export default CodeEditor;
