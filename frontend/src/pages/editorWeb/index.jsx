import React, { useState } from "react";
import Chatbot from "../chatBot/index.jsx"; // Import the Chatbot component
import Navbar from '../../components/editorWeb/Navbar.js';
import Sidebar from '../../components/editorWeb/Sidebar.js';
import Editor from '../../components/editorWeb/Editor.js';
import Output from '../../components/editorWeb//Output.js';
import "../../styles/editor.css";

function DevMergePage() {
  const [htmlCode, setHtmlCode] = useState('');
  const [cssCode, setCssCode] = useState('');
  const [jsCode, setJsCode] = useState('');
  const [showSidebar, setShowSidebar] = useState(true);
  const [isChatbotVisible, setChatbotVisible] = useState(false); // Chatbot visibility state

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const runCode = () => {
    const output = document.getElementById('output');
    output.contentDocument.body.innerHTML = htmlCode + `<style>${cssCode}</style>`;
    output.contentWindow.eval(jsCode);
  };

  const toggleChatbot = () => {
    setChatbotVisible(!isChatbotVisible); // Toggle Chatbot visibility
  };

  return (
    <div className="background">
      <Navbar toggleSidebar={toggleSidebar} runCode={runCode} toggleChatbot={toggleChatbot}/>
      <div className="main-container">
        {showSidebar && <Sidebar setHtmlCode={setHtmlCode} setCssCode={setCssCode} setJsCode={setJsCode} />}
        <Editor htmlCode={htmlCode} setHtmlCode={setHtmlCode} cssCode={cssCode} setCssCode={setCssCode} jsCode={jsCode} setJsCode={setJsCode} />
        <Output />
        {isChatbotVisible && (
        <Chatbot onClose={() => setChatbotVisible(false)} />
      )}
      </div>
    </div>
  );
}

export default DevMergePage;
