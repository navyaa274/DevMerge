// import React, { useState, useEffect, useRef } from "react";
// import MonacoEditor from "@monaco-editor/react";
// import "../../styles/chatbot.css";

// const Chatbot = ({ onClose }) => {
//   const [messages, setMessages] = useState([]);
//   const [userInput, setUserInput] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const chatBoxRef = useRef(null);

//   const sendMessage = async () => {
//     const userMessage = userInput.trim();
//     if (!userMessage) return;

//     setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
//     setUserInput("");
//     setIsLoading(true);

//     try {
//       const response = await fetch("http://localhost:5000/chat-with-gemini", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ prompt: userMessage }),
//       });

//       if (!response.ok) throw new Error("Server error!");

//       const data = await response.json();
//       const botResponse = parseResponse(data.reply);

//       setMessages((prev) => [...prev, { sender: "bot", ...botResponse }]);
//     } catch (error) {
//       console.error("Error:", error);
//       setMessages((prev) => [
//         ...prev,
//         { sender: "bot", text: "Unable to communicate with the chatbot." },
//       ]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const parseResponse = (responseText) => {
//     const codeMatch = responseText.match(/```(.*?)\n([\s\S]*?)```/);
//     if (codeMatch) {
//       const language = codeMatch[1] || "plaintext";
//       const code = codeMatch[2];
//       const explanation = responseText.replace(codeMatch[0], "").trim();
//       const points = explanation.split(/\n|•|\*/).filter((point) => point.trim());
//       return { points, code, language };
//     }
//     const points = responseText.split(/\n|•|\*/).filter((point) => point.trim());
//     return { points, code: null, language: null };
//   };
  

//   useEffect(() => {
//     if (chatBoxRef.current) {
//       chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
//     }
//   }, [messages]);

//   const copyToClipboard = (text) => {
//     navigator.clipboard
//       .writeText(text)
//       .then(() => alert("Code copied to clipboard!"))
//       .catch((err) => console.error("Error copying text: ", err));
//   };

//   return (
//     <div className="chatbot-container">
//       <div className="header">
//         Gemini AI Chatbot
//         <button className="close-button" onClick={onClose}>&times;</button>
//       </div>
//       <div className="chatbox" ref={chatBoxRef}>
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className="message-container"
//             style={{ justifyContent: msg.sender === "user" ? "flex-end" : "flex-start" }}
//           >
//             {msg.sender === "user" ? (
//               <div className="user-bubble">{msg.text}</div>
//             ) : (
//               <div>
//                 {msg.points && (
//                   <div className="bot-explanation">
//                     {msg.points.map((point, idx) => (
//                       <p key={idx} className="bot-point">{point}</p>
//                     ))}
//                   </div>
//                 )}
//                 {msg.code && (
//                   <div className="code-block">
//                     <button
//                       className="copy-button"
//                       onClick={() => copyToClipboard(msg.code)}
//                     >
//                       Copy Code
//                     </button>
//                     <MonacoEditor
//                         height="100%" // Take full height of parent container
//                         width="100%" // Take full width of parent container
//                         language={msg.language}
//                         value={msg.code}
//                         options={{
//                         readOnly: true,
//                         wordWrap: "on",
//                         minimap: { enabled: false }, // Disable minimap to save space
//                         automaticLayout: true, // Adjust layout dynamically to container size
//                         }}
//                         className="monaco-editor"
//                     />
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         ))}
//         {isLoading && <div className="loading-message">Bot is typing...</div>}
//       </div>
//       <form className="input-form" onSubmit={(e) => e.preventDefault()}>
//         <input
//           type="text"
//           className="input"
//           placeholder="Ask something..."
//           value={userInput}
//           onChange={(e) => setUserInput(e.target.value)}
//         />
//         <button className="send-button" onClick={sendMessage}>
//           Send
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Chatbot;



// import React, { useState, useEffect, useRef } from "react";
// import MonacoEditor from "@monaco-editor/react";
// import "../../styles/chatbot.css";

// const Chatbot = ({ onClose }) => {
//   const [messages, setMessages] = useState([]);
//   const [userInput, setUserInput] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const chatBoxRef = useRef(null);

//   const sendMessage = async () => {
//     const userMessage = userInput.trim();
//     if (!userMessage) return;

//     setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
//     setUserInput("");
//     setIsLoading(true);

//     try {
//       const response = await fetch("http://localhost:5000/chat-with-gemini", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ prompt: userMessage }),
//       });

//       if (!response.ok) throw new Error("Server error!");

//       const data = await response.json();
//       const botResponse = parseResponse(data.reply);

//       setMessages((prev) => [...prev, { sender: "bot", ...botResponse }]);
//     } catch (error) {
//       console.error("Error:", error);
//       setMessages((prev) => [
//         ...prev,
//         { sender: "bot", text: "Unable to communicate with the chatbot." },
//       ]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const parseResponse = (responseText) => {
//     const codeMatch = responseText.match(/```(.*?)\n([\s\S]*?)```/);
//     if (codeMatch) {
//       const language = codeMatch[1] || "plaintext";
//       const code = codeMatch[2];
//       const explanation = responseText.replace(codeMatch[0], "").trim();
//       const points = explanation.split(/\n|•|\*/).filter((point) => point.trim());
//       return { points, code, language };
//     }
//     const points = responseText.split(/\n|•|\*/).filter((point) => point.trim());
//     return { points, code: null, language: null };
//   };

//   useEffect(() => {
//     if (chatBoxRef.current) {
//       chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
//     }
//   }, [messages]);

//   const copyToClipboard = (text) => {
//     navigator.clipboard
//       .writeText(text)
//       .then(() => alert("Code copied to clipboard!"))
//       .catch((err) => console.error("Error copying text: ", err));
//   };

//   return (
//     <div className="chatbot-container">
//       <div className="header">
//         Gemini AI Chatbot
//         <button className="close-button" onClick={onClose}>&times;</button>
//       </div>
//       <div className="chatbox" ref={chatBoxRef}>
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className="message-container"
//             style={{ justifyContent: msg.sender === "user" ? "flex-end" : "flex-start" }}
//           >
//             {msg.sender === "user" ? (
//               <div className="user-bubble">{msg.text}</div>
//             ) : (
//               <div>
//                 {msg.points && (
//                   <div className="bot-explanation">
//                     {msg.points.map((point, idx) => (
//                       <p key={idx} className="bot-point">{point}</p>
//                     ))}
//                   </div>
//                 )}
//                 {msg.code && (
//                   <div className="code-block">
//                     <button
//                       className="copy-button"
//                       onClick={() => copyToClipboard(msg.code)}
//                     >
//                       Copy Code
//                     </button>
//                     <div className="editor-wrapper">
//                       <MonacoEditor
//                         language={msg.language}
//                         value={msg.code}
//                         options={{
//                           readOnly: true,
//                           wordWrap: "on",
//                           minimap: { enabled: false },
//                           automaticLayout: true,
//                           theme: "vs-light", // Set light theme explicitly
//                       }}
//                       />
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         ))}
//         {isLoading && <div className="loading-message">Bot is typing...</div>}
//       </div>
//       <form className="input-form" onSubmit={(e) => e.preventDefault()}>
//         <input
//           type="text"
//           className="input"
//           placeholder="Ask something..."
//           value={userInput}
//           onChange={(e) => setUserInput(e.target.value)}
//         />
//         <button className="send-button" onClick={sendMessage}>
//           Send
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Chatbot;



// import React, { useState, useEffect, useRef } from "react";
// import "../../styles/chatbot.css";
// import AceEditor from "react-ace";
// import "ace-builds/src-noconflict/mode-python"; // Import language modes
// import "ace-builds/src-noconflict/mode-javascript";
// import "ace-builds/src-noconflict/mode-java";
// import "ace-builds/src-noconflict/theme-tomorrow"; // Choose a theme

// const Chatbot = ({ onClose }) => {
//   const [messages, setMessages] = useState([]);
//   const [userInput, setUserInput] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const chatBoxRef = useRef(null);

//   const sendMessage = async () => {
//     const userMessage = userInput.trim();
//     if (!userMessage) return;

//     setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
//     setUserInput("");
//     setIsLoading(true);

//     try {
//       const response = await fetch("http://localhost:5000/chat-with-gemini", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ prompt: userMessage }),
//       });

//       if (!response.ok) throw new Error("Server error!");

//       const data = await response.json();
//       const botResponse = parseResponse(data.reply);

//       setMessages((prev) => [...prev, { sender: "bot", ...botResponse }]);
//     } catch (error) {
//       console.error("Error:", error);
//       setMessages((prev) => [
//         ...prev,
//         { sender: "bot", text: "Unable to communicate with the chatbot." },
//       ]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const parseResponse = (responseText) => {
//     const codeMatch = responseText.match(/(.*?)\n([\s\S]*?)/);
//     if (codeMatch) {
//       const language = codeMatch[1] || "plaintext";
//       const code = codeMatch[2];
//       const explanation = responseText.replace(codeMatch[0], "").trim();
//       const points = explanation.split(/\n|•|\*/).filter((point) => point.trim());
//       return { points, code, language };
//     }
//     const points = responseText.split(/\n|•|\*/).filter((point) => point.trim());
//     return { points, code: null, language: null };
//   };

//   useEffect(() => {
//     if (chatBoxRef.current) {
//       chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
//     }
//   }, [messages]);

//   const copyToClipboard = (text) => {
//     navigator.clipboard
//       .writeText(text)
//       .then(() => alert("Code copied to clipboard!"))
//       .catch((err) => console.error("Error copying text: ", err));
//   };

//   return (
//     <div className="chatbot-container">
//       <div className="header">
//         Gemini AI Chatbot
//         <button className="close-button" onClick={onClose}>&times;</button>
//       </div>
//       <div className="chatbox" ref={chatBoxRef}>
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className="message-container"
//             style={{ justifyContent: msg.sender === "user" ? "flex-end" : "flex-start" }}
//           >
//             {msg.sender === "user" ? (
//               <div className="user-bubble">{msg.text}</div>
//             ) : (
//               <div>
//                 {msg.points && (
//                   <div className="bot-explanation">
//                     {msg.points.map((point, idx) => (
//                       <p key={idx} className="bot-point">{point}</p>
//                     ))}
//                   </div>
//                 )}
//                 {msg.code && (
//                   <div className="code-block">
//                     <button
//                       className="copy-button"
//                       onClick={() => copyToClipboard(msg.code)}
//                     >
//                       Copy Code
//                     </button>
//                     <AceEditor
//                       mode={msg.language} // Set mode based on the language
//                       theme="tomorrow"    // You can choose a different theme
//                       name="ace-editor"
//                       editorProps={{ $blockScrolling: true }}
//                       value={msg.code}
//                       readOnly={true}
//                       width="100%"
//                       height="200px" // Adjust height as needed
//                     />
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         ))}
//         {isLoading && <div className="loading-message">Bot is typing...</div>}
//       </div>
//       <form className="input-form" onSubmit={(e) => e.preventDefault()}>
//         <input
//           type="text"
//           className="input"
//           placeholder="Ask something..."
//           value={userInput}
//           onChange={(e) => setUserInput(e.target.value)}
//         />
//         <button className="send-button" onClick={sendMessage}>
//           Send
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Chatbot;


import React, { useState, useEffect, useRef } from "react";
import "../../styles/chatbot.css";
import AceEditor from "react-ace";

// Import Ace modes and themes
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-tomorrow"; 
import { toast } from "react-toastify";
import toastOptions from "../../constants/toast";

const Chatbot = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatBoxRef = useRef(null);

  const sendMessage = async () => {
    const userMessage = userInput.trim();
    if (!userMessage) return;

    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setUserInput("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/chat-with-gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userMessage }),
      });

      if (!response.ok) throw new Error("Server error!");

      const data = await response.json();
      const botResponse = parseResponse(data.reply);

      setMessages((prev) => [...prev, { sender: "bot", ...botResponse }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Unable to communicate with the chatbot." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const parseResponse = (responseText) => {
    const codeMatch = responseText.match(/```(.*?)\n([\s\S]*?)```/);
    if (codeMatch) {
      const language = codeMatch[1] || "plaintext";
      const code = codeMatch[2];
      return { code, language };
    }
    return { text: responseText };
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => toast.success("Code copied to clipboard!", toastOptions))
      .catch((err) => console.error("Error copying text: ", err));
  };

  return (
    <div className="chatbot-container">
      <div className="header">
        Gemini AI Chatbot
        <button className="close-button" onClick={onClose}>&times;</button>
      </div>
      <div className="chatbox" ref={chatBoxRef}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className="message-container"
            style={{ justifyContent: msg.sender === "user" ? "flex-end" : "flex-start" }}
          >
            {msg.sender === "user" ? (
              <div className="user-bubble">{msg.text}</div>
            ) : (
              <div>
                {msg.text && <div className="bot-bubble">{msg.text}</div>}
                {msg.code && (
                  <div className="code-block">
                    <button
                      className="copy-button"
                      onClick={() => copyToClipboard(msg.code)}
                    >
                      Copy Code
                    </button>
                    <AceEditor
                      mode={msg.language} // Set mode based on the language
                      theme="tomorrow"    // You can choose a different theme
                      name="ace-editor"
                      editorProps={{ $blockScrolling: true }}
                      value={msg.code}
                      readOnly={true}
                      width="100%"
                      height="200px" // Explicit height for Ace Editor
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        {isLoading && <div className="loading-message">Bot is typing...</div>}
      </div>
      <form className="input-form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          className="input"
          placeholder="Ask something..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button className="send-button" onClick={sendMessage}>
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
